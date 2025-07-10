import './Login.css'
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext, useState} from "react";
import axios from "axios";
import UserForm from "../../components/userform/UserForm.jsx";
import {useForm} from "react-hook-form";
import Button from "../../components/button/Button.jsx";
import {Link} from "react-router-dom";


function Login() {

    const {register, handleSubmit, setError, formState: {errors}} = useForm({
        mode: "onBlur"
    });

    const {login} = useContext(AuthContext);
    const [loading, toggleLoading] = useState(false);

    async function handleSubmitLogin(data) {
        toggleLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_KEY}/authenticate`, data)
            login(response.data.jwt);

        } catch (err) {
            console.error(err);
            setError("email", {
                type: "manual",
                message: "E-mailadres of wachtwoord klopt niet"
            });
            setError("password", {
                type: "manual",
                message: "E-mailadres of wachtwoord klopt niet"
            });

        } finally {
            toggleLoading(false);
        }
    }

    return (
        <section className="login-section">
            <h2>Inloggen</h2>

            <form onSubmit={handleSubmit(handleSubmitLogin)}>
                <fieldset>

                    <UserForm
                        name="email"
                        label="Email"
                        type="email"
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
                        register={register}
                        errors={errors}

                    />
                    <UserForm
                        name="password"
                        label="Wachtwoord"
                        type="password"
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
                        register={register}
                        errors={errors}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        buttonFunction="Login"
                        className="button-global"
                    />

                </fieldset>

                {loading && <p>Een momentje geduld aub, u wordt ingelogd...</p>}
            </form>

            <p className="register-link">Heeft u nog geen account? <Link to="/registreren">Registreer</Link> u dan eerst.
            </p>
        </section>
    )
}

export default Login