<script lang="ts">
  import { basicSetup } from "codemirror";
  import { indentWithTab } from "@codemirror/commands";
  import { EditorState } from "@codemirror/state";
  import {
    EditorView,
    keymap,
    placeholder,
  } from "@codemirror/view";
  import { onMount } from "svelte";

  import type { EditorPosition } from "$lib/types/document";

  interface Props {
    content: string;
    onContentChange: (content: string) => void;
    onCursorChange: (position: EditorPosition) => void;
    onSaveRequest: () => void;
  }

  let {
    content,
    onContentChange,
    onCursorChange,
    onSaveRequest,
  }: Props = $props();

  let editorContainer: HTMLDivElement;
  let editorView: EditorView | null = null;

  /**
   * Met à jour la position du curseur dans le store Svelte.
   */
  function publishCursorPosition(view: EditorView) {
    const cursorOffset = view.state.selection.main.head;
    const line = view.state.doc.lineAt(cursorOffset);

    onCursorChange({
      line: line.number,
      column: cursorOffset - line.from + 1,
    });
  }

  /**
   * Thème visuel de l’éditeur.
   *
   * Le paramètre dark: true informe CodeMirror que le thème est sombre.
   */
  const editorTheme = EditorView.theme(
    {
      "&": {
        height: "100%",
        color: "var(--color-text)",
        backgroundColor: "var(--color-background)",
        fontSize: "13px",
      },

      ".cm-scroller": {
        overflow: "auto",
        fontFamily: "var(--font-family-monospace)",
        lineHeight: "1.7",
      },

      ".cm-content": {
        minHeight: "100%",
        padding: "12px 0 80px",
        caretColor: "#ffffff",
      },

      ".cm-line": {
        padding: "0 16px 0 8px",
      },

      ".cm-gutters": {
        color: "var(--color-text-subtle)",
        backgroundColor: "var(--color-background)",
        borderRight: "1px solid var(--color-border)",
      },

      ".cm-gutterElement": {
        padding: "0 10px 0 8px",
      },

      ".cm-activeLine": {
        backgroundColor: "rgb(255 255 255 / 3%)",
      },

      ".cm-activeLineGutter": {
        color: "var(--color-text)",
        backgroundColor: "rgb(255 255 255 / 4%)",
      },

      ".cm-selectionBackground": {
        backgroundColor: "rgb(79 140 255 / 35%) !important",
      },

      "&.cm-focused .cm-selectionBackground": {
        backgroundColor: "rgb(79 140 255 / 45%) !important",
      },

      ".cm-cursor": {
        borderLeftColor: "#ffffff",
      },

      ".cm-matchingBracket": {
        color: "#ffffff",
        backgroundColor: "rgb(79 140 255 / 25%)",
        outline: "1px solid rgb(79 140 255 / 65%)",
      },

      ".cm-searchMatch": {
        backgroundColor: "rgb(204 167 0 / 35%)",
        outline: "1px solid rgb(204 167 0 / 70%)",
      },

      ".cm-searchMatch.cm-searchMatch-selected": {
        backgroundColor: "rgb(79 140 255 / 45%)",
      },

      ".cm-panels": {
        color: "var(--color-text)",
        backgroundColor: "var(--color-surface)",
      },

      ".cm-panels.cm-panels-top": {
        borderBottom: "1px solid var(--color-border)",
      },

      ".cm-panels.cm-panels-bottom": {
        borderTop: "1px solid var(--color-border)",
      },

      ".cm-textfield": {
        color: "var(--color-text)",
        backgroundColor: "var(--color-background)",
        border: "1px solid var(--color-border)",
        borderRadius: "4px",
      },

      ".cm-button": {
        color: "var(--color-text)",
        backgroundImage: "none",
        backgroundColor: "var(--color-surface-light)",
        border: "1px solid var(--color-border)",
        borderRadius: "4px",
      },

      ".cm-tooltip": {
        color: "var(--color-text)",
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      },

      ".cm-placeholder": {
        color: "var(--color-text-subtle)",
        fontStyle: "normal",
      },
    },
    {
      dark: true,
    },
  );

  onMount(() => {
    const startState = EditorState.create({
      doc: content,
      extensions: [
        basicSetup,

        keymap.of([
          indentWithTab,
          {
            key: "Mod-s",
            preventDefault: true,
            run: () => {
              onSaveRequest();
              return true;
            },
          },
        ]),

        placeholder("Commence à écrire ton document Typst…"),

        EditorView.lineWrapping,

        EditorView.contentAttributes.of({
          spellcheck: "false",
          autocapitalize: "off",
          autocomplete: "off",
          "aria-label": "Éditeur de document Typst",
        }),

        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onContentChange(update.state.doc.toString());
          }

          if (update.docChanged || update.selectionSet) {
            publishCursorPosition(update.view);
          }
        }),

        editorTheme,
      ],
    });

    editorView = new EditorView({
      state: startState,
      parent: editorContainer,
    });

    publishCursorPosition(editorView);

    editorView.focus();

    return () => {
      editorView?.destroy();
      editorView = null;
    };
  });

  /**
   * Permet de synchroniser CodeMirror si le contenu du document est
   * remplacé depuis l’extérieur, par exemple après l’ouverture d’un fichier.
   */
  $effect(() => {
    const nextContent = content;
    const view = editorView;

    if (!view) {
      return;
    }

    const currentContent = view.state.doc.toString();

    if (currentContent === nextContent) {
      return;
    }

    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: nextContent,
      },
    });
  });
</script>

<div class="editor-host" bind:this={editorContainer}></div>

<style>
  .editor-host {
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }

  .editor-host :global(.cm-editor) {
    height: 100%;
  }

  .editor-host :global(.cm-editor.cm-focused) {
    outline: none;
  }
</style>
