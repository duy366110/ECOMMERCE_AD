import React, { useRef } from "react";
import { useSelector } from "react-redux";
import useValidation from "../../../../../hook/use-validation";
import SendIcon from '@mui/icons-material/Send';
import classes from "./Dashboard-Customer-Care-Chat-Content-Component.module.css";

const DashboardCustomerCareChatContentComponent = (props) => {
    const socketSlice = useSelector((state) => state.socket);
    const messageRef = useRef();

    const {resetValue: messageRestval, value: messageValue, onChange: messageChange} = useValidation(['require']);

    // THỰC HIỆN GỬI TIN NHẮN ĐẾN KHÁCH HÀNG - CẦN TƯ VẤN
    const sendMessageToClinentHandler = (event) => {
        if(messageValue) {
            messageRestval();
            messageRef.current.value = '';

            let user = localStorage.getItem('user');
            let usersOnline = localStorage.getItem('usersOnline');

            if(usersOnline) {
                user = JSON.parse(user);
                usersOnline = JSON.parse(usersOnline);

                // TÌM CLIENT HIỆN TẠI ADMIN ĐANG HỖ TRỢ
                let currentUserAdminSupport = usersOnline.find((userOnline) => userOnline.current_care === user.id);

                // NẾU CLIENT CÓ TỒN TẠI THỰC HIỆN SEND MESAGE VỀ CLIENT
                if(currentUserAdminSupport) {
                    socketSlice.socket.emit('admin-send-message-to-client', {user: user.id, customer: currentUserAdminSupport._id, message: messageValue});

                } else {
                    alert('Not execute method, user not active');
                }

            } else {
                alert("Current not user client active");
            }

        } else {
            alert('Please enter message or choose client before send message');
        }
    }

    return (
        <div className={classes['dashboard-customer-care-chat-content-component']}>
            <div className={classes['chat-content-wrapper']}>
                <div className={classes['chat-content-container']}>
                    {props.currentUserAdminSupport && props.currentUserAdminSupport.message.map((messageItem, index) => {

                        return (
                            <div className={`${classes['chat-item-wrapper']} ${messageItem.type !== 'Client'? classes['chat-item-wrapper-admin'] : ''}`}>
                                {messageItem.type === 'Client' && (
                                    <>
                                        <img src="/assets/images/client-blank.png" alt="icon" />
                                        <div key={index} className={`${classes['chat-item']}`}>
                                            {messageItem.content}
                                        </div>
                                    </>
                                )}

                                {messageItem.type !== 'Client' && (
                                    <>
                                        <div key={index} className={`${classes['chat-item']} ${classes['chat-item-admin']}`}>
                                            {messageItem.content}
                                        </div>
                                        <img src="/assets/images/client-blank.png" alt="icon" />
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className={classes['chat-content-input']}>
                <div className={classes['input-wrapper']}>
                    <input ref={messageRef} onChange={messageChange} type="text" placeholder="Type or enter" />
                </div>
                <button onClick={sendMessageToClinentHandler} className={classes['btn-send-message']}>
                    <SendIcon />
                </button>
            </div>
        </div>
    )
}

export default DashboardCustomerCareChatContentComponent;