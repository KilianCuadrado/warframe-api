<template>
    <article class="warframe-card">
        <div class="warframe-image">
            <span class="corner-tag">{{ props.type || 'WARFRAME' }} // {{ props.releaseDate || 'UNKNOWN' }}</span>
            <img :src="imageUrl" :alt="props.name" />
        </div>
        <div class="warframe-info">
            <p class="warframe-category">FRAME PROFILE</p>
            <h2>{{ props.name }}</h2>
            <p class="description">{{ props.description || 'No field data available.' }}</p>
            <div class="stats-grid">
                <div class="stat">
                    <span>HEALTH</span>
                    <strong>{{ props.health ?? '-' }}</strong>
                </div>
                <div class="stat">
                    <span>SHIELD</span>
                    <strong>{{ props.shield ?? '-' }}</strong>
                </div>
                <div class="stat">
                    <span>ARMOR</span>
                    <strong>{{ props.armor ?? '-' }}</strong>
                </div>
                <div class="stat">
                    <span>POWER</span>
                    <strong>{{ props.power ?? '-' }}</strong>
                </div>
                <div class="stat">
                    <span>SPRINT</span>
                    <strong>{{ props.sprintSpeed != null ? Number(props.sprintSpeed).toFixed(2) : '-' }}</strong>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup>
    const props = defineProps({
        name: String,
        image: String,
        description: String,
        type: String,
        releaseDate: String,
        health: Number,
        shield: Number,
        armor: Number,
        power: Number,
        sprintSpeed: Number
    })

    const imageUrl = `https://cdn.warframestat.us/img/${props.image}`
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

    .warframe-card::before {
        background: #69d7e9;
        content: '';
        height: 2px;
        left: 0;
        position: absolute;
        top: 0;
        width: 44px;
        z-index: 1;
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
        padding: 16px 18px 20px;
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

    @media (max-width: 420px) {
        .stats-grid {
            gap: 6px;
        }

        .stat span {
            font-size: 0.45rem;
        }
    }
</style>
