export const decodePermissions = (permissionHex: string): number[] => {
    const cleanHex = permissionHex.toLowerCase().replace("0x", "");
    const permissionBits = BigInt("0x" + cleanHex);
    
    const grantedPermissions: number[] = [];
    
    for (let i = 0; i < 128; i++) {
      const bitPair = (permissionBits >> BigInt(i * 2)) & BigInt(0b11);
      if (bitPair === BigInt(0b11)) {
        grantedPermissions.push(i);
      }
    }
    
    return grantedPermissions;
}