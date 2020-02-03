<template>
    <user-profile />
</template>
<script>
export default {
  components:{
    UserProfile: () => import("@/components/fronted/UserProfile")
  }
};
</script>

<style>
</style>