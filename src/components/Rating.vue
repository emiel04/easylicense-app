<template>
<span class="rating ">
    <input type="radio" :name="name" class="rating-hidden"/>
    <input type="radio" :name="name" class="mask mask-star" :checked="adjustedRating === 1" />
    <input type="radio" :name="name" class="mask mask-star" :checked="adjustedRating === 2" />
    <input type="radio" :name="name" class="mask mask-star" :checked="adjustedRating === 3" />
    <input type="radio" :name="name" class="mask mask-star" :checked="adjustedRating === 4" />
    <input type="radio" :name="name" class="mask mask-star" :checked="adjustedRating === 5" />
</span>
</template>
<script lang="ts">
export default {
  name: 'Rating',
  props: {
    rating: {
      type: Number,
      required: true,
    },
    name:{
      type: String,
      required: true,
    }
  },
  data() {
    return {
      adjustedRating: Math.max(0, Math.min(this.rating, 5))
    }
  },
}
</script>