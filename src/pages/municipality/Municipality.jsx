import {useState} from "react";
import axios from "axios";
import UserForm from "../../components/userform/UserForm.jsx";
import {useForm} from "react-hook-form";
import Button from "../../components/button/Button.jsx";
import SelectBox from "../../components/selectbox/SelectBox.jsx";
import useFetchProvinces from "../../hooks/useFetchProvinces.jsx";
import "./Municipality.css"


function Municipality() {

    const { register,reset, setError,  handleSubmit, control, formState: { errors } } = useForm({
        mode: "onBlur",
    });
    const [loading, toggleLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    async function handleSubmitMunicipality(data){
        toggleLoading(true);

     try {
        const token = localStorage.getItem("token");

         await axios.post(`${import.meta.env.VITE_API_KEY}/municipalities`, {
             name: data.municipality,
             province: data.province.value,
        }, {
             headers: {
                 Authorization: `Bearer ${token}`,
                 "Content-Type": "application/json",
             },
         });
         setSuccessMessage(`Gemeente ${(data.municipality)} is aangemaakt.`);

         reset({
             municipality: "",
             province: null,
         });
    } catch (err) {
         console.log(err)
         if (err.response.status === 409) {
             setError("municipality", {
                 type: "manual",
                 message: `De gemeente ${data.municipality} bestaat al.`,
             });
         }
    } finally {
     toggleLoading(false)
     }
    }

    const { provinces} = useFetchProvinces();

    return(
            <section className="municipality-section">
            <h2>Gemeente aanmaken</h2>

            <form onSubmit={handleSubmit(handleSubmitMunicipality)}>
                <fieldset>

                    <UserForm
                        name="municipality"
                        label="Gemeente"
                        type="text"
                        register={register}
                        errors={errors}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Gemeente is verplicht."
                            }, minLength: {
                                value: 2,
                                message: "Gemeente moet minstens 3 karakters lang zijn."
                        },   maxLength: {
                                value: 50,
                                message: "Gemeente mag maximaal 50 karakters lang zijn." },
                        }}
                    />

                    {loading && <p>Provincies aan het laden...</p>}

                    <SelectBox
                        name="province"
                        control={control}
                        errors={errors}
                        options={provinces}
                        label="Provincie *"
                        placeholder="Kies hier je provincie"
                        selectLabel="form-label"
                        selectDiv="form-group"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Het kiezen van een provincie is verplicht."
                            },
                        }}
                    />

                    {successMessage && (<p className="success-message">{successMessage}</p>)}

                    <Button
                        type="submit"
                        disabled={loading}
                        buttonFunction= "Gemeente aanmaken"
                        className="button-global create-municipality"
                    />

                </fieldset>
            </form>
        </section>
    )
}

export default Municipality;