import {useEffect, useState} from "react";
import axios from "axios";

function useFetchImage(proposalId){

    const [image, setImage] = useState('');
    const [loading, toggleLoading] = useState(false);


    useEffect(() => {
        async function fetchImage() {
            const token = localStorage.getItem("token");
            toggleLoading(true)
            try {
                const response = await axios.get(`http://localhost:8080/proposals/${proposalId}/photo`, {
                    responseType: 'arraybuffer',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const blob = new Blob([response.data], {type: "image/jpeg"});
                const dataUrl = URL.createObjectURL(blob);
                setImage(dataUrl);
            } catch (err) {
                console.error(err)
            } finally {
                toggleLoading(false);
            }
        }

        if (proposalId) {
            void fetchImage();
        }
    }, [proposalId]);

    return { image, loading };
}


export default useFetchImage;