import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import {useForm} from "react-hook-form";
import UserForm from "../../components/userform/UserForm.jsx";
import SelectBox from "../../components/selectbox/SelectBox.jsx";
import AccountTypeRadio from "../../components/accounttyperadio/AccountTypeRadio.jsx";
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import "./profile.css"
import {capitalizeFirstLetter} from "../../helperfuncties/CapitalizeFirstLetter.jsx";
import {translateProvince} from "../../helperfuncties/TranslateProvince.jsx";
import ProposalCard from "../../components/proposalcard/ProposalCard.jsx";
import useFetchProvinces from "../../hooks/useFetchProvinces.jsx";
import useFetchMunicipalities from "../../hooks/useFetchMunicipalities.jsx";

function Profile() {
    const {register, handleSubmit, control, reset, formState: {errors}} = useForm({
        mode: "onBlur",
    });
    const {user} = useContext(AuthContext);
    const [loading, toggleLoading] = useState(false);
    const [proposals, setProposals] = useState([]);
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");


    useEffect(() => {
        async function fetchProfile() {
            const token = localStorage.getItem("token");
            toggleLoading(true);

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/users/email/${user.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                reset({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    password: "",
                    accountType: response.data.accountType,
                    city: response.data.city,
                    province: {
                        value: response.data.province,
                        label: translateProvince(response.data.province)
                    },
                    municipality: {
                        value: response.data.municipalityId,
                        label: response.data.municipalityName
                    }
                });
            } catch (err) {
                console.error("Profiel ophalen mislukt:", err);
            } finally {
                toggleLoading(false);
            }
        }

        if (user.email) {
            void fetchProfile();
        }
    }, [user, reset]);


    async function handleProfileChange(data) {
        const token = localStorage.getItem("token");
        toggleLoading(true);

        try {
            await axios.put(`${import.meta.env.VITE_API_KEY}/users/${user.id}`, {
                firstName: capitalizeFirstLetter(data.firstName),
                lastName: capitalizeFirstLetter(data.lastName),
                email: data.email,
                accountType: data.accountType,
                province: data.province.value,
                city: data.city,
                municipalityId: data.municipality.value,
                ...(data.password?.trim() && { password: data.password.trim() })
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setSuccessMessage("Uw profiel is bijgewerkt.");
        } catch (err) {
            console.error(err);
        } finally {
            toggleLoading(false);
        }
    }

    useEffect(() => {

        async function fetchProposals() {
            const token = localStorage.getItem("token");
            toggleLoading(true)

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/proposals/user/${user.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProposals(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                toggleLoading(false);
            }
        }

        void fetchProposals();
    }, [user.email]);

    async function deleteProposal(id) {
        const token = localStorage.getItem("token");
        toggleLoading(true);

        try {
            await axios.delete(`${import.meta.env.VITE_API_KEY}/proposals/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProposals(prev => prev.filter(proposal => proposal.id !== id));
        } catch (err) {
            console.error(err);
        } finally {
            toggleLoading(false)
        }
    }

    const clickProposal = (proposalId) => {
        navigate(`/voorstel/${proposalId}`);
    }

    const {provinces} = useFetchProvinces();

    const {municipalities, fetchMunicipalities} = useFetchMunicipalities();

    return (
        <>
            <section className="profile-personal-data-section">
                <h2>Mijn gegevens</h2>

                {!edit && (
                    <Button
                        type="button"
                        disabled={loading}
                        buttonFunction="Bewerken"
                        className="button-global profile"
                        onClickEffect={() => setEdit(true)}
                    />
                )}

                <form onSubmit={handleSubmit(handleProfileChange)}>
                    <fieldset>
                        <legend>Persoonsgegevens</legend>

                        <UserForm
                            name="firstName"
                            label="Voornaam"
                            type="text"
                            register={register}
                            errors={errors}
                            disabled={!edit}
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
                            disabled={!edit}
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
                            disabled={true}
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
                            disabled={!edit}
                            validationRules={{
                                minLength: {
                                    value: 5,
                                    message: "Wachtwoord moet minstens 5 karakters lang zijn."
                                }, maxLength: {
                                    value: 30,
                                    message: "Wachtwoord mag maximaal 50 karakters lang zijn."
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
                            disabled={!edit}
                            selectLabel="form-label"
                            selectDiv="form-group"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Het kiezen van een provincie is verplicht."
                                },
                            }}
                        />

                        <UserForm
                            name="city"
                            label="Woonplaats"
                            type="text"
                            register={register}
                            errors={errors}
                            disabled={!edit}
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
                            label="Gemeente *"
                            placeholder="Selecteer je gemeente"
                            options={municipalities}
                            control={control}
                            errors={errors}
                            disabled={!edit}
                            selectLabel="form-label"
                            selectDiv="form-group"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Het kiezen van een gemeente is verplicht."
                                },
                            }}
                        />
                    </fieldset>
                    <AccountTypeRadio
                        register={register}
                        errors={errors}
                        legendTitle="Uw rol:"
                        disabled={true}
                    />
                    {edit && (
                        <Button
                            type="submit"
                            disabled={loading}
                            buttonFunction="Bijwerken"
                            className="button-global profile"
                        />
                    )}

                    {successMessage && <p className="success-message">Profiel succesvol bijgewerkt!</p>}
                </form>
            </section>

            <section className="profile-proposal-section">
                <h2>Overzicht eigen verzoeken</h2>
                <div className="proposal-list">
                    {!loading && proposals.length > 0 &&
                        proposals.map((proposal) => (
                    <ProposalCard
                        deleteButton={true}
                        loading={loading}
                        proposal={proposal}
                        deleteProposal={deleteProposal}
                        clickProposal={clickProposal}
                        key={proposal.id}
                    />
                        ))
                    }
                </div>

                {!loading && proposals.length === 0 && (
                    <p>U heeft nog geen voorstellen.</p>)}

            </section>
        </>
    );
}

export default Profile;