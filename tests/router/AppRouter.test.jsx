import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { Provider } from "react-redux";
import { AppRouter } from "../../src/router/AppRouter";
import React from "react";
import { store } from "../../src/store";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";

jest.mock("../../src/hooks/useAuthStore");

jest.mock("../../src/calendar", () => {
    CalendarPage: () => <h1>CalendarPage</h1>
});

describe('Pruebas en >AppRouter />', () => {

    const mockCheckAuthToken = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {
        
        //configurando el estado
        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken,
        });

        render( 
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )

        //debido a que no reconoce los styles .css se debe configurar en el file jest.config.cjs
        //error en el modal: como no existe el elemento root en jest se debe ignorar el codigo de CalendarModal -> linea 26

        expect(screen.getByText('Cargando...')).toBeTruthy();
        expect(mockCheckAuthToken).toHaveBeenCalled();
      
    })

    test('Debe de mostrar el login en caso de no estar autenticado', () => {
        //configurando el estado
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken,
        });

        //snapshot
        const { container } = render( 
            <MemoryRouter initialEntries={['/auth2/algo/otracosa']}>
                <Provider store={store}>
                    <AppRouter />
                </Provider>
            </MemoryRouter>
        )

        expect(screen.getByText('Ingreso')).toBeTruthy();
        expect(container).toMatchSnapshot();
    })

    // test('Debe de mostrar el calendario si estamos autenticados', () => {
    //     //configurando el estado
    //     useAuthStore.mockReturnValue({
    //         status: 'authenticated',
    //         checkAuthToken: mockCheckAuthToken,
    //     });

    //     render( 
    //         <MemoryRouter>
    //             <Provider store={store}>
    //                 <AppRouter />
    //             </Provider>
    //         </MemoryRouter>
    //     );
    //     expect(screen.getByText('CalendarPage')).toBeTruthy();
    // })
    
    
    
  
})
