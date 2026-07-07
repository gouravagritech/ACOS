import { z } from 'zod';

export const AccountCreateSchema = z.object({
  name: z.string().min(2),
  type: z.enum(['prospect', 'customer', 'partner', 'competitor', 'supplier']),
  country: z.string().length(2),
});
