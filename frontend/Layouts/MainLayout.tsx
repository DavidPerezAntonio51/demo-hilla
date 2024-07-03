import {Suspense, useEffect, useState} from "react";
import {
    Navbar,
    Typography,
    IconButton, Collapse, List, ListItem,
} from "@material-tailwind/react";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useRouteMetadata} from "Frontend/Util/routing";
import BackgroundContainer from "Frontend/Components/BackgroundContainer";
import ProfileMenu from "Frontend/Components/ProfileMenu";
import LanguagePicker from "Frontend/Components/LanguagePicker";
import VerticalMenu, {MenuItems} from "Frontend/Components/VerticalMenu";
import {useAuth} from "Frontend/Util/auth";
import Loader from "Frontend/Components/Loader";
import {useLanguageContext} from "Frontend/Util/Translation/LanguageContextProvider";

export function MainLayout() {
    const [openNav, setOpenNav] = useState(false);
    const currentTitle = useRouteMetadata()?.title ?? 'SVA';
    const {t} = useLanguageContext();
    const {state} = useAuth();
    const roles = state.user?.authorities;
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    useEffect(() => {
        document.title = currentTitle;
    }, [currentTitle]);
    const navigateToUsersView = () => {
        navigate("/users");
    }

    const adminToolsOptions: MenuItems[] = [
        {
            title: t("Views.MainLayout.Buttons.AdminMenu.users"),
            onclick: navigateToUsersView
        }
    ];

    const navList = (
        <List className="lg:grid lg:grid-cols-3 space-x-1">
            <NavLink to="/dashboard">
                <ListItem>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {t("Views.MainLayout.Buttons.dashboard")}
                    </Typography>
                </ListItem>
            </NavLink>
            <NavLink to="/reports">
                <ListItem>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {t("Views.MainLayout.Buttons.reports")}
                    </Typography>
                </ListItem>
            </NavLink>
            <NavLink to="/charts">
                <ListItem>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {t("Views.MainLayout.Buttons.charts")}
                    </Typography>
                </ListItem>
            </NavLink>
            {
                roles?.includes("ADMINISTRADOR") || roles?.includes("ADMINISTRADOR PAIS")
                    ?
                    <VerticalMenu menuItems={adminToolsOptions} className="lg:hidden">
                        <Typography
                            as="li"
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {t("Views.MainLayout.Buttons.admin-tools")}
                        </Typography>
                    </VerticalMenu>
                    :
                    <div className="hidden"></div>
            }
            <ProfileMenu className="inline-block lg:hidden"/>
        </List>
    );

    return (
        <BackgroundContainer>
            <div className="w-full">
                <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-2">
                    <div className="flex items-center justify-between text-blue-gray-900">
                        <Typography
                            variant="h5"
                            color="blue"
                            className="cursor-pointer font-bold"
                        >
                            <NavLink to="/dashboard">
                                {t("Global.app-title")}
                            </NavLink>
                        </Typography>
                        <div className="flex items-center grow justify-end ml-6">
                            <div className="hidden lg:block grow">{navList}</div>
                            <div className="flex items-center gap-x-1 justify-end">
                                {
                                    roles?.includes("ADMINISTRADOR") || roles?.includes("ADMINISTRADOR PAIS")
                                        ?
                                        <VerticalMenu menuItems={adminToolsOptions} className="hidden lg:inline-block">
                                            <Typography
                                                as="li"
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {t("Views.MainLayout.Buttons.admin-tools")}
                                            </Typography>
                                        </VerticalMenu>
                                        :
                                        <></>
                                }
                                <LanguagePicker className="!p-1"/>
                                <ProfileMenu className="hidden lg:inline-block"/>
                            </div>
                            <IconButton
                                variant="text"
                                className="ml-2 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                                ripple={false}
                                onClick={() => setOpenNav(!openNav)}
                            >
                                {openNav ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </IconButton>
                        </div>
                    </div>
                    <Collapse open={openNav}>
                        {navList}
                    </Collapse>
                </Navbar>
                <div className="mx-auto py-12 px-14">
                    <Suspense fallback={<Loader/>}>
                        <Outlet/>
                    </Suspense>
                </div>
            </div>
        </BackgroundContainer>
    );
}