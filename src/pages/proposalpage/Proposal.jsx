import {useForm} from "react-hook-form";
import axios from "axios";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import UserForm from "../../components/userform/UserForm.jsx";
import TextArea from "../../components/textarea/TextArea.jsx";
import Button from "../../components/button/Button.jsx";
import "./Proposal.css"
import {useNavigate} from "react-router-dom";


function Proposal() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur",
    });
    const [loading, toggleLoading] = useState(false);
    const {user} = useContext(AuthContext);
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const navigate = useNavigate();

    function handleImagePreview(e) {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    async function handleSubmitProposal(data) {
        const token = localStorage.getItem("token");
        toggleLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_KEY}/proposals`, {
                title: data.title,
                description: data.description,
                userId: user.id,
                municipalityId: user.municipalityId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const proposalId = response.data.id;
            const formData = new FormData();
            formData.append('file', file);
            await axios.post(`${import.meta.env.VITE_API_KEY}/proposals/${proposalId}/photo`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            });
            navigate(`/voorstel/${proposalId}`);
        } catch (err) {
            console.error("Fout bij het uploaden:", err);
        } finally {
            toggleLoading(false);
        }
    }

    return (

        <section className="proposal-section">
            <h2>Verzoek indienen</h2>

            <form onSubmit={handleSubmit(handleSubmitProposal)}>

                    <UserForm
                        name="title"
                        label="Titel"
                        type="text"
                        register={register}
                        errors={errors}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Titel is verplicht.",
                            }, minLength: {
                                value: 3,
                                message: "Titel moet minstens 3 karakters lang zijn.",
                            }, maxLength: {
                                value: 50,
                                message: "Titel mag maximaal 50 karakters lang zijn.",
                            },
                        }}
                    />

                    <TextArea
                        name="description"
                        cols="60"
                        rows="15"
                        label="Beschrijving *"
                        register={register}
                        errors={errors}
                        textAreaDiv="form-group"
                        placeholder= "Beschrijving"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Beschrijving is verplicht.",
                            }, minLength: {
                                value: 10,
                                message: "Beschrijving moet minstens 10 karakters lang zijn.",
                            }, maxLength: {
                                value: 1000,
                                message: "Beschrijving mag maximaal 1000 karakters lang zijn.",
                            },
                        }}
                    />

                    <label htmlFor="image" className="image-label">Afbeelding toevoegen *</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="image-input"
                        {...register("image", {
                            required: {
                                value: true,
                                message: "Afbeelding is verplicht.",
                        },
                        })}
                        onChange={handleImagePreview}
                    />
                    {errors.image && <p className="error-message">{errors.image.message}</p>}

                    {previewUrl && (
                        <div className="image-preview">
                            <p className="image-preview-text">Afbeelding toegevoegd:</p>
                            <img src={previewUrl} alt="Voorbeeld"/>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        buttonFunction="Verzoek indienen"
                        className="button-global create-proposal"
                    />

            </form>

        </section>
    );
}

export default Proposal;

