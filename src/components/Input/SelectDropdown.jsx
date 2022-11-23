'use strict';

import React from 'react';
import classNames from 'classnames';
import Label from '../Label/Label';
import _ from 'lodash';

const SelectDropdown = (props) => {
    const inputClassesDefault = {
        'border': true,
        'tracking-wide': true,
        'focus:border-b': true,
        'text-xs': true,
        'border-gray-200': true,
        'outline-blue-500':true,
        'rounded': true,
        'py-2': true,
        'px-2': true,
        'w-full': true
    };

    const inputClassesOverride = _.get(props, 'customClasses', {});

    const inputClasses = classNames({
        ...inputClassesDefault,
        ...inputClassesOverride
    });

    return (
        <div className='flex-col'>
            <div>
                <Label value={props.label || ''} />
            </div>
            <div className='mt-1'>
                <select 
                    name={props.label}
                    id={props.label}
                    placeholder={props.placeholder}
                    value={props.value} 
                    className={inputClasses}
                    onChange={(e) => {
                        props.onChange(e.target.value);
                    }} 
                >
                    {
                        props.items.map((item, i) => {
                            return (
                                <option key={i} value={item.value}>{item.label}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>

    )
}

export default SelectDropdown;