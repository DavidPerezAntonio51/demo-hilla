import type {ButtonStyleTypes} from "@material-tailwind/react";
export const ButtonCustomTheme:ButtonStyleTypes = {
    defaultProps: {
        variant: "filled",
        size: "md",
        color: "blue",
        fullWidth: false,
        ripple: true,
        className: "",
    },
    styles: {
        variants: {
            filled: {
                blue: {
                    backgroud: "bg-blue-palette-950",
                    color: "text-white",
                    shadow: "shadow-md shadow-blue-palette-950/20",
                    hover: "hover:shadow-lg hover:shadow-blue-palette-950/40",
                    focus: "focus:opacity-[0.85] focus:shadow-none",
                    active: "active:opacity-[0.85] active:shadow-none",
                },
            },
            gradient: {
                blue: {
                    backgroud: "bg-gradient-to-tr from-blue-600 to-blue-400",
                    color: "text-white",
                    shadow: "shadow-md shadow-blue-palette-950/20",
                    hover: "hover:shadow-lg hover:shadow-blue-palette-950/40",
                    active: "active:opacity-[0.85]",
                },
            },
            outlined: {
                blue: {
                    border: "border border-blue-palette-950",
                    color: "text-blue-palette-950",
                    hover: "hover:opacity-75",
                    focus: "focus:ring focus:ring-blue-200",
                    active: "active:opacity-[0.85]",
                },
            },
            text: {
                blue: {
                    color: "text-blue-palette-950",
                    hover: "hover:bg-blue-palette-950/10",
                    active: "active:bg-blue-palette-950/30",
                },
            },
        },
    },
};