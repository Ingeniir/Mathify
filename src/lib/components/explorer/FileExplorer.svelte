<script lang="ts">
  function handleOpenWorkspace() {
    console.info("Workspace selection requested");
  }
</script>

<aside class="file-explorer" aria-label="Explorateur de fichiers">
  <div class="panel-header">
    <span>EXPLORATEUR</span>

    <button
      type="button"
      title="Ouvrir un dossier"
      aria-label="Ouvrir un dossier"
      onclick={handleOpenWorkspace}
    >
      +
    </button>
  </div>

  <div class="empty-state">
    <div class="empty-icon" aria-hidden="true">
      ◇
    </div>

    <p>Aucun dossier ouvert</p>

    <span>
      Ouvre un dossier contenant tes fichiers Typst pour commencer.
    </span>

    <button type="button" onclick={handleOpenWorkspace}>
      Ouvrir un dossier
    </button>
  </div>
</aside>

<style>
  .file-explorer {
    display: flex;
    min-width: 0;
    min-height: 0;
    flex-direction: column;
    background: var(--color-surface);
    border-right: 1px solid var(--color-border);
  }

  .panel-header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    padding: 0 8px 0 12px;
    color: var(--color-text-muted);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    border-bottom: 1px solid var(--color-border);
    user-select: none;
  }

  .panel-header button {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    padding: 0;
    color: var(--color-text-muted);
    font-size: 18px;
    background: transparent;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
  }

  .panel-header button:hover {
    color: var(--color-text);
    background: var(--color-surface-hover);
  }

  .empty-state {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    text-align: center;
  }

  .empty-icon {
    margin-bottom: 12px;
    color: var(--color-text-subtle);
    font-size: 34px;
  }

  .empty-state p {
    margin: 0 0 7px;
    color: var(--color-text);
    font-size: 13px;
    font-weight: 600;
  }

  .empty-state span {
    max-width: 180px;
    margin-bottom: 18px;
    color: var(--color-text-muted);
    font-size: 12px;
    line-height: 1.5;
  }

  .empty-state button {
    min-height: 30px;
    padding: 0 12px;
    color: white;
    font-size: 12px;
    background: var(--color-primary);
    border: 0;
    border-radius: 5px;
    cursor: pointer;
  }

  .empty-state button:hover {
    background: var(--color-primary-hover);
  }
</style>
