import { zBase, zPrims } from "@/lib/customErrorMap";
import z from "zod";

const foodSchema = z.intersection(
  z.object({
    name: zBase.required
      .min(3, "Minimum 3 characters required")
      .max(20, "Maximum 20 characters allowed"),
    calories: zBase.required.pipe(zPrims.number),
    protein: zBase.required.pipe(zPrims.number),
    fat: zBase.required.pipe(zPrims.number),
    carbohydrates: zBase.required.pipe(zPrims.number),
    fiber: zBase.required.pipe(zPrims.number),
    sugar: zBase.required.pipe(zPrims.number),
    categoryId: zBase.required.pipe(zPrims.number),
    foodServingUnits: z.array(
      z.object({
        foodServingUnitId: zBase.required.pipe(zPrims.number),
        grams: zBase.required.pipe(zPrims.number),
      }),
    ),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update") }),
  ]),
);

type FoodSchema = z.infer<typeof foodSchema>;

const foodDefaultValues: FoodSchema = {
  action: "create",
  name: "",
  calories: 0,
  protein: 0,
  fat: 0,
  carbohydrates: 0,
  fiber: 0,
  sugar: 0,
  categoryId: 0,
  foodServingUnits: [],
};

export { foodSchema, foodDefaultValues, type FoodSchema };
