import React from 'react';
import {useSelector} from "react-redux";
import LoadingBox from "../components/utils/LoadingBox";
import MessageBox from "../components/utils/MessageBox";

const ProfileScreen = () => {

    const {loading, user, error} = useSelector(state => state.authUser)

    const onSubmitHandler = (e) => {
        e.preventDefault()
        //TODO update profile
    }

    return (
        <div>
            <form className="form" onSubmit={onSubmitHandler}>
                <div><h1>User Profile</h1></div>
                {
                    loading ? (<LoadingBox/> ) : error ? (<MessageBox variant="danger">{error}</MessageBox> ) :
                        (
                            <>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" placeholder="Enter Name" value={user.name}/>
                                </div>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" id="email" placeholder="Enter Email" value={user.email}/>
                                </div>

                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" placeholder="Enter Password" />
                                </div>

                                <div>
                                    <label htmlFor="confirm_password">Confirm Password</label>
                                    <input type="password" id="confirm_password" placeholder="Enter Confirm Password" />
                                </div>

                                <div>
                                    <label />
                                    <button type={"submit"} className="primary block">Update Profile</button>
                                </div>
                            </>
                        )
                }

            </form>
        </div>
    );
};

export default ProfileScreen;
