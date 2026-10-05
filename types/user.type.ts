import z from "zod";
import { UserOutSchema } from "@/schemas/user.schema";

type UserOutType = z.infer<typeof UserOutSchema>;

export type { UserOutType };
