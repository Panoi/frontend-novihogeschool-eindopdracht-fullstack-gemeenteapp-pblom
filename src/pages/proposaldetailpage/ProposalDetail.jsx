import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";
import TextArea from "../../components/textarea/TextArea.jsx";
import SelectBox from "../../components/selectbox/SelectBox.jsx";
import {formDate} from "../../helperfuncties/FormDate.jsx";
import Button from "../../components/button/Button.jsx";
import "./ProposalDetail.css"
import {AuthContext} from "../../context/AuthContext.jsx";
import {translateAccountType} from "../../helperfuncties/TranselateAccountType.jsx";
import {StatusContext} from "../../context/StatusContext.jsx";
import useFetchImage from "../../hooks/useFetchImage.jsx";


function ProposalDetailPage() {

    const {register, handleSubmit, reset, control, setValue, getValues, formState: {errors}} = useForm({
        mode: "onBlur",
    });
    const {user} = useContext(AuthContext);
    const {translateStatus, statusOptions} = useContext(StatusContext);
    const isDisabled = user?.authorities?.includes("ROLE_RESIDENT") || user?.authorities?.includes("ROLE_ADMIN");
    const {id} = useParams();
    const [loading, toggleLoading] = useState(false);
    const [proposal, setProposal] = useState({});
    const [reviews, setReviews] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");


    useEffect(() => {
        const token = localStorage.getItem("token");

        async function fetchProposal() {
            toggleLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/proposals/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setProposal(response.data);
            } catch (err) {
                console.error(err);
                console.error("Proposal ophalen mislukt:", err);
            } finally {
                toggleLoading(false);
            }
        }

        void fetchProposal();
    }, [id, setValue]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        async function fetchReviews() {
            toggleLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/proposals/${id}/reviews`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReviews(response.data);
            } catch (err) {
                console.error("Reviews ophalen mislukt:", err);
            } finally {
                toggleLoading(false);
            }
        }

        void fetchReviews();
    }, [id]);


    useEffect(() => {
        const token = localStorage.getItem("token");
        toggleLoading(true)

        async function fetchStatus() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/statuses/proposal/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setValue("status", {
                    value: response.data.status,
                    label: translateStatus(response.data.status),
                });
            } catch (err) {
                console.error("Status ophalen mislukt:", err);
            } finally {
                toggleLoading(false);
            }
        }

        void fetchStatus();

    }, [id, setValue, translateStatus]);

    async function handleSubmitReview(data) {
        toggleLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${import.meta.env.VITE_API_KEY}/proposals/${id}/reviews`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            setReviews((
                prev) => [...prev, response.data]
            );
            reset({
                message: "",
                status: getValues("status"),
            });
        } catch (err) {
            console.error(err);
        } finally {
            toggleLoading(false);
        }
    }


    async function handleSubmitStatusChange(data) {
        const token = localStorage.getItem("token");
        toggleLoading(true)

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_KEY}/statuses/proposal/${id}`, {
                    status: data.status.value
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
            setProposal(prev => ({
                ...prev,
                status: response.data.status
            }));
            setSuccessMessage(`Status is gewijzigd naar: ${translateStatus(response.data.status)}`);
        } catch (err) {
            console.error(err);
        } finally {
            toggleLoading(false);
        }
    }

    const { image } = useFetchImage(proposal.id)

    return (
        <section className="proposal-detail-section">
            <article className="proposal-card-detail">
                <div className="proposal-details">

                    <span className="image-container detail">

                          {image && (
                              <img
                                  className="proposal-image"
                                  src={image}
                                  alt={`Afbeelding van ${proposal.title}`}
                              />
                          )}

                     </span>
                    <p className="proposal-author detail">{proposal.firstName} {proposal.lastName}</p>
                    <p className="proposal-date detail">{formDate(proposal.submittedAt)}</p>
                    <p className="proposal-title detail">{proposal.title}</p>
                    <p className="proposal-description-detail">{proposal.description}</p>

                </div>
                <div className="proposal-reviews-status">
                    <div className="reviews-div">

                        <ul className="reviews-list">
                            {!loading && reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <li key={review.id} className="review-text">
                                        <p className="review-date">{formDate(review.date)} ({translateAccountType(review.accountType)})</p>
                                        <p className="review-author">
                                            {review.userFirstName} {review.userLastName}
                                        </p>
                                        <p className="review-message">{review.message}</p>
                                    </li>
                                ))
                            ) : (
                                <p>Er zijn nog geen reacties geplaatst</p>
                            )}
                        </ul>

                        <form className="review-form" onSubmit={handleSubmit(handleSubmitReview)}>
                            <TextArea
                                name="message"
                                rows="6"
                                cols="20"
                                register={register}
                                errors={errors}
                                placeholder="Laat hier uw bericht achter"
                                textAreaDiv="form-group textarea"
                                validationRules={{
                                    required: {value: false,},
                                    minLength: {value: 1, message: "Minimaal 1 karakters."},
                                    maxLength: {value: 200, message: "Maximaal 100 karakters."},
                                }}
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                buttonFunction="Bericht achterlaten"
                                className="button-global review"
                            />
                        </form>
                        <form className="status-form" onSubmit={handleSubmit(handleSubmitStatusChange)}>

                            <SelectBox
                                name="status"
                                label="Wijzig status"
                                placeholder="Kies een status"
                                selectLabel="form-label"
                                selectDiv="form-group proposal-detail"
                                disabled={isDisabled}
                                options={statusOptions}
                                control={control}
                                errors={errors}
                            />

                            {successMessage && (<p className="success-message">{successMessage}</p>)}

                            <Button
                                type="submit"
                                disabled={loading}
                                buttonFunction="Status bijwerken"
                                className="button-global status-proposal"
                            />
                        </form>
                    </div>

                </div>
            </article>
        </section>
    );
}

export default ProposalDetailPage;