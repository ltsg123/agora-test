<script lang="ts">
  import type { IAgoraRTC } from "agora-rtc-sdk-ng";
  import { onMount } from "svelte";
  import PeerConnection from "../PeerConnection.svelte";

  let capabilities: {
    video: string[];
    audio: string[];
  } = {
    video: [],
    audio: [],
  };
  let AgoraRTC: IAgoraRTC;

  let selectedCodec: string;

  onMount(async () => {
    if (typeof window !== "undefined") {
      AgoraRTC = (await import("agora-rtc-sdk-ng")) as unknown as IAgoraRTC;
      capabilities = await AgoraRTC.getSupportedCodec();
    }
  });
</script>

<svelte:head>
  <title>AgoraRTC</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
  <h1>AgoraRTC Media Capacity Detection</h1>

  <p>
    Support Video Codecs:
    {#each capabilities.video as codec (codec)}
      <span
        class:selected={selectedCodec === codec}
        tabindex="0"
        role="button"
        on:click|preventDefault={() => (selectedCodec = codec)}
        on:keydown
        style="padding: 10px; cursor: pointer;"
      >
        {codec}
      </span>
      <span>,</span>
    {/each}
  </p>
  <!-- <p>Support Audio Codecs: {capabilities?.audio}</p> -->
</div>
{#if selectedCodec}
  <PeerConnection codec={selectedCodec} />
{/if}

<style>
  .selected {
    cursor: pointer;
    background-color: skyblue;
  }
</style>
