import { prisma } from "@/lib/prisma";
import { Lease } from "@prisma/client";

interface LeaseValidationResponse {
  isValid: boolean;
  message?: string;
  conflictingLeases?: Lease[];
}

export class LeaseValidationService {
  static async validateLeaseDates(
    unitId: string,
    startDate: Date,
    endDate: Date,
    excludeLeaseId?: string
  ): Promise<LeaseValidationResponse> {
    // Check for overlapping leases
    const existingLeases = await prisma.lease.findMany({
      where: {
        unitId,
        id: { not: excludeLeaseId },
        OR: [
          {
            AND: [
              { startDate: { lte: endDate } },
              { endDate: { gte: startDate } },
            ],
          },
        ],
        status: { notIn: ["EXPIRED", "TERMINATED"] },
      },
    });

    if (existingLeases.length > 0) {
      return {
        isValid: false,
        message: "Date range conflicts with existing leases",
        conflictingLeases: existingLeases,
      };
    }

    return { isValid: true };
  }
}
