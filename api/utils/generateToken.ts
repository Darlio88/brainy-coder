import jwt from 'jsonwebtoken';

export default function generateJWT(name: string, email: string) {
    const payload = { name, email };

    const token = jwt.sign(payload, 'fuck-hunger', {
        expiresIn: '10h',
    });

    return token;
}
