<script setup>
    import { useWarframeApi } from '@/composable/useWarframeApi';
    import WarframePreview from '../components/WarframePreview.vue';

    const urlBase = 'https://api.warframestat.us/warframes'
    const { data, error, loading } = useWarframeApi(urlBase)
</script>

<template>
    <main class="warframes-page">
        <section class="page-heading">
            <h1>Warframes</h1>
            <p class="intro">Discover the guardians of the Origin System.</p>
        </section>
        <p v-if="loading" class="status">SYNCING WARFRAMES<span>...</span><small>Downloading frame data</small></p>
        <p v-else-if="error" class="status status-error">CONNECTION ERROR // {{ error }}</p>
        <section v-else class="warframe-grid">
            <WarframePreview
                v-for="warframe in data"
                :key="warframe.name"
                :name="warframe.name"
                :image="warframe.imageName"
                :description="warframe.description"
                :type="warframe.type"
                :release-date="warframe.releaseDate"
                :health="warframe.health"
                :shield="warframe.shield"
                :armor="warframe.armor"
                :power="warframe.power"
                :sprint-speed="warframe.sprintSpeed"
            />
        </section>
    </main>
</template>

<style scoped>
    .warframes-page {
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

    .warframe-grid {
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