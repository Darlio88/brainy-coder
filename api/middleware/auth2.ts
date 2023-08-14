import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user';

function authorization(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers, req.header);
    const Authorization = req.headers.authorization;
    console.log(Authorization);
    if (!Authorization) return res.status(407).send('Un Authorized');
    const token = Authorization.split(' ')[1];
    console.log(token);
    const verifiedToken = jwt.verify(token, 'fuck-hunger');

    if (!verifiedToken) return res.status(407).send('Un Authorized');

    const user = verifiedToken as IUser;

    req.body.email = user.email;
    next();
}

export default authorization;
