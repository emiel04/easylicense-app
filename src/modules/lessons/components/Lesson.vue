<template>
  <div>
    <h2 class="title-text text-start border-b pb-4 mb-4">{{ lesson.title }}</h2>
    <div v-html="lesson.content" class="content flex-grow"></div>
  </div>

</template>

<style scoped>

</style>
<script lang="ts">
import type {PropType} from "vue";

export default {
  name: "Lesson",
  props: {
    lesson: {
      type: Object as PropType<LessonContent>,
      required: true
    }
  }
}
</script>