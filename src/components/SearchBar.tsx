import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { COLORS } from "../constants.tsx";
import { LightModeContext } from "../context/LightModeContext.js";



interface SearchBarInterface {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
}

const StyledSearhBar = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        fontFamily: 'Nunito Sans',
    },
});

const SearchBar: React.FC<SearchBarInterface> = ({ value, setValue, ...props }) => {

    const { lightModeEnabled } = React.useContext(LightModeContext);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <StyledSearhBar
            value={value}
            onChange={handleOnChange}
            placeholder="Search..."
            sx={{
                minWidth: '200px',
                maxWidth: '400px',
                flexGrow: 1,
                boxShadow: lightModeEnabled ? COLORS.LIGHT_MODE_SHADOW : COLORS.DARK_MODE_SHADOW,
                borderRadius: '4px',
                backgroundColor: lightModeEnabled ? COLORS.LIGHT_MODE_BACKGROUND : COLORS.DARK_MODE_BACKGROUND,
                input: { color: lightModeEnabled ? COLORS.LIGHT_MODE_TEXT : COLORS.DARK_MODE_TEXT, fontSize: '12px' },
                "& fieldset": { border: 'none' },

            }}
            InputProps={{
                startAdornment: <FontAwesomeIcon style={{ color: lightModeEnabled ? 'gray' : 'white', marginRight: '10px' }} icon={faSearch} />,
            }}
            {...props}
        />


    );
}

export default SearchBar;
