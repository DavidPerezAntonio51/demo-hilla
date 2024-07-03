import {SelectStylesType} from "@material-tailwind/react";

export const SelectCustomTheme: SelectStylesType = {
    defaultProps: {
        variant: "outlined",
        color: "blue",
        size: "md",
        label: "",
        error: false,
        success: false,
        arrow: undefined,
        value: undefined,
        onChange: undefined,
        selected: undefined,
        offset: 5,
        dismiss: {},
        animate: {
            unmount: {},
            mount: {},
        },
        autoHeight: false,
        lockScroll: false,
        labelProps: {},
        menuProps: {},
        className: "",
        disabled: false,
        containerProps: undefined,
    },
    styles: {
        base: {
            container: {
                position: "relative",
                width: "w-full",
                minWidth: "min-w-[200px]",
            },
            select: {
                peer: "peer",
                width: "w-full",
                height: "h-full",
                bg: "bg-transparent",
                color: "text-blue-gray-700",
                fontFamily: "font-sans",
                fontWeight: "font-normal",
                textAlign: "text-left",
                outline: "outline outline-0 focus:outline-0",
                disabled: "disabled:bg-blue-gray-50 disabled:border-0",
                transition: "transition-all",
            },
            label: {
                display: "flex",
                width: "w-full",
                height: "h-full",
                userSelect: "select-none",
                pointerEvents: "pointer-events-none",
                position: "absolute",
                left: "left-0",
                fontWeight: "font-normal",
                transition: "transition-all",
            },
        },
        variants: {
            outlined: {
                colors: {
                    select: {
                        blue: {
                            close: {
                                borderColor: "border-blue-gray-200",
                            },
                            open: {
                                borderColor: "border-blue-palette-950",
                                borderTopColor: "border-t-transparent",
                            },
                            withValue: {
                                borderColor: "border-blue-gray-200",
                                borderTopColor: "border-t-transparent",
                            },
                        },
                    },
                    label: {
                        blue: {
                            close: {
                                color: "text-blue-gray-400",
                                before: "before:border-transparent",
                                after: "after:border-transparent",
                            },
                            open: {
                                color: "text-blue-palette-950",
                                before: "before:border-blue-palette-950",
                                after: "after:border-blue-palette-950",
                            },
                            withValue: {
                                color: "text-blue-gray-400",
                                before: "before:border-blue-gray-200",
                                after: "after:border-blue-gray-200",
                            },
                        },
                    },
                },
            },
            standard: {
                colors: {
                    select: {
                        blue: {
                            close: {
                                borderColor: "border-blue-gray-200",
                            },
                            open: {
                                borderColor: "border-blue-palette-950",
                            },
                            withValue: {
                                borderColor: "border-blue-gray-200",
                            },
                        },
                    },
                    label: {
                        blue: {
                            close: {
                                color: "text-blue-gray-500",
                                after: "after:border-blue-palette-950",
                            },
                            open: {
                                color: "text-blue-palette-950",
                                after: "after:border-blue-palette-950",
                            },
                            withValue: {
                                color: "text-blue-gray-500",
                                after: "after:border-blue-palette-950",
                            },
                        },
                    },
                },
            },
            static: {
                colors: {
                    select: {
                        blue: {
                            close: {
                                borderColor: "border-blue-gray-200",
                            },
                            open: {
                                borderColor: "border-blue-palette-950",
                            },
                            withValue: {
                                borderColor: "border-blue-gray-200",
                            },
                        },
                    },
                    label: {
                        blue: {
                            close: {
                                color: "text-blue-gray-500",
                                after: "after:border-blue-palette-950",
                            },
                            open: {
                                color: "text-blue-palette-950",
                                after: "after:border-blue-palette-950",
                            },
                            withValue: {
                                color: "text-blue-gray-500",
                                after: "after:border-blue-palette-950",
                            },
                        },
                    },
                },
            },
        },
    },
}