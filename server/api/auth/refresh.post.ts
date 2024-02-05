import * as jwt from 'jsonwebtoken';

export const SECRET = process.env.AUTH_SECRET ?? '';

interface User {
    email: string;
    name: string;
    picture: string;
}

interface JwtPayload extends User {
    scope: Array<'test' | 'user'>;
    exp: number;
}

export default defineEventHandler(async (event) => {
    const body = await readBody<{ refreshToken: string }>(event);

    if (!body.refreshToken) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthorized, no refreshToken in payload'
        });
    }

    const decoded = jwt.verify(body.refreshToken, SECRET) as
        | JwtPayload
        | undefined;

    if (!decoded) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthorized, refreshToken can`t be verified'
        });
    }

    const expiresIn = 60 * 5; // 5 minutes

    const user: User = {
        email: decoded.email,
        picture: decoded.picture,
        name: decoded.name
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
