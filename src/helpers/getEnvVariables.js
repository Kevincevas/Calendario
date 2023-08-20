

export const getEnvVariables = () => {

    //import.meta.env;

    return {
        //solucion al problema en el build
        VITE_API_URL: import.meta.env.VITE_API_URL
        //...import.meta.env
    }
}