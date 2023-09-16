import { useEffect, useState, useReducer } from "react";
const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const regexPhone = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

const valid = (key, value) => {
    if(key === 'require') {
        if(!(value.trim() == 'DEFAULT') && value.trim().length) {

            return {
                status: true,
                message: ''
            }

        } else {
            return {
                status: false,
                message: 'Input must enter value'
            }
        }
    }

    if(key === 'email') {
        if(value.trim().toLowerCase().match(regexEmail)) {
            return {
                status: true,
                message: ''
            }
        } else {
            return {
                status: false,
                message: 'Input must enter email'
            }
        }
    }

    if(key === 'password') {
        if(regexPassword.test(value)) {
            return {
                status: true,
                message: ''
            }
        } else {
            return {
                status: false,
                message: 'Enter password less 6 charter'
            }
        }
    }

    if(key === 'phone') {
        if(regexPhone.test(value)) {
            return {
                status: true,
                message: ''
            }
        } else {
            return {
                status: false,
                message: 'Enter phone number'
            }
        }
    }
}

// Phương thức thự hiện kiểm tra giá trị người dùng nhập vào.
const validReducer = (state, action) => {
    if(action.type === "VALID") {

        // Dự vào danh sách nhập điều kiên lấy từng điều kiện kiểm tra. VD: ['require', 'email'].
        if(action.options.length) {
            for(let key of action.options) {
                let inforValid = valid(key, action.value);
    
                if(!inforValid.status) {
                    return inforValid;
                }
            }
        }
        

        return {status: true, message: ''};
    }

    return state;
}

const useValidation = (options = []) => {
    const [valid, dispatchValid] = useReducer(validReducer, {status: null, message: ''});
    const [defaultVal, setDefaultVal] = useState('');
    const [value, setValue] = useState('');

    const onBlur = (event) => {
        let { type } = event.target;

        if(type !== 'file') {
            dispatchValid({type: 'VALID', options, value: event.target.value});

        } else {
            dispatchValid({type: 'VALID', options, value: event.target.files[0]?.name? 'has file' : ''});
        }
    }

    const onChange = (event) => {
        let { type } = event.target;

        if(type !== 'file') {
            setValue(event.target.value);

        } else {
            let nameFile = event.target.files[0]?.name? event.target.files[0]?.name : '';
            setValue(nameFile);
        }
    }

    useEffect(() => {
        setValue(defaultVal);

    }, [defaultVal])

    // PHƯƠNG THỨC RESET VALUE INPUT
    function resetValue() {
        setValue('');
    }

    return {
        defaultValue: setDefaultVal,
        resetValue,
        value,
        valid,
        onBlur,
        onChange
    }
}

export default useValidation;