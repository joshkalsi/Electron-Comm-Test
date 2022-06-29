import React from 'react';

import classes from './Example.module.scss';

import Version from '@components/Version';

interface ExampleProps {
    config: {
        title: string;
        description: string;
    };
}

export const Example = ({ config }: ExampleProps) => {
    return (
        <div className={classes.root}>
            <img
                className={classes.logo}
                src={window.externalAssetPath + 'jp-logo.svg'}
                alt=""
            />
            <h1 className={classes.title}>{config.title}</h1>
            <p className={classes.description}>{config.description}</p>

            <Version />
        </div>
    );
};
