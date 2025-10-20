<template>
  <section class="landing">
    <video
      src="@/assets/videos/awesome-home-bg.mp4"
      autoplay
      muted
      loop
      playsinline
    ></video>
  </section>
</template>

<script setup>
// 별도 로직 없음
</script>

<style scoped>
.landing {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 영상 스타일 */
.landing video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 비율 유지하며 꽉 채움 */
  object-position: center;
  display: block;
  animation: fadeIn 1.8s ease-out both;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none; /* 클릭 방지 */
}

/* 페이드인 효과 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
