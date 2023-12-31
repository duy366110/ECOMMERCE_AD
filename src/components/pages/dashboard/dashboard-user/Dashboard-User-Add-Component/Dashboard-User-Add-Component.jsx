import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useNavigate, useLoaderData } from "react-router-dom";
import config from "../../../../../configs/config.env";
import useValidation from '../../../../../hook/use-validation';
import useHttp from '../../../../../hook/use-http';
import CommonButtonComponent from '../../../../common/Common-Button-Component/Common-Button-Component';
import CommonInputComponent from '../../../../common/Common-Input-Component/Common-Input-Component';
import CommonSelectComponent from "../../../../common/Common-Select-Component/Common-Select-Component";
import classes from "./Dashboard-User-Add-Component.module.css";

const DashboardUserAddComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();

    const nameRef = useRef();
    const fullNameRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const roleRef = useRef();

    const [roles, setRoles] = useState([]);

    const { httpMethod } = useHttp();

    // KẾT NỐI KIỂM TRA INPUT
    const {value: nameValue, valid: nameValid, onBlur: nameBlur, onChange: nameChange} = useValidation(['require']);
    const {value: fullNameValue, valid: fullNameValid, onBlur: fullNameBlur, onChange: fullNameChange} = useValidation(['require']);
    const {value: passwordValue, valid: passwordValid, onBlur: passwordBlur, onChange: passwordChange} = useValidation(['require', 'password']);
    const {value: phoneValue, valid: phoneValid, onBlur: phoneBlur, onChange: phoneChange} = useValidation(['require', 'phone']);
    const {value: emailValue, valid: emailValid, onBlur: emailBlur, onChange: emailChange} = useValidation(['require', 'email']);
    const {value: addressValue, valid: addressValid, onBlur: addressBlur, onChange: addressChange} = useValidation(['require']);
    const {value: roleValue, valid: roleValid, onBlur: roleBlur, onChange: roleChange} = useValidation(['require']);

    // LẤY VỀ THÔNG TIN ROLES
    const getRoles = useCallback(async () => {
        let { status, roles } = loader;
        if(status) {
            setRoles(roles)
        }
    }, [loader])

    // THỰC HIỆN LOADER ROLES LẦN ĐÂU TẢI TRANG
    useEffect(() => {
        getRoles();
    }, [getRoles])

    // THỰC HIỆN TẠO MỚI USER
    const createUserHandler = async (event) => {
        event.preventDefault();

        let nameInput = nameRef.current.input.current;
        let fullNameInput = fullNameRef.current.input.current;
        let passwordInput = passwordRef.current.input.current;
        let phoneInput = phoneRef.current.input.current;
        let emailInput = emailRef.current.input.current;
        let addressInput = addressRef.current.input.current;
        let roleSelect = roleRef.current.select.current;

        nameInput.focus();
        nameInput.blur();

        fullNameInput.focus();
        fullNameInput.blur();

        passwordInput.focus();
        passwordInput.blur();

        phoneInput.focus();
        phoneInput.blur();

        emailInput.focus();
        emailInput.blur();

        addressInput.focus();
        addressInput.blur();

        roleSelect.focus();
        roleSelect.blur();

        if((nameValid.status && fullNameValid.status) &&
            (passwordValid.status && phoneValid.status) && 
            (emailValid.status && roleValid.status) && addressValid.status) {

            let user = {
                username: nameValue,
                fullname: fullNameValue, 
                email: emailValue,
                password: passwordValue,
                isAdmin: false,
                phonenumber: phoneValue,
                address: addressValue,
                role: roleValue
            }

            // THỰC HIỆN GỬI THÔNG TIN TẠO MỚI
            httpMethod({
                url: `${config.URI}/api/admin/user`,
                method: 'POST', author: '',
                payload: JSON.stringify(user)

            }, (infor) => {
                let { status } = infor;
                if(status) {
                    navigate('/users');
                }
            })
        }
    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-user-add-component']}>
                <form onSubmit={createUserHandler}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <CommonInputComponent
                                label="User name *" ref={nameRef}
                                blur={nameBlur} change={nameChange}
                                value={nameValue} valid={nameValid} />
                        </div>
                        <div className="col-12 col-md-6">
                            <CommonInputComponent
                                label="Full name *" ref={fullNameRef} 
                                blur={fullNameBlur} change={fullNameChange}
                                value={fullNameValue} valid={fullNameValid}/>
                        </div>

                        <div className="col-12 col-md-6">
                            <CommonInputComponent
                                type='password'
                                label="Password *" ref={passwordRef}
                                blur={passwordBlur} change={passwordChange}
                                value={passwordValue} valid={passwordValid}/>
                        </div>

                        <div className="col-12 col-md-6">
                            <CommonInputComponent
                                type="phone"
                                label="Phone number *" ref={phoneRef}
                                blur={phoneBlur} change={phoneChange}
                                value={phoneValue} valid={phoneValid}/>
                        </div>

                        <div className="col-12 col-md-6">
                            <CommonInputComponent
                                type="email"
                                label="E-mail address *" ref={emailRef}
                                blur={emailBlur} change={emailChange}
                                value={emailValue} valid={emailValid}/>
                        </div>

                        <div className="col-12 col-md-6">
                            <CommonInputComponent
                                label="Address *" ref={addressRef}
                                blur={addressBlur} change={addressChange}
                                value={addressValue} valid={addressValid}/>
                        </div>

                        <div className="col-12 col-md-6">
                            <CommonSelectComponent
                                label="Role *" options={roles}
                                ref={roleRef}
                                valueDefaultOption={'Choose role...'}
                                blur={roleBlur} change={roleChange}
                                value={roleValue} defaultValue="DEFAULT"
                                valid={roleValid} />
                        </div>
                        
                        <div className="col-12">
                            <CommonButtonComponent kind="contained" title="New account"  type="Register user"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashboardUserAddComponent;

// LOADER DANH MỤC ROLE CHO PAGE TẠO MỚI TÀI KHOẢN
export const loader = () => {
    return new Promise( async(resolve, reject) => {
        try {
            let res = await fetch(`${config.URI}/api/admin/role`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": ''
                }
            })

            if(!res.ok) {                
                throw Error(await res.json());
            }

            resolve(await res.json());

        } catch (error) {
            reject(error);
        }
    })
}