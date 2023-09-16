import ENVIRONEMENT from "../environment";

const Config = {
    DEV: {
        URI: ENVIRONEMENT.URL.DEV,
        SOCKET: ENVIRONEMENT.SOCKET.PRO
    },
    PRO: {
        URI: ENVIRONEMENT.URL.PRO,
        SOCKET: ENVIRONEMENT.SOCKET.PRO
    }
}

let config = Config[ENVIRONEMENT.MODEL];

export default config;