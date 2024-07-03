import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import "../../main.css";
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "Frontend/Util/auth";
import {useEffect, useState} from "react";
import LanguagePicker from "Frontend/Components/LanguagePicker";
import {Notification} from "@hilla/react-components/Notification.js";
import BackgroundContainer from "Frontend/Components/BackgroundContainer";
import {useRouteMetadata} from "Frontend/Util/routing";
import {useLanguageContext} from "Frontend/Util/Translation/LanguageContextProvider";

export function LoginView() {
    const {login,state} = useAuth();
    const [hasError, setError] = useState<boolean>();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [url, setUrl] = useState<string>();
    const navigate = useNavigate();
    const {t,reloadTranslationsAfterLogin} = useLanguageContext();
    const currentTitle = useRouteMetadata()?.title ?? 'demo';

    useEffect(() => {
        document.title = currentTitle;
    }, [currentTitle]);

    const onClickLogin = async ()=>{
        const {error,errorTitle,errorMessage,redirectUrl,defaultUrl} = await login(username, password);

        if (error) {
            setError(true);
            Notification.show(""+errorMessage)
        } else {
            // Pendiente hasta completar modulo usuarios
            //const indexOfRedirectURI = redirectUrl?.indexOf("/")
            //const url = redirectUrl?.substring(0,indexOfRedirectURI) ?? defaultUrl ?? '/';
            const url = '/dashboard';
            const path = new URL(url, document.baseURI).pathname;
            await reloadTranslationsAfterLogin();
            navigate(path);
        }
    }

    if (state.user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <BackgroundContainer>
            <div className="flex flex-col items-center justify-center pt-9 mt-9">
            <Card className="w-96 mx-10">
                <CardHeader
                    className="place-items-center"
                >
                    <Typography
                        variant="h3"
                        className="font-bold flex justify-center"
                    >
                        {t("public:Global.app-title")}
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label={t("public:Views.Login.Labels.username")} size="lg" crossOrigin={undefined} value={username} type="email"
                           onChange={(e) => setUsername(e.target.value)}/>
                    <Input label={t("public:Views.Login.Labels.password")} size="lg" crossOrigin={undefined} value={password} type="password"
                           onChange={e => setPassword(e.target.value)}/>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button fullWidth onClick={onClickLogin}>
                        {t("public:Views.Login.Buttons.sing-in")}
                    </Button>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="ml-1 font-bold mt-3 flex justify-center"
                    >
                        {t("public:Views.Login.Buttons.forgot-password")}
                    </Typography>
                    <div className="max-w-full items-center mt-7">
                        <LanguagePicker/>
                    </div>
                </CardFooter>
            </Card>
            </div>
        </BackgroundContainer>
    );
}
