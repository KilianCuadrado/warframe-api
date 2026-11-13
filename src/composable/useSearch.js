import { ref, computed, toValue } from 'vue'

// Filtra una lista (ref, computed o array) por un campo de texto (por defecto 'name')
export function useSearch(items, field = 'name') {
    const searchText = ref('')

    const setSearch = (input) => {
        searchText.value = (input || '').trim()
    }

    const filteredItems = computed(() => {
        const term = searchText.value.toLowerCase()//combierte el texto de busqueda a lower
        const value = toValue(items)
        const list = Array.isArray(value) ? value : []//compruva si el data value es array si lo es la const list es data.value en caso contrario se hace un array vacio
        if (!term) return list
        return list.filter((item) => String(item?.[field] ?? '').toLowerCase().includes(term))
    })

    return { searchText, setSearch, filteredItems }
}
