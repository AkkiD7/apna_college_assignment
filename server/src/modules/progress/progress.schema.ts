import { z } from "zod";

export const updateProgressSchema = z.object({
  problemId: z.string().min(3),
  completed: z.boolean()
});

