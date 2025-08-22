import { z } from 'zod';

export const createEventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    notes: z.string().optional().nullable(),
    start: z.string(),
    end: z.string().optional().nullable(),
    recurrenceRule: z.enum(['once', 'daily', 'weekly', 'monthly']).optional().default('once')
});

export const updateEventSchema = createEventSchema.partial();
export type createEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;