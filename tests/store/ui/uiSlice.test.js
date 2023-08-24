import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice"

describe('Pruebas en uiSlice', () => {

    test('Debe de regresar el estado por defecto', () => {
        //estado del modal en falso por defecto    
        expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
    });

    test('Debe de cambiar el isDateModalOpen correctamente', () => {
        let state = uiSlice.getInitialState();
        //especificando el isDateModalOpen en open con el reducer onOpenDateModal
        state = uiSlice.reducer( state, onOpenDateModal );
        expect(state.isDateModalOpen).toBeTruthy();

        //especificando el isDateModalOpen en close con el reducer onCloseDateModal
        state = uiSlice.reducer( state, onCloseDateModal );
        expect(state.isDateModalOpen).toBeFalsy();
    })
    
    
  
})
