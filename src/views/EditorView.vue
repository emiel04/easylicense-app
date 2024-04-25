

<template>
  <h1 v-if="title" class="text-3xl title-text">Editor for: {{title}}</h1>

  <div class="editors flex justify-center">
    <TipTap v-model="englishContent" title="English"/>
    <TipTap v-model="dutchContent" title="Dutch"/>
  </div>

</template>

<style scoped>
.tiptap > * + * {
  margin-top: 0.75em;
}

.content {
  padding: 1rem 0 0;
}

.content h3 {
  margin: 1rem 0 0.5rem;
}


</style>

<script lang="ts">


import TipTap from "@/components/TipTap.vue";

export default {
  name: "EditorView",
  components: {TipTap},
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      englishContent: '',
      dutchContent: '',
      title: ''
    }
  },
}
</script>