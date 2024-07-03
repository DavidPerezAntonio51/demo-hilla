import {
    Button,
    Typography
} from "@material-tailwind/react";
import {useState} from "react";
import CreateUserModal from "Frontend/Components/CreateUserModal";
import {useAuth} from "Frontend/Util/auth";
import {useLanguageContext} from "Frontend/Util/Translation/LanguageContextProvider";

export default function UserView() {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen((prevState) => !prevState);
    const {t} = useLanguageContext();
    const {state} = useAuth();

    return (
        <div>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <Typography
                        variant="h3"
                        className="font-bold flex justify-start"
                        color="blue"
                    >
                        {t("Views.Users.Labels.tittle")}
                    </Typography>
                    {
                        state.user?.authorities.includes("ADMINISTRADOR") ?
                            <Button onClick={handleOpen}>
                                {t("Views.Users.Buttons.create")}
                            </Button>
                            :
                            ""
                    }
                </div>
                <div className="mt-5">
                    {
                        state.user?.authorities.includes("ADMINISTRADOR") ?
                            <CreateUserModal open={open} handleOpen={handleOpen}/>
                            :
                            ""
                    }
                </div>
            </div>
        </div>
    );
}