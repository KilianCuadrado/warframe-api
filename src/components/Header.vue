<template>
    <header>
      <p>Warframe api</p>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/alerts">Alerts</RouterLink>
        <RouterLink to="/warframes">Warframes</RouterLink>
        <RouterLink to="/weapons">Weapons</RouterLink>
        <RouterLink to="/drops">Drops</RouterLink>
      </nav>
  </header>
  <RouterView />
</template>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f4a261;
  border-radius: 0.5rem;
}

header p {
  margin: 0;
  color: #264653;
  font-size: 1.25rem;
  font-weight: bold;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  color: #264653;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}
</style>