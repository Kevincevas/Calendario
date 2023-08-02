import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/";



export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {
        
        if( calendarEvent._id ){
            //actualizando
            dispatch( onUpdateEvent( { ...calendarEvent } ) );
            console.log('actualizando')

        } else {
            //creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
            
            
        }
    }

    const startDeletingEvent = () => {
        //todo: llegar la backend
        dispatch( onDeleteEvent() );
    }
  
  
    return {
        //Propiedades
        activeEvent,
        events,
        hasEventSelectd: !!activeEvent,

        //Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}

