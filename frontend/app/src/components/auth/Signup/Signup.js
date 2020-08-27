
import React from 'react';
import axios from 'axios';
import * as EmailValidator from "email-validator";
import Cookies from 'js-cookie';

const Signup = (props) => {

    function handleSignupSubmit(e) {
        // stop submit
        e.preventDefault();

        // get values from input
        const inputs = Array.from(e.target.children)
        const email = inputs.find(node => node.name === "email").value
        const password = inputs.find(node => node.name === "password").value
        const passwordConfirm = inputs.find(node => node.name === "passwordConfirm").value

        // validate email
        if (!EmailValidator.validate(email)) return console.log('wrong email');
        // validate password
        if (typeof password !== 'string' || password.length < 4) return console.log('password to short')
        if (password !== passwordConfirm) return console.log("Type the same password twice.")

        // setup data and headers for axios call
        const data = {
            "email": email,
            "password": password
        }

        // call api
        axios.post('/signup', data)
            .then(res => {
                // console.log(res.data)
                if (res.status === 201) {
                    // set isAuth state globaly
                    props.login();
                    // set token in cookies
                    Cookies.set('accessToken', res.data.accessToken, { path: '' });
                    Cookies.set('refreshToken', res.data.refreshToken, { path: '' });
                    // set token in headers globaly
                    axios.defaults.headers.common['authorization'] = `AUTH ${res.data.accessToken}`;
                    props.history.push({ pathname: "/" }) // redirect to /
                    return console.log('Sign up success : ', res.status)


                }
                else { return console.log('Something went worng. ', res.status) }
            })
            .catch(err => console.log(err))
    };

    return (
        <div>
            <h4>Signup</h4>
            <form onSubmit={handleSignupSubmit}>
                <label htmlFor="emailInput">email</label>
                <input
                    className="form-control"
                    type="text" name="email"
                    id="emailInput" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>

                <label htmlFor="password">Password</label>
                <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="password" />

                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                    className="form-control"
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm" />

                <br />

                <button
                    type="submit"
                    id="signupSubmitBtn"
                    className="btn btn-primary">
                    Sign up
                </button>

            </form>
        </div>
    )
};


export default Signup;