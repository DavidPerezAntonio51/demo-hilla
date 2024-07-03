import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18next
    .use(initReactI18next)
    .use(Backend)
    .use(LanguageDetector)
    .init({
        load: 'languageOnly',
        fallbackLng:"en",
        detection: {
            order: ["localStorage","htmlTag"],
            caches: ["localStorage"], // cache user language on
        },
        backend:{
            parse: (data:any, url:any) => {
                try {
                    return JSON.parse(data);
                } catch (error) {
                    console.error(`Error al cargar el recurso de traducción ${url}:`, error);
                    return {};
                }
            }
        }
    });

export default i18next;