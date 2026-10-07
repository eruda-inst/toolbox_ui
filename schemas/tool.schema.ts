import z from "zod";

const ToolInSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).nullish(),
  is_active: z.boolean().nullish(),
  url: z.string().min(1).nullish(),
  category_id: z.number().int().positive().nullish(),
});

const ToolOutSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  description: z.string().nullable(),
  is_active: z.boolean(),
  url: z.string().nullable(),
  category_id: z.number().int().positive().nullable(),
  category_name: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

const ToolUpdateSchema = z.object({
  name: z.string().min(1).nullish(),
  description: z.string().min(1).nullish(),
  is_active: z.boolean().nullish(),
  url: z.string().min(1).nullish(),
  category_id: z.number().int().positive().nullish(),
});

export { ToolInSchema, ToolOutSchema, ToolUpdateSchema };
