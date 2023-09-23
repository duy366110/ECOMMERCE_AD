import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import config from "../../../../configs/config.env";
import { authSignin } from "../../../../store/store-auth";
import useValidation from "../../../../hook/use-validation";
import CommonButtonComponent from "../../../common/Common-Button-Component/Common-Button-Component";
import CommonInputComponent from "../../../common/Common-Input-Component/Common-Input-Component";
import classes from "./Auth-Sign-In-Component.module.css";

const AuthSignInComponent = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formValid, setFormValid] = useState('');

    const emailRef = useRef();
    const passwordRef = useRef();

    const {value: emailValue, valid: emailValid, onBlur: emailBlur, onChange: emailChange} = useValidation(['require', 'email']);
    const {value: passwordValue, valid: passwordValid, onBlur: passwordBlur, onChange: passwordChange} = useValidation(['require', 'password']);

    const signInHandler = async (event) => {
        event.preventDefault();

        let inputEmail = emailRef.current.input.current;
        let inputPassword = passwordRef.current.input.current;

        inputEmail.focus();
        inputEmail.blur();

        inputPassword.focus();
        inputPassword.blur();

        if(emailValid.status && passwordValid.status) {
            try {
                let res = await fetch(`${config.URI}/api/auth/signin/admin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email: emailValue, password: passwordValue})
                })

                if(!res.ok) {
                    let infor = await res.json();
                    throw Error(infor.message);
                }

                let { status, message, infor } = await res.json();

                if(status) {
                    let { id, username, fullname, phone, role } = infor;
                    localStorage.setItem('user', JSON.stringify({id, username, fullname, phone, role}));
                    localStorage.setItem('token', infor.token);
                    dispatch(authSignin({infor}));
                    navigate("/");
                }

            } catch (error) {
                setFormValid(error.message);
            }
        }
    }

    return (
        <div className={classes['auth-component']}>
            <form className={classes['auth-form']} onSubmit={signInHandler}>
                <h2 className={classes['form-title']}>Sign in</h2>
                {formValid && (<h4 className="form-message">{formValid}</h4>) }
                <CommonInputComponent
                    type='email'
                    ref={emailRef} blur={emailBlur}
                    change={emailChange} label="E-mail"
                    value={emailValue} valid={emailValid}/>

                <CommonInputComponent
                    type="password"
                    ref={passwordRef} blur={passwordBlur}
                    change={passwordChange} label="Password"
                    value={passwordValue} valid={passwordValid}/>

                <CommonButtonComponent type="submit" kind="contained" title="Sign in"/>
            </form>
        </div>
    )
}

export default AuthSignInComponent;