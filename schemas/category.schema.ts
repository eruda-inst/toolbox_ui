import z from "zod";

const CategoryInSchema = z.object({
  name: z.string().min(1),
  is_active: z.boolean().nullish(),
});

const CategoryOutSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

const CategoryUpdateSchema = z.object({
  name: z.string().min(1).nullish(),
  is_active: z.boolean().nullish(),
});

export { CategoryInSchema, CategoryOutSchema, CategoryUpdateSchema };
