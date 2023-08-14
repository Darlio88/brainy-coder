import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
//utils
import generateToken from '../utils/generateToken';

//database pool
import dbPool from '../config/userDbConfig';
import { IUser } from '../interfaces/user';
const pool = dbPool();

export const getAllUsers = async (req: Request, res: Response) => {
    const allUser = await pool.query('SELECT * FROM users');
    console.log(allUser.rows);
};

export const signInController = async (req: Request, res: Response) => {
    try {
        const body: IUser = req.body;
        const { email, password } = body;
        const checkUser = await pool.query(
            `SELECT * FROM users WHERE email=$1`,
            [email]
        );
        const user: IUser = checkUser.rows[0];
        console.log(user);
        if (!user) return res.status(404).send("user doesn't exists");
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        console.log(isPasswordCorrect, password, user.password);
        if (!isPasswordCorrect)
            return res.status(401).send('Incorrect Password');
        const token = generateToken(user.name as string, user.email);
        res.status(200).send({ token });
    } catch (error) {
        console.log(error);
        res.status(501).send({ error });
    }
};

export const signUpController = async (req: Request, res: Response) => {
    try {
        const body: IUser = req.body;
        console.log(body);
        const { name, email, password } = body;
        const checkUser = await pool.query(
            `SELECT * FROM users WHERE email=$1`,
            [email]
        );
        console.log(checkUser.rows[0]);
        if (checkUser.rows[0])
            return res.status(409).send('user already exists');
        const hashPassword = bcrypt.hashSync(password, 12);
        console.log(hashPassword);
        const createdUserQuery = await pool.query(
            `INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING name, email`,
            [name, email, hashPassword]
        );
        console.log(createdUserQuery);
        const createdUser = createdUserQuery.rows[0];
        const token = generateToken(
            createdUser.name as string,
            createdUser.email
        );
        res.status(201).send({ token });
    } catch (error) {
        console.log(error);
        res.status(501).send({ error });
    }
};
