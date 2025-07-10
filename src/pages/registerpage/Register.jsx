import UserForm from "../../components/userform/UserForm.jsx";
import {useForm} from "react-hook-form";
import "./Register.css"
import Button from "../../components/button/Button.jsx";
import SelectBox from "../../components/selectbox/SelectBox.jsx";
import AccountTypeRadio from "../../components/accounttyperadio/AccountTypeRadio.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import useFetchProvinces from "../../hooks/useFetchProvinces.jsx";
import {capitalizeFirstLetter} from "../../helperfuncties/CapitalizeFirstLetter.jsx";
import useFetchMunicipalities from "../../hooks/useFetchMunicipalities.jsx";


function Register() {

    const {register, handleSubmit, control, setError, formState: {errors}} = useForm({
        mode: 'onBlur'
    });

    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmitRegister(data) {

        toggleLoading(true);

        try {
            await axios.post(`${import.meta.env.VITE_API_KEY}/users/register`, {
                firstName: capitalizeFirstLetter(data.firstName),
                lastName: capitalizeFirstLetter(data.lastName),
                email: data.email,
                password: data.password,
                accountType: data.accountType.toUpperCase(),
                municipalityId: data.municipality?.value,
                province: data.province.value,
                city: data.city,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate("/inloggen");
        } catch (err) {
            console.error(err);
            if (err.response.status === 403) {
                setError("email", {
                    type: "manual",
                    message: "Er bestaat al een account met dit e-mailadres."
                });
            }
        } finally {
            toggleLoading(false);
        }
    }

    const {provinces} = useFetchProvinces();

    const {municipalities, fetchMunicipalities} = useFetchMunicipalities();


    return (
        <section className="register-section">
            <h2>Registreren</h2>
            <form onSubmit={handleSubmit(handleSubmitRegister)}>
                <fieldset>
                    <legend>Persoonsgegevens</legend>

                    <UserForm
                        name="firstName"
                        label="Voornaam"
                        type="text"
                        register={register}
                        errors={errors}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Voornaam is verplicht.",
                            }, minLength: {
                                value: 2,
                                message: "Voornaam moet minstens 3 karakters lang zijn."
                            }, maxLength: {
                                value: 25,
                                message: "Achternaam mag maximaal 25 karakters lang zijn."
                            },
                        }}

                    />
                    <UserForm
                        name="lastName"
                        label="Achternaam"
                        type="text"
                        register={register}
                        errors={errors}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Achternaam is verplicht.",
                            }, minLength: {
                                value: 2,
                                message: "Achternaam moet minstens 3 karakters lang zijn."
                            }, maxLength: {
                                value: 25,
                                message: "Achternaam mag maximaal 25 karakters lang zijn."
                            },
                        }}

                    />
                    <UserForm
                        name="email"
                        label="Email"
                        type="email"
                        register={register}
                        errors={errors}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Email is verplicht.",
                            }, minLength: {
                                value: 5,
                                message: "Email moet minstens 5 karakters lang zijn."
                            }, maxLength: {
                                value: 50,
                                message: "Email mag maximaal 50 karakters lang zijn."
                            },
                        }}
                    />

                    <UserForm
                        name="password"
                        label="Wachtwoord"
                        type="password"
                        register={register}
                        errors={errors}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Wachtwoord is verplicht.",
                            }, minLength: {
                                value: 5,
                                message: "Wachtwoord moet minstens 5 karakters lang zijn."
                            }, maxLength: {
                                value: 30,
                                message: "Wachtwoord mag maximaal 30 karakters lang zijn."
                            },
                        }}

                    />
                </fieldset>
                <fieldset>
                    <legend>Woongegevens</legend>

                    {loading && <p>Provincies aan het laden...</p>}

                    <SelectBox
                        name="province"
                        control={control}
                        errors={errors}
                        options={provinces}
                        onChange={fetchMunicipalities}
                        label="Provincie *"
                        placeholder="Kies hier je provincie"
                        selectLabel="form-label"
                        selectDiv="form-group"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Het selecteren van een provincie is verplicht."
                            },
                        }}
                    />

                    <UserForm
                        name="city"
                        label="Woonplaats"
                        type="text"
                        register={register}
                        errors={errors}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Woonplaats is verplicht.",
                            }, minLength: {
                                value: 2,
                                message: "Woonplaats moet minstens 3 karakters lang zijn."
                            }, maxLength: {
                                value: 50,
                                message: "Woonplaats mag maximaal 25 karakters lang zijn."
                            },
                        }}

                    />

                    {loading && <p>Gemeentes aan het laden...</p>}

                    <SelectBox
                        name="municipality"
                        control={control}
                        errors={errors}
                        options={municipalities}
                        label="Gemeente *"
                        placeholder="Kies hier je gemeente"
                        selectLabel="form-label"
                        selectDiv="form-group"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Het selecteren van een gemeente is verplicht."
                            },
                        }}
                    />
                </fieldset>

                <AccountTypeRadio
                    register={register}
                    errors={errors}
                    legendTitle="Wat voor account wilt u aanmaken?"
                    validationRules={{
                        required: {
                            value: true,
                            message: "Het selecteren van een inwoner of gemeente account is verplicht."
                        }
                    }}
                />
                <Button
                    type="submit"
                    disabled={loading}
                    buttonFunction="Registreren"
                    className="button-global"
                />
            </form>

        </section>
    )
}


export default Register