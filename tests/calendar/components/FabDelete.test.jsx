import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import React from "react";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

jest.mock('../../../src/hooks/useCalendarStore')

describe('Prueba en FabDelete', () => {

    const mockStartDeletingEvent = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrar el componente correctamente', () => {
        
        //configurando el estado del fab
        useCalendarStore.mockReturnValue({
            hasEventSelectd: false,
        });

        //renderizar el componente
        render(
            <Provider store={store}>
                <FabDelete />
            </Provider>
        );
        
        const btn = screen.getByLabelText('btn-delete');
        //console.log(btn.classList.toString());
        expect(btn.classList).toContain('btn');
        expect(btn.classList).toContain('btn-danger');
        expect(btn.classList).toContain('fab-danger');
        expect(btn.style.display).toBe('none');
    })

    test('Debe de mostrar el boton si hay un evento activo', () => {
        
                //configurando el estado del fab

        useCalendarStore.mockReturnValue({
            hasEventSelectd: true,
        });

        //renderizar el componente
        render(
            <Provider store={store}>
                <FabDelete />
            </Provider>
        );

        const btn = screen.getByLabelText('btn-delete');
        //console.log(btn.classList.toString());
        expect(btn.style.display).toBe('');
    })

    test('Debe de llamar startDeletingEvent si hay evento activo', () => {
        
        useCalendarStore.mockReturnValue({
            hasEventSelectd: true,
            startDeletingEvent: mockStartDeletingEvent
        });

        //renderizar el componente
        render(
            <Provider store={store}>
                <FabDelete />
            </Provider>
        );

        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click( btn );
        expect(mockStartDeletingEvent).toHaveBeenCalledWith()

    })
    
})
