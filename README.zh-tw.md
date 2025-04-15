![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/dimo-network/data-sdk/npm-publish.yml?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/dimo-network/data-sdk?style=flat-square)
![GitHub License](https://img.shields.io/github/license/dimo-network/data-sdk?style=flat-square)
[![Downloads](https://img.shields.io/npm/d18m/@dimo-network/data-sdk.svg?style=flat-square)](https://www.npmjs.com/package/@dimo-network/data-sdk)
[![Discord](https://img.shields.io/discord/892438668453740634)](https://chat.dimo.zone/)
![X (formerly Twitter) URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Ftwitter.com%2FDIMO_Network&style=social)

# DIMO（智猛）Data SDK
## 概述
DIMO Data SDK 是一個以 TypeScript 構建的官方函式庫，旨在讓開發者能夠簡單且高效地使用 DIMO API。此 SDK 減少了開發者在整合 DIMO 平台時的複雜性，並加速開發過程。透過 API 調用的抽象化、簡化數據操作以及提供強大的型別安全性，提升了開發者的使用體驗。

## 安裝

使用 [npm](https://www.npmjs.com/package/@dimo-network/data-sdk):
```bash
npm install @dimo-network/data-sdk
```

使用 [yarn](https://classic.yarnpkg.com/en/package/@dimo-network/data-sdk):

```bash
yarn add @dimo-network/data-sdk
```

## 單元測試
執行 `npm test` 或 `npm run test` 來運行 Jest 測試。

## API 文件
有關 DIMO 開發或 API 的詳細資訊，請參閱 DIMO 的 [開發者文件](https://docs.dimo.org/developer-platform)。

## SDK 使用方法
### 訪問函式庫

(TypeScript / ES Modules)
```ts
import { DIMO } from '@dimo-network/data-sdk';
```

(CommonJS)
```js
const { DIMO } = require('@dimo-network/data-sdk')
```
### SDK 初始化

```ts
const dimo = new DIMO('Production');
```

### 開發者註冊
作為認證流程的一部分，您需要先通過 [DIMO Developer Console](https://console.dimo.org/) 獲取開發者授權身份。請按照以下步驟開始註冊：
1. 造訪 [DIMO 開發者主控台](https://console.dimo.org/) 並註冊帳號。
2. 點擊「創建執照」（Create a License），並輸入您的相關執照詳細資訊。
3. 生成 API 金鑰（API Key），並新增所需的統一資源識別碼（Redirect URI）。

### 開發者認證
SDK 提供了[認證流程](https://docs.dimo.org/developer-platform/getting-started/developer-guide/authentication) 所需的所有步驟，幫助您獲取「開發者 JWT」（Developer JWT）以及每輛與應用程式共享的車輛所使用的「車輛 JWT」（Vehicle JWT）。

#### 認證的前置條件
1. 開發者執照
2. API 金鑰以及至少一組自訂的統一資源識別碼（Redirect URI）
3. 適當的 [TypeScript 環境設置](https://learn.microsoft.com/zh-tw/visualstudio/javascript/compile-typescript-code-npm?view=vs-2022)。

#### 開發者 JWT

```ts
const developerJwt = await dimo.auth.getDeveloperJwt({
    client_id: '<client_id>',
    domain: '<domain/redirect_uri>',
    private_key: '<api_key>',
});
```

#### 車輛 JWT
若要從消費者處獲取車輛數據，應用程式需要交換短期有效的 [車輛 JWT](https://docs.dimo.org/developer-platform/getting-started/developer-guide/authentication#getting-a-jwt)。此車輛 JWT 是針對授權應用程式的車輛生成的。

消費者需要事先與您的應用程式共享車輛授權。為此，您可以透過前端整合 [Login with DIMO](https://docs.dimo.org/developer-platform/getting-started/developer-guide/login-with-dimo) 或開發出類似 DIMO Mobile 全端的功能。完成「分享」此步驟後，您將能夠自由獲取車輛數據。

```ts
const vehicleJwt = await dimo.tokenexchange.getVehicleJwt({
    ...developerJwt,
    tokenId: 117315
});
```

## 貢獻 SDK 的方法
有關如何貢獻於此 SDK 的詳細資訊，請參閱[此處](https://github.com/DIMO-Network/data-sdk/blob/master/CONTRIBUTING.md)。