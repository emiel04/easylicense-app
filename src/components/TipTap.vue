<template>
  <section class="editor">
    <div class="buttons shadow-sm border rounded-t-lg p-4 bg-white flex flex-col">
      <div class="join">  <!-- Row 1 -->
        <button @click="editor?.chain().focus().toggleBold().run()" class="btn btn-sm join-item"
                :class="{ 'is-active': editor?.isActive('bold') }">
          <svg-icon type="mdi" :path="icons.bold"></svg-icon>
        </button>
        <button @click="editor?.chain().focus().toggleItalic().run()" class="btn btn-sm join-item"
                :class="{ 'is-active': editor?.isActive('italic') }">
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
        <button @click="editor?.chain().focus().toggleOrderedList().run()" class="btn btn-sm join-item"
                :class="{ 'is-active': editor?.isActive('orderedList') }">
          <svg-icon type="mdi" :path="icons.orderedList"></svg-icon>
        </button>
        <button @click="editor?.chain().focus().setHorizontalRule().run()" class="btn btn-sm join-item">
          <svg-icon type="mdi" :path="icons.horizontalRule"></svg-icon>
        </button>
        <button @click="editor?.chain().focus().undo().run()" :disabled="!editor?.can().chain().focus().undo().run()"
        class="ml-2 pl-2 b-l border-l">
          <svg-icon type="mdi" :path="icons.undo"></svg-icon>
        </button>
        <button @click="editor?.chain().focus().redo().run()" :disabled="!editor?.can().chain().focus().redo().run()">
          <svg-icon type="mdi" :path="icons.redo" ></svg-icon>
        </button>
      </div>
      <div class="join">  <!-- Row 2 -->
        <button @click="editor?.chain().focus().setTextAlign('left').run()" class="btn btn-sm join-item"
                :class="{ 'is-active': editor?.isActive({ textAlign: 'left' }) }">
          <svg-icon type="mdi" :path="icons.alignLeft" ></svg-icon>
        </button>
        <button @click="editor?.chain().focus().setTextAlign('center').run()" class="btn btn-sm join-item"
                :class="{ 'is-active': editor?.isActive({ textAlign: 'center' }) }">
          <svg-icon type="mdi" :path="icons.alignCenter" ></svg-icon>
        </button>
        <button @click="editor?.chain().focus().setTextAlign('right').run()" class="btn btn-sm join-item"
                :class="{ 'is-active': editor?.isActive({ textAlign: 'right' }) }">
          <svg-icon type="mdi" :path="icons.alignRight" ></svg-icon>
        </button>
        <template v-for="level in [2, 3, 4]" :key="level">
          <button @click="editor?.chain().focus().toggleHeading({ level: level }).run()" class="btn btn-sm join-item"
                  :class="{ 'is-active': editor?.isActive('heading', { level: level }) }">
            <svg-icon
                :key="level"
                type="mdi"
                size="20"
                :path="icons[`h${level}`]"
            ></svg-icon>
          </button>
        </template>
        <button @click="addImage" class="btn btn-sm join-item">
          <svg-icon type="mdi" :path="icons.image"></svg-icon>
        </button>
      </div>


    </div>
    <editor-content :editor="editor" />
  </section>
</template>
<style lang="postcss">

.editor .is-active {
 @apply bg-gray-300;
}
.editor button:disabled svg{
  @apply text-gray-200;
}
.editor details ul{
  @apply m-0;
}

.editor img {
  max-width: 100%;
  height: auto;
}
.editor img.ProseMirror-selectednode {
  @apply outline outline-offset-2 outline-gray-300;
}
</style>
<script lang="ts">
import {StarterKit} from "@tiptap/starter-kit";
import {Editor, EditorContent, mergeAttributes} from '@tiptap/vue-3'
import SvgIcon from '@jamescoyle/vue-icon';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import TextAlign from '@tiptap/extension-text-align';
import DropCursor from '@tiptap/extension-dropcursor';
import Heading from '@tiptap/extension-heading';
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import { mdiFormatBold, mdiFormatItalic, mdiFormatUnderline, mdiUndo, mdiRedo, mdiFormatStrikethroughVariant,
  mdiFormatListBulleted, mdiFormatListNumbered, mdiMinus, mdiAlignHorizontalLeft, mdiAlignHorizontalCenter,
  mdiAlignHorizontalRight, mdiFormatHeader1, mdiFormatHeader2, mdiFormatHeader3, mdiFormatHeader4, mdiImagePlusOutline}
  from '@mdi/js';
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
  data() : { editor: Editor | null; icons: any } {
    return {
      editor: null,
      icons: {
        bold: mdiFormatBold,
        italic: mdiFormatItalic,
        underline: mdiFormatUnderline,
        undo: mdiUndo,
        redo: mdiRedo,
        strike: mdiFormatStrikethroughVariant,
        bulletList: mdiFormatListBulleted,
        orderedList: mdiFormatListNumbered,
        horizontalRule: mdiMinus,
        alignLeft: mdiAlignHorizontalLeft,
        alignCenter: mdiAlignHorizontalCenter,
        alignRight: mdiAlignHorizontalRight,
        h1: mdiFormatHeader1, h2: mdiFormatHeader2, h3: mdiFormatHeader3, h4: mdiFormatHeader4,
        image: mdiImagePlusOutline
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
              class: 'list-disc ml-4 leading-normal'
            }
          }),
          ListItem.configure({
            HTMLAttributes: {
              class: 'list-item leading-4'
            }
          }),
          OrderedList.configure({
            HTMLAttributes: {
              class: 'list-decimal ml-4 leading-normal'
            }
          }),
          HorizontalRule.configure({
            HTMLAttributes: {
              class: 'my-4'
            }
          }),
          TextAlign.configure({
            types: ['heading', 'paragraph'],
            alignments: ['left', 'center', 'right']
          }),
          DropCursor,
          Heading.configure({
            levels: [2, 3, 4],
          }).extend({
            levels: [2, 3, 4],
            renderHTML({ node, HTMLAttributes }) {
              const level: number = this.options.levels.includes(node.attrs.level)
                  ? node.attrs.level
                  : this.options.levels[0]
              const classes: any = {
                2: 'text-xl',
                3: 'text-md font-bold',
                4: 'text-md',
              }
              return [
                `h${level}`,
                mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                  class: `${classes[level]}`,
                }),
                0,
              ]
            },
          }),
          Typography,
          Image.configure({
            allowBase64: true,
            inline: true,
          }),
      ],
      englishContent: this.modelValue,
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor?.getHTML())
      },
    })
  },
  methods: {
    addImage(){
      const url = window.prompt('Provide the image source.')
      if (url) {
        this.editor?.chain().focus().setImage({ src: url }).run()
      }
    }
  },
  beforeUnmount() {
    this.editor?.destroy()
  },
}
</script>