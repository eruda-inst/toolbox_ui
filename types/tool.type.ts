import z from "zod";
import {
  ToolInSchema,
  ToolOutSchema,
  ToolUpdateSchema,
} from "@/schemas/tool.schema";

type ToolInType = z.infer<typeof ToolInSchema>;

type ToolOutType = z.infer<typeof ToolOutSchema>;

type ToolUpdateType = z.infer<typeof ToolUpdateSchema>;

export type { ToolInType, ToolOutType, ToolUpdateType };
