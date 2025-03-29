import { z } from "zod";

export const leaseSchema = z
  .object({
    unitId: z.string().min(1, "Unit is required"),
    tenantIds: z.array(z.string()).min(1, "At least one tenant is required"),
    startDate: z.string().transform((str) => new Date(str)),
    endDate: z.string().transform((str) => new Date(str)),
    rentAmount: z
      .number()
      .min(0.01, "Rent amount is required and must be greater than 0"),
    depositAmount: z.number().min(0, "Deposit amount must be 0 or greater"),
    type: z.enum(["FIXED", "MONTH_TO_MONTH", "FLEXIBLE"]),
    terms: z.string().optional(),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      return startDate < endDate;
    },
    {
      message: "Start date must be before end date",
      path: ["startDate"],
    }
  );
