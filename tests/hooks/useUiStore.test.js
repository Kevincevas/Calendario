import {renderHook, act} from '@testing-library/react'
import { useUiStore } from '../../src/hooks/useUiStore'
import { Provider } from 'react-redux';
import { store, uiSlice } from '../../src/store';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';

const getMockStore = ( initialState ) => {

    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    });
};

describe('Pruebas en useUiStore', () => {
    
    test('Debe de regresar los valores por defecto', () => {
        const mockStore = getMockStore( { isDateModalOpen: false } );
        const {result} = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        } );
        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function)
        })

    });

    test('openDateModal debe de colocar true en el isDateModalOpen', () => {
        
        const mockStore = getMockStore( { isDateModalOpen: false } );
        const {result} = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        } );

        const { openDateModal } = result.current;

        act( () => {
            openDateModal();
        });
        expect( result.current.isDateModalOpen ).toBeTruthy();

    });

    test('closeDateModal debe de colocar false en isDateModalOpen', () => {
        const mockStore = getMockStore( { isDateModalOpen: true } );
        const {result} = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        } );

        const { closeDateModal } = result.current;

        act( () => {
            closeDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();

    });

    test('toggleDateModal debe cambiar el estado respectivamente', () => {
        const mockStore = getMockStore( { isDateModalOpen: true } );
        const {result} = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        } );

        const { toggleDateModal } = result.current;

        act( () => {
            toggleDateModal();
        });
        console.log(result.current)

        expect( result.current.isDateModalOpen ).toBeFalsy();

    });
    
    
    
})