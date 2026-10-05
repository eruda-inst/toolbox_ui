import z from "zod";
import {
  AuthenticationInSchema,
  AuthenticationOutSchema,
} from "@/schemas/authentication.schema";

type AuthenticationInType = z.infer<typeof AuthenticationInSchema>;

type AuthenticationOutType = z.infer<typeof AuthenticationOutSchema>;

export type { AuthenticationInType, AuthenticationOutType };
