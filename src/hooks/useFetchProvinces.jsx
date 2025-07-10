import { useEffect, useState } from "react";
import axios from "axios";
import { translateProvince } from "../helperfuncties/TranslateProvince.jsx";


function useFetchProvinces() {

    const [provinces, setProvinces] = useState([]);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetchProvinces() {
            toggleLoading(true);

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/municipalities/province`);

                const options = response.data.map((province) => ({
                    value: province,
                    label: translateProvince(province)
                }));

                setProvinces(options);
            } catch (err) {
                console.error("Provincies ophalen mislukt:", err);
            } finally {
                toggleLoading(false)
            }
        }

        void fetchProvinces();

    }, []);

    return { provinces, loading };

}

export default useFetchProvinces;