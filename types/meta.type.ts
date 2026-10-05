import z from "zod";
import { ListOutSchema, MetaOutSchema } from "@/schemas/meta.schema";

type ListOutType<T extends z.ZodType> = z.infer<
  ReturnType<typeof ListOutSchema<T>>
>;

type MetaOutType = z.infer<typeof MetaOutSchema>;

export type { ListOutType, MetaOutType };
