import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en calendarSlice', () => {

    test('Debe de regresar el estado por defecto', () => {
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
    });

    test('onSetActiveEvent debe de activar el evento ', () => {
        const state = calendarSlice.reducer( calendarWithEventState, onSetActiveEvent( events[0] ) );
        expect(state.activeEvent).toEqual(events[0]);
    });

    test('onAddNewEvent debe de agregar el evento', () => {
        const newEvent = {
            id: '3',
            title: 'Cumpleaños 3',
            notes: 'Comprar el pastel 3',
            start: new Date('2023-08-20 13:00:00'),
            end: new Date('2023-08-20 15:00:00'),
        };

        const state = calendarSlice.reducer( calendarWithEventState, onAddNewEvent( newEvent ) );
        expect(state.events).toEqual([ ...events, newEvent ]);
    });

    test('onUpdateEvent debe de actualizar el evento', () => {
        const updatedEvent = {
            id: '1',
            title: 'Cumpleaños 1 actualizado',
            notes: 'Comprar el pastel actualizado',
            start: new Date('2023-08-25 13:00:00'),
            end: new Date('2023-08-25 15:00:00'),
        };

        const state = calendarSlice.reducer( calendarWithEventState, onUpdateEvent( updatedEvent ) );
        //otra forma de confirmar si el evento esta en los objetos events
        expect(state.events).toContain( updatedEvent );
    });


    test('onDeleteEvent debe de borrar el evento activo', () => {
        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
        expect(state.activeEvent).toBe(null);
        expect(state.events).not.toContain( events[0] );
    });

    test('onLoadEvents debe de establecer los eventos', () => {
        const state = calendarSlice.reducer( initialState, onLoadEvents( events ) );
        expect(state.isLoadingEvents).toBeFalsy();
        expect(state.events).toEqual(events);

        const newState = calendarSlice.reducer( state, onLoadEvents( events ) );
        expect(state.events.length).toBe(2);
    });

    test('onLogoutCalendar debe de limpiar el estado', () => {
        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar( ) );
        expect(state).toEqual(initialState);
    });
    
    
    



    
    
    


    
})
