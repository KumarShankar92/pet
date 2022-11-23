'use strict';

import React from 'react';
import classNames from 'classnames';
import Label from '../Label/Label';
import _ from 'lodash';

const Input = (props) => {

    const inputClassesDefault = {
        'border': true,
        'tracking-wide': true,
        'focus:border-b': true,
        'text-xs': true,
        'border-gray-200': true,
        'rounded': true,
        'outline-blue-500':true,
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
                <input
                    {...props}
                    className={inputClasses}
                    >
                        
                </input>
            </div>
        </div>

    )
}

export default Input;