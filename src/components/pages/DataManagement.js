import { useState, useEffect, useRef, memo } from 'react';

function DataManagement() {
    // Page Title
    useEffect(() => {
        document.title = "Data Management";
    }, []);

    return <h1>Data Management Page</h1>;
}

export default DataManagement;