import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue) => {
  switch (issue.code) {
    case "invalid_type":
      if (issue.received === "undefined" || issue.received === "null") {
        return { message: "This field is required" };
      }
      if (issue.expected === "string") {
        return { message: "Please enter text" };
      }
      if (issue.expected === "number") {
        return { message: "Please enter a number" };
      }
      return { message: "Invalid value type" };

    case "too_small":
      if (issue.type === "string") {
        return { message: `Minimum ${issue.minimum} characters required` };
      }
      if (issue.type === "number") {
        return {
          message: `Number must be greater than or equal to ${issue.minimum}`,
        };
      }
      return { message: "Value is too small" };

    case "too_big":
      if (issue.type === "string") {
        return { message: `Maximum ${issue.maximum} characters allowed` };
      }
      if (issue.type === "number") {
        return {
          message: `Number must be less than or equal to ${issue.maximum}`,
        };
      }
      return { message: "Value is too large" };
  }
};

const zPrims = {
  // 1. Text: Robusto contra espacios en blanco engañosos
  text: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "This field is required"
          : "Invalid text format",
    })
    .trim()
    .min(1, "This field is required"),

  // 2. Optional Text: Maneja limpiamente el string vacío de un input no requerido
  textOptional: z.string().trim().optional().or(z.literal("")),

  // 3. Email: Valida y además sanitiza convirtiendo todo a minúsculas
  email: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Email is required" : "Invalid format",
    })
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),

  // 4. Web Number: La solución definitiva para <input type="number">
  number: z.preprocess(
    (val) => {
      // Atrapamos el string vacío de React Hook Form ANTES de que Zod lo evalúe
      if (val === "" || val === null || val === undefined) return undefined;
      const parsed = Number(val);
      return isNaN(parsed) ? undefined : parsed;
    },
    z.number({
      error: (issue) =>
        issue.input === undefined
          ? "This field is required"
          : "Please enter a valid number",
    }),
  ),

  // 5. Checkbox Required: Para los clásicos "Aceptar Términos y Condiciones"
  checkboxRequired: z.literal(true, {
    error: () => "You must accept this condition",
  }),
};

export { customErrorMap, zPrims };
