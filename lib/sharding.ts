export function getOrganizationShard(organizationId: string) {
  // Simple modulo-based sharding
  const shardCount = parseInt(process.env.SHARD_COUNT || "1");
  const shardId = BigInt(organizationId) % BigInt(shardCount);

  return {
    host: process.env[`DB_HOST_${shardId}`],
    database: process.env[`DB_NAME_${shardId}`],
  };
}
