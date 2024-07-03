import React, {
    createContext,
    useContext,
    ReactNode,
} from "react";
import {useTranslation} from "react-i18next";

interface props{
    children:ReactNode,
}

export const LanguageContext = createContext<any>(undefined);
export const LanguageContextProvider = ({children}:props) => {
    const languages = {
        en: {nativeName: "English"},
        es: {nativeName: "Español"},
    };
    const {t, i18n} = useTranslation(['translation','public']);

    const onClickLanguageChange = (language:string|undefined) => {
        i18n.changeLanguage(language);
    };

    const reloadTranslationsAfterLogin = async ()=>{
        await i18n.reloadResources();
    }

    return (
        <LanguageContext.Provider
            value={{t, i18n, onClickLanguageChange, languages,reloadTranslationsAfterLogin}}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguageContext = () => useContext(LanguageContext);