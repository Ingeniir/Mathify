import { invoke } from "@tauri-apps/api/core";
import {
  confirm,
  message,
  open,
  save,
} from "@tauri-apps/plugin-dialog";
import { get } from "svelte/store";

import { documentStore } from "$lib/stores/document";
import type { FilePayload } from "$lib/types/file";

const typstFilters = [
  {
    name: "Documents Typst",
    extensions: ["typ"],
  },
];

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Une erreur inconnue est survenue.";
}

async function showOperationError(
  title: string,
  error: unknown,
): Promise<void> {
  console.error(title, error);

  await message(formatError(error), {
    title,
    kind: "error",
  });
}

/**
 * Demande confirmation avant de remplacer un document modifié.
 */
export async function confirmDiscardChanges(): Promise<boolean> {
  const document = get(documentStore);

  if (!document.dirty) {
    return true;
  }

  return confirm(
    "Le document contient des modifications non enregistrées. " +
      "Veux-tu les abandonner ?",
    {
      title: "Modifications non enregistrées",
      kind: "warning",
      okLabel: "Abandonner",
      cancelLabel: "Annuler",
    },
  );
}

/**
 * Ouvre un fichier Typst à partir d'un dialogue natif.
 */
export async function openTypstFile(): Promise<void> {
  const canReplaceDocument = await confirmDiscardChanges();

  if (!canReplaceDocument) {
    return;
  }

  const selectedPath = await open({
    multiple: false,
    directory: false,
    title: "Ouvrir un document Typst",
    filters: typstFilters,
  });

  if (typeof selectedPath !== "string") {
    return;
  }

  try {
    const file = await invoke<FilePayload>("read_text_file", {
      path: selectedPath,
    });

    documentStore.loadFile(file);
  } catch (error) {
    await showOperationError(
      "Impossible d'ouvrir le fichier",
      error,
    );
  }
}

/**
 * Ajoute l'extension .typ si elle n'est pas présente.
 */
function ensureTypstExtension(path: string): string {
  if (path.toLowerCase().endsWith(".typ")) {
    return path;
  }

  return `${path}.typ`;
}

/**
 * Affiche un dialogue natif puis écrit le document à l'emplacement choisi.
 */
export async function saveCurrentDocumentAs(): Promise<boolean> {
  const document = get(documentStore);

  const selectedPath = await save({
    title: "Enregistrer le document Typst",
    defaultPath: document.name,
    filters: typstFilters,
  });

  if (!selectedPath) {
    return false;
  }

  const outputPath = ensureTypstExtension(selectedPath);

  try {
    const file = await invoke<FilePayload>("write_text_file", {
      path: outputPath,
      content: document.content,
    });

    documentStore.markAsSaved(file);

    return true;
  } catch (error) {
    await showOperationError(
      "Impossible d'enregistrer le fichier",
      error,
    );

    return false;
  }
}

/**
 * Enregistre le document à son emplacement actuel.
 *
 * Si le document n'a pas encore de chemin, cette fonction redirige
 * automatiquement vers « Enregistrer sous ».
 */
export async function saveCurrentDocument(): Promise<boolean> {
  const document = get(documentStore);

  if (!document.path) {
    return saveCurrentDocumentAs();
  }

  try {
    const file = await invoke<FilePayload>("write_text_file", {
      path: document.path,
      content: document.content,
    });

    documentStore.markAsSaved(file);

    return true;
  } catch (error) {
    await showOperationError(
      "Impossible d'enregistrer le fichier",
      error,
    );

    return false;
  }
}
