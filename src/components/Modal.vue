
<template>
  <dialog id="modal_dialog" class="modal" ref="dialog">
    <div class="modal-box">
      <form method="dialog">
        <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <slot></slot>
    </div>
    <form method="dialog" class="modal-backdrop" v-if="clickToClose">
      <button>close</button>
    </form>
  </dialog>
</template>

<style scoped>

</style>
<script lang="ts">
export default {
  name: "Modal",
  expose: ['openModal', 'closeModal'],
  props: {
    clickToClose: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openModal() {
      (this.$refs.dialog as HTMLDialogElement).showModal();
    },
    closeModal() {
      (this.$refs.dialog as HTMLDialogElement).close();
    }
  }
};

export type TModal = {
  openModal: () => void;
  closeModal: () => void;
}
</script>