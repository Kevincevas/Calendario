
export const initialState = {
    status: 'checking', // 'authenticated' , 'not-authenticated'
    user: {},
    errorMessage: undefined,
}

export const authenticatedState = {
    status: 'authenticated', // 'authenticated' , 'not-authenticated'
    user: {
        uid: 'ABC',
        name:'Kevin'
    },
    errorMessage: undefined,
}

export const noAuthenticatedState = {
    status: 'not-authenticated', // 'authenticated' , 'not-authenticated'
    user: {},
    errorMessage: undefined,
}
