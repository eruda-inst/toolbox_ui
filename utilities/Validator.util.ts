import z from "zod";

export default class Validator {
  static email(value: string): boolean {
    const EmailSchema = z.email();
    return EmailSchema.safeParse(value).success;
  }
}
