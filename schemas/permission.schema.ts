import z from "zod";

const PermissionOutSchema = z.object({
  id: z.number(),
  code: z.string(),
  description: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export { PermissionOutSchema };
