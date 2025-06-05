import { useState, useEffect, useRef, memo } from 'react';

function ViewCharacters() {
    // Page Title
    useEffect(() => {
        document.title = "View Characters";
    }, []);

    return <h1>View Characters Page</h1>;
}

export default ViewCharacters;