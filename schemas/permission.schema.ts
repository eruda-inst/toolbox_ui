import z from "zod";

const PermissionInSchema = z.object({
  code: z.string().min(1),
  description: z.string().min(1).nullish(),
  is_active: z.boolean().nullish(),
});

const PermissionOutSchema = z.object({
  id: z.number().int().positive(),
  code: z.string(),
  description: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

const PermissionUpdateSchema = z.object({
  code: z.string().min(1).nullish(),
  description: z.string().min(1).nullish(),
  is_active: z.boolean().nullish(),
});

export { PermissionInSchema, PermissionOutSchema, PermissionUpdateSchema };
