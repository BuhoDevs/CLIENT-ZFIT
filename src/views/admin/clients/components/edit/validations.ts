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
    .min(5, { message: "Debe tener entre 5 y 10 caracteres" })
    .max(10, { message: "Debe tener entre 5 y 10 caracteres" })
    .trim(),
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
  birthdate: z.string(),
  Genre: schemaGenre,
  email: z
    .string()
    .email({ message: "Dirección de correo electrónico inválido" }),
  phone: z.number().max(99999999, "Debe tener como maximo 8 numeros"),
  height: z.number(),
  weight: z.number(),
  // photo: z.string(),
});

export type SchemaClient = z.infer<typeof schemaClient>;
