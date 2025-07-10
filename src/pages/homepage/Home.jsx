import {useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import SelectBox from "../../components/selectbox/SelectBox.jsx";
import useFetchProvinces from "../../hooks/useFetchProvinces.jsx";
import "./Home.css"


function Home() {

    const {control, formState: {errors}} = useForm({
        mode: "onBlur"
    });

    const [loading, toggleLoading] = useState(false);
    const [municipalities, setMunicipalities] = useState([]);

    const {provinces, provinceLoading} = useFetchProvinces();

    async function fetchMunicipalities(municipality) {
        toggleLoading(true);
        try {
            const provinceName = municipality.value;
            const response = await axios.get(`${import.meta.env.VITE_API_KEY}/municipalities/by-province/${provinceName}`);
            setMunicipalities(response.data);
        } catch (err) {
            console.error("Gemeentes ophalen mislukt:", err);
        } finally {
            toggleLoading(false)
        }
    }

    return (
        <>
            <section className="home-intro-section">
                <h1 className="intro-title">Welkom bij de gemeenteApp</h1>
                <p className="intro-text"> Wilt u ook zo graag uw gemeente zo mooi mogelijk houden? Dan bent u hier op
                    het juiste adres.
                    Wij hebben hiervoor de gemeenteApp ontwikkeld waarbij u een verzoek kan indienen richting de
                    gemeente.
                    Daarnaast kunnen u en uw medebewoners binnen de gemeente elkaars verzoeken inzien en erop reageren.
                    De gemeente zal de verzoeken bekijken en bij akkoord actie ondernemen.
                    Wilt u gebruik maken van deze app? Kijk dan eerst hieronder of uw gemeente is aangesloten.</p>

            </section>
            <section className="municipality-search-section">

                {provinceLoading && <p>Provincies aan het laden...</p>}

                <SelectBox
                    name="province"
                    control={control}
                    errors={errors}
                    options={provinces}
                    label="Selecteer uw provincie:"
                    placeholder="Provincie"
                    selectLabel="select-label home"
                    selectInput="select-input home"
                    selectDiv="select-div home"
                    onChange={fetchMunicipalities}
                />

                {!loading && municipalities.length > 0 && (
                    <div className="municipality-div">
                        <ul className="municipality-ul">
                            {municipalities.map((municipality) => (
                                <li key={municipality.name}>
                                    <p className="municipality">{municipality.name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        </>
    );
}

export default Home