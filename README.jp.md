![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/dimo-network/data-sdk/npm-publish.yml?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/dimo-network/data-sdk?style=flat-square)
![GitHub License](https://img.shields.io/github/license/dimo-network/data-sdk?style=flat-square)
[![Downloads](https://img.shields.io/npm/d18m/@dimo-network/data-sdk.svg?style=flat-square)](https://www.npmjs.com/package/@dimo-network/data-sdk)
[![Discord](https://img.shields.io/discord/892438668453740634)](https://chat.dimo.zone/)
![X (formerly Twitter) URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Ftwitter.com%2FDIMO_Network&style=social)

# DIMO（智猛）Data SDK
## 概要
DIMO Data SDK は、TypeScript で構築された公式ライブラリであり、DIMO API を簡単かつ効率的に利用できるように設計されています。この SDK は、開発者が DIMO プラットフォームと統合する際の複雑さを軽減し、迅速な開発を可能にします。API 呼び出しの抽象化、データ操作の簡素化、そして堅牢な型安全性を提供することで、開発者体験を向上させます。

## インストール

[npm](https://www.npmjs.com/package/@dimo-network/data-sdk) を使用する場合:
```bash
npm install @dimo-network/data-sdk
```

[yarn](https://classic.yarnpkg.com/en/package/@dimo-network/data-sdk) を使用する場合:

```bash
yarn add @dimo-network/data-sdk
```

## 単体テスト
`npm test` または `npm run test` を実行して、Jest テストを実行します。

## API ドキュメント
DIMO での開発や API に関する詳細情報については、DIMO の [開発者向けドキュメント](https://docs.dimo.org/developer-platform) をご覧ください。

## SDK の使用方法
### SDK ライブラリ

(TypeScript / ES Modules)
```ts
import { DIMO } from '@dimo-network/data-sdk';
```

(CommonJS)
```js
const { DIMO } = require('@dimo-network/data-sdk')
```
### SDK 初期化

```ts
const dimo = new DIMO('Production');
```

### 開発者登録
認証プロセスの一環として、[DIMO 開発者コンソール](https://console.dimo.org/) を通じて開発者ライセンスを取得する必要があります。登録を開始するには、以下の手順に従ってください:
1. [DIMO 開発者コンソール](https://console.dimo.org/) にサインアップします。
2. 「ライセンスを作成」(Create a License) をクリックし、ライセンスに関する詳細を入力します。
3. API キー（API Key）を生成し、希望するリダイレクト URI（RedirectURI）を追加します。

### 開発者認証
本 SDK は、「開発者用 JWT を取得するための[認証フロー](https://docs.dimo.org/developer-platform/getting-started/developer-guide/authentication) に必要なすべての手順」と、「アプリと共有された各車両に対して Vehicle JWT を取得するための手順」を提供します。

#### 認証の前提条件
1. 開発者ライセンス
2. API キー、リダイレクト URI（RedirectURI）
3. 適切な [TypeScript を使用したプロジェクトのセットアップ](https://nodejs.keicode.com/typescript/create-ts-project.php)。

#### 開発者 JWT

```ts
const developerJwt = await dimo.auth.getDeveloperJwt({
  client_id: '<client_id>',
  domain: '<domain/redirect_uri>',
  private_key: '<api_key>',
});
```

#### 車両 JWT
消費者から車両データを取得するには、アプリケーションが短期間有効な [車両 JWT](https://docs.dimo.org/developer-platform/getting-started/developer-guide/authentication#getting-a-jwt) を交換する必要があります。この 車両 JWT は、アプリに権限を付与した車両に対して取得されます。

消費者は事前に車両の権限を共有する必要があります。そのためには、[Login with DIMO](https://docs.dimo.org/developer-platform/getting-started/developer-guide/login-with-dimo) や DIMO Mobile のような実装が必要です。この手順が完了すると、車両データを取得できるようになります。

```ts
const vehicleJwt = await dimo.tokenexchange.getVehicleJwt({
  ...developerJwt,
  tokenId: 117315
});
```

## SDK への貢献方法
SDK への貢献についての詳細は、[こちら](https://github.com/DIMO-Network/data-sdk/blob/master/CONTRIBUTING.md)をご覧ください。
