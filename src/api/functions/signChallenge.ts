import { privateKeyToAccount } from 'viem/accounts';

export const signChallenge = async(input: { message: string, private_key: string }) => {
    const account = privateKeyToAccount(`0x${input.private_key}`);
    return account.signMessage({ message: input.message });
}
