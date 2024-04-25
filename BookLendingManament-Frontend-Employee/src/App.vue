<script>
import AppHeader from "@/components/AppHeader.vue";
//import Login from "@/views/Login.vue";
export default {
  components: {
    AppHeader,
    //Login
  },
};
</script>
<template>
  <div id="app">
      <AppHeader />
    <div class="container mt-3">
      <router-view />
    </div>
</div>
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>