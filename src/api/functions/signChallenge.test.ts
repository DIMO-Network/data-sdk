import { signChallenge } from './signChallenge';

const KEY = '4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318';

// Expected signatures captured from web3@4.16 eth.accounts.sign, which this replaced.
const WEB3_VECTORS: [string, string][] = [
    [
        'auth.dimo.zone wants you to sign in with your Ethereum account:\n0x2c7536E3605D9C16a7a3D7b1898e529396a65c23',
        '0x3b9c8f99be1e7891bf37b784c29d5ffa71f3c8c5bcfc7fc79aff3cccee03ad2e7fdb65e2ca438adabe04c6a58abfa364e36b1ca8884c7db5bd7ae79c132aeb511c',
    ],
    [
        '0xdeadbeef',
        '0x27c9251b613f25a4d52f5375c0be39ea8b8f5bb46a29034620f613d71520ac24034d84dcd3e6251af82cff1bda9c38141a238abaa1830bd8ca064474b60c641f1c',
    ],
    [
        '0x',
        '0x8a68b4e66cd2b575338e16069d7b65f6f67c7ceae8945dccf8cb7bdb06278d933dd9c888f3444ca4698464079a067ad3cfffe96d493b8ecf56885169d0fdfe7d1b',
    ],
];

describe('signChallenge', () => {
    test.each(WEB3_VECTORS)('matches web3 signature for %j', async (message, expected) => {
        await expect(signChallenge({ message, private_key: KEY })).resolves.toBe(expected);
    });

    test.each([`0x${KEY}`, ` ${KEY}\n`])('accepts key formatted as %j', async (private_key) => {
        const [message, expected] = WEB3_VECTORS[0];
        await expect(signChallenge({ message, private_key })).resolves.toBe(expected);
    });
});
