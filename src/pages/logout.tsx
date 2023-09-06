import React, {useEffect} from 'react';

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('photoURL');


        window.location.href = '/';
    }, []);

    return (
        <div>

        </div>
    );
};

export default Logout;