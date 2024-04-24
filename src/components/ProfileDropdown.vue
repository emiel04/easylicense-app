<template>
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
        <RouterLink class="justify-between" to="/login" @click="logout">Logout</RouterLink>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import authService from "@/modules/auth/services/AuthService";

export default {
  name: 'ProfileDropdown',
  methods: {
    logout(){
      authService.logout();
    }
  }
}
</script>