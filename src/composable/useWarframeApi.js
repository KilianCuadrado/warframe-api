import {ref, onMounted} from 'vue';
//base url https://api.warframestat.us/
export function useWarframeApi(url){
    const data = ref([]);
    const error = ref(null);
    const loading = ref(true);

    const fetchData = async () => {
        loading.value = true;
        error.value = null;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);

        try {
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
            throw new Error('Error en la peticio: ' + res.status);
        }

        data.value = await res.json();
        } catch (err) {
        error.value = err.name === 'AbortError'
            ? 'La API ha tardado demasiado en responder.'
            : err.message;
        } finally {
        clearTimeout(timeout);
        loading.value = false;
        }
    };

    onMounted(fetchData);

    return { data, error, loading, refetch: fetchData };
    //return { data, error, loading, fetchData };
}