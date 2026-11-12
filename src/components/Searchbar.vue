<template>
    <div class="searchbar-wrap">
        <input
            v-model="valor"
            type="text"
            class="search-input"
            placeholder="Buscar warframe por nombre..."
            @keyup.enter="busqueda"
        />
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    const emit = defineEmits(['search']);
    const valor = ref('')

    const busqueda = () => {
        emit('search', valor.value);
    }
</script>

<style scoped>
    .searchbar-wrap {
        margin: 0 0 28px;
        max-width: 520px;
        position: relative;
    }

    .search-input {
        background: linear-gradient(140deg, rgba(17, 28, 33, 0.95), rgba(10, 16, 19, 0.95));
        border: 1px solid rgba(101, 216, 237, 0.35);
        color: #ecf8fb;
        font-size: 1rem;
        letter-spacing: 0.05em;
        outline: none;
        padding: 12px 14px;
        transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
        width: 100%;
    }

    .search-input::placeholder {
        color: #7f98a0;
        letter-spacing: 0.04em;
    }

    .search-input:focus {
        background: linear-gradient(140deg, rgba(20, 34, 39, 0.98), rgba(12, 19, 23, 0.98));
        border-color: rgba(115, 231, 248, 0.85);
        box-shadow: 0 0 0 3px rgba(101, 216, 237, 0.12);
    }

    @media (max-width: 640px) {
        .searchbar-wrap {
            max-width: 100%;
        }

        .search-input {
            font-size: 0.95rem;
            padding: 11px 12px;
        }
    }
</style>