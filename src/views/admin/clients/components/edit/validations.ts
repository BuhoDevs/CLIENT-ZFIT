import { z } from "zod";

export const SchemaClient = z.object({
  ci: z
    .string()
    .min(5, { message: "Debe tener entre 5 y 10 caracteres" })
    .max(10, { message: "Debe tener entre 5 y 10 caracteres" }),
  firstname: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser texto",
    })
    .min(3, { message: "Debe tener al menos 3 caracteres" })
    .max(20, { message: "20 caracteres permitidos como máximo" })
    .regex(/^[A-Za-z]+$/i, "Solo se permiten letras"),
  lastname: z
    .string({
      required_error: "El apellido es requerido",
      invalid_type_error: "El apellido debe ser texto",
    })
    .min(3, { message: "Debe tener al menos 3 caracteres" })
    .max(20, { message: "20 caracteres permitidos como máximo" })
    .regex(/^[A-Za-z]+$/i, "Solo se permiten letras"),
  birthdate: z.date(),
  //   genre: z.string(),
  //   email: z
  //     .string()
  //     .email({ message: "Dirección de correo electrónico inválido" }),
  //   phone: z.string(),
  //   height: z.number(),
  //   weight: z.number(),
  //   photo: z.string(),
});
