import {ref, onMounted} from 'vue';
//base url https://api.warframestat.us/
export function useWarframeApi(url){
    const data = ref(null);
    const error = ref(null);
    const loading = ref(true);

    const fetchData = async () => {
        loading.value = true;
        error.value = null;

        try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('Error en la peticio: ' + res.status);
        }

        data.value = await res.json();
        } catch (err) {
        error.value = err.message;
        } finally {
        loading.value = false;
        }
    };

    onMounted(fetchData);

    return { data, error, loading, refetch: fetchData };
    //return { data, error, loading, fetchData };
}