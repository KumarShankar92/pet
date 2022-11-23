'use strict';

import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

const Label = (props) => {

    const classesDefault = {
        'tracking-wide': true,
        'text-xs': true,
        'text-gray-400': props.hint,
        'leading-none': true
    };

    const classesOverride = _.get(props, 'customClasses', {});

    const classes = classNames({
        ...classesDefault,
        ...classesOverride
    })

    return (
        <label
            {...props}
            className={classes}>
            {props.value}
        </label>
    )
}

export default Label;