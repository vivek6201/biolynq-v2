import z from "zod";

export const linkValidation = z.object({  
    title: z.string().min(1, "Title is required").max(255, "Title cannot exceed 255 characters"),
    description: z.string().max(1000, "Description cannot exceed 1000 characters").optional(),
    url: z.string()
        .trim()
        .min(1, "URL is required")
        .transform((val) => {
            if (!/^https?:\/\//i.test(val)) {
                return "https://" + val;
            }
            return val;
        })
        .pipe(z.string().url("Invalid URL")),
    icon_url: z.url("Invalid icon URL").or(z.literal("")).optional(),
    position: z.number().int("Position must be an integer").default(0),
    is_active: z.boolean().default(true),
    is_social: z.boolean().default(false),
    shorten: z.boolean().optional(),
    short_alias: z.string()
        .max(50, "Alias cannot exceed 50 characters")
        .optional()
        .refine(
            (val) => !val || val.length >= 3,
            { message: "Alias must be at least 3 characters" }
        ),
})

export type LinkValidation = z.infer<typeof linkValidation>

export const updateLink = linkValidation.partial();