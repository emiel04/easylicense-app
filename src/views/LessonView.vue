<template>
  <main class="max-w-5xl mx-auto flex flex-col items-start gap-2 py-6">
    <button class="btn" @click="router().back()">
      < Back
    </button>
    <section v-if="loading" class="flex flex-col justify-center items-center">
      <h1 class="title-text">Please wait...</h1>
      <Loading/>
    </section>
    <section v-else-if="error">
      <h1 class="title-text">Error loading lesson</h1>
    </section>
    <section v-else class="flex flex-col flex-grow">
      <h1 class="title-text">{{ lesson?.title }}</h1>
      <div v-html="lesson?.content" class="content flex-grow">

      </div>
    </section>
    <button class="btn basis-0" :class="{'btn-secondary': !completed}" @click="setCompleted(!completed)">
      Set article as {{ completed ? 'uncompleted' : 'completed' }}
    </button>
  </main>
</template>
<style scoped>
  .wrapper{
    max-width: 60vw;
    margin: 0 auto;
  }
</style>
<script lang="ts">
import lessonService from "@/modules/lessons/services/LessonService";
import Loading from "@/components/Loading.vue";
import router from "@/router";
import {toast} from "vue3-toastify";
export default {
  name: "LessonView",
  components: {Loading},
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data(): { lesson: Lesson | null , error: boolean, loading: boolean, completed: boolean} {
    return {
      lesson: null as Lesson | null,
      loading: true,
      error: false,
      completed: false
    }
  },
  async mounted() {
    try {
      await this.loadLesson();
      this.completed = this.lesson?.completed || false;
    } catch (e) {
      this.loading = false;
      this.error = true;
    }

  },
  methods: {
    router() {
      return router
    },
    async loadLesson() {
        this.lesson = await lessonService.find(this.id);
        this.loading = false;
        this.error = false;
    },
    async setCompleted(completed: boolean) {
      this.completed = completed;
      await lessonService.setLessonComplete(this.id, completed).then(data => {
        this.completed = data.completed;
      }).catch(e => {
        toast.error(e.response.data.message);
      });
    }
  }
}
</script>