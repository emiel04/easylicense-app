<template>
  <form class="form-control border-gray-300 border p-12" @submit.prevent="register">
    <h1 class="title-text inline-block text-start pt-0 pb-3">Registreren</h1>
    <label class="input input-bordered flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
      <input v-model="form.name" type="text" class="grow" placeholder="Username" />
    </label>
    <label class="input input-bordered flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
        <path
            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
        <path
            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
      </svg>
      <input v-model="form.email" type="text" class="grow" placeholder="Email"/>
    </label>
    <label class="input input-bordered flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
        <path fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"/>
      </svg>
      <input v-model="form.password" type="password" class="grow" placeholder="Password"/>
    </label>
    <label class="input input-bordered flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
      <path fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd"/>
    </svg>
    <input v-model="form.password_confirmation" type="password" class="grow" placeholder="Confirm password"/>
  </label>
    <button class="btn btn-primary mt-1">Register</button>
    <p>Heb je al een account? Log dan
      <RouterLink :to="loginPath" class="link">hier</RouterLink> in.
    </p>
  </form>
</template>
<script lang="ts">
import type {RegisterProps} from "@/modules/auth/services/AuthService";
import authService from "@/modules/auth/services/AuthService";
import {toast} from "vue3-toastify";

export default {
  name: 'RegisterForm',
  props: {
    loginPath: {
      type: String,
      required: true
    }
  },
  data() : { form: RegisterProps} {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  created() {

  },
  methods: {
    async register() {
      const response = await authService.register(this.form).catch((err) => {
        Object.values<string[]>(err.response.data.errors).forEach(messages => {
          messages.forEach(message => {
            toast.error(message);
          });
        });
      });

      if(response.status){
        await this.login(response.message);
      }
    },
    async login(message: string){
      const response = await authService.login({email: this.form.email, password: this.form.password});
      if (response.status) {
        this.$router.replace({name: 'Home', query: { msg: message, success: 'true'}});
      }
    }
  }
}
</script>
<style scoped>
label.input {
  margin: .2rem 0;
}
</style>