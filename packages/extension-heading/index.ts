import { Node, CommandSpec } from '@tiptap/core'
import { NodeSpec } from 'prosemirror-model'
import VerEx from 'verbal-expressions'
import { textblockTypeInputRule } from 'prosemirror-inputrules'

type Level = 1 | 2 | 3 | 4 | 5 | 6

interface HeadingOptions {
  levels: Level[],
}

declare module '@tiptap/core/src/Editor' {
  interface Editor {
    heading(level: Level): Editor,
  }
}

export default new Node<HeadingOptions>()
  .name('heading')
  .defaults({
    levels: [1, 2, 3, 4, 5, 6],
  })
  .schema(({ options }) => ({
    attrs: {
      level: {
        default: 1,
      },
    },
    content: 'inline*',
    group: 'block',
    defining: true,
    draggable: false,
    parseDOM: options.levels
      .map((level: Level) => ({
        tag: `h${level}`,
        attrs: { level },
      })),
    toDOM: node => [`h${node.attrs.level}`, 0],
  }))
  .commands(({ editor, name }) => ({
    [name]: next => attrs => {
      editor.toggleNode(name, 'paragraph', attrs)
      next()
    },
  }))
  .inputRules(({ options, type }) => {
    return options.levels.map((level: Level) => {
      const regex = VerEx()
        .startOfLine()
        .find('#')
        .repeatPrevious(level)
        .whitespace()
        .endOfLine()

      return textblockTypeInputRule(regex, type, { level })
    })
  })
  .create()