import { isHex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

export const signChallenge = async(input: { message: string, private_key: string }) => {
    const key = input.private_key.trim().replace(/^0x/i, '');
    const account = privateKeyToAccount(`0x${key}`);
    // web3 signed hex strings as raw bytes, not UTF-8 text. Keep that so signatures don't change.
    const message = isHex(input.message) ? { raw: input.message } : input.message;
    return account.signMessage({ message });
}
