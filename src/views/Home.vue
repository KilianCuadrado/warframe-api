<template>
    <main class="home-page">
        <section class="hero">
            <p class="kicker">Origin System Intel</p>
            <h1>Live Operations Feed</h1>
            <p>Noticias, eventos activos y alertas con recompensas actualizadas en tiempo real.</p>
        </section>

        <p v-if="loading" class="status">SYNCING SYSTEM FEED<span>...</span></p>
        <p v-else-if="error" class="status status-error">CONNECTION ERROR // {{ error }}</p>

        <template v-else>
            <!--Poner alertas de la api de warfmra no todas alguns como horarios tiempo para baro i eventos activos-->
            <section class="panel-grid">
                <article v-for="notice in data.news" :key="notice.id || notice.message" class="intel-card">
                    <div class="notice-head">
                        <p class="card-type">NEWS</p>
                        <div v-if="getNoticeTags(notice).length" class="notice-tags">
                            <span v-for="tag in getNoticeTags(notice)" :key="tag" class="notice-tag">{{ tag }}</span>
                        </div>
                    </div>
                    <img
                        v-if="notice.imageLink"
                        :src="notice.imageLink"
                        :alt="notice.message"
                        class="notice-image"
                    />
                    <p class="card-title">{{ notice.message }}</p>
                    <div class="notice-footer">
                        <a :href="notice.link" target="_blank" rel="noreferrer" class="cta-link">Details</a>
                        <div class="date-chip single-date">
                            <span class="date-label">Published</span>
                            <strong>{{ formatDateTime(notice.date) }}</strong>
                        </div>
                    </div>
                </article>
            </section>

            <section class="event-list">
                <h2>Eventos</h2>
                <div class="event-grid">
                    <article v-for="event in data.events" :key="event.id || event.activation" class="event-card">
                        <h3>{{ event.description }}</h3>
                        <div class="date-row">
                            <div class="date-chip">
                                <span class="date-label">Start</span>
                                <strong>{{ formatDateTime(event.activation) }}</strong>
                            </div>
                            <div class="date-chip">
                                <span class="date-label">End</span>
                                <strong>{{ formatDateTime(event.expiry) }}</strong>
                            </div>
                        </div>
                        <p class="tooltip">{{ event.tooltip }}</p>
                    </article>
                </div>
            </section>

            <section class="alerts-list">
                <h2>Alertas</h2>
                <div class="alerts-grid">
                    <article v-for="alert in data.alerts" :key="alert.id || alert.activation" class="alert-card">
                        <p class="card-title">{{ alert.mission.description }}</p>
                        <div class="date-row">
                            <div class="date-chip">
                                <span class="date-label">Start</span>
                                <strong>{{ formatDateTime(alert.activation) }}</strong>
                            </div>
                            <div class="date-chip">
                                <span class="date-label">End</span>
                                <strong>{{ formatDateTime(alert.expiry) }}</strong>
                            </div>
                        </div>
                        <p class="meta">{{ alert.mission.node }} - {{ alert.mission.faction }}</p>
                        <ul>
                            <li v-for="reward in alert.mission.reward.countedItems" :key="reward.type" class="reward-item">
                                <img :src="`https://cdn.warframestat.us/img/${reward.type}.png`" :alt="reward.type" />
                                <span>{{ reward.count }}x {{ reward.type }}</span>
                            </li>
                        </ul>
                    </article>
                </div>
            </section>
        </template>
    </main>
</template>
<script setup>
    import { useWarframeApi } from '@/composable/useWarframeApi';

    const urlBase = 'https://api.warframestat.us/ns'
    const { data, error, loading } = useWarframeApi(urlBase)

    const formatDateTime = (value) => {
        if (!value) return '-'

        const parsed = new Date(value)
        if (Number.isNaN(parsed.getTime())) return value

        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(parsed)
    }

    const getNoticeTags = (notice) => {
        const tags = []

        if (notice?.update) tags.push('Update')
        if (notice?.primeAccess) tags.push('Prime Access')
        if (notice?.stream) tags.push('Stream')
        if (notice?.mobileOnly) tags.push('Mobile Only')

        return tags
    }
</script>

<style scoped>
    .home-page {
        margin: 0 auto;
        max-width: 1440px;
        padding: clamp(34px, 6vw, 86px) clamp(20px, 5vw, 72px) 80px;
    }

    .hero {
        background: linear-gradient(130deg, rgba(23, 38, 44, 0.86), rgba(12, 18, 22, 0.92));
        border: 1px solid rgba(111, 192, 207, 0.24);
        margin-bottom: 28px;
        padding: clamp(20px, 3vw, 34px);
        position: relative;
    }

    .hero::after {
        background: #65d8ed;
        content: '';
        height: 2px;
        left: 0;
        position: absolute;
        top: 0;
        width: 88px;
    }

    .kicker {
        color: #66cfe4;
        font-size: 0.78rem;
        letter-spacing: 0.24em;
        margin: 0;
        text-transform: uppercase;
    }

    h1 {
        font-size: clamp(2.1rem, 5vw, 4.2rem);
        letter-spacing: 0.08em;
        line-height: 0.95;
        margin: 10px 0 8px;
        text-transform: uppercase;
    }

    .hero p:last-child {
        color: #9db0b6;
        margin: 0;
        max-width: 62ch;
    }

    .panel-grid {
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        margin-bottom: 36px;
    }

    .intel-card,
    .event-card,
    .alert-card {
        background: rgba(11, 18, 22, 0.82);
        border: 1px solid rgba(109, 185, 201, 0.22);
        min-height: 360px;
        padding: 16px;
    }

    .intel-card {
        display: flex;
        flex-direction: column;
    }

    .card-type {
        color: #66cfe4;
        font-size: 0.7rem;
        letter-spacing: 0.18em;
        margin: 0;
    }

    .notice-head {
        align-items: flex-start;
        display: flex;
        gap: 8px;
        justify-content: space-between;
        min-height: 24px;
        margin-bottom: 10px;
    }

    .notice-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        justify-content: flex-end;
    }

    .notice-tag {
        background: rgba(101, 216, 237, 0.1);
        border: 1px solid rgba(101, 216, 237, 0.3);
        color: #8ee4f2;
        font-size: 0.62rem;
        letter-spacing: 0.1em;
        padding: 3px 6px;
        text-transform: uppercase;
        white-space: nowrap;
    }

    .notice-footer {
        align-items: flex-end;
        display: flex;
        gap: 10px;
        justify-content: space-between;
        margin-top: auto;
    }

    .notice-image {
        border: 1px solid rgba(101, 216, 237, 0.22);
        display: block;
        height: 150px;
        margin-bottom: 12px;
        object-fit: cover;
        width: 100%;
    }

    .card-title {
        color: #e6f3f7;
        font-size: 1.05rem;
        line-height: 1.4;
        margin: 0 0 12px;
        min-height: 58px;
    }

    .meta {
        color: #7f949b;
        font-size: 0.84rem;
        margin: 8px 0 0;
    }

    .date-row {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(auto-fit, minmax(165px, 1fr));
        margin-top: 8px;
    }

    .date-chip {
        background: rgba(101, 216, 237, 0.06);
        border: 1px solid rgba(101, 216, 237, 0.25);
        padding: 7px 9px;
    }

    .single-date {
        margin-top: 0;
        width: fit-content;
    }

    .date-label {
        color: #78c5d4;
        display: block;
        font-size: 0.64rem;
        letter-spacing: 0.12em;
        margin-bottom: 4px;
        text-transform: uppercase;
    }

    .date-chip strong {
        color: #e6f2f6;
        font-size: 0.82rem;
        font-weight: 600;
        letter-spacing: 0.03em;
    }

    .cta-link {
        border: 1px solid rgba(101, 216, 237, 0.62);
        color: #72def0;
        display: inline-block;
        letter-spacing: 0.1em;
        margin-bottom: 2px;
        padding: 6px 10px;
        text-decoration: none;
        text-transform: uppercase;
    }

    .cta-link:hover {
        background: rgba(101, 216, 237, 0.16);
    }

    .event-list,
    .alerts-list {
        margin-top: 36px;
    }

    .event-grid,
    .alerts-grid {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    h2 {
        border-left: 2px solid #65d8ed;
        font-size: 1.35rem;
        letter-spacing: 0.1em;
        margin: 0 0 14px;
        padding-left: 10px;
        text-transform: uppercase;
    }

    .event-card {
        min-height: 0;
        padding: 12px;
    }

    .alert-card {
        min-height: 0;
    }

    .event-card h3 {
        font-size: 1rem;
        margin: 0 0 8px;
    }

    .event-card .date-row {
        gap: 6px;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        margin-top: 4px;
    }

    .event-card .date-chip {
        padding: 6px 8px;
    }

    .event-card .date-label {
        font-size: 0.58rem;
    }

    .event-card .date-chip strong {
        font-size: 0.76rem;
    }

    .event-card .tooltip {
        font-size: 0.9rem;
        margin-top: 6px;
    }

    .tooltip {
        color: #9ab2b8;
        margin: 8px 0 0;
    }

    ul {
        display: grid;
        gap: 8px;
        list-style: none;
        margin: 12px 0 0;
        max-width: 360px;
        padding: 0;
    }

    .reward-item {
        align-items: center;
        background: rgba(101, 216, 237, 0.05);
        border: 1px solid rgba(104, 190, 207, 0.24);
        display: flex;
        gap: 10px;
        max-width: 340px;
        padding: 8px;
    }

    .reward-item img {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(104, 190, 207, 0.28);
        height: 56px;
        object-fit: contain;
        padding: 6px;
        width: 56px;
    }

    .reward-item span {
        font-size: 1rem;
        line-height: 1.3;
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

    @media (max-width: 980px) {
        .event-grid,
        .alerts-grid {
            grid-template-columns: 1fr;
        }
    }

    @keyframes blink {
        50% { opacity: 0; }
    }
</style>