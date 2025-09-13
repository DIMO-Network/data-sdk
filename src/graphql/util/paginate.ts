import { DimoConstants } from '../../constants';

const pageSize = DimoConstants.Query.PAGE_SIZE;

export const paginate = async <T>(
    fetchPage: (after: string | undefined) => Promise<{ nodes: { nodes: T[] }, pageInfo: { endCursor: string | null }, totalCount: number | null }>): Promise<T[]> => {
    let after: string | null = null;
    let result: T[] = [];
    let totalCount: number | null = null;
    let page = 0;

    while (true) {
        const response = await fetchPage(after ?? undefined);

        const { nodes, pageInfo, totalCount: responseTotalCount } = response;

        if (!nodes || !nodes.nodes) {
            console.error('Invalid response: nodes is undefined or null', response);
            throw new Error('Unexpected API response format');
        }

        // Capture totalCount from the first request
        if (totalCount === null) {
            totalCount = responseTotalCount ?? null; // Ensure fallback if totalCount is missing

            if (totalCount === null) {
                console.warn('Warning: totalCount is null. Defaulting to single page execution.');
                totalCount = pageSize; // Assume at least one page if totalCount is unknown
            }
        }

        result.push(...nodes.nodes);

        page++;

        const totalPages = Math.ceil(totalCount / pageSize);

        if (page >= totalPages || nodes.nodes.length < pageSize) {
            break;
        }

        // Update the cursor
        after = pageInfo.endCursor ?? null;

        if (after === null && page < totalPages) {
            console.warn(`Expected more pages (${page}/${totalPages}), but endCursor is null. Stopping pagination.`);
            break;
        }
    }

    return result;
};