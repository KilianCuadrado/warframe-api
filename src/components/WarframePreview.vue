<template>
    <article class="warframe-card">
        <div class="warframe-image">
            <span class="corner-tag">{{ props.warframe.type || 'WARFRAME' }} // {{ props.warframe.releaseDate || 'UNKNOWN' }}</span>
            <img :src="imageUrl" :alt="props.warframe.name" />
        </div>
        <div class="warframe-info">
            <p class="warframe-category">FRAME PROFILE</p>
            <h2>{{ props.warframe.name }}</h2>
            <p class="description">{{ props.warframe.description || 'No field data available.' }}</p>
            <div class="stats-grid">
                <div class="stat">
                    <span>HEALTH</span>
                    <strong>{{ props.warframe.health ?? '-' }}</strong>
                </div>
                <div class="stat">
                    <span>SHIELD</span>
                    <strong>{{ props.warframe.shield ?? '-' }}</strong>
                </div>
                <div class="stat">
                    <span>ARMOR</span>
                    <strong>{{ props.warframe.armor ?? '-' }}</strong>
                </div>
                <div class="stat">
                    <span>POWER</span>
                    <strong>{{ props.warframe.power ?? '-' }}</strong>
                </div>
                <div class="stat">
                    <span>SPRINT</span>
                    <strong>{{ formatDecimal(props.warframe.sprintSpeed) }}</strong>
                </div>
            </div>
            <RouterLink class="info-link" :to="{ name: 'warframeSpec', params: { id: props.warframe.name } }">Ver info</RouterLink>
        </div>
    </article>
</template>

<script setup>
    import { computed } from 'vue'
    import { useFormatters } from '@/composable/useFormatters'

    // Recibe el objeto entero del warframe con todos sus atributos
    const props = defineProps({
        warframe: {
            type: Object,
            required: true,
        },
    })

    const { getImageUrl, formatDecimal } = useFormatters()
    const imageUrl = computed(() => getImageUrl(props.warframe.imageName))
</script>

<style scoped>
    .warframe-card {
        background: linear-gradient(145deg, rgba(22, 35, 40, 0.92), rgba(10, 16, 19, 0.96));
        border: 1px solid rgba(119, 190, 204, 0.26);
        min-width: 0;
        overflow: hidden;
        position: relative;
        transition: border-color 180ms ease, transform 180ms ease;
    }

    .warframe-card:hover {
        border-color: rgba(105, 215, 233, 0.8);
        transform: translateY(-4px);
    }

    .warframe-image {
        align-items: center;
        background: radial-gradient(circle at 50% 45%, rgba(86, 155, 169, 0.18), transparent 62%);
        display: flex;
        height: 240px;
        justify-content: center;
        overflow: hidden;
        position: relative;
    }

    .warframe-image img {
        height: 100%;
        object-fit: contain;
        padding: 22px;
        transition: transform 220ms ease;
        width: 100%;
    }

    .warframe-card:hover .warframe-image img {
        transform: scale(1.06);
    }

    .corner-tag {
        color: #6babb7;
        font-size: 0.68rem;
        letter-spacing: 0.13em;
        position: absolute;
        right: 12px;
        top: 12px;
    }

    .warframe-info {
        border-top: 1px solid rgba(119, 190, 204, 0.2);
        display: flex;
        flex-direction: column;
        gap: 0;
        min-height: 320px;
        padding: 16px 18px 18px;
    }

    .warframe-category {
        color: #65d8ed;
        font-size: 0.72rem;
        letter-spacing: 0.2em;
        margin: 0 0 8px;
    }

    h2 {
        color: #f1f7f8;
        font-size: 1.65rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        margin: 0;
        overflow-wrap: anywhere;
        text-transform: uppercase;
    }

    .description {
        color: #91a5aa;
        font-family: sans-serif;
        font-size: 0.9rem;
        line-height: 1.6;
        margin: 10px 0 16px;
        overflow-wrap: anywhere;
    }

    .stats-grid {
        border-top: 1px solid rgba(119, 190, 204, 0.2);
        display: grid;
        gap: 4px;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        padding-top: 14px;
    }

    .stat {
        min-width: 0;
        text-align: center;
    }

    .stat span {
        color: #6babb7;
        display: block;
        font-size: 0.52rem;
        letter-spacing: 0.08em;
        white-space: nowrap;
    }

    .stat strong {
        color: #e7f2f6;
        display: block;
        font-size: 1rem;
        font-weight: 600;
        margin-top: 4px;
    }

    .info-link {
        align-items: center;
        background: linear-gradient(90deg, rgba(103, 215, 234, 0.1), rgba(103, 215, 234, 0));
        border: 1px solid rgba(103, 215, 234, 0.55);
        color: #c6f5fd;
        display: inline-flex;
        letter-spacing: 0.14em;
        margin-top: auto;
        padding: 8px 12px;
        text-decoration: none;
        text-transform: uppercase;
        transition: background 180ms ease, border-color 180ms ease, transform 180ms ease;
        width: fit-content;
    }

    .info-link:hover {
        background: rgba(103, 215, 234, 0.18);
        border-color: #75e3f4;
        transform: translateX(2px);
    }

    @media (max-width: 420px) {
        .stats-grid {
            gap: 6px;
        }

        .stat span {
            font-size: 0.45rem;
        }
    }
</style>
