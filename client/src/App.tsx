import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

//pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import Solve from './pages/Solve';
import ErrorPage from './pages/ErrorPage';

//protected route component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth/:type" element={<Auth />} />
                    <Route path="/solve/:id" element={<Solve />} />
                    <Route path="/create" element={<ProtectedRoute />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
