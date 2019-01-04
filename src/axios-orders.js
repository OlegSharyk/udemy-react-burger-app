import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://os-react-burger-app.firebaseio.com/'
})

export default instance;