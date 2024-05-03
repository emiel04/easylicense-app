<template>
  <form class="flex flex-col gap-2" @submit.prevent="submitForm">
    <div class="form-control">
      <label for="create-rating-score">What was your score?</label>
      <span class="flex gap-2">
      <input type="range" min="0" max="50" class="range" name="create-rating-score" v-model="grade" />
        {{ grade }}
      </span>
    </div>
    <div class="form-control">
      <label for="create-rating-rate">What do you rate us?</label>
      <Rating name="create-rating-rate" @update:rating="rating = $event" :rating ></Rating>
    </div>
    <div class="form-control">
      <label for="create-rating-comment">Would you like to say anything in your review?</label>
      <textarea id="create-rating-comment" v-model="comment" class="textarea input-bordered" rows="3"></textarea>
    </div>
    <div class="form-control">
      <button class="btn btn-primary">Submit</button>
    </div>
    </form>
</template>

<style scoped>

</style>
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
        toast.warning("Please select a rating");
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
