import { LexicalEditor } from 'lexical';

declare module '@lexical/react/LexicalComposerContext' {
  export function useLexicalComposerContext(): [LexicalEditor];
}

declare module 'lexical' {
  export function $generateHtmlFromNodes(editor: LexicalEditor, selection: any): string;
}