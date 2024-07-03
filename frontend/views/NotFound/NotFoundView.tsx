import {Link} from "react-router-dom";
import {Button} from "@material-tailwind/react";
import BackgroundContainer from "Frontend/Components/BackgroundContainer";
import {useLanguageContext} from "Frontend/Util/Translation/LanguageContextProvider";

export default function NotFoundView() {
    const {t} = useLanguageContext();
    return (
        <BackgroundContainer>
            <div className="flex items-center justify-center h-screen">
                <div className="container flex flex-col items-center justify-center px-5 text-gray-700">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 font-semibold text-blue-palette-950 text-9xl">404</h2>
                        <p className="text-2xl font-light leading-normal md:text-3xl">
                            {t("Views.NotFound.Labels.title")}
                        </p>
                        <p className="mb-8">
                            {t("Views.NotFound.Labels.description")}
                        </p>
                        <Link to="/dashboard">
                            <Button variant="filled">
                                {t("Views.NotFound.Buttons.back-home")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </BackgroundContainer>
    );
}