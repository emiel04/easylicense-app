

<template>
  <div class="editors flex justify-center gap-5">
    <div class="flex justify-center flex-col">
      <h2 class="text-2xl mt-3">English Title</h2>
      <input type="text" class="input input-bordered w-full" v-model="englishTitle"/>
      <TipTap v-model="englishContent" />
    </div>
    <div>
      <h2 class="text-2xl mt-3">Dutch Title</h2>
      <input type="text" class="input input-bordered w-full" v-model="dutchTitle"/>
      <TipTap v-model="dutchContent" />
    </div>
  </div>
  <div class="flex justify-center mx-auto gap-x-10 w-52 m-5">
    <button class="btn btn-primary flex-1" @click="save" :disabled="!canSave">Save</button>
    <button class="btn flex-1" @click="router().back()">{{ hasSaved ? 'Back' : 'Cancel' }}</button>
  </div>

</template>

<style scoped>
.tiptap > * + * {
  margin-top: 0.75em;
}

.content {
  padding: 1rem 0 0;
}

.content h3 {
  margin: 1rem 0 0.5rem;
}


</style>

<script lang="ts">


import TipTap from "@/components/TipTap.vue";
import lessonService from "@/modules/lessons/services/LessonService";
import {toast} from "vue3-toastify";
import router from "@/router";

export default {
  name: "EditorView",
  components: {TipTap},
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      englishContent: '',
      dutchContent: '',
      englishTitle: '',
      dutchTitle: '',
      lesson: {} as FullLesson,
      canSave: false,
      hasSaved: false
    }
  },
  watch: {
    englishContent: function(newVal, oldVal){
      this.handleContentChange(newVal, oldVal);
    },
    dutchContent: function(newVal, oldVal){
      this.handleContentChange(newVal, oldVal);
    },
    dutchTitle: function(newVal, oldVal){
      this.handleContentChange(newVal, oldVal);
    },
    englishTitle: function(newVal, oldVal){
      this.handleContentChange(newVal, oldVal);
    },
  },
  async mounted() {
    const lesson = await lessonService.findAll(this.id);
    if (!lesson){
      return;
    }
    this.lesson = lesson;

    const dutchTranslation = lesson.translations.find(t => t.language_code === 'nl');
    const englishTranslation = lesson.translations.find(t => t.language_code === 'en');

    this.englishContent = englishTranslation?.content ?? '';
    this.englishTitle = englishTranslation?.title ?? '';
    this.dutchContent = dutchTranslation?.content ?? '';
    this.dutchTitle = dutchTranslation?.title ?? '';
  },
  methods: {
    router() {
      return router
    },
    handleContentChange: function(newVal: string, oldVal: string) {
      if (!oldVal || oldVal === newVal) return;
      this.canSave = true;
    },
    async save(){
      await lessonService.update(this.id,
        {
         translations: {
           'en': {
             title: this.englishTitle,
             content: this.englishContent
           },
           'nl': {
             title: this.dutchTitle,
             content: this.dutchContent
           }
         }
        }
      ).then(() => {
        toast.success('Lesson saved!');
        this.canSave = false;
        this.hasSaved = true;
      }).catch(e => {
        toast.error(e.response.data.message);
      });
    }
  }
}
</script>