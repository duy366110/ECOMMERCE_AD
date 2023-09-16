import ENVIRONEMENT from "../environment";

const Config = {
    DEV: {
        URI: ENVIRONEMENT.URL.DEV
    },
    PRO: {
        URI: ENVIRONEMENT.URL.PRO
    }
}

let config = Config[ENVIRONEMENT.MODEL];

export default config;