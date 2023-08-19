import React, {useEffect, useState} from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../'

import { localizer, getMessagesEs } from '../../helpers/';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';



export const CalendarPage = () => {

  const {user} = useAuthStore();

  const { openDateModal, closeDateModal } = useUiStore();
  //llamando los eventos del calendar del store
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' )

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)
    
    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style,
    }
  }

  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    // console.log({ click: event })
    setActiveEvent( event );
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
  }

  //cargando los eventos
  useEffect(() => {
    startLoadingEvents();  
  }, []) //[] vacio quiere decir que se disparará una vez
  


  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal />

      {/* FAB agregar evento */}
      <FabAddNew />
      {/* FAB eliminar evento */}
      <FabDelete />
    </>
  )
}
