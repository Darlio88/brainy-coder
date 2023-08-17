import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import BaseUrl from '../../utils/baseUrl';
interface IAuth {
    path: string;
}
const AuthForm = (props: IAuth) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (props.path === 'sign-up' && (!name || !email || !password)) {
            toast.error('All fields are required');
            return;
        }
        if (props.path === 'sign-in' && (!email || !password)) {
            toast.error('All fields are required');
            return;
        }
        console.log(e);
        const data = {
            name: name,
            email: email,
            password: password,
        };

        await BaseUrl.post(`/${props.path}`, data).then((response) => {
            const { token } = response.data;
            localStorage.setItem('token', token);
            toast.success(`${props.path.split('-').join(' ')} successful`);
            navigate('/');
            setEmail('');
            setPassword('');
            setName('');
        });
    }

    return (
        <section className="grid my-10 justify-center text-lg text-emerald-900">
            {/* container */}
            <div className="py-4 px-6 bg shadow-md bg-slate-100 rounded-md grid gap-3">
                <form className="grid gap-5" onSubmit={handleSubmit}>
                    {props.path !== 'sign-in' ? (
                        <div className="grid gap-1">
                            <label htmlFor="name">Name:</label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                placeholder="Omoding Daniel..."
                                id="name"
                                className=" bg-emerald-100 rounded px-2 py-2 shadow-sm border border-emerald-700 outline-none"
                            />
                        </div>
                    ) : null}
                    <div className="grid gap-1">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="omodingdaniel@gmail.com"
                            id="email"
                            className=" bg-emerald-100 rounded px-2 py-2 shadow-sm border border-emerald-700 outline-none"
                        />
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="••••••••"
                            id="password"
                            className=" bg-emerald-100 rounded px-2 py-2 shadow-sm border border-emerald-700 outline-none"
                        />
                    </div>
                    <button className="capitalize hover:bg-rose-700 hover:text-rose-100 bg-rose-100 text-rose-700 border border-rose-700 text-base transition ">
                        {props.path === 'sign-in' ? 'login' : 'sign up'}
                    </button>
                </form>
                <div className="flex gap-2 text-base md:text-lg mt-2">
                    {props.path !== 'sign-in' ? (
                        <>
                            <p>Already have an account?</p>{' '}
                            <Link to="/auth/sign-in">Sign in</Link>
                        </>
                    ) : (
                        <>
                            <p>Do not yet have an account?</p>{' '}
                            <Link to="/auth/sign-up">SignUp</Link>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AuthForm;
