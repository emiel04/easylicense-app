
<template>
  <header>
    <div class="navbar bg-base-100 shadow-md">
      <div class="flex-1">
        <RouterLink class="btn btn-ghost text-xl" to="/">Start</RouterLink>
        <RouterLink class="btn btn-ghost text-xl" to="/theory">Theorie</RouterLink>
        <RouterLink class="btn btn-ghost text-xl" to="/reviews">Reacties</RouterLink>
      </div>
      <div class="flex-none gap-2">
        <LanguageSwitcher/>
        <ThemeSwitcher/>
        <ProfileDropdown/>
      </div>
    </div>
  </header>

  <RouterView/>
</template>

<script lang="ts">
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import ProfileDropdown from "@/components/ProfileDropdown.vue";
import {toast} from "vue3-toastify";


type AppProps = {
  msg: string;
  success: boolean;
}

export default {
  name: 'App',
  components: {ProfileDropdown, ThemeSwitcher, LanguageSwitcher},
  watch: {
    '$route.query': {
      immediate: true,
      handler(newVal) {
        if (newVal.msg) {
          this.showMessage(newVal.msg, newVal.success === 'true');
        }
      }
    }
  },
  methods: {
    showMessage(msg: string, success: boolean){
      if (msg) {
        if (success) {
          toast.success(msg);
        } else {
          toast.info(msg);
        }
      }
    }
  }
}



</script>