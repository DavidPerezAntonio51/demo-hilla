import {router} from "Frontend/Util/routes";
import {RouterProvider} from "react-router-dom";
import "./main.css";
import ThemeAppProvider from "Frontend/Theme/ThemeAppProvider";
import {AuthProvider} from "Frontend/Util/auth";
import {LanguageContextProvider} from "Frontend/Util/Translation/LanguageContextProvider";
import "./Util/Translation/i18nLanguageConfig"

export default function App() {
    return (
        <ThemeAppProvider>
            <LanguageContextProvider>
                <AuthProvider>
                    <RouterProvider router={router}/>
                </AuthProvider>
            </LanguageContextProvider>
        </ThemeAppProvider>
    );
}
