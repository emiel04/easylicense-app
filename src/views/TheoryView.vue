core
<template>
  <main>
    <h1 class="title-text">Theory</h1>
    <section >
      <h2 class="text-3xl pb-4">Chapters</h2>
      <div class="pb-6">
        <RouterLink :to="`/theory/${lesson.id}`" v-for="lesson in lessons" class="card w-fit bg-base-100 border-2 overflow-hidden hover:shadow-xl transition-all duration-300">
          <article>
            <figure><img src="https://picsum.photos/600/400" :alt="'image for: ' + lesson.title"/></figure>
            <div class="card-body p-3">
              <h3 class="card-title text-base p-0">{{ lesson.title }}</h3>
              <div class="card-actions justify-end">
                <div :class="{'badge-success': lesson.completed, 'badge-error': !lesson.completed}"
                     class="badge">
                  {{ lesson.completed ? 'Completed' : 'Not Completed' }}
                </div>
              </div>
            </div>
          </article>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
section>div{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
</style>
<script lang="ts">
import lessonService from "@/modules/lessons/services/LessonService";

export default {
  name: "TheoryView",
  data():{
    lessons: Lesson[]
  } {
    const lessons: Lesson[] = []

    return {
      lessons: lessons
    }
  },
  created() {
    this.loadLessons();
  },
  methods:{
    loadLessons(){
      lessonService.all().then((res) => {
        this.lessons = res;
      });
    }

  }
};
</script>
