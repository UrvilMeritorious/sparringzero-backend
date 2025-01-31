const { z } = require("zod");

export const UserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().regex(/^\+\d{10,15}$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address"),
  verifyEmail: z.boolean().default(true),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters long"),
  dob: z
    .date()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Invalid date format. Please use DD/MM/YYYY."
    )
    .refine(
      (val) => {
        const [day, month, year] = val.split("/").map(Number);
        const date = new Date(year, month - 1, day);
        date.getDate() === day &&
          date.getMonth() === month - 1 &&
          date.getFullYear() === year;
        const eighteenYearsAgo = new Date(
          today.setFullYear(today.getFullYear() - 18)
        );
        return dob <= eighteenYearsAgo;
      },
      {
        message: "You must be at least 18 years old",
      }
    ),
  weight: z.number().optional().default(40),
  sportId: z.number(),
  beltLevelId: z.number(),
  profilePhoto: z
    .string()
    .url({ message: "Invalid profile photo URL" })
    .regex(/\.(jpeg|jpg|png|gif|webp)$/i, {
      message: "URL must be an image (jpg, png, gif, webp)",
    })
    .optional(),
  googleAuthToken: z.string().optional(),
  appleAuthToken: z.string().optional(),
  latitude: z.number().min(-90).max(90).multipleOf(0.000001),
  longitude: z.number().min(-180).max(180).multipleOf(0.000001),
});

export const userSchemaWithPasswordCheck = UserSchema.refine(
  (user) => user.password === user.confirmPassword,
  { message: "Password does not match", path: [confirmPassword] }
);
