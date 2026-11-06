import { z } from "zod";

export const PlayZod = z.object({
    type: z.string(),
    first: z.string().trim().min(2).max(120),
    last: z.string().trim().min(2).max(120),
    // Multipart form data sends numbers as strings, so coerce before validating.
    age: z.coerce.number(),
    info: z.string().optional(),
    // The file is uploaded via multer/Cloudinary, so this is only used
    // when a client supplies an already-hosted image URL directly.
    image: z.string().optional()
});

export type PlayType = z.infer<typeof PlayZod>;


