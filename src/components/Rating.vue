<template>
<span class="rating ">
    <input type="radio" :name="name" :checked="adjustedRating === 0" class="rating-hidden"/>
    <input
        v-for="index in maxRating"
        :key="index"
        type="radio"
        :name="name"
        class="mask mask-star"
        :checked="adjustedRating === index"
        :disabled="disabled"
        @change="updateRating(index)"
    />
</span>
</template>
<style scoped>
input[disabled].mask-star {
  pointer-events: none;
}
</style>
<script lang="ts">
export default {
  name: 'Rating',
  props: {
    rating: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    maxRating: {
      type: Number,
      default: 5,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    adjustedRating(): number {
      return Math.max(0, Math.min(this.rating, this.maxRating));
    }
  },
  methods: {
    updateRating(rating: number) {
      this.$emit('update:rating', rating);
    }
  },
}
</script>