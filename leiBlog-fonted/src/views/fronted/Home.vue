<template>
  <div id="home">
    <articles>
      <banner />
    </articles>

    <about />

    <subscribe />

    <social />
  </div>
</template>

<script>
  export default {
    name: 'Home',

    components: {
      About: () => import('@/components/fronted/home/About'),
      Articles: () => import('@/components/fronted/home/Articles'),
      Banner: () => import('@/components/fronted/home/Banner'),
      Social: () => import('@/components/fronted/home/Social'),
      Subscribe: () => import('@/components/fronted/home/Subscribe')
    }
  }
</script>
