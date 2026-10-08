import z from "zod";
import {
  UserInSchema,
  UserOutSchema,
  UserUpdateSchema,
} from "@/schemas/user.schema";

type UserInType = z.infer<typeof UserInSchema>;

type UserOutType = z.infer<typeof UserOutSchema>;

type UserUpdateType = z.infer<typeof UserUpdateSchema>;

export type { UserInType, UserOutType, UserUpdateType };
