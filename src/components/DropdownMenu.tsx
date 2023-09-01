import React from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { COLORS } from '../constants.tsx'


interface DropdownMenuInterface {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    lightModeEnabled: boolean;
    initialText?: string;
    options?: Array<{ value: any, label: string; }>;
}


const DropdownMenu: React.FC<DropdownMenuInterface> = ({ value, setValue, lightModeEnabled, initialText, options, ...props }) => {

    const handleChange = (event: SelectChangeEvent<string>) => {
        setValue(event.target.value)
    }


    return (
        <Select
            value={value}
            displayEmpty
            onChange={handleChange}
            inputProps={{ 'aria-label': 'Without label' }}

            sx={{
                width: '200px',
                boxShadow: lightModeEnabled ? COLORS.LIGHT_MODE_SHADOW : COLORS.DARK_MODE_SHADOW,
                borderRadius: '4px',
                backgroundColor: lightModeEnabled ? COLORS.LIGHT_MODE_BACKGROUND : COLORS.DARK_MODE_BACKGROUND,
                color: lightModeEnabled ? COLORS.LIGHT_MODE_TEXT : COLORS.DARK_MODE_TEXT,
                fontSize: '12px',
                fontFamily: 'Nunito Sans',
                "& fieldset": { border: 'none' },
                " .MuiSvgIcon-root": { color: lightModeEnabled ? 'black' : 'white' }
            }}
            MenuProps={{
                sx: {
                    "&& .MuiPaper-root": {
                        color: lightModeEnabled ? COLORS.LIGHT_MODE_TEXT : COLORS.DARK_MODE_TEXT,
                        backgroundColor: lightModeEnabled ? COLORS.LIGHT_MODE_BACKGROUND : COLORS.DARK_MODE_BACKGROUND
                    },
                    "&& .MuiMenuItem-root": {
                        fontSize: '12px',

                    }
                }
            }}

            {...props}
        >
            <MenuItem value="">{initialText ? initialText : 'Select an option'}</MenuItem>
            {options && options.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}

        </Select>

    );
}

export default DropdownMenu;
