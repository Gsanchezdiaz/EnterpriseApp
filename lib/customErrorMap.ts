import { z } from "zod";
import { patterns } from "./constants";

const zBase = {
  required: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "This field is required" : "Invalid input",
    })
    .trim()
    .min(1, "This field is required"), // Frena en seco si está vacío

  // Acepta undefined o el string vacío de React Hook Form
  optional: z.string().trim().optional().or(z.literal("")),
};

const zPrims = {
  // Email
  email: z.string().email("Please enter a valid email address").toLowerCase(),

  // Password
  password: z
    .string()
    .min(8, "Minimum eight characters")
    .max(255, "Maximum 255 characters allowed")
    .regex(patterns.minimumOneUpperCaseLetter, "Minimum one lower case letter")
    .regex(patterns.minimumOneLowerCaseLetter, "Minimum one lower case letter")
    .regex(patterns.minimumOneDigit, "Minimum one digit")
    .regex(
      patterns.minimumOneSpecialCharacter,
      "Minimum one special character",
    ),

  // Numeros
  number: z
    .string()
    .regex(patterns.zeroTo9999, "Must be between 0 and 9999.99")
    .transform(Number),

  // Checkbox Required: Para los clásicos "Aceptar Términos y Condiciones"
  checkboxRequired: z.literal(true, {
    error: () => "You must accept this condition",
  }),
};

export { zBase, zPrims };
