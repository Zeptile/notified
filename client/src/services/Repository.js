import axios from 'axios';

const baseURL = 'http://localhost:9982/api';

export default axios.create({
    baseURL
})
