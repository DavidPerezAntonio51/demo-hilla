import {SwitchButtonStylesType} from "@material-tailwind/react";

export const SwitchCustomTheme: SwitchButtonStylesType = {
    defaultProps: {
        color: "blue",
        label: "",
        ripple: true,
        className: "",
        disabled: false,
        containerProps: undefined,
        labelProps: undefined,
        circleProps: undefined,
    },
    styles: {
        colors: {
            blue: {
                input: "checked:bg-blue-palette-950",
                circle: "peer-checked:border-blue-palette-950",
                before: "peer-checked:before:bg-blue-palette-950",
            }
        },
    }
};