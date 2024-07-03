import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Dialog,
    Input,
    Option,
    Select,
    Switch,
    Typography
} from "@material-tailwind/react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import CountryPicker from "Frontend/Components/CountryPicker";
import {ProfileEndpoint, UserEndpoint} from "Frontend/generated/endpoints";
import {EndpointValidationError} from "@hilla/frontend";
import {useLanguageContext} from "Frontend/Util/Translation/LanguageContextProvider";
import Profile from "Frontend/generated/com/dezkser/DTOs/Profile";
import Country from "Frontend/generated/com/dezkser/DTOs/Country";
import User from "Frontend/generated/com/dezkser/DTOs/User";

interface props {
    open: boolean,
    handleOpen: Dispatch<SetStateAction<boolean>>
}

interface ErrorsWrapper {
    email: string;
    phoneNumber: string;
    fullName: string;
    countries: string;
    username: string
}

export default function CreateUserModal({open, handleOpen}: props) {
    const {t} = useLanguageContext();
    // States for the form fields
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [internal, setInternal] = useState(false);
    const [username, setUsername] = useState('');
    const [selectedProfile, setSelectedProfile] = useState<Profile>({maxCountries: 0, name: ""});

    //State to manage the error messages
    const [errors, setErrors] = useState<ErrorsWrapper>({
        email: '',
        phoneNumber: '',
        fullName: '',
        countries: '',
        username: '',
    });

    useEffect(() => {
        ProfileEndpoint.getProfiles()
            .then(profiles => {
                setProfiles(profiles);
                setSelectedProfile(profiles[0]);
            });
    }, []);

    //This useEffect is used to clear errors when the user tries to correct the information
    useEffect(() => {
        setErrors({
            email: '',
            phoneNumber: '',
            fullName: '',
            countries: '',
            username: '',
        });
    }, [username, email, phoneNumber, fullName]);

    //Function to clear selected countries after choose another profile
    const handleSelectedProfile = (pProfile: string | undefined) => {
        let selected = profiles.find(profile => profile.name === pProfile);
        if (pProfile && selected) {
            setSelectedProfile(selected);
            setCountries([]);
        }
    }

    // Function to manage the errors that we need to activate
    const updateError = (pField: string | undefined, pMessage: string) => {
        if (pField) {
            setErrors(prevErrors => ({...prevErrors, [pField]: pMessage}));
        }
    };

    const createUser = async () => {
        const userToRegister: User = {
            username,
            email,
            fullName,
            phoneNumber,
            profile: selectedProfile.name,
            internal,
            countries
        }
        UserEndpoint.createNewUser(userToRegister)
            .then(temporalPassword => {
                console.log(temporalPassword);
            })
            .catch(error => {
                if (error instanceof EndpointValidationError) {
                    console.log(error.validationErrorData)
                    error.validationErrorData.forEach(details => {
                        let message = details.message
                            .substring(details.message.lastIndexOf(':') + 1)
                            .replace("'", "")
                            .replace("'", "");
                        updateError(details.parameterName, message);
                    })
                }
            })
    }

    return (
        <div>
            <Dialog size="lg" open={open} handler={handleOpen} className="bg-transparent shadow-none">
                <Card className="mx-auto w-full max-w-[80vw] max-h-[100vh] overflow-auto">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue">
                            {t("Components.CreateUserModal.Labels.dialog-tittle")}
                        </Typography>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-4">
                                <Typography className="-mb-2" variant="h6">
                                    {t('Components.CreateUserModal.Labels.username')}
                                </Typography>
                                <div>
                                    <Input label={t('Components.CreateUserModal.Labels.username')} size="lg"
                                           value={username}
                                           onChange={(e) => setUsername(e.target.value)} crossOrigin={undefined}/>
                                    {
                                        errors.username.length !== 0 ?
                                            <Typography
                                                variant="small"
                                                color="red"
                                                className="items-center gap-1 font-normal"
                                            >
                                                {errors.username}
                                            </Typography>
                                            :
                                            ""
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <Typography className="-mb-2" variant="h6">
                                    {t('Components.CreateUserModal.Labels.email')}
                                </Typography>
                                <div>
                                    <Input label={t('Components.CreateUserModal.Labels.email')} size="lg" value={email}
                                           type="email"
                                           onChange={(e) => setEmail(e.target.value)} crossOrigin={undefined}/>
                                    {
                                        errors.email.length !== 0 ?
                                            <Typography
                                                variant="small"
                                                color="red"
                                                className="items-center gap-1 font-normal"
                                            >
                                                {errors.email}
                                            </Typography>
                                            :
                                            ""
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <Typography className="-mb-2" variant="h6">
                                    {t('Components.CreateUserModal.Labels.phone-number')}
                                </Typography>
                                <div>
                                    <Input label={t('Components.CreateUserModal.Labels.phone-number')} size="lg"
                                           value={phoneNumber} type="tel" maxLength={10}
                                           onChange={(e) => setPhoneNumber(e.target.value)}
                                           crossOrigin={undefined}/>
                                    {
                                        errors.phoneNumber.length !== 0 ?
                                            <Typography
                                                variant="small"
                                                color="red"
                                                className="items-center gap-1 font-normal"
                                            >
                                                {errors.phoneNumber}
                                            </Typography>
                                            :
                                            ""
                                    }
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 flex-grow">
                                <Typography className="-mb-2" variant="h6">
                                    {t('Components.CreateUserModal.Labels.full-name')}
                                </Typography>
                                <div>
                                    <Input label={t('Components.CreateUserModal.Labels.full-name')} size="lg"
                                           value={fullName}
                                           onChange={(e) => setFullName(e.target.value)} crossOrigin={undefined}/>
                                    {
                                        errors.fullName.length !== 0 ?
                                            <Typography
                                                variant="small"
                                                color="red"
                                                className="items-center gap-1 font-normal"
                                            >
                                                {errors.fullName}
                                            </Typography>
                                            :
                                            ""
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 flex-grow">
                                <Typography className="-mb-2" variant="h6">
                                    {t('Components.CreateUserModal.Labels.profile')}
                                </Typography>
                                <Select label="Perfil" size="lg"
                                        onChange={handleSelectedProfile}
                                        value={selectedProfile?.name}
                                >
                                    {profiles.map((profile, index) =>
                                        <Option value={profile.name} key={index}>{profile.name}</Option>
                                    )}
                                </Select>
                            </div>
                            <div className="flex flex-col gap-4 flex-grow">
                                <Typography className="-mb-2" variant="h6">
                                    {t('Components.CreateUserModal.Labels.user-type')}
                                </Typography>
                                <Switch label={
                                    internal ?
                                        t('Components.CreateUserModal.Labels.TypesOfUser.internal')
                                        :
                                        t('Components.CreateUserModal.Labels.TypesOfUser.external')
                                }
                                        checked={internal} ripple={true}
                                        onChange={() => setInternal(!internal)} crossOrigin={undefined}/>
                            </div>
                        </div>
                        <CountryPicker selectedCountries={countries} setSelectedCountries={setCountries}
                                       maxCountriesOfProfile={selectedProfile?.maxCountries}/>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <div className="flex justify-end">
                            <Button onClick={createUser}>
                                {t('Components.CreateUserModal.Buttons.register')}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </Dialog>
        </div>
    );
}