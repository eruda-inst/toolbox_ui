import z from "zod";

const RoleInSchema = z.object({
  code: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1).nullish(),
  is_active: z.boolean().nullish(),
});

const RoleOutSchema = z.object({
  id: z.number().int().positive(),
  code: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

const RoleUpdateSchema = z.object({
  code: z.string().min(1).nullish(),
  title: z.string().min(1).nullish(),
  description: z.string().min(1).nullish(),
  is_active: z.boolean().nullish(),
});

export { RoleInSchema, RoleOutSchema, RoleUpdateSchema };
