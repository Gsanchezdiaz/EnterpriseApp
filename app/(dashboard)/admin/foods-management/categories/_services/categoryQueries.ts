"use server";

import prisma from "@/lib/prisma";

const getCategories = async () => {
  return await prisma.category.findMany();
};

export { getCategories };
