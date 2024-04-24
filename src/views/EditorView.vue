

<template>
  <TipTap v-model="content"/>
  <div class="content">
    <h3>Content</h3>

  </div>
</template>

<style scoped>
.tiptap > * + * {
  margin-top: 0.75em;
}

.tiptap code {
  background-color: rgba(97, 97, 97, 0.1);
  color: #616161;
}

.content {
  padding: 1rem 0 0;
}

.content h3 {
  margin: 1rem 0 0.5rem;
}

.content pre {
  border-radius: 5px;
  color: #333;
}

.content code {
  display: block;
  white-space: pre-wrap;
  font-size: 0.8rem;
  padding: 0.75rem 1rem;
  background-color: #e9ecef;
  color: #495057;
}

</style>

<script lang="ts">


import TipTap from "@/components/TipTap.vue";

export default {
  name: "EditorView",
  components: {TipTap},
  data() {
    return {
      content: '<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>',
    }
  },
}
</script>