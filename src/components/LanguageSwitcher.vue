<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn m-1">{{ selectedLanguage?.language_name_native }}</div>
    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
      <li v-for="language in languages">
        <a @click="setLang(language)">{{ language.language_name_native }}</a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import langService from "@/modules/languages/services/service";

export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      selectedLanguage: null as Language | null,
      languages: [] as Language[],
    }
  },
  created() {
     langService.all().then(languages => {
       this.languages = languages;
       this.selectedLanguage = languages[0];
     });
  },
  methods: {
    setLang(lang: Language) {
      this.selectedLanguage = lang;
      localStorage.setItem('lang', lang.language_code);
    }
  }
}
</script>