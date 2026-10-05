import z from "zod";

const UserOutSchema = z.object({
  id: z.number().int().positive(),
  full_name: z.string(),
  email: z.email(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export { UserOutSchema };
