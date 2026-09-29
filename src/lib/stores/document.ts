import { writable } from "svelte/store";

import type {
  EditorDocument,
  EditorPosition,
} from "$lib/types/document";

const initialContent = `#set page(
  paper: "a4",
  margin: 2cm,
)

#set text(
  size: 11pt,
)

= Ma première fiche

Cette fiche est maintenant modifiable avec CodeMirror.

== Définition

Soit $f: RR -> RR$ une fonction continue.
`;

const initialDocument: EditorDocument = {
  id: "untitled-document",
  name: "Nouveau document.typ",
  path: null,
  content: initialContent,
  savedContent: initialContent,
  dirty: false,
  cursor: {
    line: 1,
    column: 1,
  },
};

function createDocumentStore() {
  const { subscribe, set, update } = writable<EditorDocument>(
    initialDocument,
  );

  function setContent(content: string) {
    update((document) => ({
      ...document,
      content,
      dirty: content !== document.savedContent,
    }));
  }

  function setCursor(cursor: EditorPosition) {
    update((document) => ({
      ...document,
      cursor,
    }));
  }

  function markAsSaved() {
    update((document) => ({
      ...document,
      savedContent: document.content,
      dirty: false,
    }));
  }

  function loadDocument(document: EditorDocument) {
    set(document);
  }

  function reset() {
    set({
      ...initialDocument,
      id: `untitled-${Date.now()}`,
    });
  }

  return {
    subscribe,
    setContent,
    setCursor,
    markAsSaved,
    loadDocument,
    reset,
  };
}

export const documentStore = createDocumentStore();
