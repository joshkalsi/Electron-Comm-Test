import React from 'react';
import classes from './Version.module.scss';

export const Version = () => {
    return (
        <div className={classes.root}>
            <p>Version {process.env.REACT_APP_VERSION}</p>
        </div>
    );
};
