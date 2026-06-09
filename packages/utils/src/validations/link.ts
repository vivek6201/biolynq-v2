import z from "zod";

export const linkValidation = z.object({  
    title: z.string().min(1, "Title is required").max(255, "Title cannot exceed 255 characters"),
    description: z.string().max(1000, "Description cannot exceed 1000 characters").optional(),
    url: z.url("Invalid URL"),
    icon_url: z.url("Invalid icon URL").optional(),
    position: z.number().int("Position must be an integer").default(0),
    is_active: z.boolean().default(true),
    is_social: z.boolean().default(false),
})

export type LinkValidation = z.infer<typeof linkValidation>

export const updateLink = linkValidation.partial();