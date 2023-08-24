
export const events = [
    {
        id: '1',
        title: 'Cumpleaños mio',
        notes: 'Comprar el pastel',
        start: new Date('2023-08-20 13:00:00'),
        end: new Date('2023-08-20 15:00:00'),
    },
    {
        id: '2',
        title: 'Cumpleaños de alguien mas',
        notes: 'Comprar el pastel para alguien mas',
        start: new Date('2023-12-20 13:00:00'),
        end: new Date('2023-12-20 15:00:00'),
    }
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0] }
}