import React from 'react';

import Example from '@pages/Example';
import { Route, Routes } from 'react-router-dom';
import MainView from '@components/MainView';
import TabletView from '@components/TabletView';

declare global {
    interface Window {
        electronAPI: {
            getExternalResourcePath: () => Promise<string>;
            sendToMainWindow: (message: string) => Promise<string>;
            sendToTabletWindow: (message: string) => Promise<string>;
            onMainWindowReceive: (callback: (event, message) => void) => void;
            onTabletWindowReceive: (callback: (event, message) => void) => void;
        };
        externalAssetPath: string;
    }
}

interface AppProps {
    config: {
        examplePage: {
            title: string;
            description: string;
        };
    };
    externalAssetPath: string;
}

const App = ({ config, externalAssetPath }: AppProps) => {
    window.externalAssetPath = externalAssetPath;

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={<Example config={config.examplePage} />}
                />
                <Route path="/main" element={<MainView />} />
                <Route path="/tablet" element={<TabletView />} />
            </Routes>
        </div>
    );
};

export default App;
