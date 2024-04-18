<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn m-1">{{ selectedLanguage }}</div>
    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
      <li v-for="language in languages">
        <a @click="selectedLanguage = language">{{ language }}</a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
const languages = ['English', 'French', 'German', 'Spanish', 'Italian'] // Get from server
export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      selectedLanguage: 'English',
      languages,
    }
  },
}
</script>