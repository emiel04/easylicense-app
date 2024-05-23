<script lang="ts">

import LoginForm from "@/modules/auth/components/LoginForm.vue";

export default {
  name: "LoginView",
  components: {LoginForm}
}
</script>

<template>
  <section>
    <LoginForm register-path="/register"/>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>