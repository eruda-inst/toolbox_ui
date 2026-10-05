import z from "zod";

const MetaOutSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  item_count: z.number().int().nonnegative(),
  page_count: z.number().int().nonnegative(),
});

const ListOutSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: MetaOutSchema,
  });

export { ListOutSchema, MetaOutSchema };
