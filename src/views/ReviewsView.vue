<script lang="ts">
import {useRouter} from "vue-router";
import Rating from "@/components/Rating.vue";

export default {
  name: "TheoryView",
  components: {Rating},
  setup() {
    return {
      router: useRouter(),
    };
  },
  data():{
    page: number;
    totalPages: number;
    maxVisiblePages: number;
    reviews: Review[];
  } {
    return {
      page: 1,
      totalPages: 100,
      maxVisiblePages: 5,
      reviews: Array(10).fill({
        name: "Emiel",
        rating: 5,
        grade: 40,
        content: "This is the content of rating 1 lor300lor300 dsaf dsaf  sdsadf s lor300 lor300 lor300 lor300"
      })
    };
  },
  computed: {
    visiblePages() {
      const startPage = Math.max(1, this.page - Math.floor(this.maxVisiblePages / 2));
      const endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);
      return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
    },
  },
  methods: {
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.updateRoute();
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.updateRoute();
      }
    },
    updateRoute() {
      this.router.replace({query: {page: this.page}});
    }
  },
  created() {
    const initialPage = parseInt(this.router.currentRoute.value.query.page as string, 10);

    if (initialPage && initialPage > 0 && initialPage <= this.totalPages) {
      this.page = initialPage;
    } else {
      this.page = 1;
      this.updateRoute();
    }
  }
};
</script>

<template>
  <main class="flex start flex-col">
    <h1 class="title-text pb-6 inline-block">Reviews</h1>
    <div class="border-2 reviews"> <!-- Reviews -->
      <!-- Content -->

      <div v-for="(review, i) in reviews" class="card w-96 text-wrap basis-1/2">
        <div class="card-body basis-0 gap-0 p-6">
          <h2 class="card-title">
            <span class="border-r-[color:(var(--n))] border-r-2 pr-4">{{ review.name }}</span>
            <span class="border-r-[color:(var(--n))] border-r-2 pr-2">{{ review.grade }} / 50</span>

            <Rating :rating=3 :name="'review-' + i"/>
          </h2>
          <p class="flex-grow-0 overflow-ellipsis">{{ review.content }}</p>
        </div>
      </div>
    </div>

    <div class="join p-6 mx-auto">
      <button @click="prevPage" class="join-item btn" :disabled="page === 1">«</button>
      <button
          v-for="pageNumber in visiblePages"
          :key="pageNumber"
          :class="['join-item', 'btn', { 'btn-active': page === pageNumber }]"
          @click="page = pageNumber"
      >
        {{ pageNumber }}
      </button>
      <button @click="nextPage" class="join-item btn" :disabled="page === totalPages">»</button>
      <button class="btn btn-primary inline-block ml-5">Place review</button>
    </div>
  </main>
</template>

<style scoped>
div.reviews {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: 75vh;
}
</style>