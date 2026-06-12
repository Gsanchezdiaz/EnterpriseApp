import { zBase } from "@/lib/customErrorMap";
import z from "zod";

const servingUnitSchema = z.intersection(
  z.object({
    name: zBase.required
      .min(3, "Minimum 3 characters required")
      .max(20, "Maximum 20 characters allowed"),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number().min(1) }),
  ]),
);

type ServingUnitSchema = z.infer<typeof servingUnitSchema>;

const servingUnitDefaultValues: ServingUnitSchema = {
  action: "create",
  name: "",
};

export { servingUnitSchema, servingUnitDefaultValues, type ServingUnitSchema };
