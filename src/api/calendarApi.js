import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';


const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});


//cualquier peticion que se haga, se coloca en el header, para verificarla autenticacion del usuario
calendarApi.interceptors.request.use( config => {

    config.headers = {
        ...config.header, //mantener todos los header que esten configurados anteriormente
        'x-token': localStorage.getItem('token'),
    }

    return config;
});

export default calendarApi;