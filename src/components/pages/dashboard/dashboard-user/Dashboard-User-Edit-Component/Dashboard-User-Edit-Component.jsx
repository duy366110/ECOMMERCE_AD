import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useLoaderData } from 'react-router-dom';
import config from "../../../../../configs/config.env";
import useValidation from '../../../../../hook/use-validation';
import useHttp from '../../../../../hook/use-http';
import CommonInputComponent from '../../../../common/Common-Input-Component/Common-Input-Component';
import CommonSelectComponent from '../../../../common/Common-Select-Component/Common-Select-Component';
import CommonButtonComponent from '../../../../common/Common-Button-Component/Common-Button-Component';
import classes from "./Dashboard-User-Edit-Component.module.css";

const DashboardUserEditComponent = (props) => {
    const params = useParams();
    const loader = useLoaderData();
    const navigate = useNavigate();

    const nameRef = useRef();
    const fullNameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const roleRef = useRef();

    const [roles, setRoles] = useState([]);

    const { httpMethod } = useHttp();
    const {defaultValue: nameDefaultVal,value: nameValue, valid: nameValid, onBlur: nameBlur, onChange: nameChange} = useValidation(['require']);
    const {defaultValue: fullNameDefaultVal, value: fullNameValue, valid: fullNameValid, onBlur: fullNameBlur, onChange: fullNameChange} = useValidation(['require']);
    const {defaultValue: phoneDefaultVal, value: phoneValue, valid: phoneValid, onBlur: phoneBlur, onChange: phoneChange} = useValidation(['require', 'phone']);
    const {defaultValue: emailDefaultVal, value: emailValue, valid: emailValid, onBlur: emailBlur, onChange: emailChange} = useValidation(['require', 'email']);
    const {defaultValue: addresDef, value: addressValue, valid: addressValid, onBlur: addressBlur, onChange: addressChange} = useValidation(['require']);
    const {defaultValue: roleDefaultVal, value: roleValue, valid: roleValid, onBlur: roleBlur, onChange: roleChange} = useValidation(['require']);

    // THỰC BINDING DATA LÊN TEMPLATE
    const mapper = () => {
        if(loader) {
            let { user, roles } = loader;
            console.log(user);
            
            nameDefaultVal(user.username);
            fullNameDefaultVal(user.fullname);
            phoneDefaultVal(user.phonenumber);
            emailDefaultVal(user.email);
            addresDef(user.address);
            roleDefaultVal(user.role._id);
            setRoles(roles);
        }
    }

    useEffect(() => {
        mapper();
    }, [])

    // PHƯƠNG THỨC THỰC HIỆN CHỈNH SỦA THÔNG TIN NGƯỜI DÙNG
    const modifiUserHandler = async (event) => {
        event.preventDefault();

        let nameInput = nameRef.current.input.current;
        let fullNameInput = fullNameRef.current.input.current;
        let phoneInput = phoneRef.current.input.current;
        let emailInput = emailRef.current.input.current;
        let addressInput = addressRef.current.input.current;
        let roleSelect = roleRef.current.select.current;

        nameInput.focus();
        nameInput.blur();

        fullNameInput.focus();
        fullNameInput.blur();

        phoneInput.focus();
        phoneInput.blur();

        emailInput.focus();
        emailInput.blur();

        addressInput.focus();
        addressInput.blur();

        roleSelect.focus();
        roleSelect.blur();

        if((nameValid.status && fullNameValid.status) && (phoneValid.status) && (emailValid.status && roleValid.status) && addressValid.status) {
            let user = {
                user: params.user,
                username: nameValue,
                fullname: fullNameValue, 
                email: emailValue,
                phonenumber: phoneValue,
                address: addressValue,
                role: roleValue
            }

            httpMethod({
                url: `${config.URI}/api/admin/user`,
                method: 'PATCH',
                author: '',
                payload: JSON.stringify(user)
            }, (infor) => {
                let { status, message } = infor;

                // CHUYỂN VỀ TRANG DANH SÁCH USER
                if(status) {
                    navigate('/users');
                }
            })
        }

    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-user-add-component']}>
                <form onSubmit={modifiUserHandler}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <CommonInputComponent
                                label="User name" ref={nameRef}
                                blur={nameBlur} change={nameChange}
                                value={nameValue} valid={nameValid} />
                        </div>
                        <div className="col-12 col-md-6">
                            <CommonInputComponent
                                label="Full name" ref={fullNameRef} 
                                blur={fullNameBlur} change={fullNameChange}
                                value={fullNameValue} valid={fullNameValid}/>
                        </div>

                        <div className="col-12 col-md-6">
                            <CommonInputComponent
                                type="phone"
                                label="Phone number" ref={phoneRef}
                                blur={phoneBlur} change={phoneChange}
                                value={phoneValue} valid={phoneValid}/>
                        </div>

                        <div className="col-12 col-md-6">
                            <CommonInputComponent
                                type="email"
                                label="E-mail address" ref={emailRef}
                                blur={emailBlur} change={emailChange}
                                value={emailValue} valid={emailValid}/>
                        </div>

                        <div className="col-12 col-md-6">
                            <CommonInputComponent
                                label="Address *" ref={addressRef}
                                blur={addressBlur} change={addressChange}
                                value={addressValue} valid={addressValid}/>
                        </div>

                        <div className="col12 col-md-6">
                            <CommonSelectComponent
                                label="Role" options={roles}
                                ref={roleRef}
                                blur={roleBlur} change={roleChange}
                                value={roleValue} defaultValue="DEFAULT"
                                valid={roleValid} />
                        </div>
                        <div className="col-12">
                            <CommonButtonComponent kind="contained" title="Edit account"  type="submit"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashboardUserEditComponent;

// LOADER THÔNG TIN ROLE
const loaderRole = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await fetch(`${config.URI}/api/admin/role`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": ''
                }
            });

            if(!res.ok) {
                throw Error(await res.json());
            }

            resolve(await res.json());            

        } catch (error) {
            reject(error);
        }
    })
}

// LOADER THÔNG TIN USER
const loaderUser = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await fetch(`${config.URI}/api/admin/user/${user_id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": ''
                }
            });

            if(!res.ok) {
                throw Error(await res.json());
            }

            resolve(await res.json());            

        } catch (error) {
            reject(error);
        }
    })
}

// LOADER THỰC HIỆN LẤY THÔNG TIN TÀI KHOẢN CHỈNH USER
export const loader = (request, params) => {
    let { user } = params;
    return new Promise(async (resolve, reject) => {
        try {
            let data = await Promise.all([loaderUser(user), loaderRole()])
            if(data.length) {
                let [{user}, {roles}] = data;
                resolve({user, roles});

            } else {
                resolve(null);
            }
            

        } catch (error) {
            reject(error);
        }
    })
}