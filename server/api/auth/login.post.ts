import z from 'zod';
import * as jwt from 'jsonwebtoken';

export const SECRET = process.env.AUTH_SECRET ?? '';

export default defineEventHandler(async (event) => {
    const result = z
        .object({ email: z.string().min(1), password: z.literal('hunter2') })
        .safeParse(await readBody(event));
    if (!result.success) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthorized, hint: try `hunter2` as password'
        });
    }

    const expiresIn = 15;

    const { email } = result.data;

    const user = {
        email,
        picture: 'https://github.com/nuxt.png',
        name: 'User ' + email.split('@')[0]
    };

    const accessToken = jwt.sign({ ...user, scope: ['test', 'user'] }, SECRET, {
        expiresIn
    });
    const refreshToken = jwt.sign(
        { ...user, scope: ['test', 'user'] },
        SECRET,
        {
            expiresIn: 60 * 60 * 24
        }
    );

    return {
        token: {
            accessToken,
            refreshToken
        }
    };
});
