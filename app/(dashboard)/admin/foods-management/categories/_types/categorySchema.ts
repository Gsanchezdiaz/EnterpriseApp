import { zPrims } from "@/lib/customErrorMap";
import z from "zod";

const categorySchema = z.intersection(
  z.object({
    // name: z.string().min(3).max(20),
    name: zPrims.text
      .min(3, "Minimum 3 characters required")
      .max(20, "Maximum 20 characters allowed"),
  }),
  z.discriminatedUnion("action", [
    z.object({
      action: z.literal("create"),
    }),
    z.object({
      action: z.literal("update"),
      id: z.number().min(1),
    }),
  ]),
);

type CategorySchema = z.infer<typeof categorySchema>;

const categoryDefaultValues: CategorySchema = {
  action: "create",
  name: "",
};

export { categorySchema, type CategorySchema, categoryDefaultValues };
