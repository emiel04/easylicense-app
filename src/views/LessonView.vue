<template>
  <main class="max-w-5xl mx-auto flex flex-col items-start gap-2 py-6">
    <span class="flex gap-3">
      <a class="btn" @click="router().back()">
      < {{ $t("back").capitalize() }}
      </a>
      <a class="btn btn-primary" v-if="isAdmin && lessonId" @click="router().push(`/editor/${lessonId}`)">
        {{ $t("edit").capitalize() }}
      </a>
    </span>
    <section v-if="loading" class="flex flex-col justify-center items-center">
      <h1 class="title-text">{{ $t("please-wait").capitalize() }}</h1>
      <Loading/>
    </section>
    <section v-else-if="error">
      <h1 class="title-text">{{ $t("error-lesson").capitalize() }}</h1>
    </section>

    <section v-else class="flex flex-grow w-full items-start">
      <template v-for="lessonContent in contents">
        <Lesson class="flex-grow" :lesson="{
        title: lessonContent.title,
        content: lessonContent.content,
      }"></Lesson>
      </template>

    </section>

    <button v-if="!isAdmin" class="btn basis-0" :class="{'btn-secondary': !completed}" @click="setCompleted(!completed)">
      {{ !completed ? $t("set-article-completed").capitalize() : $t("set-article-not-completed").capitalize()}}
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
import type {User} from "@/modules/core/types/user";
import Lesson from "@/modules/lessons/components/Lesson.vue";
export default {
  name: "LessonView",
  components: {Lesson, Loading},
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      contents: [] as LessonContent[],
      lessonId: 0,
      loading: true,
      error: false,
      completed: false,
      isAdmin: false
    }
  },
  async mounted() {

    const user: User = JSON.parse(localStorage.getItem('user') ?? '') || null;
    this.isAdmin = user?.admin;

    try {
      if (user?.admin) {
        await this.loadFullLesson();
      } else {
        await this.loadLesson();
      }
    } catch (e) {
      this.loading = false;
      this.error = true;
      console.error(e)
    }

  },
  methods: {
    router() {
      return router
    },
    async loadLesson() {
      const lesson = await lessonService.find(this.id);
      if (!lesson) throw new Error('Lesson not found');
      this.lessonId = lesson.id;
      this.completed = lesson.completed;
      this.contents = [{
        title: lesson.title,
        content: lesson.content
      }];
      this.loading = false;
      this.error = false;
    },
    async loadFullLesson() {
      const fullLesson = await lessonService.findAll(this.id);
      if (!fullLesson) throw new Error('Lesson not found');
      this.contents = fullLesson.translations;
      this.lessonId = fullLesson.id;
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