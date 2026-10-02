import { writable } from "svelte/store";

import type {
  EditorDocument,
  EditorPosition,
} from "$lib/types/document";
import type { FilePayload } from "$lib/types/file";

const initialContent = `#set page(
  paper: "a4",
  margin: 2cm,
)

#set text(
  size: 11pt,
)

= Ma première fiche

Cette fiche est modifiable avec CodeMirror.

== Définition

Soit $f: RR -> RR$ une fonction continue.
`;

function createUntitledDocument(): EditorDocument {
  return {
    id: crypto.randomUUID(),
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
}

function createDocumentStore() {
  const { subscribe, set, update } = writable<EditorDocument>(
    createUntitledDocument(),
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

  function loadFile(file: FilePayload) {
    set({
      id: crypto.randomUUID(),
      name: file.name,
      path: file.path,
      content: file.content,
      savedContent: file.content,
      dirty: false,
      cursor: {
        line: 1,
        column: 1,
      },
    });
  }

  function markAsSaved(file?: FilePayload) {
    update((document) => {
      const content = file?.content ?? document.content;

      return {
        ...document,
        name: file?.name ?? document.name,
        path: file?.path ?? document.path,
        content,
        savedContent: content,
        dirty: false,
      };
    });
  }

  function reset() {
    set(createUntitledDocument());
  }

  return {
    subscribe,
    setContent,
    setCursor,
    loadFile,
    markAsSaved,
    reset,
  };
}

export const documentStore = createDocumentStore();
