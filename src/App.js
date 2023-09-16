import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import openSocket from "socket.io-client";
import config from "./configs/config.env";
import { authReload } from "./store/store-auth";
import { shareSocket } from "./store/store-socket";
import './App.css';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // KIỂM TRA NGƯỜI DÙNG ĐĂNG NHẬP
  useEffect(() => {
    let token = localStorage.getItem('token');
    let socket = openSocket(config.URI);
    dispatch(shareSocket({socket}));

    if(!token) {
      navigate('/auth');

    } else {
      dispatch(authReload());

    }

  }, [])

  return (
    <Outlet />
  );
}

export default App;
