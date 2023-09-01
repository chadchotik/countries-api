import React, { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import SearchBar from "../../components/SearchBar.tsx";
import { COLORS } from '../../constants.tsx'
import DropdownMenu from "../../components/DropdownMenu.tsx";
import { useGetAllCountries } from "../../apis/Country/Country.ts";
import Grid from '@mui/material/Grid';
import DisplayCard from "../../components/DisplayCard.tsx";




interface HomePageInterface {
    lightModeEnabled: boolean;
}

const HomePage: React.FC<HomePageInterface> = ({ lightModeEnabled }) => {

    const [search, setSearch] = useState('')
    const [regionFilter, setRegionFilter] = useState('');
    const [displayCountries, setDisplayCountries] = useState([]);

    const options = [{ value: 'Africa', label: 'Africa' },
    { value: 'Americas', label: 'America' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' }]


    const countries = useGetAllCountries();

    useEffect(() => {
        document.title = "Countries API";
    }, []);

    useEffect(() => {
        setDisplayCountries(countries?.data);
    }, [countries])

    useEffect(() => {

        const filteredCountries = countries?.data.filter((country) => {
            return country?.name.toLowerCase().includes(search.toLowerCase()) && (regionFilter ? country?.region == regionFilter : true)
        })

        setDisplayCountries(filteredCountries);

    }, [search, regionFilter])

    return (
        <>
            {displayCountries ?

                <div className={styles.container} style={lightModeEnabled ? { backgroundColor: COLORS.LIGHT_MODE_BACKGROUND } : { backgroundColor: COLORS.DARK_MODE_BODY_BACKGROUND }}>
                    <div className={styles.toolBar}>
                        <SearchBar value={search} setValue={setSearch} lightModeEnabled={lightModeEnabled} placeholder="Search for a country..." />
                        <div style={{ marginLeft: 'auto' }}>
                            <DropdownMenu value={regionFilter} setValue={setRegionFilter} lightModeEnabled={lightModeEnabled} initialText={'Filter by Region'} options={options} />
                        </div>
                    </div>

                    <div className={styles.homePageBody}>
                        <Grid container spacing={8}>
                            {displayCountries?.map((country) =>

                                <Grid key={country?.name.common} item>
                                    <DisplayCard
                                        img={country?.flags?.png}
                                        name={country?.name}
                                        population={country?.population}
                                        region={country?.region}
                                        capital={country?.capital}
                                        lightModeEnabled={lightModeEnabled}
                                    />
                                </Grid>

                            )}
                        </Grid>

                    </div>
                </div> : <div className={styles.container} style={lightModeEnabled ? { backgroundColor: COLORS.LIGHT_MODE_BACKGROUND, color: COLORS.LIGHT_MODE_TEXT } : { backgroundColor: COLORS.DARK_MODE_BODY_BACKGROUND, color: COLORS.DARK_MODE_TEXT }} > Loading...</div>
            }
        </>
    );
}

export default HomePage;
