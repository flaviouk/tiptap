# TodoList
Renders a toggleable list of items.

::: warning Restrictions
This extensions is intended to be used with the `TodoItem` extension.
:::

#### Options
*None*

#### Commands
| command | options | description |
| ------ | ---- | ---------------- |
| todo_list | none | Toggle todo list. |

#### Keybindings
*None*

#### Example
```markup
<template>
  <div>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <button type="button" :class="{ 'is-active': isActive.todo_list() }" @click="commands.todo_list">
        Todo List
      </button>
    </editor-menu-bar>

    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { TodoItem, TodoList } from 'tiptap-extensions'

export default {
  components: {
    EditorMenuBar,
    EditorContent,
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new TodoItem({
            nested: true,
          }),
          new TodoList(),
        ],
        content: `
          <ul data-type="todo_list">
            <li data-type="todo_item" data-done="true">
              Checked item
            </li>
            <li data-type="todo_item" data-done="false">
              Unchecked item
            </li>
          </ul>
        `,
      }),
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>
```