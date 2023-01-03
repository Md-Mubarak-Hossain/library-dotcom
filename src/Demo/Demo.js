import React, { useContext, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Login from '../account/Login';
import { AuthContext } from '../contexts/Context';
import useTitle from '../hooks/useTitle';

const Demo = () => {
    useTitle('Demo')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.from?.state?.pathname || '/';
    const { logIn, googleLogIn } = useContext(AuthContext)
    const [error, setError] = useState('')
    const handleSub = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 8) {
            return setError('Password minimum 8 characters')
        }
        logIn(email, password)
            .then(res => {
                const user = res.user;
                console.log(user)
                navigate(from, { replace: true })
                alert('successfully login')
            })
            .catch(error => {
                return setError('wrong email or password')
                // console.error(error)
            })
    }
    const googleSign = () => {
        googleLogIn()
            .then(res => {
                const user = res.user;
                console.log(user)
                navigate(from, { replace: true })
                alert('successfully login')

            })
            .catch(err => {
                console.error(err)
                alert('failed login')
            })
    }


    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* <!-- Page content here --> */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side border">
                    <Login></Login>
                </div>
            </div>
        </div >
    );
};

export default Demo;