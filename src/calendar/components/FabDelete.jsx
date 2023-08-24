import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks';


export const FabDelete = () => {
  const { isDateModalOpen, closeDateModal }= useUiStore();

  const { startDeletingEvent, hasEventSelectd } = useCalendarStore();

    const handleClickDelete = () => {
      startDeletingEvent();
    }

  return (
    <button
        aria-label='btn-delete'
        className='btn btn-danger fab-danger'
        onClick={ handleClickDelete }
        style={{
          display: hasEventSelectd && !isDateModalOpen ? '' : 'none'
        }}
    >
        <i className='fas fa-trash-alt'></i>
    </button>
  )
}
