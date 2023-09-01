import React from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon as moonDarkMode } from '@fortawesome/free-solid-svg-icons';
import { faMoon as moonLightMode } from '@fortawesome/free-regular-svg-icons';
import { COLORS } from '../../constants.tsx'

interface HeaderInterface {
    lightModeEnabled: boolean;
    setLightModeEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<HeaderInterface> = ({ lightModeEnabled, setLightModeEnabled, ...props }) => {

    const handleModeClick = () => {
        setLightModeEnabled(!lightModeEnabled);
    }


    return (
        <div className={styles.header} style={lightModeEnabled ? { backgroundColor: COLORS.LIGHT_MODE_BACKGROUND, boxShadow: COLORS.LIGHT_MODE_SHADOW, color: COLORS.LIGHT_MODE_TEXT } : { backgroundColor: COLORS.DARK_MODE_BACKGROUND, boxShadow: COLORS.DARK_MODE_SHADOW, color: COLORS.DARK_MODE_TEXT }}>
            <div className={styles.headerMainText}>Where in the world?</div>
            <div className={styles.textModeContainer}>
                <div className={styles.textModeIcon}><FontAwesomeIcon icon={lightModeEnabled ? moonLightMode : moonDarkMode} /></div>
                <div className={styles.textModeText} onClick={handleModeClick}> Dark Mode</div>
            </div>
        </div>
    );
}

export default Header;
