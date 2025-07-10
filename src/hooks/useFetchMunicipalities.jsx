import {useState} from "react";
import axios from "axios";

function useFetchMunicipalities() {

    const [municipalities, setMunicipalities] = useState([]);
    const [loading, toggleLoading] = useState(false);

    async function fetchMunicipalities(province) {
        toggleLoading(true);

        try {
            const provinceName = province.value;
            const response = await axios.get(`${import.meta.env.VITE_API_KEY}/municipalities/by-province/${provinceName}`);

            const municipalityOptions = response.data.map((municipality) => ({
                value: municipality.id,
                label: municipality.name,
            }));

            setMunicipalities(municipalityOptions);
        } catch (err) {
            console.error("Gemeentes ophalen mislukt:", err);
        } finally {
            toggleLoading(false)
        }
    }

    return {municipalities, loading, fetchMunicipalities}
}

export default useFetchMunicipalities
