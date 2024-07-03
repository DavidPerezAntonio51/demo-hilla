import {InputStylesType} from "@material-tailwind/react";

export const InputCustomTheme:InputStylesType= {
    defaultProps: {
        variant: "outlined",
        size: "md",
        color: "blue",
        label: "",
        error: false,
        success: false,
        icon: undefined,
        labelProps: undefined,
        containerProps: undefined,
        shrink: false,
        className: "",
    },
    styles: {
        variants: {
            outlined: {
                colors: {
                    input: {
                        blue: {
                            borderColor: "border-blue-gray-200",
                            borderColorFocused: "focus:border-blue-palette-950",
                        },
                    },
                    label: {
                        blue: {
                            color: "text-blue-gray-400 peer-focus:text-blue-palette-950",
                            before: "before:border-blue-gray-200 peer-focus:before:!border-blue-palette-950",
                            after: "after:border-blue-gray-200 peer-focus:after:!border-blue-palette-950",
                        },
                    },
                },
            },
            standard: {
                colors: {
                    input: {
                        blue: {
                            borderColor: "border-blue-gray-200",
                            borderColorFocused: "focus:border-blue-palette-950",
                        },
                    },
                    label: {
                        blue: {
                            color: "text-blue-gray-500 peer-focus:text-blue-palette-950",
                            after: "after:border-blue-palette-950 peer-focus:after:border-blue-palette-950",
                        },
                    },
                },
            },
            static: {
                colors: {
                    input: {
                        blue: {
                            borderColor: "border-blue-gray-200",
                            borderColorFocused: "focus:border-blue-palette-950",
                        },
                    },
                    label: {
                        blue: {
                            color: "text-blue-gray-500 peer-focus:text-blue-palette-950",
                            after: "after:border-blue-palette-950 peer-focus:after:border-blue-palette-950",
                        },
                    },
                },
            },
        },
    },
}