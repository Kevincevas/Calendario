
import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

// const temEvent = {
//     _id: new Date().getTime(),
//     title: 'Cumpleaños',
//     notes: 'Comprar el pastel',
//     start: new Date(),
//     end: addHours( new Date(), 2 ),
//     bgColor: '#fafafa',
//     user: {
//       _id: '123',
//       name: 'Kevin',
//     }
// }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [ 
            //temEvent 
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, {payload}) => {
            state.events.push( payload );
            state.activeEvent = null //limpiando la nota 
        },
        onUpdateEvent: (state, {payload}) => {
            state.events = state.events.map( event => {
                if( event.id === payload.id ){
                    return payload;
                }

                return event;
            })
        },
        onDeleteEvent: (state) => {
            if( !state.activeEvent ) return;
            state.events = state.events.filter( event => event.id !== state.activeEvent.id );
            state.activeEvent = null
        },
        onLoadEvents: ( state,{payload=[] }) => {
            state.isLoadingEvents = false;
            //cargando los eventos en el payload
            //state.events = payload;
            payload.forEach(event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id );
                if (!exists) {
                    state.events.push( event );
                }
            });
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents= true,
            state.events= [],
            state.activeEvent= null
        }
        
    },
});

export const { 
    onSetActiveEvent,
    onAddNewEvent, 
    onUpdateEvent, 
    onDeleteEvent, 
    onLoadEvents,
    onLogoutCalendar,
} = calendarSlice.actions;