"use server";

import { executeAction } from "@/lib/executeAction";
import { ServingUnitSchema } from "../_types/servingUnitSchema";
import prisma from "@/lib/prisma";

const createServingUnit = async (data: ServingUnitSchema) => {
  await executeAction({
    actionFn: () =>
      prisma.servingUnit.create({
        data: {
          name: data.name,
        },
      }),
  });
};

const updateServingUnit = async (data: ServingUnitSchema) => {
  if (data.action === "update") {
    await executeAction({
      actionFn: () =>
        prisma.servingUnit.update({
          where: { id: data.id },
          data: {
            name: data.name,
          },
        }),
    });
  }
};

const deleteServingUnit = async (id: number) => {
  await executeAction({
    actionFn: () => prisma.servingUnit.delete({ where: { id } }),
  });
};

const getServingUnits = async () => {
  return await prisma.servingUnit.findMany();
};

const getServingUnit = async (id: number): Promise<ServingUnitSchema> => {
  const response = await prisma.servingUnit.findFirst({
    where: { id },
  });

  return {
    action: "update",
    name: response?.name ?? "",
    id,
  };
};

export {
  createServingUnit,
  getServingUnit,
  getServingUnits,
  deleteServingUnit,
  updateServingUnit,
};
