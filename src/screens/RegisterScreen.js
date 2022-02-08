import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import MessageBox from "../components/utils/MessageBox";
import { signUpUser} from "../store/actions/userActions";
import LoadingBox from "../components/utils/LoadingBox";

const RegisterScreen = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [err, setError] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

   const [searchParams] = useSearchParams();

    const query = Object.fromEntries([...searchParams]);

    const redirect =  query.redirect  ? `${query.redirect}`  : ''



    const {loading, error, success} = useSelector(state => state.userSignUp)

    const {authenticated} = useSelector(state => state.authUser)


    const signUpHandler  = (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            setError('Passwords do no Match')
            return
        }

        dispatch(signUpUser({name, email, password}))

    }


    useEffect(() => {

        if(success  || authenticated) {
            navigate(`/${redirect}`)
        }
    }, [success, navigate, authenticated, redirect])


    return (
        <div>

            <form className="form" onSubmit={signUpHandler}>
                <div><h1>Sign UP</h1></div>

                {loading && <LoadingBox/>}

                {(error || err)   && <MessageBox variant="danger">{error || err}</MessageBox>}

                <div>
                    <label htmlFor="name">Name</label>
                    <input type="name" id="name" required onChange={(e) => setName(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" required  onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" required onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>


                <div>
                    <label/>
                    <button disabled={loading} className="primary" type="submit">Sign Up</button>
                </div>

                <div>
                    <label/>
                    <div>
                        Already A Customer? {' '}
                        <Link to={`${redirect === 'shipping' ? '/signin?redirect=shipping' : '/signin' }`}>Signin your Account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterScreen;
