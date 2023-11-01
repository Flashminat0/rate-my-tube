import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('photoURL');

        navigate('/')
    }, []);

    return (
        <div>

        </div>
    );
};

export default Logout;