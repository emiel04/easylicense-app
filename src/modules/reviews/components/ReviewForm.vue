<template>
  <form class="flex flex-col gap-2" @submit.prevent="submitForm">
    <div class="form-control">
      <label for="create-rating-score">{{ $t('create-review-score') }}</label>
      <span class="flex gap-2">
      <input type="range" min="0" max="50" class="range" name="create-rating-score" v-model="grade" />
        {{ grade }}
      </span>
    </div>
    <div class="form-control">
      <label for="create-rating-rate">{{ $t('rate-us') }}</label>
      <Rating name="create-rating-rate" @update:rating="rating = $event" :rating ></Rating>
    </div>
    <div class="form-control">
      <label for="create-rating-comment">{{ $t('write-review') }}</label>
      <textarea id="create-rating-comment" v-model="comment" class="textarea input-bordered" rows="3"></textarea>
    </div>
    <div class="form-control">
      <button class="btn btn-primary">{{ $t('submit-review') }}</button>
    </div>
    </form>
</template>


<script lang="ts">

import Rating from "@/components/Rating.vue";
import {toast} from "vue3-toastify";
import reviewService from "@/modules/reviews/services/ReviewService";
export default {
  name: "ReviewForm",
  components: {Rating},
  data() {
    return {
      rating: 0,
      comment: "",
      grade: 0,
    };
  },
  methods: {
    async submitForm() {
      if (this.rating === 0) {
        toast.warning(this.$t("rating-required"));
        return;
      }
      const review = await reviewService.create({
        rating: this.rating,
        grade: this.grade,
        content: this.comment,
      }).catch((e) => {
        toast.error(e.response.data.message);
      });
      if (!review) return;
      this.onSubmit(review);
    },
    onSubmit(review: Review) {
      this.$emit("createdReview", review);
    },
  }
}
</script>
