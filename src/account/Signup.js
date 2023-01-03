import React from 'react';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Context';
import useTitle from '../hooks/useTitle';

const Signup = () => {
    useTitle('signup')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.from?.state?.pathname || '/';
    const { loading, createUser, googleLogIn } = useContext(AuthContext)
    const [error, setError] = useState('')
    const handleSub = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        if (!password.includes(confirm)) {
            return setError('Password is not matched')
        }
        if (password.length < 8) {
            return setError('Password minimum 8 characters')
        }
        createUser(email, password)
            .then(res => {
                const user = res.user;
                console.log(user)
                const userInfo = {
                    email, password
                }
                fetch('https://library-psi.vercel.app/creator', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result.acknowledged) {
                            form.reset();
                            navigate(from, { replace: true })
                            alert('successfully account created')
                        }
                    })
                    .catch(error => {
                        console.error(error)
                        alert('Try again!!!')
                    })
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
    if (loading) { return <p>loading...</p> }
    return (
        <div className='w-full flex flex-col justify-center items-center place-items-center'>
            <div className='card border p-5'>
                <form onSubmit={handleSub} >
                    <div className="hero min-h-screen bg-base-200">
                        <div className="hero-content flex-col">
                            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                <div className="card-body">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="text" placeholder="email" name='email' className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type="password" placeholder="password" name='password' className="input input-bordered" />
                                        <label className="label">
                                            <p className='text-xs text-red-600'>{error}</p>
                                        </label>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="btn btn-primary uppercase">Sign Up</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='divider horizontal-divider'>or</div>
                <button onClick={() => googleSign()} className="btn btn-outline btn-warning w-56">log in with google</button>
            </div>
        </div>
    );
};

export default Signup;