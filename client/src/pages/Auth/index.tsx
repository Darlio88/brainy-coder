import { useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//
import { ToastContainer, toast } from 'react-toastify';

//components
import Header from '../../components/Header';
import Auth from '../../components/Auth/index';

//utils
import logout from '../../utils/logOut';
const AuthPage = () => {
    const { type } = useParams();
    console.log('route type', type);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (type === 'sign-out') {
            logout();
            toast.success('Sign out successful');
            navigate('/');
        }
    }, []);
    return (
        <>
            <Header />
            <Auth path={type as string} />
            <ToastContainer />
        </>
    );
};

export default AuthPage;
