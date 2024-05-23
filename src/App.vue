<template>
  <RouterView/>
</template>

<script lang="ts">
import {toast} from "vue3-toastify";
import {setAxiosLocale} from "../config";
import {toLanguageCode} from "@/modules/languages/helpers/typehelper";

type AppProps = {
  msg: string;
  success: boolean;
}

export default {
  name: 'App',
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
    showMessage(msg: string, success: boolean) {
      if (msg) {
        if (success) {
          toast.success(msg);
        } else {
          toast.info(msg);
        }
      }
    }
  },
  created() {
    const lang = toLanguageCode(localStorage.getItem('lang') ?? "");
    localStorage.setItem('lang', lang);
    this.$i18n.locale = lang;
    setAxiosLocale(lang)
  }
}


</script>