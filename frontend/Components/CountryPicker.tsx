import {List, ListItem, Typography} from "@material-tailwind/react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {CountryEndpoint} from "Frontend/generated/endpoints";

import {useLanguageContext} from "Frontend/Util/Translation/LanguageContextProvider";
import Country from "Frontend/generated/com/dezkser/DTOs/Country";

interface CountryPickerProps {
    selectedCountries: Country[];
    setSelectedCountries: Dispatch<SetStateAction<Country[]>>;
    maxCountriesOfProfile: number|undefined;
}

export default function CountryPicker({selectedCountries, setSelectedCountries,maxCountriesOfProfile}: CountryPickerProps) {
    const {t} = useLanguageContext();

    const [countries, setCountries] = useState<Country[]>([]);
    const [error, setError] = useState<boolean>(false);
    const maxSelectedCountries:number = maxCountriesOfProfile??4;

    //Fetch countries on phase of mount
    useEffect(() => {
        CountryEndpoint.getAllCountries()
            .then(allCountries => {
                    // Filtra los países que ya están seleccionados
                    const filteredCountries = allCountries.filter(country =>
                        !selectedCountries.some(selectedCountry => selectedCountry.name === country.name)
                    );
                    filteredCountries.sort((a, b) => a.name.localeCompare(b.name))
                    setCountries(filteredCountries);
                }
            );
    }, []);

    useEffect(() => {
        if (selectedCountries.length < maxSelectedCountries) {
            setError(false);
        }
    }, [selectedCountries]);

    const handleAddCountry = (pCountry: Country) => {
        if (selectedCountries.length >= maxSelectedCountries) {
            setError(true);
            return
        }
        setSelectedCountries(prevState => {
            // Añade el país y luego ordena
            const updatedCountries = [...prevState, pCountry];
            return updatedCountries.sort((a, b) => a.name.localeCompare(b.name));
        });
        setCountries(prevState => {
            const index = prevState.findIndex(country => country.id === pCountry.id);
            if (index !== -1) {
                const updatedCountries = [...prevState.slice(0, index), ...prevState.slice(index + 1)];
                return updatedCountries.sort((a, b) => a.name.localeCompare(b.name));
            }
            return prevState;
        });
    }
    const handleRemoveCountry = (pCountry: Country) => {
        setCountries(prevState => {
            // Añade el país y luego ordena
            const updatedCountries = [...prevState, pCountry];
            return updatedCountries.sort((a, b) => a.name.localeCompare(b.name));
        });
        setSelectedCountries(prevState => {
            const index = prevState.findIndex(country => country.id === pCountry.id);
            if (index !== -1) {
                const updatedCountries = [...prevState.slice(0, index), ...prevState.slice(index + 1)];
                return updatedCountries.sort((a, b) => a.name.localeCompare(b.name));
            }
            return prevState;
        });
    }

    return (
        <div className="flex flex-row flex-grow gap-4 overflow-x-auto">
            {/* List of selected countries */}
            <div className="flex flex-col">
                <Typography className="-mb-2" variant="h6">
                    {t("Components.CountryPicker.Labels.selected")}
                </Typography>
                <List
                    className="p-2 mt-2 max-h-36 min-h-36 overflow-auto border border-blue-gray-200 hover:border-blue-palette-950 rounded-md">
                    {selectedCountries.map((item, index) => (
                        <ListItem key={index} className="flex min-h-10 justify-between items-center" onClick={() => {
                            handleRemoveCountry(item)
                        }}>
                            {item.name}: ({item.acronym})
                        </ListItem>
                    ))}
                </List>
                {error ?
                    <Typography variant="small" color="red">
                        {t("Components.CountryPicker.Warnings.max-countries",{count:maxSelectedCountries})}
                    </Typography>
                    :
                    ""
                }
            </div>
            {/* List of all countries */}
            <div className="flex flex-col">
                <Typography className="-mb-2" variant="h6">
                    {t("Components.CountryPicker.Labels.all")}
                </Typography>
                <List
                    className="p-2 mt-2 max-h-36 min-h-36 overflow-auto border border-blue-gray-200 hover:border-blue-palette-950 rounded-md">
                    {countries.map((item, index) => (
                        <ListItem key={index} className="flex min-h-10 justify-between items-center" onClick={() => {handleAddCountry(item)}}>
                            {item.name}: ({item.acronym})
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
}
