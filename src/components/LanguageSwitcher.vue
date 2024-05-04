<template>
  <div class="dropdown">
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
import {setAxiosLocale} from "../../config";
import {toLanguageCode} from "@/modules/languages/helpers/typehelper";

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
       const langCode = toLanguageCode(localStorage.getItem('lang') ?? "");
       this.selectedLanguage = languages.find(l => l.language_code === langCode) ?? languages[0];
     });


  },
  methods: {
    setLang(lang: Language) {
      this.selectedLanguage = lang;
      localStorage.setItem('lang', lang.language_code);
      this.$i18n.locale = lang.language_code;
      setAxiosLocale(lang.language_code);
      location.reload(); // refresh page
    }
  }
}
</script>