const environement = {
    host: {
        uri: 'http://localhost',
        port: 5000
    },
    api: {
        auth: {
            signin: "api/admin/auth"
        }
    },

    URL: {
        DEV: 'http://localhost:5000/api/',
        PRO: 'https://ecommercebe-5bbc136621ec.herokuapp.com/api/'
    },
    MODEL: 'PRO' // DEV
}
export default environement;