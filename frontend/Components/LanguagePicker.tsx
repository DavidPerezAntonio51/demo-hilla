import {useLanguageContext} from "Frontend/Util/Translation/LanguageContextProvider";
import {Option, Select} from "@material-tailwind/react";
import {useState} from "react";

interface LanguagePickerProps{
    className?:string|undefined;
}

export default function LanguagePicker({className}:LanguagePickerProps) {
    const {t, languages, onClickLanguageChange} = useLanguageContext()
    const [selectedLanguage, setSelectedLanguage] = useState<string>(localStorage.getItem("i18nextLng")||"en");
    const changeLanguage = (pLanguage: string | undefined) => {
        if (pLanguage === undefined) {
            setSelectedLanguage("en")
        } else {
            setSelectedLanguage(pLanguage)
            onClickLanguageChange(pLanguage)
        }
    }
    return (
        <div className={"p-5 w-xs " + className}>
            <Select
                variant="outlined"
                label={t("public:Components.LanguagePicker.Labels.select-language")}
                value={selectedLanguage}
                onChange={(value) => changeLanguage(value)}
            >
                {Object.keys(languages).map((language, index) => (
                    <Option key={index} value={language}>{languages[language].nativeName}</Option>
                ))}
            </Select>
        </div>
    );
}