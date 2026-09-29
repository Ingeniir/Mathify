<script lang="ts">
  import { documentStore } from "$lib/stores/document";
</script>

<footer class="status-bar">
  <div class="status-group">
    <span class="status-item">
      <span
        class:modified={$documentStore.dirty}
        class:idle={!$documentStore.dirty}
        class="status-dot"
        aria-hidden="true"
      ></span>

      {$documentStore.dirty ? "Modifié" : "Prêt"}
    </span>

    <span class="status-item">0 erreur</span>
    <span class="status-item">0 avertissement</span>
  </div>

  <div class="status-group">
    <span class="status-item">
      Ligne {$documentStore.cursor.line},
      colonne {$documentStore.cursor.column}
    </span>

    <span class="status-item">Typst</span>
    <span class="status-item">UTF-8</span>
  </div>
</footer>

<style>
  .status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--status-bar-height);
    padding: 0 9px;
    overflow: hidden;
    color: #dce8ff;
    font-size: 11px;
    background: #285a9f;
    user-select: none;
  }

  .status-group {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 14px;
  }

  .status-item {
    display: flex;
    align-items: center;
    height: 100%;
    white-space: nowrap;
  }

  .status-dot {
    width: 7px;
    height: 7px;
    margin-right: 6px;
    border-radius: 50%;
  }

  .status-dot.idle {
    background: #afc9ef;
  }

  .status-dot.modified {
    background: #ffd866;
  }

  @media (max-width: 900px) {
    .status-group {
      gap: 8px;
    }

    .status-item:nth-child(3) {
      display: none;
    }
  }
</style>
