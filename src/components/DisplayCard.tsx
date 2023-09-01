import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { COLORS } from '../constants.tsx';
import { Link } from 'react-router-dom';

interface DisplayCardInterface {
    img?: string;
    name?: string;
    population?: number;
    region?: string;
    capital?: Array<string> | null;
    lightModeEnabled: boolean;
}



const DisplayCard: React.FC<DisplayCardInterface> = ({ img, name, population, region, capital, lightModeEnabled, ...props }) => {
    return (
        <Card sx={{ width: 200, boxShadow: lightModeEnabled ? COLORS.LIGHT_MODE_SHADOW : COLORS.DARK_MODE_SHADOW }}>
            <CardActionArea component={Link} to={`/${name}`}>
                <CardMedia
                    component="img"
                    height="140"
                    image={img}
                    alt={`Flag of ${name}`}
                />
                <CardContent sx={{ background: lightModeEnabled ? COLORS.LIGHT_MODE_BACKGROUND : COLORS.DARK_MODE_BACKGROUND, color: lightModeEnabled ? COLORS.LIGHT_MODE_TEXT : COLORS.DARK_MODE_TEXT, fontFamily: 'Nunito Sans' }}>
                    <div style={{ fontWeight: 800, paddingBottom: '10px' }}>{name ?? 'N/A'}</div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ fontWeight: 600, paddingRight: '5px' }}>Population:</div>
                        <div style={{ fontWeight: 300 }}>{population ?? 'N/A'}</div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ fontWeight: 600, paddingRight: '5px' }}>Region:</div>
                        <div style={{ fontWeight: 300 }}>{region ?? 'N/A'}</div>
                    </div>
                    <div style={{ display: 'flex', paddingBottom: '15px' }}>
                        <div style={{ fontWeight: 600, paddingRight: '5px' }}>Capital:</div>
                        <div style={{ fontWeight: 300 }}>{capital ?? 'N/A'}</div>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default DisplayCard;
