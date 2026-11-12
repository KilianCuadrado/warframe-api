<template>
    <!-- La misma idea que en WarframeSpec.vue pero con los otributos de armas-->
    <p>weapon view spec</p>
</template>
<script setup>
    import {useRoute} from 'vue-router'

    const route=useRoute()
    const weaponId=Number(route.params.id)
    
</script>