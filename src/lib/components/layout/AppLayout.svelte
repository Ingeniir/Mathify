<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import { confirm } from "@tauri-apps/plugin-dialog";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  import EditorPane from "../editor/EditorPane.svelte";
  import FileExplorer from "../explorer/FileExplorer.svelte";
  import PreviewPane from "../preview/PreviewPane.svelte";
  import StatusBar from "../statusbar/StatusBar.svelte";
  import { documentStore } from "$lib/stores/document";

  import AppHeader from "./AppHeader.svelte";

  onMount(() => {
    let unlisten: (() => void) | undefined;

    void getCurrentWindow()
      .onCloseRequested(async (event) => {
        const document = get(documentStore);

        if (!document.dirty) {
          return;
        }

        /*
         * La fermeture est temporairement annulée, le temps de demander
         * une confirmation à l’utilisateur.
         */
        event.preventDefault();

        const shouldClose = await confirm(
          "Le document contient des modifications non enregistrées. " +
            "Veux-tu fermer l’application et les abandonner ?",
          {
            title: "Modifications non enregistrées",
            kind: "warning",
            okLabel: "Fermer sans enregistrer",
            cancelLabel: "Annuler",
          },
        );

        if (shouldClose) {
          await getCurrentWindow().destroy();
        }
      })
      .then((stopListening) => {
        unlisten = stopListening;
      });

    return () => {
      unlisten?.();
    };
  });
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
