---
to: <%= absPath %>/<%= component_name %>.tsx
---
import React from 'react';
import classes from './<%= component_name %>.module.scss';

interface Props {}

export const <%= component_name %> = ({}: Props) => {
    return (
        <div className={classes.root}>
        </div>
    );
};
