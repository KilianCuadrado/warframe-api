<template>
    <article class="weapon-card">
        <div class="weapon-image">
            <span class="corner-tag">{{ props.tag }} // {{ props.relDate }}</span>
            <img :src="imgUrl" :alt="props.weaponName" />
        </div>
        <div class="weapon-info">
            <p class="weapon-type"> {{ props.type }}</p>
            <h2>{{ props.weaponName }}</h2>
            <p class="description">{{ props.desc || 'No field data available.' }}</p>
        </div>
    </article>

</template>
<script setup>
    const props = defineProps ({
        weaponName: String,
        img: String,
        desc: String,
        type: String,
        relDate: String,
        tag: String
    })
    const imgUrl = `https://cdn.warframestat.us/img/${props.img}`
</script>

<style scoped>
    .weapon-card {
        background: linear-gradient(145deg, rgba(22, 35, 40, 0.92), rgba(10, 16, 19, 0.96));
        border: 1px solid rgba(119, 190, 204, 0.26);
        min-width: 0;
        overflow: hidden;
        position: relative;
        transition: border-color 180ms ease, transform 180ms ease;
    }

    .weapon-card::before {
        background: #69d7e9;
        content: '';
        height: 2px;
        left: 0;
        position: absolute;
        top: 0;
        width: 44px;
        z-index: 1;
    }

    .weapon-card:hover {
        border-color: rgba(105, 215, 233, 0.8);
        transform: translateY(-4px);
    }

    .weapon-image {
        align-items: center;
        background: radial-gradient(circle at 50% 45%, rgba(86, 155, 169, 0.18), transparent 62%);
        display: flex;
        height: 240px;
        justify-content: center;
        overflow: hidden;
        position: relative;
    }

    .weapon-image img {
        height: 100%;
        object-fit: contain;
        padding: 28px;
        transition: transform 220ms ease;
        width: 100%;
    }

    .weapon-card:hover .weapon-image img {
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

    .weapon-info {
        border-top: 1px solid rgba(119, 190, 204, 0.2);
        padding: 16px 18px 20px;
    }

    .weapon-type {
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
        text-transform: uppercase;
        overflow-wrap: anywhere;
    }

    .description {
        color: #91a5aa;
        font-family: sans-serif;
        font-size: 0.9rem;
        line-height: 1.6;
        margin: 10px 0 0;
        overflow-wrap: anywhere;
    }

</style>