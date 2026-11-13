<template>
    <main class="spec-page">
        <p v-if="loading" class="status">SYNCING WARFRAME DATA<span>...</span></p>
        <p v-else-if="error" class="status status-error">CONNECTION ERROR // {{ error }}</p>

        <template v-else>
            <section class="spec-hero">
                <div class="hero-media">
                    <img :src="getImageUrl(data.imageName)" :alt="data.name" />
                </div>
                <div class="hero-content">
                    <p class="kicker">Warframe Profile</p>
                    <h1>{{ data.name }}</h1>
                    <p class="description">{{ data.description }}</p>
                    <div class="stats-grid">
                        <div class="stat"><span>Health</span><strong>{{ data.health }}</strong></div>
                        <div class="stat"><span>Shield</span><strong>{{ data.shield }}</strong></div>
                        <div class="stat"><span>Armor</span><strong>{{ data.armor }}</strong></div>
                        <div class="stat"><span>Power</span><strong>{{ data.power }}</strong></div>
                        <div class="stat"><span>Sprint</span><strong>{{ formatDecimal(data.sprintSpeed ?? data.sprint) }}</strong></div>
                        <div class="stat"><span>Sex</span><strong>{{ data.sex ?? 'None'}}</strong></div>
                        <div class="stat"><span>Release</span><strong>{{ data.releaseDate }}</strong></div>
                        <div class="stat"><span>Market</span><strong>{{ data.marketCost ?? '-' }}</strong></div>
                    </div>
                </div>
            </section>

            <section class="abilities-section">
                <h2>Abilities</h2>
                <div class="abilities-grid">
                    <article v-for="ability in abilities" :key="ability.name" class="ability-card">
                        <div class="card-header">
                            <img class="ability-icon" :src="getImageUrl(ability.imageName)" :alt="ability.name" />
                            <h3>{{ ability.name }}</h3>
                        </div>
                        <p>{{ ability.description }}</p>
                    </article>
                </div>
            </section>

            <section class="components-section">
                <h2>Components</h2>
                <div class="components-grid">
                    <article v-for="component in components" :key="component.name" class="component-card">
                        <div class="card-header">
                            <img class="component-icon" :src="getImageUrl(component.imageName)" :alt="component.name" />
                            <h3>{{ component.name }}</h3>
                        </div>
                        <p>{{ component.description }}</p>
                        <p class="meta">Tradable: {{ component.tradable ? 'Yes' : 'No' }}</p>
                        <ul v-if="component.drops?.length" class="drop-list">
                            <li v-for="drop in component.drops" :key="`${drop.location}-${drop.type}`" class="drop-item">
                                {{ drop.location }} | {{ drop.type }} | {{ formatPercent(drop.chance) }} | {{ drop.rarity }}
                            </li>
                        </ul>
                    </article>
                </div>
            </section>
        </template>
    </main>
</template>

<script setup>
    import { computed, watch } from 'vue'
    import {useRoute} from 'vue-router'
    import {useWarframeApi, API_BASE_URL} from '@/composable/useWarframeApi'
    import {useFormatters} from '@/composable/useFormatters'

    const route=useRoute()
    const getWarframeUrl = (id) => `${API_BASE_URL}/warframes/${id}`

    const { data, error, loading, refetch } = useWarframeApi(getWarframeUrl(route.params.id))
    const { getImageUrl, formatDecimal, formatPercent } = useFormatters()

    // Si cambia el id de la url, volvemos a hacer la peticion con el nuevo warframe
    watch(() => route.params.id, (nouId, anticId) => {
        if (nouId !== anticId) {
            refetch(getWarframeUrl(nouId))
        }
    })

    const abilities = computed(() => (data.value?.abilities || []).slice(0, 4))
    const components = computed(() => (data.value?.components || []).filter((c) => c.category === 'Components'))

</script>

<style scoped>
    .spec-page {
        margin: 0 auto;
        max-width: 1320px;
        padding: clamp(32px, 6vw, 84px) clamp(20px, 5vw, 72px) 90px;
    }

    .spec-hero {
        display: grid;
        gap: 16px;
        grid-template-columns: minmax(260px, 380px) 1fr;
        margin-bottom: 26px;
    }

    .hero-media,
    .hero-content {
        background: linear-gradient(150deg, rgba(20, 33, 39, 0.94), rgba(9, 15, 18, 0.96));
        border: 1px solid rgba(114, 192, 208, 0.28);
        min-width: 0;
    }

    .hero-media {
        align-items: center;
        display: flex;
        justify-content: center;
        padding: 18px;
    }

    .hero-media img {
        max-height: 420px;
        object-fit: contain;
        width: 100%;
    }

    .hero-content {
        padding: clamp(16px, 2.2vw, 28px);
    }

    .kicker {
        color: #66cfe4;
        font-size: 0.75rem;
        letter-spacing: 0.2em;
        margin: 0;
        text-transform: uppercase;
    }

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        letter-spacing: 0.08em;
        line-height: 0.92;
        margin: 8px 0 12px;
        text-transform: uppercase;
    }

    .description {
        color: #9cb2b8;
        line-height: 1.6;
        margin: 0;
        max-width: 64ch;
    }

    .stats-grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        margin-top: 18px;
    }

    .stat {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(114, 192, 208, 0.2);
        padding: 8px 10px;
    }

    .stat span {
        color: #71b7c4;
        display: block;
        font-size: 0.68rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .stat strong {
        color: #ecf8fb;
        display: block;
        font-size: 1rem;
        margin-top: 4px;
    }

    .abilities-section {
        margin-top: 8px;
    }

    h2 {
        border-left: 2px solid #69d7e9;
        font-size: 1.25rem;
        letter-spacing: 0.1em;
        margin: 0 0 14px;
        padding-left: 10px;
        text-transform: uppercase;
    }

    .abilities-grid {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }

    .ability-card {
        background: rgba(12, 18, 21, 0.86);
        border: 1px solid rgba(114, 192, 208, 0.22);
        padding: 14px;
    }

    .card-header {
        align-items: center;
        display: flex;
        gap: 12px;
        margin-bottom: 10px;
    }

    .ability-icon,
    .component-icon {
        border: 1px solid rgba(114, 192, 208, 0.22);
        display: block;
        flex-shrink: 0;
        height: 72px;
        object-fit: contain;
        padding: 6px;
        width: 72px;
    }

    h3 {
        color: #eaf6f9;
        margin: 0;
        text-transform: uppercase;
    }

    .ability-card p,
    .component-card p {
        color: #97adb4;
        line-height: 1.55;
        margin: 0;
    }

    .components-section {
        margin-top: 26px;
    }

    .components-grid {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }

    .component-card {
        background: rgba(12, 18, 21, 0.86);
        border: 1px solid rgba(114, 192, 208, 0.22);
        padding: 14px;
    }

    .component-card .meta {
        color: #71b7c4;
        font-size: 0.68rem;
        letter-spacing: 0.12em;
        margin-top: 10px;
        text-transform: uppercase;
    }

    .drop-list {
        list-style: disc;
        margin: 10px 0 0;
        padding-left: 18px;
    }

    .drop-item {
        color: #ecf8fb;
        font-size: 0.8rem;
        line-height: 1.5;
    }

    .drop-item + .drop-item {
        margin-top: 4px;
    }

    .drop-item::marker {
        color: #69d7e9;
    }

    .status {
        color: #68d5e8;
        letter-spacing: 0.14em;
        padding: 18px 0;
    }

    .status span {
        animation: blink 900ms infinite;
    }

    .status-error {
        color: #ef837d;
    }

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }

    @media (max-width: 900px) {
        .spec-hero {
            grid-template-columns: 1fr;
        }
    }
</style>