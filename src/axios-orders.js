import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-58e4d.firebaseio.com/'
})

export default instance;