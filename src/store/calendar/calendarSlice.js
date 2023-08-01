
import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const temEvent = {
    title: 'Cumpleaños',
    notes: 'Comprar el pastel',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Kevin',
    }
  }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [ temEvent ],
        activeEvent: null
    },
    reducers: {
        increment: (state, ) => {
            state.counter += 1;
        },
        
    },
});

export const { increment } = calendarSlice.actions;