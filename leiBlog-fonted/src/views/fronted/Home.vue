<template>
  <div id="home">
    <articles>
      <banner />
    </articles>

    <about />

    <subscribe />

  </div>
</template>

<script>
  export default {
    name: 'Home',

    components: {
      About: () => import('@/components/fronted/home/About'),
      Articles: () => import('@/components/fronted/home/Articles'),
      Banner: () => import('@/components/fronted/home/Banner'),
      Subscribe: () => import('@/components/fronted/home/Subscribe')
    }
  }
</script>
