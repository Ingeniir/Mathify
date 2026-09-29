import { documentStore } from "$lib/stores/document";

/**
 * Enregistrement temporaire en mémoire.
 *
 * Cette fonction sera remplacée à l’étape suivante par une commande
 * Tauri écrivant réellement le contenu sur le disque.
 */
export function saveCurrentDocument() {
  documentStore.markAsSaved();

  console.info(
    "Document marked as saved in memory. Filesystem persistence is not implemented yet.",
  );
}
