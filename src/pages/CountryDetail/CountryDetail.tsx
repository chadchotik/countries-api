import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from './CountryDetail.module.css'
import { Button } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useGetCountryDetails, useGetCountryDetailsByCode } from "../../apis/Country/Country.ts";
import Grid from '@mui/material/Grid';
import { COLORS } from '../../constants.tsx';

interface CountryDetailInterface {
    lightModeEnabled: boolean;
}



const CountryDetail: React.FC<CountryDetailInterface> = ({ lightModeEnabled }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [displayCountry, setDisplayCountry] = useState(null);
    const countryDetails = useGetCountryDetails(id);
    const countryDetailsByCode = useGetCountryDetailsByCode(id);

    useEffect(() => {
        document.title = `Countries - ${displayCountry?.name}`;
    }, [displayCountry]);

    useEffect(() => {
        if (countryDetailsByCode?.data) setDisplayCountry(countryDetailsByCode.data)
        else if (countryDetails?.data) setDisplayCountry(countryDetails.data[0])
    }, [countryDetails, countryDetailsByCode]);



    const handleOnBackClick = () => {
        navigate("/");
    }

    const handleOnBorderClick = (country: string) => {
        navigate(`/${country}`);
    }

    const createDataEntry = (label: string, value: any) => {
        return <div style={{ display: 'flex', fontSize: 12, marginBottom: 5 }}>
            <div style={{ fontWeight: 600, paddingRight: '5px' }}>{label}</div>
            <div style={{ fontWeight: 300 }}>{value}</div>
        </div>
    }

    const formatCurrency = (currencies: Array<{ name: string }>) => {
        const formattedCurrencies = currencies.map((currency) => currency.name).join(', ')
        return formattedCurrencies;
    }

    const formatLanguages = (languages: Array<{ name: string }>) => {
        const formattedLanguages = languages.map((language) => language.name).join(', ')
        return formattedLanguages;
    }

    return (
        <div className={styles.container} style={lightModeEnabled ? { backgroundColor: COLORS.LIGHT_MODE_BACKGROUND } : { backgroundColor: COLORS.DARK_MODE_BODY_BACKGROUND }}>
            <div className={styles.toolBar}>
                <Button onClick={handleOnBackClick} variant="contained" style={{ width: '100px', boxShadow: lightModeEnabled ? COLORS.LIGHT_MODE_SHADOW : COLORS.DARK_MODE_SHADOW, textTransform: 'none', backgroundColor: lightModeEnabled ? COLORS.LIGHT_MODE_BACKGROUND : COLORS.DARK_MODE_BACKGROUND, fontFamily: 'Nunito Sans' }}>
                    <FontAwesomeIcon style={{ color: lightModeEnabled ? 'black' : 'white' }} icon={faArrowLeft} />
                    <div className={styles.buttonText} style={{ color: lightModeEnabled ? COLORS.LIGHT_MODE_TEXT : COLORS.DARK_MODE_TEXT }}>Back</div>
                </Button>

            </div>

            {displayCountry ? <div className={styles.detailsBody} style={{ color: lightModeEnabled ? COLORS.LIGHT_MODE_TEXT : COLORS.DARK_MODE_TEXT }}>

                <img src={displayCountry?.flags.png}></img>

                <div className={styles.detailsTextBody}>
                    <div style={{ fontWeight: 800, paddingBottom: '10px' }}>{displayCountry.name}</div>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            {createDataEntry('Native Name:', displayCountry.nativeName ?? 'N/A')}
                            {createDataEntry('Population:', displayCountry.population ?? 'N/A')}
                            {createDataEntry('Region:', displayCountry.region ?? 'N/A')}
                            {createDataEntry('Sub Region:', displayCountry.subregion ?? 'N/A')}
                            {createDataEntry('Capital:', displayCountry.capital ?? 'N/A')}
                        </Grid>




                        <Grid item xs={6}>
                            {displayCountry.topLevelDomain.length > 0 ? createDataEntry('Top Level Domain:', displayCountry.topLevelDomain.join(', ')) : createDataEntry('Top Level Domain:', 'N/A')}
                            {displayCountry.currencies.length > 0 ? createDataEntry('Currencies:', formatCurrency(displayCountry.currencies)) : createDataEntry('Currencies:', 'N/A')}
                            {displayCountry.languages.length > 0 ? createDataEntry('Languages:', formatLanguages(displayCountry.languages)) : createDataEntry('Languages:', 'N/A')}
                        </Grid>





                    </Grid>

                    <div className={styles.bordersContainer}>
                        <div className={styles.bordersEntry}>
                            <div className={styles.bordersText}>Border Countries:</div>
                            <div>
                                {displayCountry?.borders?.length > 0 ?
                                    displayCountry?.borders.map((country) => <Button key={country} onClick={() => handleOnBorderClick(country)} variant="contained" style={{ height: '25px', margin: '5px 10px', boxShadow: lightModeEnabled ? COLORS.LIGHT_MODE_SHADOW : COLORS.DARK_MODE_SHADOW, textTransform: 'none', color: lightModeEnabled ? COLORS.LIGHT_MODE_TEXT : COLORS.DARK_MODE_TEXT, backgroundColor: lightModeEnabled ? COLORS.LIGHT_MODE_BACKGROUND : COLORS.DARK_MODE_BACKGROUND, fontFamily: 'Nunito Sans' }}>{country} </Button>)
                                    : <div>None</div>
                                }
                            </div>
                        </div>
                    </div>

                </div>



            </div> : <div className={styles.detailsBody} style={{ color: lightModeEnabled ? COLORS.LIGHT_MODE_TEXT : COLORS.DARK_MODE_TEXT }}>Country not found</div>
            }


        </div >
    );
}

export default CountryDetail;
