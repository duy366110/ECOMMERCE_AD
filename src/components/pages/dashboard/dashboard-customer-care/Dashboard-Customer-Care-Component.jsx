import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardCustomerCareTabComponent from "./Dashboard-Customer-Care-Tab-Component/Dashboard-Customer-Care-Tab-Component";
import DashboardCustomerCareChatContentComponent from "./Dashboard-Customer-Care-Chat-Content-Component/Dashboard-Customer-Care-Chat-Content-Component";
import classes from "./Dashboard-Customer-Care-Component.module.css";

const DashboardCustomerCareComponent = (props) => {
    const auth = useSelector((state) => state.auth);
    const socketSlice = useSelector((state) => state.socket);

    const [usersOnlie, setUsersOnline] = useState([]);
    const [currentUserSupport, setCurrentUserSupport] = useState(null);

    useEffect(() => {

        // ADMIN TIẾN HÀNH ĐĂNG NHẬP
        socketSlice.socket.emit('admin-connect', {token: auth.token});

        // CLIENT BẬT CHAT - CẬP NHẬT TÀI KHOẢN ĐANG HOẠT ĐỘNG
        socketSlice.socket.on('client-join-connect', (data) => {
            let { usersOnline } = data;
            localStorage.setItem('usersOnline', JSON.stringify(usersOnline));
            setUsersOnline(usersOnline);
        })

        // CLIENT VỪA GỬI MESAGE ĐẾN CLIENT
        socketSlice.socket.on('client-send-message-admin', (data) => {
            let { userCare } = data;
            let usersOnline = localStorage.getItem('usersOnline');

            // LẤY DANH SÁCH USER ONLINE DƯỚI LOCAL
            if(usersOnline) {

                // TIẾN HÀNH XOÁ BỎ CLIENT GỬI MESAGE DƯỚI LOCAL VÀ CẬP NHẬT MỚI
                usersOnline = JSON.parse(usersOnline);
                let updateUsersOnline = usersOnline.map((userOnline) => {
                    if( userOnline._id === userCare._id) {
                        return null;
                    }
    
                    return userOnline;
                }).filter((userOnline) => userOnline);

                // THÊM CLIENT VỪA SEND MESAGE MỚI VÀO DANH SÁCH CẬP NHẬT
                updateUsersOnline.push(userCare);

                // LẤY THÔNG TIN USER HIỆN TẠI ADMIN ĐANG HỖ TRỢ
                let user = JSON.parse(localStorage.getItem('user'));
                setCurrentUserSupport(updateUsersOnline.find((userOnline) => userOnline.current_care === user.id));

                // LƯU DANH SÁCH LẠI VÀO LOCAL
                localStorage.setItem('usersOnline', JSON.stringify(updateUsersOnline));
                setUsersOnline(updateUsersOnline);
            }
        })

        // ADMIN ĐĂNG NHẬP HỆ THỐNG - CẬP NHẬT DANH SÁCH TÀI KHOẢN HOẠT ĐỘNG
        socketSlice.socket.on('admin-join-connect', (data) => {
            let { usersOnline } = data;
            let user = localStorage.getItem('user')

            // LẤY THÔNG TIN USER HIỆN TẠI ADMIN ĐANG HỖ TRỢ
            if(user) {
                user = JSON.parse(localStorage.getItem('user'));
                setCurrentUserSupport(usersOnline.find((userOnline) => userOnline.current_care === user.id));

                localStorage.setItem('usersOnline', JSON.stringify(usersOnline));
                setUsersOnline(usersOnline);
            }
        })

        // ADMIN CHỌN VÀ HỖ TRỢ CLIENT - CẬP NHẬT LẠI DANH SÁCH USER
        socketSlice.socket.on('update-client-have-been-supported', (data) => {
            let { userCare } = data;
            let usersOnline = localStorage.getItem('usersOnline');

            // LẤY DANH SÁCH USER ONLINE DƯỚI LOCAL
            if(usersOnline) {

                // TIẾN HÀNH XOÁ BỎ CLIENT GỬI MESAGE DƯỚI LOCAL VÀ CẬP NHẬT MỚI
                usersOnline = JSON.parse(usersOnline);
                let updateUsersOnline = usersOnline.map((userOnline) => {
                    if( userOnline._id === userCare._id) {
                        return null;
                    }
    
                    return userOnline;
                }).filter((userOnline) => userOnline);

                // THÊM CLIENT VỪA SEND MESAGE MỚI VÀO DANH SÁCH CẬP NHẬT
                updateUsersOnline.push(userCare);

                // LẤY THÔNG TIN USER HIỆN TẠI ADMIN ĐANG HỖ TRỢ
                let user = JSON.parse(localStorage.getItem('user'));
                setCurrentUserSupport(updateUsersOnline.find((userOnline) => userOnline.current_care === user.id));


                // LƯU DANH SÁCH LẠI VÀO LOCAL
                localStorage.setItem('usersOnline', JSON.stringify(updateUsersOnline));
                setUsersOnline(updateUsersOnline);
            }
        })

        // ADMIN GỬI MESSAGE ĐẾN KHÁCH HÀNG
        socketSlice.socket.on('admin-send-message-to-client', (data) => {
            let { customerCare } = data;
            let usersOnline = localStorage.getItem('usersOnline');

            // LẤY DANH SÁCH USER ONLINE DƯỚI LOCAL
            if(usersOnline) {

                // TIẾN HÀNH XOÁ BỎ CLIENT GỬI MESAGE DƯỚI LOCAL VÀ CẬP NHẬT MỚI
                usersOnline = JSON.parse(usersOnline);
                let updateUsersOnline = usersOnline.map((userOnline) => {
                    if( userOnline._id === customerCare._id) {
                        return null;
                    }
    
                    return userOnline;
                }).filter((userOnline) => userOnline);

                // THÊM CLIENT VỪA SEND MESAGE MỚI VÀO DANH SÁCH CẬP NHẬT
                updateUsersOnline.push(customerCare);

                // LẤY THÔNG TIN USER HIỆN TẠI ADMIN ĐANG HỖ TRỢ
                let user = JSON.parse(localStorage.getItem('user'));
                setCurrentUserSupport(updateUsersOnline.find((userOnline) => userOnline.current_care === user.id));


                // LƯU DANH SÁCH LẠI VÀO LOCAL
                localStorage.setItem('usersOnline', JSON.stringify(updateUsersOnline));
                setUsersOnline(updateUsersOnline);
            }

        })

        // ADMIN ĐĂNG XUẤT KHỎI HỆ THỐNG
        socketSlice.socket.on('admin-leave-chat', (data) => {
            let { usersOnline } = data;
            localStorage.setItem('usersOnline', JSON.stringify(usersOnline));
            setUsersOnline(usersOnline);
        })

        // CLIENT ĐĂNG XUẤT KHỎI HỆ THỐNG
        socketSlice.socket.on('client-leave-chat', (data) => {
            let { usersOnline } = data;
            localStorage.setItem('usersOnline', JSON.stringify(usersOnline));
            setUsersOnline(usersOnline);
        })




    }, [])

    return (
        <div className={classes['dashboard-customer-care-component']}>
            <div className="row">
                <div className="col-4">
                    <DashboardCustomerCareTabComponent usersOnline={usersOnlie}/>
                </div>

                <div className="col-8">
                    <DashboardCustomerCareChatContentComponent currentUserAdminSupport={currentUserSupport}/>
                </div>
            </div>
        </div>
    )
}

export default DashboardCustomerCareComponent;