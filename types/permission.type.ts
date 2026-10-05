import z from "zod";
import { PermissionOutSchema } from "@/schemas/permission.schema";

type PermissionOutType = z.infer<typeof PermissionOutSchema>;

export type { PermissionOutType };
