export interface EditorPosition {
  line: number;
  column: number;
}

export interface EditorDocument {
  id: string;
  name: string;
  path: string | null;
  content: string;
  savedContent: string;
  dirty: boolean;
  cursor: EditorPosition;
}