<section class="editor-pane" aria-label="Éditeur">
  <div class="tabs-bar">
    <div class="tab active">
      <span class="file-icon" aria-hidden="true">T</span>
      <span class="file-name">Nouveau document</span>
    </div>
  </div>

  <div class="editor-placeholder">
    <div class="line-numbers" aria-hidden="true">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
    </div>

    <pre><code><span class="keyword">#set</span> page(
  paper: <span class="string">"a4"</span>,
  margin: <span class="number">2cm</span>,
)

<span class="heading">= Ma première fiche</span></code></pre>
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
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
  }

  .tab {
    display: flex;
    align-items: center;
    min-width: 150px;
    max-width: 220px;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .editor-placeholder {
    display: flex;
    flex: 1;
    min-height: 0;
    padding-top: 14px;
    overflow: auto;
    font-family: var(--font-family-monospace);
    font-size: 13px;
    line-height: 1.7;
  }

  .line-numbers {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    width: 48px;
    color: var(--color-text-subtle);
    text-align: right;
    user-select: none;
  }

  .line-numbers span {
    padding-right: 14px;
  }

  pre {
    margin: 0;
    padding: 0 24px 24px 0;
    color: var(--color-text);
    font: inherit;
    white-space: pre;
  }

  code {
    font: inherit;
  }

  .keyword {
    color: #c586c0;
  }

  .string {
    color: #ce9178;
  }

  .number {
    color: #b5cea8;
  }

  .heading {
    color: #4ec9b0;
    font-weight: 600;
  }
</style>
