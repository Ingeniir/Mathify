<script lang="ts">
  import { saveCurrentDocument } from "$lib/services/document-actions";
  import { documentStore } from "$lib/stores/document";


  function handleOpenFolder() {
    console.info("Open folder requested");
  }

  function handleSave() {
    saveCurrentDocument();
  }

  function handleCompile() {
    console.info("Compile requested");
  }
</script>

<header class="app-header">
  <div class="brand">
    <div class="brand-icon" aria-hidden="true">
      T
    </div>

    <div class="brand-text">
      <strong>Typst Editor</strong>

      <span>
        {$documentStore.path ?? "Sans dossier ouvert"}
      </span>
    </div>
  </div>

  <nav class="actions" aria-label="Actions principales">
    <button type="button" onclick={handleOpenFolder}>
      Ouvrir un dossier
    </button>

    <button
      type="button"
      class:has-changes={$documentStore.dirty}
      onclick={handleSave}
    >
      Enregistrer{#if $documentStore.dirty} •{/if}
    </button>

    <button
      class="primary-button"
      type="button"
      onclick={handleCompile}
    >
      Compiler
    </button>
  </nav>
</header>

<style>
  .app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-height);
    padding: 0 12px;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    user-select: none;
  }

  .brand {
    display: flex;
    align-items: center;
    min-width: 0;
    gap: 10px;
  }

  .brand-icon {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    width: 27px;
    height: 27px;
    color: white;
    font-weight: 700;
    background: var(--color-primary);
    border-radius: 6px;
  }

  .brand-text {
    display: flex;
    align-items: baseline;
    min-width: 0;
    gap: 10px;
  }

  .brand-text strong {
    color: #f0f0f0;
    font-size: 13px;
    white-space: nowrap;
  }

  .brand-text span {
    overflow: hidden;
    color: var(--color-text-muted);
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .actions {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 6px;
  }

  button {
    height: 30px;
    padding: 0 11px;
    color: var(--color-text);
    font-size: 12px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background: var(--color-surface-hover);
    border-color: var(--color-border);
  }

  button.has-changes {
    color: #ffffff;
  }

  .primary-button {
    color: white;
    background: var(--color-primary);
  }

  .primary-button:hover {
    background: var(--color-primary-hover);
    border-color: transparent;
  }
</style>
