<template>
  <section class="w-5/12 m-5 editor">
    <h1 class="text-3xl">Editor</h1>
    <div class="buttons shadow-sm border rounded-t-lg p-4 bg-white flex flex-col">
      <div class="join">  <!-- Row 1 -->
        <button @click="editor?.chain().focus().toggleBold().run()" class="btn btn-sm join-item"
                :class="{ 'is-active': editor?.isActive('bold') }">
          <svg-icon type="mdi" :path="icons.bold"></svg-icon>
        </button>
        <button @click="editor?.chain().focus().toggleItalic().run()" class="btn btn-sm join-item"
                :class="{ 'is-active': editor?.isActive('bold') }">
          <svg-icon type="mdi" :path="icons.italic"></svg-icon>
        </button>
        <button @click="editor?.chain().focus().toggleUnderline().run()" class="btn btn-sm join-item"
                :class="{ 'is-active': editor?.isActive('underline') }">
          <svg-icon type="mdi" :path="icons.underline"></svg-icon>
        </button>
        <button @click="editor?.chain().focus().toggleStrike().run()" class="btn btn-sm join-item">
          <svg-icon type="mdi" :path="icons.strike"></svg-icon>
        </button>
        <button @click="editor?.chain().focus().toggleBulletList().run()" class="btn btn-sm join-item"
                :class="{ 'is-active': editor?.isActive('bulletList') }">
          <svg-icon type="mdi" :path="icons.bulletList"></svg-icon>
        </button>
      </div>
      <div class="join">  <!-- Row 2 -->
        <button @click="editor?.chain().focus().undo().run()" :disabled="!editor?.can().chain().focus().undo().run()">
          <svg-icon type="mdi" :path="icons.undo"></svg-icon>
        </button>
        <button @click="editor?.chain().focus().redo().run()" :disabled="!editor?.can().chain().focus().redo().run()">
          <svg-icon type="mdi" :path="icons.redo" ></svg-icon>
        </button>
      </div>


    </div>
    <editor-content :editor="editor" />
  </section>
</template>
<style lang="postcss" scoped>
.is-active {
 @apply bg-gray-300;
}
button:disabled svg{
  @apply text-gray-200;
}

</style>
<script lang="ts">
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import SvgIcon from '@jamescoyle/vue-icon';
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import { mdiFormatBold, mdiFormatItalic, mdiFormatUnderline, mdiUndo, mdiRedo, mdiFormatStrikethroughVariant, mdiFormatListBulleted } from '@mdi/js';
export default {
  name: 'TipTap',
  components: {
    EditorContent,
    SvgIcon
  },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  data() : { editor: any | Editor; icons: any } {
    return {
      editor: null,
      icons: {
        bold: mdiFormatBold,
        italic: mdiFormatItalic,
        underline: mdiFormatUnderline,
        undo: mdiUndo,
        redo: mdiRedo,
        strike: mdiFormatStrikethroughVariant,
        bulletList: mdiFormatListBulleted
      },
    }
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor?.getHTML() === value

      if (isSame) {
        return
      }

      this.editor?.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      editorProps: {
        attributes: {
          class: 'shadow-sm border rounded-b-lg p-4 bg-white overflow-y-auto h-[60vh]',
        },
        transformPastedText(text) {
          return text.toUpperCase()
        }
      },
      extensions: [
          StarterKit,
          Underline,
          BulletList.configure({
            HTMLAttributes: {
              class: 'list-disc ml-4 leading-normal flex flex-col'
            }
          }),
          ListItem.configure({
            HTMLAttributes: {
              class: 'list-item leading-4'
            }
          })
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor?.getHTML())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>