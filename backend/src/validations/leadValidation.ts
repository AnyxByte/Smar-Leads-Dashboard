import { z } from "zod";

export const createLeadSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters"),

    email: z.string().min(1, "Email is required").email("Invalid email format"),

    status: z.enum(["New", "Contacted", "Qualified", "Lost"]).optional(),

    source: z.enum(["Website", "Instagram", "Referral"], {
      message: "Source is required",
    }),
  }),
});
export const updateLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    status: z.enum(["New", "Contacted", "Qualified", "Lost"]).optional(),
    source: z.enum(["Website", "Instagram", "Referral"]).optional(),
  }),
});
