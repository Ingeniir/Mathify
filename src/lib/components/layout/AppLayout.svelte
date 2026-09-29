<script lang="ts">
  import EditorPane from "../editor/EditorPane.svelte";
  import FileExplorer from "../explorer/FileExplorer.svelte";
  import PreviewPane from "../preview/PreviewPane.svelte";
  import StatusBar from "../statusbar/StatusBar.svelte";
  import AppHeader from "./AppHeader.svelte";
</script>

<div class="app-layout">
  <AppHeader />

  <main class="workspace">
    <FileExplorer />
    <EditorPane />
    <PreviewPane />
  </main>

  <StatusBar />
</div>

<style>
  .app-layout {
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-rows:
      var(--header-height)
      minmax(0, 1fr)
      var(--status-bar-height);
    overflow: hidden;
  }

  .workspace {
    display: grid;
    min-width: 0;
    min-height: 0;
    grid-template-columns:
      var(--sidebar-width)
      minmax(320px, 1fr)
      minmax(340px, var(--preview-width));
    overflow: hidden;
  }

  @media (max-width: 1050px) {
    .workspace {
      grid-template-columns:
        210px
        minmax(300px, 1fr)
        minmax(300px, 40%);
    }
  }
</style>
