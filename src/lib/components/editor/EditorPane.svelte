<script lang="ts">
  import { saveCurrentDocument } from "$lib/services/document-actions";
  import { documentStore } from "$lib/stores/document";


  import CodeEditor from "./CodeEditor.svelte";

  function handleSaveRequest() {
    void saveCurrentDocument();
  }
</script>

<section class="editor-pane" aria-label="Éditeur">
  <div class="tabs-bar">
    <div class="tab active">
      <span class="file-icon" aria-hidden="true">T</span>

      <span class="file-name">
        {$documentStore.name}
      </span>

      {#if $documentStore.dirty}
        <span
          class="dirty-indicator"
          title="Modifications non enregistrées"
          aria-label="Modifications non enregistrées"
        ></span>
      {/if}
    </div>
  </div>

  <div class="editor-container">
    <CodeEditor
      content={$documentStore.content}
      onContentChange={documentStore.setContent}
      onCursorChange={documentStore.setCursor}
      onSaveRequest={handleSaveRequest}
    />
  </div>
</section>

<style>
  .editor-pane {
    display: flex;
    min-width: 0;
    min-height: 0;
    flex-direction: column;
    background: var(--color-background);
  }

  .tabs-bar {
    display: flex;
    flex-shrink: 0;
    height: 36px;
    overflow-x: auto;
    overflow-y: hidden;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
  }

  .tab {
    display: flex;
    align-items: center;
    min-width: 180px;
    max-width: 260px;
    padding: 0 12px;
    gap: 8px;
    color: var(--color-text-muted);
    font-size: 12px;
    border-right: 1px solid var(--color-border);
    user-select: none;
  }

  .tab.active {
    color: var(--color-text);
    background: var(--color-background);
    border-top: 1px solid var(--color-primary);
  }

  .file-icon {
    flex-shrink: 0;
    color: var(--color-primary);
    font-size: 11px;
    font-weight: 700;
  }

  .file-name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dirty-indicator {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    margin-left: auto;
    background: var(--color-text);
    border-radius: 50%;
  }

  .editor-container {
    flex: 1;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }
</style>
