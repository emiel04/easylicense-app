<template>
  <section v-if="loading" class="flex flex-col justify-center items-center">
    <h1 class="title-text">Please wait...</h1>
    <Loading/>
  </section>
  <section v-else-if="error">
    <h1 class="title-text">Error loading lesson</h1>
  </section>
  <section v-else>
    <h1 class="title-text">{{ lesson?.title }}</h1>
    <div v-html="lesson?.content" class="content">

    </div>
  </section>

</template>
<style scoped>
  section > .content {
    max-width: 60vw;
    margin: 0 auto;
  }
</style>
<script lang="ts">
import lessonService from "@/modules/auth/services/AuthService";
import Loading from "@/components/Loading.vue";

export default {
  name: "LessonView",
  components: {Loading},
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data(): { lesson: Lesson | null , error: boolean, loading: boolean} {
    return {
      lesson: null as Lesson | null,
      loading: true,
      error: false
    }
  },
  async mounted() {
    try {
      await this.loadLesson();
    } catch (e) {
      this.loading = false;
      this.error = true;
    }

  },
  methods: {
    async loadLesson() {
        this.lesson = await lessonService.find(this.id)
        this.loading = false;
        this.error = false;

    }
  }
}
</script>