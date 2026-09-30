import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("E-mail em formato inválido"),
    role: z.enum(["ADMIN", "USER", "MANAGER"]).default("USER"),
  }),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>["body"];

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}
