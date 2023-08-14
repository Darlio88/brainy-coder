import React from 'react';
import { Link } from 'react-router-dom';

function Index() {
    return (
        <div className="h-[100vh] w-[100vw] grid text-lg text-emerald-950">
            <div className="flex justify-center items-center">
                <img
                    src="/error-page-image.png"
                    alt="error-robot"
                    className="block w-[80%] md:w-[40%]"
                />
            </div>
            <p className="text-center">
                Go back to <Link to="/">Home page</Link>
            </p>
        </div>
    );
}

export default Index;
