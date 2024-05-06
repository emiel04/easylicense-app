core
<template>
  <main>
    <h1 class="title-text">{{ $t('page-theory').capitalize() }}</h1>
    <section >
      <div class="flex gap-3 pb-4">
        <h2 class="text-3xl leading-normal">{{ $t('lessons').capitalize() }}</h2>
        <RouterLink v-if="isAdmin" class="btn btn-primary" to="/editor/new">{{ $t('add-new-lesson').capitalize() }}</RouterLink>
        <label class="input input-bordered flex items-center gap-2">
          <input type="text" class="grow" :placeholder="$t('search-title')" v-model="search" @input="loadLessons"/>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
        </label>
      </div>
      <div class="pb-6 lessons">
        <RouterLink :to="`/theory/${lesson.id}`" v-for="lesson in lessons" class="card w-fit bg-base-100 border-2 overflow-hidden hover:shadow-xl transition-all duration-300">
          <article>
            <figure><img src="https://picsum.photos/600/400" :alt="'image for: ' + lesson.title"/></figure>
            <div class="card-body p-3">
              <h3 class="card-title text-base p-0">{{ lesson.title }}</h3>
              <div v-if="!isAdmin"class="card-actions justify-end">
                <div :class="{'badge-success': lesson.completed, 'badge-error': !lesson.completed}"
                     class="badge">
                  {{ lesson.completed ?
                    $t('completed').capitalize() :
                    $t('not-completed').capitalize() }}
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
section>div.lessons{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
</style>
<script lang="ts">
import lessonService from "@/modules/lessons/services/LessonService";

export default {
  name: "TheoryView",
  data(){
    return {
      lessons: [] as Lesson[],
      isAdmin: false,
      search: ''
    }
  },
  created() {
    this.loadLessons();
    const user = localStorage.getItem('user');
    this.isAdmin = user ? JSON.parse(user).admin : false;
  },
  methods:{
    loadLessons(){
      lessonService.all(false, this.search).then((res) => {
        this.lessons = res;
      });
    }

  }
};
</script>
