import { DIMO } from '../../dimo';
import { DimoEnvironment } from '../../environments';
import { DimoError } from '../../errors';

export interface GetTripsInput {
    headers: {
        Authorization: string;
    };
    tokenId: string;
    from: string;
    to: string;
    mechanism?: 'ignitionDetection' | 'frequencyAnalysis' | 'sparseSampling';
    config?: {
        ignitionDebounce?: number;
    };
}

export interface SegmentWithLocation {
    startTime: string;
    endTime: string | null;
    durationSeconds: number;
    isOngoing: boolean;
    startedBeforeRange: boolean;
    location?: {
        latitude?: number;
        longitude?: number;
        timestamp?: string;
    };
}

export const getTrips = async (
    input: GetTripsInput,
    env: keyof typeof DimoEnvironment
): Promise<SegmentWithLocation[]> => {
    const { headers, tokenId, from, to, mechanism = 'ignitionDetection', config } = input;
    const sdk = new DIMO(env);

    try {
        // Step 1: Fetch segments
        const segmentsQuery = `
            query {
                segments(
                    tokenId: ${tokenId},
                    from: "${from}",
                    to: "${to}",
                    mechanism: ${mechanism}${config ? `,
                    config: ${JSON.stringify(config).replace(/"([^"]+)":/g, '$1:')}` : ''}
                ) {
                    startTime
                    endTime
                    durationSeconds
                    isOngoing
                    startedBeforeRange
                }
            }
        `;

        const segmentsResponse: any = await sdk.telemetry.query({
            headers,
            query: segmentsQuery
        });

        if (segmentsResponse.errors) {
            throw new DimoError({
                message: `Error fetching segments: ${JSON.stringify(segmentsResponse.errors)}`,
                statusCode: 400
            });
        }

        const segments = segmentsResponse.data?.segments || [];

        // Step 2: For each segment, fetch the location at the segment start time
        const segmentsWithLocation = await Promise.all(
            segments.map(async (segment: any) => {
                try {
                    // Create a small time window around the segment start to fetch location
                    const startTime = new Date(segment.startTime);
                    const endTime = new Date(startTime.getTime() + 1000); // 1 second window

                    const locationQuery = `
                        query {
                            signals(
                                tokenId: ${tokenId},
                                from: "${startTime.toISOString()}",
                                to: "${endTime.toISOString()}",
                                interval: "1s"
                            ) {
                                timestamp
                                currentLocationLatitude {
                                    timestamp
                                    value
                                }
                                currentLocationLongitude {
                                    timestamp
                                    value
                                }
                            }
                        }
                    `;

                    const locationResponse: any = await sdk.telemetry.query({
                        headers,
                        query: locationQuery
                    });

                    const signals = locationResponse.data?.signals || [];
                    let location = undefined;

                    // Find the first signal with valid location data
                    if (signals.length > 0) {
                        const signal = signals[0];
                        if (signal.currentLocationLatitude && signal.currentLocationLongitude) {
                            location = {
                                latitude: signal.currentLocationLatitude.value,
                                longitude: signal.currentLocationLongitude.value,
                                timestamp: signal.currentLocationLatitude.timestamp
                            };
                        }
                    }

                    return {
                        ...segment,
                        location
                    };
                } catch (error) {
                    console.error(`Error fetching location for segment starting at ${segment.startTime}:`, error);
                    // Return segment without location if there's an error
                    return {
                        ...segment,
                        location: undefined
                    };
                }
            })
        );

        return segmentsWithLocation;
    } catch (error: any) {
        console.error('Error in getTrips:', error);
        throw new DimoError({
            message: `Error getting trips: ${error.message || error}`,
            statusCode: 400
        });
    }
};
