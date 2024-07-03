import {AdjustmentsHorizontalIcon, ArrowLeftEndOnRectangleIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
import {UserIcon} from "@heroicons/react/24/solid";
import {Typography} from "@material-tailwind/react";
import VerticalMenu, {MenuItems} from "Frontend/Components/VerticalMenu";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "Frontend/Util/auth";
import {useLanguageContext} from "Frontend/Util/Translation/LanguageContextProvider";
interface ProfileMenuProps{
    className?:string|undefined;
}
export default function ProfileMenu({className}:ProfileMenuProps){
    const {t} = useLanguageContext();
    const navigate = useNavigate();
    const {logout,state} = useAuth();
    const redirectToEditUserInfo = ()=>{
        navigate("/edit-profile")
    }
    const renderItems:MenuItems[] = [
        {
            title: t("Components.ProfileMenu.Buttons.EditProfile.title"),
            description: t("Components.ProfileMenu.Buttons.EditProfile.description"),
            icon: PencilSquareIcon,
            onclick: redirectToEditUserInfo
        },
        {
            title: t("Components.ProfileMenu.Buttons.ChangePassword.title"),
            description: t("Components.ProfileMenu.Buttons.ChangePassword.description"),
            icon:AdjustmentsHorizontalIcon
        },
        {
            title: t("Components.ProfileMenu.Buttons.Exit.title"),
            description: t("Components.ProfileMenu.Buttons.Exit.description"),
            icon: ArrowLeftEndOnRectangleIcon,
            onclick:logout
        }
    ]
    return(
        <div className={className}>
            <VerticalMenu menuItems={renderItems}>
                <div className="flex items-center">
                    <div className="flex items-center justify-center">
                        {" "}
                        {React.createElement(UserIcon, {
                            strokeWidth: 2,
                            className: "h-6 text-gray-900 w-6 fill-blue-palette-950",
                        })}
                    </div>
                    <Typography color="blue" variant="small" className="font-bold">
                        {state.user?.fullName}
                    </Typography>
                </div>
            </VerticalMenu>
        </div>
    );
}