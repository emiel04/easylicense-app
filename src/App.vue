<script lang="ts">
import * as ThemeChange from 'theme-change'
import LanguageSwitch from "@/components/ThemeSwitcher.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";

export default {
  name: 'App',
  components: {ThemeSwitcher, LanguageSwitcher, LanguageSwitch},
}

</script>

<template>
  <header>
    <div class="navbar bg-base-100 shadow-md">
      <div class="flex-1">
        <RouterLink class="btn btn-ghost text-xl" to="/">Start</RouterLink>
        <RouterLink class="btn btn-ghost text-xl" to="/theory">Theorie</RouterLink>
        <RouterLink class="btn btn-ghost text-xl" to="/reactions">Reacties</RouterLink>
      </div>
      <div class="flex-none gap-2">
        <LanguageSwitcher/>
        <ThemeSwitcher/>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="Your profile avatar" src="https://xsgames.co/randomusers/avatar.php?g=male"/>
            </div>
          </div>
          <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <RouterLink class="justify-between" to="/">Profile</RouterLink>
            </li>
            <li>
              <RouterLink class="justify-between" to="/">Settings</RouterLink>
            </li>
            <li>
              <RouterLink class="justify-between" to="/">Logout</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </header>

  <RouterView/>
</template>

