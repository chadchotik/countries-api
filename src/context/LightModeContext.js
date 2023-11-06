import React, { useState } from 'react';

const LightModeContext = React.createContext();

function LightModeProvider(props) {
    const [lightModeEnabled, setLightModeEnabled] = useState(false);
    const toggleLightMode = () => {
        setLightModeEnabled(!lightModeEnabled);
    }

    return (
        <div>
            <LightModeContext.Provider value={{ lightModeEnabled, toggleLightMode }}>
                {props.children}
            </LightModeContext.Provider>
        </div>
    )
}

export { LightModeContext, LightModeProvider }