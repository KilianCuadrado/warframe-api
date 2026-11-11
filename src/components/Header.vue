<template>
    <header class="site-header">
      <RouterLink class="brand" to="/">
        <span class="brand-mark">W</span>
        <span>WARFRAME <small>ARSENAL</small></span>
      </RouterLink>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/alerts">Alerts</RouterLink>
        <RouterLink to="/warframes">Warframes</RouterLink>
        <RouterLink to="/weapons">Weapons</RouterLink>
        <RouterLink to="/drops">Drops</RouterLink>
      </nav>
  </header>
</template>
<style scoped>
  .site-header {
    align-items: center;
    border-bottom: 1px solid rgba(123, 194, 211, 0.24);
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1440px;
    padding: 18px clamp(20px, 5vw, 72px);
    position: relative;
  }

  .site-header::after {
    background: #65d8ed;
    bottom: -1px;
    content: '';
    height: 2px;
    left: clamp(20px, 5vw, 72px);
    position: absolute;
    width: 52px;
  }

  .brand {
    align-items: center;
    color: #f0f8fa;
    display: flex;
    font-size: 1.35rem;
    font-weight: 700;
    gap: 10px;
    letter-spacing: 0.16em;
    text-decoration: none;
  }

  .brand small {
    color: #72c6d6;
    display: block;
    font-size: 0.62rem;
    letter-spacing: 0.34em;
    line-height: 1;
  }

  .brand-mark {
    border: 1px solid #65d8ed;
    color: #65d8ed;
    display: grid;
    font-size: 1.4rem;
    height: 38px;
    place-items: center;
    transform: skew(-12deg);
    width: 38px;
  }

  nav {
    display: flex;
    gap: clamp(14px, 3vw, 36px);
  }

  nav a {
    color: #82969d;
    font-size: 1rem;
    letter-spacing: 0.14em;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 160ms ease;
  }

  nav a:hover,
  nav a.router-link-exact-active {
    color: #6de0f0;
  }

  @media (max-width: 700px) {
    .site-header {
      align-items: flex-start;
      flex-direction: column;
      gap: 18px;
    }

    nav {
      flex-wrap: wrap;
      gap: 10px 18px;
    }
  }

</style>