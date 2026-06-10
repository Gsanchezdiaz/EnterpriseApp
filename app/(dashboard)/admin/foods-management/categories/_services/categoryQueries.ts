"use server";

import prisma from "@/lib/prisma";
import { CategorySchema } from "../_types/categorySchema";

const getCategories = async () => {
  return await prisma.category.findMany();
};

const getCategory = async (id: number): Promise<CategorySchema> => {
  const response = await prisma.category.findFirst({
    where: { id },
  });
  return {
    action: "update",
    name: response?.name || "",
    id,
  };
};

export { getCategories, getCategory };
