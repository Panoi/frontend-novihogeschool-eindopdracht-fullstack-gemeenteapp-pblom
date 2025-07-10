import {formDate} from "../../helperfuncties/FormDate.jsx";
import Button from "../button/Button.jsx";
import "./ProposalCard.css"
import {StatusContext} from "../../context/StatusContext.jsx";
import {useContext} from "react";
import useFetchImage from "../../hooks/useFetchImage.jsx";

function ProposalCard({proposal, loading, deleteProposal, deleteButton = false, clickProposal}) {

    const { translateStatus } = useContext(StatusContext)
    const { image} = useFetchImage(proposal.id);

    return (
        <>

                    <article key={proposal.id} className="proposal-card" onClick={() => clickProposal(proposal.id)}>
                        <p className="proposal-author">{proposal.firstName} {proposal.lastName}</p>
                        <p className="proposal-date">{formDate(proposal.submittedAt)}</p>
                        <span className="image-container">

                        {image && (
                            <img
                                className="proposal-image"
                                src={image}
                                alt={`Afbeelding van ${proposal.title}`}
                            />
                        )}

                        </span>
                        <div className="text-container">
                            <header className="proposal-title">{proposal.title}</header>
                            <p className="proposal-description">{proposal.description}</p>
                        </div>
                        <p className="proposal-status"><strong>Verzoek
                            status:</strong> {translateStatus(proposal.status)}</p>
                        <div className="button-div-proposal">
                            {deleteButton &&
                                <Button
                                    type="button"
                                    disabled={loading}
                                    buttonFunction="Verwijderen"
                                    className="button-global delete-proposal"
                                    onClickEffect={(e) => {
                                        e.stopPropagation();
                                        deleteProposal(proposal.id);
                                    }}
                                />
                            }
                        </div>
                    </article>

        </>
    );
}

export default ProposalCard;