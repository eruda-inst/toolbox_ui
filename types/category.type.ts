import z from "zod";

import {
  CategoryInSchema,
  CategoryOutSchema,
  CategoryUpdateSchema,
} from "@/schemas/category.schema";

type CategoryInType = z.infer<typeof CategoryInSchema>;

type CategoryOutType = z.infer<typeof CategoryOutSchema>;

type CategoryUpdateType = z.infer<typeof CategoryUpdateSchema>;

export type { CategoryInType, CategoryOutType, CategoryUpdateType };
