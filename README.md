![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/dimo-network/data-sdk/npm-publish.yml?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/dimo-network/data-sdk?style=flat-square)
![GitHub License](https://img.shields.io/github/license/dimo-network/data-sdk?style=flat-square)
[![Downloads](https://img.shields.io/npm/d18m/@dimo-network/data-sdk.svg?style=flat-square)](https://www.npmjs.com/package/@dimo-network/data-sdk)
[![Discord](https://img.shields.io/discord/892438668453740634)](https://chat.dimo.zone/)
![X (formerly Twitter) URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Ftwitter.com%2FDIMO_Network&style=social)

# DIMO Data SDK
This is an official DIMO Data SDK written in NodeJS/TypeScript. The objective of this project is to make our API more accessible to the general public.

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
```ts
import { DIMO } from '@dimo-network/data-sdk';
```

Initiate the SDK depending on the environment of your interest, we currently support both `Production` and `Dev` environments:

```ts
const dimo = new DIMO('Production');
```
or

```ts
const dimo = new DIMO('Dev');
```
### Developer Registration
As part of the authentication process, you will need to obtain a Developer License via the [DIMO Developer Console](https://console.dimo.org/). To get started with registration, follow the steps below:
1. Sign up on the [DIMO Developer Console](https://console.dimo.org/).
2. Get DIMO Credits either by paying in your local currency (via Stripe) or paying with a balance (if you have one).
3. Click on `Create app` and fill out the details about your project namespace (external-facing, e.g. `Drive2Survive LLC.`) and your application name (internal, e.g. `app-prod`)
4. Generate an API key and add in your preferred redirect URI

### Authentication

The SDK provides you with all the steps needed in the [Authentication Flow](https://docs.dimo.org/developer-platform/getting-started/developer-guide/authentication) to obtain an `access_token`.

#### Prerequisites for Authentication
1. A valid Developer License
2. A valid API key

#### API Authentication

##### (Option 1 - PREFERRED) getToken Function
As mentioned earlier, this is the streamlined function call to directly get the `access_token`. The `address` field in challenge generation is omitted since it is essentially the `client_id` of your application per Developer License:

```ts
const authHeader = await dimo.auth.getToken({
  client_id: '<client_id>',
  domain: '<domain>',
  private_key: '<private_key>',
});
```

Once you have the `authHeader`, you'll have access to the DIMO API endpoints. For endpoints that require the authorization headers, you can simply pass the results.

```ts
// Pass the auth object to a protected endpoint
await dimo.user.get(auth);

// Pass the auth object to a protected endpoint with body parameters
await dimo.tokenexchange.exchange({
  ...auth,
  privileges: [4],
  tokenId: <vehicle_token_id>
});

```

##### (Option 2) Credentials.json File
By loading a valid `.credentials.json`, you can easily call `dimo.authenticate()` if you prefer to manage your credentials differently. Instead of calling the `Auth` endpoint, you would directly interact with the SDK main class.

Start by navigating to the SDK directory that was installed, if you used NPM, you can execute `npm list -g | dimo` to find the directory. In the root directory of the SDK, there will be `.credentials.json.example` - simply remove the `.example` extension to proceed with authentication:

```ts
// After .credentials.json are provided
const authHeader = await dimo.authenticate();
// The rest would be the same as option 1
```

### Querying the DIMO REST API
The SDK supports async await and your typical JS Promises. HTTP operations can be utilized in either ways:

```ts
// Async Await
async function getAllDeviceMakes() {
  try {
    let response = await dimo.devicedefinitions.listDeviceMakes();
    // Do something with the response
  }
  catch (err) { /* ... */ }
}
getAllDeviceMakes();
```

```js
// JS Promises
dimo.devicedefinitions.listDeviceMakes().then((result) => {
    return result.device_makes.length;
  }).catch((err) => {
  /* ...handle the error... */
});
```

#### Query Parameters

For query parameters, simply feed in an input that matches with the expected query parameters:
```ts
dimo.devicedefinitions.getByMMY({
  make: '<vehicle_make>',
  model: '<vehicle_model',
  year: 2021
});
```
#### Path Parameters

For path parameters, simply feed in an input that matches with the expected path parameters:
```ts
dimo.devicedefinitions.getById({ id: '26G4j1YDKZhFeCsn12MAlyU3Y2H' })
```

#### Permission Tokens

As the 2nd leg of the API authentication, applications may exchange for short-lived [permissions JWT](https://docs.dimo.org/developer-platform/getting-started/developer-guide/authentication#getting-a-jwt) for specific vehicles that granted permissions to the app. This uses the [DIMO Token Exchange API](https://docs.dimo.org/developer-platform/api-references/dimo-protocol/token-exchange-api/token-exchange-api-endpoints). 

For the end users of your application, they will need to share their vehicle permissions via the DIMO Mobile App or via your implementation of [Login with DIMO](https://docs.dimo.org/developer-platform/getting-started/developer-guide/login-with-dimo). Once vehicles are shared, you will be able to get a permissions JWT.

```ts
const privToken = await dimo.tokenexchange.exchange({
  ...auth,
  privileges: [1, 5],
  tokenId: <vehicle_token_id>
});

// Vehicle Status uses privId 1
await dimo.devicedata.getVehicleStatus({
  ...privToken,
  tokenId: <vehicle_token_id>
});

// Proof of Movement Verifiable Credentials uses privId 4
await dimo.attestation.createPomVC({
  ...privToken,
  tokenId: <vehicle_token_id>
})

// VIN Verifiable Credentials uses privId 5
await dimo.attestation.createVinVC({
  ...privToken,
  tokenId: <vehicle_token_id>
});
```

### Querying the DIMO GraphQL API

The SDK accepts any type of valid custom GraphQL queries, but we've also included a few sample queries to help you understand the DIMO GraphQL APIs. 

#### Authentication for GraphQL API
The GraphQL entry points are designed almost identical to the REST API entry points. For any GraphQL API that requires auth headers (Telemetry API for example), you can use the same pattern as you would in the REST protected endpoints.

```ts
const privToken = await dimo.tokenexchange.exchange({
  ...auth,
  privileges: [1, 3, 4],
  tokenId: <vehicle_token_id>
});

const tele = await dimo.telemetry.query({
  ...privToken,
  query: `
    query {
      some_valid_GraphQL_query
    }
  `
});
```

#### Send a custom GraphQL query
To send a custom GraphQL query, you can simply call the `query` function on any GraphQL API Endpoints and pass in any valid GraphQL query. To check whether your GraphQL query is valid, please visit our [Identity API GraphQL Playground](https://identity-api.dimo.zone/) or [Telemetry API GraphQL Playground](https://telemetry-api.dimo.zone/).

```js
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

## How to Contribute to the SDK
Read more about contributing [here](https://github.com/DIMO-Network/data-sdk/blob/master/CONTRIBUTING.md).
