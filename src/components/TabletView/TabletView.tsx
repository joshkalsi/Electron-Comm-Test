import React from 'react';
import classes from './TabletView.module.scss';

export const TabletView = () => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        if (window.electronAPI) {
            window.electronAPI.onTabletWindowReceive(
                (event, message: string) => {
                    console.log(message);

                    if (textareaRef.current) {
                        textareaRef.current.value = message;
                    }
                }
            );
        }
    }, []);
    return (
        <div className={classes.root}>
            <h1>Tablet</h1>

            <textarea
                name="tabletText"
                id="tabletText"
                cols={30}
                rows={10}
                ref={textareaRef}
            ></textarea>
            <button
                onClick={() => {
                    const message =
                        textareaRef.current?.value || 'no text typed';
                    if (window.electronAPI) {
                        window.electronAPI.sendToMainWindow(message);
                    }
                }}
            >
                Send to main
            </button>
        </div>
    );
};
