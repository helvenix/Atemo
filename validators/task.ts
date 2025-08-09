import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string().min(1).max(200),
    notes: z.string().optional().nullable(),
    start: z.string(),
    deadline: z.string()
});

export const updateTaskSchema = createTaskSchema.partial();
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;