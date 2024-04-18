<script lang="ts">
import {defineComponent} from 'vue'


type Chapter = {
  title: string;
  img: string;
  content: string;
}

export default defineComponent({
  name: "TheoryView",
  data() {
    const chapters: Chapter[] = [
      {
        title: "Chapter 1",
        img: "https://picsum.photos/600/400",
        content: "This is the content of chapter 1"
      },
    ];

    return {
      chapters: chapters
    };
  },
  methods:{
    addChapter(){
      this.chapters.push({
        title: `Chapter ${this.chapters.length + 1}`,
        img: "https://picsum.photos/600/400",
        content: "This is the content of chapter 2"
      });
    }

  }
});
</script>

<template>
  <main>
    <h1 class="title-text">Theory</h1>
    <section >
      <h2 class="text-3xl pb-4" @click="addChapter">Chapters</h2>
      <div class="pb-6">
        <RouterLink to="/" v-for="chapter in chapters" class="card w-fit bg-base-100 border-2 overflow-hidden hover:shadow-xl transition-all duration-300">
          <article>
            <figure><img :src="chapter.img" :alt="'image for: ' + chapter.title"/></figure>
            <div class="card-body">
              <h3 class="card-title">{{ chapter.title }}</h3>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <div class="badge badge-success">Completed</div>
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
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
</style>