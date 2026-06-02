"use server";

import { executeAction } from "@/lib/executeAction";
import prisma from "@/lib/prisma";

const deleteCategory = async (id: number) => {
  await executeAction({
    actionFn: () =>
      prisma.category.delete({
        where: { id },
      }),
  });
};

export { deleteCategory };