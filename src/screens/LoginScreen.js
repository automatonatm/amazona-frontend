import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useSearchParams, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import MessageBox from "../components/utils/MessageBox";
import {signInUser} from "../store/actions/userActions";
import LoadingBox from "../components/utils/LoadingBox";

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [searchParams] = useSearchParams();

    const query = Object.fromEntries([...searchParams]);

    const redirect =  query.redirect  ? `${query.redirect}`  : ''


    const { state } = useLocation();


   const {loading, error, success} = useSelector(state => state.userSignIn)
 //   const {authenticated} = useSelector(state => state.authUser)

    console.log("HERE")

    const signUpHandler  = (e) => {
        e.preventDefault()
        dispatch(signInUser({email, password}))
        //navigate(state?.path || "/")

    }


    useEffect(() => {



        if(success ) {
            navigate(state?.path || "/")
        }

    }, [success, navigate, state])



    return (
        <div>

            <form className="form" onSubmit={signUpHandler}>
                <div><h1>Sign In</h1></div>

                {loading && <LoadingBox/>}

                {error  && <MessageBox variant="danger">{error}</MessageBox>}

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" required  onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div>
                    <label/>
                    <button disabled={loading} className="primary" type="submit">Sign In</button>
                </div>

                <div>
                    <label/>
                    <div>
                        New Customer? {' '}
                        <Link to={`${redirect === 'shipping' ? '/signup?redirect=shipping' : '/signup' }`}>Create your Account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginScreen;
