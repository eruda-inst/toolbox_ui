import z from "zod";
import {
  PermissionInSchema,
  PermissionOutSchema,
  PermissionUpdateSchema,
} from "@/schemas/permission.schema";

type PermissionInType = z.infer<typeof PermissionInSchema>;

type PermissionOutType = z.infer<typeof PermissionOutSchema>;

type PermissionUpdateType = z.infer<typeof PermissionUpdateSchema>;

export type { PermissionInType, PermissionOutType, PermissionUpdateType };
