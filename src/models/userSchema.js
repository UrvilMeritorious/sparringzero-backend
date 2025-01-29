const { z } = require("zod");

export const UserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().regex(/^\+\d{10,15}$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address"),
  verifyEmail: z.boolean().default(false),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters long"),
  dob: z.date().min(18, "You must be at least 18 years old"),
  weight: z.number().optional().default(40),
  sportId: z.number(),
  beltLevelId: z.number(),
  profilePhoto: z.string().url("Invalid profile photo URL").optional(),
  googleAuthToken: z.string().optional(),
  appleAuthToken: z.string().optional(),
});

export const userSchemaWithPasswordCheck = UserSchema.refine(
  (user) => user.password === user.confirmPassword,
  { message: "Password does not match", path: [confirmPassword] }
);
