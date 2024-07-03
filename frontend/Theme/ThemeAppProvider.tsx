import {ThemeProvider} from "@material-tailwind/react";
import { ReactNode } from 'react';
import {ButtonCustomTheme} from "Frontend/Theme/ButtonCustomTheme";
import {InputCustomTheme} from "Frontend/Theme/InputCustomTheme";
import {TypographyCustomTheme} from "Frontend/Theme/TypographyCustomTheme";
import {SwitchCustomTheme} from "Frontend/Theme/SwitchCustomTheme";
import {SelectCustomTheme} from "Frontend/Theme/SelectCustomTheme";

interface AppProps {
    children: NonNullable<ReactNode>;
}
export default function ThemeAppProvider({children}: AppProps) {
    const customTheme= {
        button: ButtonCustomTheme,
        input: InputCustomTheme,
        typography:TypographyCustomTheme,
        switch:SwitchCustomTheme,
        select:SelectCustomTheme,
    }

    return <ThemeProvider value={customTheme}>{children}</ThemeProvider>;
}