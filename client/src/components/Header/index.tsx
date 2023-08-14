import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//icons
import { FaArrowRight } from 'react-icons/fa';

//utils
import IsLoggedIn from '../../utils/isLoggedIn';

const Header = () => {
    const isLoggedIn = IsLoggedIn();
    const navigate = useNavigate();
    function handleAuth(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        navigate(`/auth/${isLoggedIn ? 'sign-out' : 'sign-in'}`);
    }
    return (
        <header className="text-gray-600 body-font shadow-md sticky top-0 rounded-sm right-0 left-0  bg-emerald-100 z-10">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link
                    to="/"
                    className="flex title-font font-medium items-center text-emerald-800 hover:text-emerald-950 mb-4 md:mb-0 hover:cursor-pointer"
                >
                    <div className="h-[48px] w-[48px]">
                        <img src="/icon.png" alt="logo" />
                    </div>
                    <span className="ml-3 text-xl font-semibold">
                        BrainyCoder
                    </span>
                </Link>
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                    <Link
                        to="/"
                        className="mr-5 text-emerald-900 font-semibold hover:font-bold hover:text-gray-900 hover:cursor-pointer "
                    >
                        Problems
                    </Link>
                    <Link
                        to="/process"
                        className="mr-5 text-emerald-900  font-semibold hover:font-bold hover:text-gray-900 hover:cursor-pointer"
                    >
                        Process
                    </Link>
                    <Link
                        to="/create"
                        className="mr-5 text-emerald-900  font-semibold hover:font-bold hover:text-gray-900 hover:cursor-pointer"
                    >
                        Create
                    </Link>
                    <a
                        href="https://www.github.com/darlio88"
                        target="blank"
                        className="mr-5 text-emerald-900  font-semibold hover:font-bold hover:text-gray-900 hover:cursor-pointer"
                    >
                        About
                    </a>
                </nav>
                <button
                    onClick={(e) => handleAuth(e)}
                    className="inline-flex items-center bg-emerald-200 text-emerald-800 border-0 focus:outline-none hover:bg-emerald-300 hover:text-emerald-950 rounded text-base mt-4 px-3 py-2 md:mt-0 shadow-sm hover:shadow"
                >
                    {isLoggedIn ? 'Sign out' : 'Sign in'}
                    <FaArrowRight className="ml-2" />
                </button>
            </div>
        </header>
    );
};

export default Header;
