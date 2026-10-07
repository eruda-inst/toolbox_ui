import z from "zod";

const UserInSchema = z.object({
  full_name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  is_active: z.boolean().nullish(),
});

const UserOutSchema = z.object({
  id: z.number().int().positive(),
  full_name: z.string(),
  email: z.email(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

const UserUpdateSchema = z.object({
  full_name: z.string().min(1).nullish(),
  email: z.email().nullish(),
  password: z.string().min(8).nullish(),
  is_active: z.boolean().nullish(),
});

export { UserInSchema, UserOutSchema, UserUpdateSchema };
