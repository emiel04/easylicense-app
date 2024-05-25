<template>
  <main class="flex start flex-col">
    <div class="flex gap-3 pb-4 items-center">
      <h1 class="title-text pb-6 inline-block">{{ $t('reviews').capitalize() }}</h1>
      <select class="select select-bordered w-full max-w-xs" v-model="filterRating" @change="updatePage">
        <option disabled selected>{{ $t('filter-rating') }}</option>
        <option selected :value=0>{{ $t('filter-deselect') }}</option>
        <option v-for="index in 5" :key="index" :value="index">{{ '★'.repeat(index) }}</option>
      </select>

    </div>
    <div class="border-2 reviews"> <!-- Reviews -->
      <!-- Content -->

      <div v-for="(review, i) in reviews" class="card w-96 text-wrap basis-1/2">
        <div class="card-body basis-0 gap-0 p-6">
          <h2 class="card-title">
            <span class="border-r-[color:(var(--n))] border-r-2 pr-4">{{ review.user.name }}</span>
            <span class="border-r-[color:(var(--n))] border-r-2 pr-2">{{ review.grade }} / 50</span>
            <Rating :rating=review.rating :name="'review-' + i" disabled/>
            <span v-if="user?.admin" class="flex">
              <button class="" @click="deleteReview(review.id)">
                  <SvgIcon type="mdi" :path="icons.delete"></SvgIcon>
              </button>
            </span>

          </h2>
          <p class="flex-grow-0 overflow-ellipsis">{{ review.content }}</p>
        </div>
      </div>
    </div>
    <div class="p-6 mx-auto">
      <div class="join ">
        <button @click="prevPage" class="join-item btn" :disabled="page === 1">«</button>
        <button
            v-for="pageNumber in visiblePages"
            :key="pageNumber"
            :class="['join-item', 'btn', { 'btn-active': page === pageNumber }]"
            @click="setPage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
        <button @click="nextPage" class="join-item btn" :disabled="page === totalPages">»</button>

      </div>
      <button class="btn btn-primary inline-block ml-5" @click="openReviewCreationModal">
        {{ $t("place-review").capitalize() }}
      </button>
    </div>


    <Popup ref="reviewCreation">
      <ReviewForm @createdReview="createReview"/>
    </Popup>
  </main>
</template>

<style scoped>
div.reviews {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: 75vh;
  align-content: start;
}
</style>
<script lang="ts">
import Rating from "@/components/Rating.vue";
import type {User} from "@/modules/core/types/user";
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiDelete} from '@mdi/js';
import reviewService from "@/modules/reviews/services/ReviewService";
import type {TModal} from "@/components/Modal.vue";
import Popup from "@/components/Modal.vue";
import ReviewForm from "@/modules/reviews/components/ReviewForm.vue";
import {toast} from "vue3-toastify";

export default {
  name: "TheoryView",
  components: {ReviewForm, Popup, Rating, SvgIcon},
  data() {
    return {
      user: null as User | null,
      page: 1,
      totalPages: 100,
      maxVisiblePages: 5,
      perPage: 10,
      reviews: [] as Review[],
      icons: {
        delete: mdiDelete
      },
      filterRating: 0
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
        this.update();
      }
    },
    setPage(page: number) {
      if (page <= this.totalPages && page > 0) {
        this.page = page;
        this.update();
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.update();
      }
    },
    update() {
      this.$router.replace({query: {page: this.page}});
      this.updatePage();

    },
    deleteReview(id: number) {
      reviewService.delete(id).then(() => {
        this.updatePage();
      });
    },
    updatePage() {
      reviewService.all(this.page, this.perPage, this.filterRating).then(response => {
        this.page = response.current_page;
        this.totalPages = response.last_page;
        this.reviews = response.data;

        console.log(this.page, this.totalPages);
        if (this.page > this.totalPages) { // Route back to the last page if the current page is higher than the total pages
          this.setPage(this.totalPages);
        }

      });
    },
    closeReviewCreationModal() {
      (this.$refs.reviewCreation as TModal).closeModal();
    },
    openReviewCreationModal() {
      (this.$refs.reviewCreation as TModal).openModal();
    },
    createReview(review: Review) {
      this.closeReviewCreationModal();
      this.updatePage();
      toast.success(this.$t('review-created'));
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user') ?? '') ?? null;

    const initialPage = parseInt(this.$router.currentRoute.value.query.page as string, 10);
    if (initialPage && initialPage > 0 && initialPage <= this.totalPages) {
      this.page = initialPage;
    } else {
      this.page = 1;
      this.update();
    }
  },
  mounted() {
    this.updatePage();
  }
};
</script>