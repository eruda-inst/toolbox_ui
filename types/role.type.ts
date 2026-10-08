import z from "zod";
import {
  RoleInSchema,
  RoleOutSchema,
  RoleUpdateSchema,
} from "@/schemas/role.schema";

type RoleInType = z.infer<typeof RoleInSchema>;

type RoleOutType = z.infer<typeof RoleOutSchema>;

type RoleUpdateType = z.infer<typeof RoleUpdateSchema>;

export type { RoleInType, RoleOutType, RoleUpdateType };
