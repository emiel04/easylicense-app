<template>
  <section>
    <RegisterForm login-path="/login"/>
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
<script lang="ts">

import RegisterForm from "@/modules/auth/components/RegisterForm.vue";

export default {
  name: "RegisterView",
  components: {RegisterForm}
}
</script>