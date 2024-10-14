import { z } from "zod";

export const schemaGenre = z.object({
  id: z.number(),
  label: z.string(),
  name: z.string(),
  status: z.boolean(),
  value: z.number(),
});

export const schemaClient = z.object({
  ci: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || (val.length >= 5 && val.length <= 10), {
      message: "Debe tener entre 5 y 10 caracteres",
    }),
  firstname: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser texto",
    })
    .min(3, { message: "Debe tener al menos 3 caracteres" })
    .max(20, { message: "20 caracteres permitidos como máximo" })
    .regex(/^[a-zA-Z\s]+$/i, "Solo se permiten letras")
    .trim(),
  lastname: z
    .string({
      required_error: "Al menos debe introducir un apellido",
      invalid_type_error: "El apellido debe ser texto",
    })
    .min(3, { message: "Debe tener al menos 3 caracteres" })
    .max(20, { message: "20 caracteres permitidos como máximo" })
    .regex(/^[a-zA-Z\s]+$/i, "Solo se permiten letras")
    .trim(),
  // birthdate: z.string(),
  Genre: schemaGenre,
  email: z.string().optional(),
  phone: z
    .string()
    .trim()
    .nullable()
    .optional()
    .refine(
      (val) =>
        val === null ||
        val === undefined ||
        val === "" ||
        /^\d{7,8}$/.test(val),
      {
        message: "Debe tener entre 7 y 8 dígitos numéricos",
      }
    )
    .transform((val) => (val ? Number(val) : undefined)),
  height: z.number(),
  weight: z.number(),
  // photo: z.string(),
});

export type SchemaClient = z.infer<typeof schemaClient>;
