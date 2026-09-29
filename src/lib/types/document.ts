export interface EditorPosition {
  line: number;
  column: number;
}

export interface EditorDocument {
  id: string;
  name: string;
  path: string | null;

  /**
   * Contenu actuellement présent dans l’éditeur.
   */
  content: string;

  /**
   * Dernier contenu considéré comme enregistré.
   */
  savedContent: string;

  /**
   * Indique si le contenu actuel diffère du contenu enregistré.
   */
  dirty: boolean;

  /**
   * Position actuelle du curseur.
   */
  cursor: EditorPosition;
}
