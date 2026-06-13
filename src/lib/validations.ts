import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  role: z.enum(["STUDENT", "FACULTY", "ADMIN"], {
    required_error: "Please select a role",
  }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

// ─── Doubt Validations ───────────────────────────────────

export const createDoubtSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be less than 200 characters")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must be less than 5000 characters")
    .trim(),
  subjectId: z.string().min(1, "Please select a subject"),
  chapterId: z.string().min(1, "Please select a chapter"),
  attachment: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export type CreateDoubtInput = z.infer<typeof createDoubtSchema>;

// ─── Answer Validations ──────────────────────────────────

export const createAnswerSchema = z.object({
  content: z
    .string()
    .min(10, "Answer must be at least 10 characters")
    .max(5000, "Answer must be less than 5000 characters")
    .trim(),
});

export type CreateAnswerInput = z.infer<typeof createAnswerSchema>;
