import {ref, onMounted} from 'vue';

//base url https://api.warframestat.us/
export const API_BASE_URL = 'https://api.warframestat.us'

export function useWarframeApi(url){
    const data = ref([]);
    const error = ref(null);
    const loading = ref(true);
    let currentUrl = url;

    // Si se le pasa una url nueva (por ejemplo desde un watch) la usa a partir de ahora
    const fetchData = async (newUrl) => {
        if (newUrl) currentUrl = newUrl;
        loading.value = true;
        error.value = null;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);

        try {
        const res = await fetch(currentUrl, { signal: controller.signal });

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

    // Carga inicial
    onMounted(() => fetchData());

    return { data, error, loading, refetch: fetchData };
    //return { data, error, loading, fetchData };
}
