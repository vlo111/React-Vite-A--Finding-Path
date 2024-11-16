declare module '*.svg' {
    import * as React from 'react';

    // For React Components
    export const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;

    // For String Imports
    const src: string;
    export default src;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly PORT: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
