'use strict';

import React, {  useState } from 'react';
import _ from 'lodash';
import ActionButton from '../Buttons/ActionButton';
import Label from '../Label/Label';
import Input from '../Input/Input';
import InputArea from '../Input/InputArea';
import SelectDropdown from '../Input/SelectDropdown';
import { Modal } from 'react-responsive-modal';
import { setData } from '../../store/Actions';
import 'react-responsive-modal/styles.css';
import { useDispatch } from 'react-redux';
const ActionModal = (props) => {
    const dispatch = useDispatch();
    var [values, setValues] = useState({});
    if (!props.show) {
        return null;
    }
    if(!_.isEmpty(props.editData)){
        values=props.editData
    }
    const SetTypeText = (newValue) => {
        setValues(newValue);
        dispatch(setData({ petData: newValue }));
    }
    return (
        <Modal open={props.show} onClose={props.onClose} center>
            <h2 className='text-lg mb-2'>{props.title}</h2>
            <div className="flex flex-wrap -mx-3 mb-6">
                {
                    _.isArray(props.body) ? (
                        props.body.map((item, i) => {
                            return (

                                <div key={i} className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                                    <Label value={item.label} />
                                    {item.inputType === 'inputBox' ? <Input value={item.value} placeholder={item.placeHolder} onChange={(e) => {
                                        item.value=e.target.value
                                        console.log(values)
                                        const newValues = {
                                            ...values,
                                            [item.label]: e.target.value
                                        }
                                        SetTypeText(newValues);
                                    }} /> :item.inputType === 'selectBox'? <SelectDropdown
                                    items={item.data}
                                    value={item.value}
                                    placeholder={item.placeHolder}
                                    onChange={(value) => {
                                        item.value=value
                                        const newValues = {
                                            ...values,
                                            [item.label]: value
                                        }
                                        SetTypeText(newValues);
                                    }}
                                />: <InputArea value={item.value} placeholder={item.placeHolder} onChange={(e) => {
                                        item.value=e.target.value
                                        const newValues = {
                                            ...values,
                                            [item.label]: e.target.value
                                        }
                                        SetTypeText(newValues);
                                    }} />}
                                    {/* <br /> */}
                                </div>

                            )
                        })
                    ) : (<Label value={props.body} />)
                }
            </div>
            <div className='mt-4 text-center'>
                                <ActionButton
                                    onClick={props.onClicked}
                                    customClasses={{
                                        'w-full': false,
                                        'px-6': true,
                                        'py-4': false,
                                        'py-2': true,
                                        'mr-4': true,
                                        'text-sm': true
                                    }}
                                    label={props.buttonLabel}
                                /> 
                        
            </div>
        </Modal>

    )
}

export default ActionModal;