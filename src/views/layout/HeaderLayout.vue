

<template>
  <header>
    <div class="navbar bg-base-100 shadow-md">
      <div class="flex-1">
        <RouterLink v-if="!user?.admin" class="btn btn-ghost text-xl" to="/">{{ $t("page-start").capitalize() }}</RouterLink>
        <RouterLink class="btn btn-ghost text-xl" to="/theory">{{ $t("page-theory").capitalize() }}</RouterLink>
        <RouterLink class="btn btn-ghost text-xl" to="/reviews">{{ $t("page-review").capitalize() }}</RouterLink>
      </div>
      <div class="flex-none gap-2">
        <LanguageSwitcher/>
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
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }else{
      this.$router.push('/login');
    }
  }
}
</script>