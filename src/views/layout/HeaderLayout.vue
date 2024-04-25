

<template>
  <header>
    <div class="navbar bg-base-100 shadow-md">
      <div class="flex-1">
        <RouterLink v-if="!user?.admin" class="btn btn-ghost text-xl" to="/">Start</RouterLink>
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
import type {User} from "@/modules/core/types/user";

export default {
  name: "HeaderLayout",
  components: {ProfileDropdown, ThemeSwitcher, LanguageSwitcher},
  data() {
    return {
      user: null as User | null
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user') ?? '') ?? null;
  }
}
</script>