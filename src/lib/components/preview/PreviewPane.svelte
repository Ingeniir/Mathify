<script lang="ts">
  let zoom = 100;

  function decreaseZoom() {
    zoom = Math.max(50, zoom - 10);
  }

  function increaseZoom() {
    zoom = Math.min(200, zoom + 10);
  }
</script>

<section class="preview-pane" aria-label="Prévisualisation du document">
  <div class="preview-header">
    <span>PRÉVISUALISATION</span>

    <div class="preview-actions">
      <button
        type="button"
        title="Réduire le zoom"
        aria-label="Réduire le zoom"
        onclick={decreaseZoom}
      >
        −
      </button>

      <span class="zoom-value">{zoom} %</span>

      <button
        type="button"
        title="Augmenter le zoom"
        aria-label="Augmenter le zoom"
        onclick={increaseZoom}
      >
        +
      </button>
    </div>
  </div>

  <div class="preview-content">
    <article
      class="paper"
      style:transform={`scale(${zoom / 100})`}
      style:transform-origin="top center"
    >
      <h1>Ma première fiche</h1>

      <p>
        La prévisualisation du document Typst apparaîtra ici.
      </p>

      <div class="placeholder-block"></div>
      <div class="placeholder-block"></div>
      <div class="placeholder-block short"></div>
    </article>
  </div>
</section>

<style>
  .preview-pane {
    display: flex;
    min-width: 0;
    min-height: 0;
    flex-direction: column;
    background: #262626;
    border-left: 1px solid var(--color-border);
  }

  .preview-header {
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
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    user-select: none;
  }

  .preview-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: normal;
  }

  .preview-actions button {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    padding: 0;
    color: var(--color-text-muted);
    background: transparent;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
  }

  .preview-actions button:hover {
    color: var(--color-text);
    background: var(--color-surface-hover);
  }

  .zoom-value {
    min-width: 42px;
    text-align: center;
  }

  .preview-content {
    display: flex;
    flex: 1;
    min-height: 0;
    justify-content: center;
    padding: 28px;
    overflow: auto;
  }

  .paper {
    flex-shrink: 0;
    width: min(100%, 540px);
    min-height: 720px;
    padding: 56px;
    color: #242424;
    background: #ffffff;
    box-shadow: 0 5px 20px rgb(0 0 0 / 30%);
  }

  .paper h1 {
    margin: 0 0 24px;
    font-family: Georgia, serif;
    font-size: 25px;
  }

  .paper p {
    margin: 0 0 30px;
    color: #555555;
    font-family: Georgia, serif;
    font-size: 14px;
    line-height: 1.6;
  }

  .placeholder-block {
    width: 100%;
    height: 8px;
    margin-bottom: 12px;
    background: #e7e7e7;
    border-radius: 4px;
  }

  .placeholder-block.short {
    width: 64%;
  }
</style>
