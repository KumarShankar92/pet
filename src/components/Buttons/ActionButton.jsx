'use strict';

import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
const ActionButton = (props) => {

    const classesDefault = {
        'px-2' : true,
        'py-4' : true,
        'tracking-wide' : true,
        'bg-blue-400' : true, 
        'rounded': true,
        'active:bg-blue-500' : true,
        'w-full' : true,
        'text-white' : true,
        'shadow-sm' : true,
        'hover:shadow-md' : true,
        'active:shadow-sm' : true,
        'disabled:opacity-50': true
    };

    const classesOverride = _.get(props, 'customClasses', {});

    const classes = classNames({
        ...classesDefault,
        ...classesOverride
    })

    const getLabel = () => {
        if (props.loading) {
            return props.loadingText || props.label;
        }
        return props.label;
    }

    return (
        <button 
            onClick={(event) => {
                if (props.onClick) {
                    props.onClick(event);
                }
            }}
            disabled={props.disabled || props.loading}
            className={classes}>
            {getLabel()}
        </button>
    )
}

export default ActionButton;