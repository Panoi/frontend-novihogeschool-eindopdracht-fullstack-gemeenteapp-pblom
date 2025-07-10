import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./ProposalOverview.css"
import ProposalCard from "../../components/proposalcard/ProposalCard.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

function ProposalOverview() {

    const { user } = useContext(AuthContext);
    const [proposals, setProposals] = useState([])
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        async function fetchProposals() {
            const token = localStorage.getItem("token");
            toggleLoading(true)

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/proposals/municipality`, {
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
    }, []);


    const clickProposal = (proposalId) => {
        navigate(`/voorstel/${proposalId}`);
    }

    return (
        <section className="proposal-overview-section">
            <h2>Overzicht van voorstellen binnen {user.municipalityName}</h2>

            <div className="proposal-list">
                {!loading && proposals.length > 0 &&
                    proposals.map((proposal) => (
                <ProposalCard
                    loading={loading}
                    proposal={proposal}
                    clickProposal={clickProposal}
                    key={proposal.id}
                />
                    ))
                }
            </div>

            {!loading && proposals.length === 0 && (
                <p>Er zijn helaas nog geen voorstellen binnen uw gemeente.</p>)}

        </section>
    );
}

export default ProposalOverview