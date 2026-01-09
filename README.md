![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/dimo-network/data-sdk/npm-publish.yml?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/dimo-network/data-sdk?style=flat-square)
![GitHub License](https://img.shields.io/github/license/dimo-network/data-sdk?style=flat-square)
[![Downloads](https://img.shields.io/npm/d18m/@dimo-network/data-sdk.svg?style=flat-square)](https://www.npmjs.com/package/@dimo-network/data-sdk)
[![Discord](https://img.shields.io/discord/892438668453740634)](https://chat.dimo.zone/)
![X (formerly Twitter) URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Ftwitter.com%2FDIMO_Network&style=social)

# DIMO Data SDK
This is an official DIMO Data SDK written in TypeScript. The objective of this project is to make our API more accessible to the general public.

## Installation
Use [npm](https://www.npmjs.com/package/@dimo-network/data-sdk):
```bash
npm install @dimo-network/data-sdk
```

or use [yarn](https://classic.yarnpkg.com/en/package/@dimo-network/data-sdk) instead:

```bash
yarn add @dimo-network/data-sdk
```

## Unit Testing
Run `npm test` or `npm run test` to execute the Jest tests.

## API Documentation
Please visit the DIMO [Developer Documentation](https://docs.dimo.org/developer-platform) to learn more about building on DIMO and detailed information on the API.

## How to Use the SDK

Import the SDK library:

(TypeScript / ES Modules)
```ts
import { DIMO } from '@dimo-network/data-sdk';
```

(CommonJS)
```js
const { DIMO } = require('@dimo-network/data-sdk')
```

Initiate the SDK:

```ts
const dimo = new DIMO('Production');
```

### Developer Registration
As part of the authentication process, you will need to obtain a Developer License via the [DIMO Developer Console](https://console.dimo.org/). To get started with registration, follow the steps below:
1. Sign up on the [DIMO Developer Console](https://console.dimo.org/).
2. Click on `Create a license` and fill out the details about your license.
3. Generate an API key and add in your preferred redirect URI.

### Authentication

The SDK provides you with all the steps needed in the [Authentication Flow](https://docs.dimo.org/developer-platform/getting-started/developer-guide/authentication) to obtain a Developer JWT & to get Vehicle JWT for each vehicle shared with your app.

#### Prerequisites for Authentication
1. A valid Developer License with a `client_id`
2. A valid API key, generated via the Developer Console
3. A proper [project set up with TypeScript](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript).

#### Developer JWT
To get a Developer JWT, you will need a valid Developer License with a `client_id`, a generated `api_key`, and a `domain`/`redirect_uri` you configured on the Developer Console.

##### (Option 1 - PREFERRED) getDeveloperJwt Function
This is a utility function call to get a Developer JWT in one step:

```ts
const developerJwt = await dimo.auth.getDeveloperJwt({
  client_id: '<client_id>',
  domain: '<domain/redirect_uri>',
  private_key: '<api_key>',
});
```

Once you have the `developerJwt`, you'll have access to the DIMO API as a verified developer. For endpoints that require the authorization headers, you can simply pass the results.

```ts
// Pass the developerJwt object to a protected endpoint
await dimo.tokenexchange.exchange({
  ...developerJwt,
  privileges: [4],
  tokenId: <vehicle_token_id>
});

```

##### (Option 2) Credentials.json File
By loading a valid `.credentials.json`, you can easily call `dimo.authenticate()` if you prefer to manage your credentials differently. Instead of calling the `Auth` endpoint, you would directly interact with the SDK main class.

Start by navigating to the SDK directory that was installed, if you used NPM, you can execute `npm list -g | dimo` to find the directory. In the root directory of the SDK, there will be `.credentials.json.example` - simply remove the `.example` extension to proceed with authentication:

```ts
// After .credentials.json are provided
const developerJwt = await dimo.authenticate();
// The rest would be the same as option 1
```

#### Vehicle JWT

To get vehicle data from an end user, your application will need to exchange for a short-lived [Vehicle JWT](https://docs.dimo.org/developer-platform/getting-started/developer-guide/authentication#getting-a-jwt) for vehicles that have granted permissions to your app. 

For the end users of your application, they will need to have already shared their vehicle permissions via the DIMO Mobile App or via your implementation of [Login with DIMO](https://docs.dimo.org/developer-platform/getting-started/developer-guide/login-with-dimo) before you can fetch for their vehicle data.

##### (Option 1 - PREFERRED) getVehicleJwt Function
This is a utility function call to get a Vehicle JWT in one step by inputting your developer JWT obtained earlier with the vehicle's identifier (`tokenId`):

```ts
const vehicleJwt = await dimo.tokenexchange.getVehicleJwt({
  ...developerJwt,
  tokenId: 117315
});
```

##### (Option 2) Manually exchanging for Vehicle JWT

```ts
const vehicle_jwt = await dimo.tokenexchange.exchange({
  ...auth,
  privileges: [1, 5],
  tokenId: <vehicle_token_id>
});
```

Once you have the `vehicleJwt`, you'll have access to the vehicle data for a specific vehicle. For endpoints that require the authorization headers, you can pass the results.

```ts
// Vehicle Status uses privId 1
await dimo.devicedata.getVehicleStatus({
  ...vehicle_jwt,
  tokenId: <vehicle_token_id>
});

// Proof of Movement Verifiable Credentials uses privId 4
await dimo.attestation.createPomVC({
  ...vehicle_jwt,
  tokenId: <vehicle_token_id>
})

// VIN Verifiable Credentials uses privId 5
await dimo.attestation.createVinVC({
  ...vehicle_jwt,
  tokenId: <vehicle_token_id>
});
```

### Querying the DIMO REST API
The SDK supports async await and your typical JS Promises. HTTP operations can be utilized in either ways:

```ts
// Async Await
async function countCars() {
  try {
    let response = await dimo.identity.countDimoVehicles();
    // Do something with the response
  }
  catch (err) { /* ... */ }
}
countCars();
```

```js
// JS Promises
dimo.identity.countDimoVehicles().then((result) => {
    return result;
  }).catch((err) => {
  /* ...handle the error... */
});
```

#### Query Parameters

For query parameters, simply feed in an input that matches with the expected query parameters:
```ts
dimo.devicedefinitions.search({
  query: '<query>',
  makeSlug: '<makeSlug>',
  year: 2021
});
```
#### Path Parameters

For path parameters, simply feed in an input that matches with the expected path parameters:
```ts
dimo.attestation.createVinVC({
  ...vehicle_jwt,
  tokenId: 117315
})
```

#### Vehicle JWT

As the 2nd leg of the API authentication, applications may exchange for short-lived [Vehicle JWT](https://docs.dimo.org/developer-platform/getting-started/developer-guide/authentication#getting-a-jwt) for specific vehicles that granted permissions to the app. This uses the [DIMO Token Exchange API](https://docs.dimo.org/developer-platform/api-references/dimo-protocol/token-exchange-api/token-exchange-api-endpoints). 

For the end users of your application, they will need to share their vehicle permissions via the DIMO Mobile App or via your implementation of [Login with DIMO](https://docs.dimo.org/developer-platform/getting-started/developer-guide/login-with-dimo) or even by sharing on the Vehicle NFT directly. Once vehicles are shared, you will be able to get a Vehicle JWT.

```ts
const vehicle_jwt = await dimo.tokenexchange.exchange({
  ...auth,
  privileges: [1, 5],
  tokenId: <vehicle_token_id>
});

// Vehicle Status uses privId 1
await dimo.devicedata.getVehicleStatus({
  ...vehicle_jwt,
  tokenId: <vehicle_token_id>
});

// VIN Verifiable Credentials uses privId 5
await dimo.attestation.createVinVC({
  ...vehicle_jwt,
  tokenId: <vehicle_token_id>
});

// Odometer Statement Verifiable Credentials uses privId 4
await dimo.attestation.createOdometerStatementVC({
  ...vehicle_jwt,
  tokenId: <vehicle_token_id>,
  timestamp: '2023-01-01T00:00:00Z' // Optional timestamp
});

// Vehicle Health Verifiable Credentials uses privId 4
await dimo.attestation.createVehicleHealthVC({
  ...vehicle_jwt,
  tokenId: <vehicle_token_id>,
  startTime: '2023-01-01T00:00:00Z',
  endTime: '2023-01-15T00:00:00Z'
});

// Vehicle Position Verifiable Credentials uses privId 4
await dimo.attestation.createVehiclePositionVC({
  ...vehicle_jwt,
  tokenId: <vehicle_token_id>,
  timestamp: '2023-01-01T00:00:00Z'
});
```

### Querying the DIMO GraphQL API

The SDK accepts any type of valid custom GraphQL queries, but we've also included a few sample queries to help you understand the DIMO GraphQL APIs. There's also a helper function called `paginate` that you can use to paginate through the GraphQL pages, see `getVehiclePrivileges.ts` on how it's being used.

#### Authentication for GraphQL API
The GraphQL entry points are designed almost identical to the REST API entry points. For any GraphQL API that requires auth headers (Telemetry API for example), you can use the same pattern as you would in the REST protected endpoints.

```ts
const vehicleJwt = await dimo.tokenexchange.exchange({
  ...developerJwt,
  privileges: [1, 3, 4],
  tokenId: <vehicle_token_id>
});

const something = await dimo.telemetry.query({
  ...vehicleJwt,
  query: `
    query {
      some_valid_GraphQL_query
    }
  `
});
```
#### Getting a Vehicle's VIN
In order to get to the VIN of a given vehicle, your application (aka Developer License) will need [permissions to view VIN credentials (Privilege ID: 5)](https://docs.dimo.org/developer-platform/api-references/token-exchange-api#privilege-definitions). As long as you have permissions to view the vehicle's VIN, simply call the `getVin` utility function.

```ts
const getVin = async(vehicle_jwt: any) => {
    return await dimo.telemetry.getVin({
        ...vehicle_jwt,
        tokenId: <vehicle_token_id>
    });
}
```

This utility function streamlines two calls: [Creating a VIN VC on Attestation API](https://docs.dimo.org/developer-platform/api-references/attestation-api#create-a-vehicle-vin-vc) and [Getting the Latest VIN VC on Telemetry API](https://docs.dimo.org/developer-platform/api-references/attestation-api#create-a-vehicle-vin-vc).

#### Send a custom GraphQL query
To send a custom GraphQL query, you can simply call the `query` function on any GraphQL API Endpoints and pass in any valid GraphQL query. To check whether your GraphQL query is valid, please visit our [Identity API GraphQL Playground](https://identity-api.dimo.zone/) or [Telemetry API GraphQL Playground](https://telemetry-api.dimo.zone/).

```ts
const yourQuery = `{ 
    vehicles (first:10) {
      totalCount
    }
}`;

const totalNetworkVehicles = await dimo.identity.query({
  query: yourQuery
});

```

This GraphQL API query is equivalent to calling `dimo.identity.countDimoVehicles()`.

### Agents API

The DIMO Agents API enables developers to create intelligent AI agents that can interact with vehicle data through natural language. These agents can query vehicle information, real-time telemetry, perform web searches to answer questions about vehicles and nearby services, and more.

#### Create an Agent

Create a new conversational AI agent with the specified configuration:

```ts
const agent = await dimo.agents.createAgent({
  ...developerJwt,
  type: "driver_agent_v1", // Optional: defaults to "driver_agent_v1"
  personality: "uncle_mechanic", // Optional: defaults to "uncle_mechanic"
  secrets: {
    DIMO_API_KEY: "<YOUR_API_KEY>"
  },
  variables: {
    USER_WALLET: "0x1234567890abcdef1234567890abcdef12345678",
    VEHICLE_IDS: "[872, 1234]"
  }
});
```

Available personalities: `uncle_mechanic`, `master_technician`, `concierge`, `driving_enthusiast`, `fleet_manager_pro`

#### Send a Message

Send a message to an agent and receive a complete response synchronously:

```ts
const response = await dimo.agents.sendMessage({
  ...developerJwt,
  agentId: "agent-abc123def456",
  message: "What's the make and model of my vehicle?"
});
```

#### Stream a Message

Send a message and receive real-time token-by-token streaming response:

```ts
const stream = await dimo.agents.streamMessage({
  ...developerJwt,
  agentId: "agent-abc123def456",
  message: "What's my current speed?"
});

stream.on('token', (chunk) => {
  console.log(chunk.content);
});

stream.on('done', (metadata) => {
  console.log('Vehicles queried:', metadata.vehiclesQueried);
});
```

#### Get Conversation History

Retrieve the complete conversation history for an agent:

```ts
const history = await dimo.agents.getHistory({
  ...developerJwt,
  agentId: "agent-abc123def456",
  limit: 50 // Optional
});
```

#### Delete an Agent

Permanently delete an agent and all associated resources:

```ts
await dimo.agents.deleteAgent({
  ...developerJwt,
  agentId: "agent-abc123def456"
});
```

For more details, visit the [Agents API Documentation](https://www.dimo.org/docs/api-references/agents-api).

## How to Contribute to the SDK
Read more about contributing [here](https://github.com/DIMO-Network/data-sdk/blob/master/CONTRIBUTING.md).
