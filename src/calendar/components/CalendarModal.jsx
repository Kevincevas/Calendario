import { addHours, differenceInSeconds } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from 'react-modal'

import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks/';
import { getEnvVariables } from '../../helpers';
registerLocale('es',es)

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

if (getEnvVariables().VITE_MODE !== 'test' ){
    Modal.setAppElement('#root');
}

export const CalendarModal = (event) => {
    
    const { isDateModalOpen, closeDateModal }= useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2 ), //añadiendo dos horas a la fecha actual
    });


    //memorizando los valores si el title o formSubmitted cambian
    const titleClass = useMemo(() => {

        //si el formulario no se ha disparado, regresa un string vacio en la clase
        if( !formSubmitted ) return '';
        
        return ( formValues.title.length > 0 )
            ? ''
            : 'is-invalid'

    }, [ formValues.title, formSubmitted ]);


    //visualizar en el modal el evento seleccionado
    useEffect(() => {
      if( activeEvent !== null ) {
        //pasando las propiedades y creando un nuevo objeto
        setFormValues({ ...activeEvent });
      }
    }, [ activeEvent ])
    

    
    const onInputChanged = ({target}) => {
        setFormValues({
            //indica que se va a sobreescribir el valor de target.name, los demas valores no se sobreescribira
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        closeDateModal();
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        setFormSubmitted(true);

        //validar que la fecha final siempre sea mayor que la inicial
        const difference = differenceInSeconds(formValues.end, formValues.start);

        if ( isNaN( difference ) || difference <= 0 ){
            Swal.fire('Fechas Incorrectas','Revisar las fechas ingresadas','error');
            return;
        }

        if( formValues.title.length <= 1 ) {
            Swal.fire('Título Incorrecto','Revisar el título','error');
            return;
        };


        console.log(formValues)

        //guardando la nueva nota
        await startSavingEvent( formValues );
        closeDateModal();
        setFormSubmitted(false);
    }

    

    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={customStyles}
            //contentLabel="Example Modal"
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200} //cerrar el modal en milisegundos
        >
            <div className="navbar mb-2 px-4">
                <h1> Nuevo evento </h1>
                <button className='btn btn-outline' style={{ color:'red' }} onClick={onCloseModal}><i className='fa fa-close fa-2xl'></i></button>
            </div>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <br />
                    <DatePicker
                        locale='es'
                        timeCaption='Hora'
                        selected={ formValues.start }
                        onChange={ (event) => onDateChanged(event, 'start') }
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <br />
                    <DatePicker
                        locale='es'
                        timeCaption='Hora'
                        minDate={ formValues.start }
                        selected={ formValues.end }
                        onChange={ (event) => onDateChanged(event, 'end') }
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                    />
                </div>
                
                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className= {`form-control ${ titleClass }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChanged }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChanged }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                    
                </button>

            </form>

        </Modal>
    )
}
