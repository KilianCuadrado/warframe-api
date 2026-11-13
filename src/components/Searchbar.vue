<template>
    <div class="searchbar-wrap">
        <input
            v-model="valor"
            type="text"
            class="search-input"
            placeholder="Buscar por nombre..."
            @keyup.enter="busqueda"
        />
        <button type="button" class="search-button" @click="busqueda">Buscar</button>
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
        display: flex;
        gap: 10px;
        margin: 0 0 28px;
        max-width: 520px;
        position: relative;
    }

    .search-button {
        background: rgba(101, 216, 237, 0.12);
        border: 1px solid rgba(101, 216, 237, 0.55);
        color: #c6f5fd;
        cursor: pointer;
        font-size: 0.9rem;
        letter-spacing: 0.12em;
        flex-shrink: 0;
        padding: 0 18px;
        text-transform: uppercase;
        transition: background 180ms ease, border-color 180ms ease;
    }

    .search-button:hover {
        background: rgba(101, 216, 237, 0.24);
        border-color: #75e3f4;
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

        .search-button {
            padding: 0 12px;
        }
    }
</style>