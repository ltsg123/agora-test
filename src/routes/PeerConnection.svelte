<script lang="ts">
  import { beforeUpdate, onMount } from "svelte";

  // 获取路由参数中的数
  export let codec: string;

  let localStats = {
    codec: "",
    resolution: "",
    frameRate: "",
    sendNum: "",
  };
  let remoteStats = {
    codec: "",
    resolution: "",
    frameRate: "",
    receiveNum: "",
  };

  onMount(async () => {
    if (typeof window !== "undefined") {
      const { startP2P, getStats } = await import("../utils/peer");
      await startP2P(codec, "localVideo", "remoteVideo");

      setInterval(async () => {
        const stats = await getStats();
        if (!stats) {
          return;
        }
        localStats.codec = stats.local.codec;
        localStats.resolution = `${stats.local.frameWidth}x${stats.local.frameHeight}`;
        localStats.frameRate = stats.local.framesPerSecond;
        localStats.sendNum = stats.local.framesSent;

        remoteStats.codec = stats.remote.codec;
        remoteStats.resolution = `${stats.remote.frameWidth}x${stats.remote.frameHeight}`;
        remoteStats.frameRate = stats.remote.framesPerSecond;
        remoteStats.receiveNum = stats.remote.framesReceived;
      }, 250);
    }
  });

  // 每次组件即将更新时检测值的变化
  beforeUpdate(async () => {
    const { changeCodec } = await import("../utils/peer");
    changeCodec(codec);
  });
</script>

<svelte:head>
  <title>AgoraRTC Video Detection</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="container">
  <div class="peer">
    <div class="left">
      <label for="video1">Local Video</label>
      <video id="localVideo" autoplay muted playsinline />
      <!-- stats 层 -->
      <div class="stats-layer">
        <div class="stats-text">
          <p>Codec: {localStats.codec}</p>
          <p>分辨率: {localStats.resolution}</p>
          <p>帧率: {localStats.frameRate} FPS</p>
          <p>发送: {localStats.sendNum}</p>
        </div>
      </div>
    </div>
    <div class="right">
      <label for="video2">Remote Video</label>
      <video id="remoteVideo" autoplay muted />
      <!-- stats 层 -->
      <div class="stats-layer">
        <div class="stats-text">
          <p>Codec: {remoteStats.codec}</p>
          <p>分辨率: {remoteStats.resolution}</p>
          <p>帧率: {remoteStats.frameRate} FPS</p>
          <p>接收: {remoteStats.receiveNum}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
  .peer {
    display: flex;
    align-items: center;
    width: 80%;
    /* max-width: 800px; */
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }
  /* 左侧部分 */
  .left,
  .right {
    flex: 1;
    padding: 20px;
    margin: 10px; /* 添加外边距来创建间距 */
    background-color: #f0f0f0;
    position: relative; /* 使 video-container 成为相对定位的容器 */
  }

  /* label 样式 */
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  }

  /* video 样式 */
  video {
    width: 100%;
    height: auto;
    background-color: black;
  }
  .stats-layer {
    position: absolute; /* stats 层相对于 video-container 进行绝对定位 */
    top: 0;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.7); /* 设置背景颜色和透明度 */
    color: #fff;
    padding: 0px;
  }

  .stats-text {
    font-size: 14px;
  }
</style>
