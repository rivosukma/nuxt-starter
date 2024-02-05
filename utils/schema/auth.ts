import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const _loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(32)
});

export const loginSchema = toTypedSchema(_loginSchema);
export type LoginSchemaType = z.infer<typeof _loginSchema>;

const _registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(5).max(32)
});

export const registerSchema = toTypedSchema(_registerSchema);
export type RegisterSchemaType = z.infer<typeof _registerSchema>;
