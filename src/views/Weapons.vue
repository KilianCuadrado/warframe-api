<script setup>
    import { useWarframeApi } from '@/composable/useWarframeApi';
    import WeaponPreview from '../components/WeaponPreview.vue';

    const url_base='https://api.warframestat.us/weapons'
    const {data, error, loading, refetch: fetchData } = useWarframeApi(url_base)
    const formatTags = (tags) => Array.isArray(tags) ? tags.join(' // ') : ''

</script>
<template>
        <main class="weapons-page">
                <section class="page-heading">
                        <h1>Weapons</h1>
                        <p class="intro">Browse the arsenal of the Origin System.</p>
                </section>
                <p v-if="loading" class="status">SYNCING ARSENAL<span>...</span><small>Downloading weapon data</small></p>
                <p v-else-if="error" class="status status-error">CONNECTION ERROR // {{ error }}</p>
                <section v-else class="weapon-grid">
                        <WeaponPreview v-for="weapon in data" 
                        :key="weapon.name"
                        :weaponName="weapon.name" 
                        :img="weapon.imageName" 
                        :desc="weapon.description"
                        :type="weapon.type"
                        :relDate="weapon.releaseDate"
                        :tag="formatTags(weapon.tags)"
                        />
                </section>
        </main>
</template>

<style scoped>
    .weapons-page {
        margin: 0 auto;
        max-width: 1440px;
        padding: clamp(48px, 8vw, 104px) clamp(20px, 5vw, 72px);
    }

    .page-heading {
        border-left: 2px solid #68d5e8;
        margin-bottom: 46px;
        padding-left: 22px;
    }

    h1 {
        color: #f3f8f9;
        font-size: clamp(3rem, 8vw, 6.5rem);
        font-weight: 500;
        letter-spacing: 0.08em;
        line-height: 0.85;
        margin: 0;
        text-transform: uppercase;
    }

    .intro {
        color: #8da1a7;
        font-size: 1.05rem;
        letter-spacing: 0.08em;
        margin: 18px 0 0;
    }

    .weapon-grid {
        display: grid;
        gap: 18px;
        grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    }

    .status {
        color: #68d5e8;
        letter-spacing: 0.18em;
        padding: 50px 0;
    }

    .status span {
        animation: blink 900ms infinite;
    }

    .status small {
        color: #8da1a7;
        display: block;
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        margin-top: 12px;
    }

    .status-error {
        color: #ef837d;
    }

    @keyframes blink {
        50% { opacity: 0; }
    }
</style>
