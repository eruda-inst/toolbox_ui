import z from "zod";

const AuthenticationInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

const AuthenticationOutSchema = z.object({
  expires_in: z.number().int().nonnegative(),
  expires_at: z.string(),
  token_type: z.string(),
  access_token: z.string(),
  refresh_token: z.string(),
});

export { AuthenticationInSchema, AuthenticationOutSchema };
