import React, {
    ForwardRefExoticComponent,
    MouseEventHandler,
    ReactNode,
    RefAttributes,
    SVGProps,
    useState
} from "react";
import {
    Collapse,
    Typography,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface ProfileMenuProps{
    className?: string|undefined;
    children:NonNullable<ReactNode>;
    menuItems:MenuItems[];
}
export interface MenuItems{
    title:string;
    description?:string;
    icon?:ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {     title?: string | undefined;     titleId?: string | undefined; } & RefAttributes<SVGSVGElement>> | undefined;
    onclick?:(MouseEventHandler<HTMLLIElement> & MouseEventHandler<HTMLButtonElement>) | undefined;
}
export default function VerticalMenu({className,children,menuItems}:ProfileMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const renderItems = menuItems.map(
        ({ icon, title, description,onclick }, key) => (
            <div key={key}>
                <MenuItem className="flex items-center gap-3 rounded-lg" onClick={onclick}>
                    {icon ?
                        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
                            {" "}
                            {React.createElement(icon, {
                                strokeWidth: 2,
                                className: "h-6 text-gray-900 w-6",
                            })}
                        </div>
                        :
                        ""
                    }
                    <div>
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="flex items-center text-sm font-bold"
                        >
                            {title}
                        </Typography>
                        {description ?
                            <Typography
                                variant="paragraph"
                                className="text-xs !font-medium text-blue-gray-500"
                            >
                                {description}
                            </Typography>
                            :
                            ""
                        }
                    </div>
                </MenuItem>
            </div>
        ),
    );

    return (
        <div className={className}>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement="bottom"
            >
                <MenuHandler>
                    <Typography as="div" variant="h6" className="font-bold">
                        <ListItem
                            className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            <div>
                                {children}
                            </div>
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${
                                    isMenuOpen ? "rotate-180" : ""
                                }`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${
                                    isMobileMenuOpen ? "rotate-180" : ""
                                }`}
                            />
                        </ListItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
                    <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
            </div>
        </div>
    );
}