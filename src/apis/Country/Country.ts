import { useQuery } from "@tanstack/react-query";
import axios from 'axios'


export const useGetAllCountries = () => {
    const { data } = useQuery(['get-all-countries'], () => {
        return axios.get('https://restcountries.com/v2/all?fields=name,population,region,capital,flags')
    })
    return data;
}

export const useGetCountryDetails = (id: any) => {
    const { data } = useQuery(['get-country', id], () => {
        return axios.get(`https://restcountries.com/v2/name/${id}?fullText=true&fields=name,nativeName,population,region,subregion,capital,topLevelDomain,currencies,languages,borders,flags`)
    })
    return data;
}

export const useGetCountryDetailsByCode = (id: any) => {
    const { data } = useQuery(['get-country-by-code', id], () => {
        return axios.get(`https://restcountries.com/v2/alpha/${id}?fields=name,nativeName,population,region,subregion,capital,topLevelDomain,currencies,languages,borders,flags`)
    })
    return data;
}