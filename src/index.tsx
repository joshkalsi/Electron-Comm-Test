import React from 'react';
import ReactDOM from 'react-dom';
import path from 'path-browserify';

import 'normalize.css';
import './index.scss';

import App from './App';
import { HashRouter } from 'react-router-dom';

// Load correct config path - uses the build/config.json file for development, but the external resource config.json file when packaged. This is important as otherwise it would otherwise use the build/config.json file when packaged, which is not editable, removing the ability to make changes without a full rebuild.

async function getConfigPath() {
    let baseResourcePath: string;
    let configPath: string;

    if (process.env.NODE_ENV !== 'production') {
        configPath = path.join(__dirname, '/config/config.json');
        baseResourcePath = './';
    } else {
        baseResourcePath = await window.electronAPI.getExternalResourcePath();
        configPath = path.join(baseResourcePath, '/config/config.json');
    }

    const assetPath = path.join(baseResourcePath, 'assets/');

    fetch(configPath)
        .then((res) => res.json())
        .then((data) => {
            ReactDOM.render(
                <React.StrictMode>
                    <HashRouter>
                        <App config={data} externalAssetPath={assetPath} />
                    </HashRouter>
                </React.StrictMode>,
                document.getElementById('root')
            );
        });
}

getConfigPath();
