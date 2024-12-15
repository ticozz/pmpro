import Redis from "ioredis";
import { Organization } from "@/types/organization";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export const organizationCache = {
  async get(organizationId: string): Promise<Organization | null> {
    try {
      const cached = await redis.get(`org:${organizationId}`);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error("Cache get error:", error);
      return null;
    }
  },

  async set(organization: Organization | null): Promise<void> {
    if (!organization) return;
    try {
      await redis.setex(
        `org:${organization.id}`,
        3600,
        JSON.stringify(organization)
      );
    } catch (error) {
      console.error("Cache set error:", error);
    }
  },

  async invalidate(organizationId: string): Promise<void> {
    try {
      await redis.del(`org:${organizationId}`);
    } catch (error) {
      console.error("Cache invalidate error:", error);
    }
  },
};
