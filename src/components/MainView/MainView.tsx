import React from 'react';
import classes from './MainView.module.scss';

export const MainView = () => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        if (window.electronAPI) {
            window.electronAPI.onMainWindowReceive((event, message: string) => {
                console.log(message);
                if (textareaRef.current) {
                    textareaRef.current.value = message;
                }
            });
        }
    }, []);
    return (
        <div className={classes.root}>
            <h1>Main</h1>

            <textarea
                name="MainText"
                id="MainText"
                cols={30}
                rows={10}
                ref={textareaRef}
            ></textarea>
            <button
                onClick={() => {
                    const message =
                        textareaRef.current?.value || 'no text typed';
                    if (window.electronAPI) {
                        window.electronAPI.sendToTabletWindow(message);
                    }
                }}
            >
                Send to tablet
            </button>
        </div>
    );
};
