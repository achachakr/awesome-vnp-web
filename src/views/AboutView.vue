<template>
  <section class="about">
    <!-- 영상: 1920x1460 비율 유지 (크롭 없음) -->
    <div class="video-wrapper fade-up">
      <video
        src="@/assets/videos/about-us.mp4"
        autoplay
        muted
        loop
        playsinline
        aria-label="About us video"
      ></video>
    </div>

    <div class="text-content fade-up">
      <h1>About us</h1>
      <p>
        어썸브이앤피는 새롭게 도전하고 즐겁게 영상작업을하는 스튜디오 입니다.
      </p>
      <p>
        긍정적인 생각으로 프로젝트에 임하며 소통, 연구를 통해 성공적인 영상을
        만들어 갑니다.
      </p>
      <p>
        공연, 방송, 행사를 중심으로 다양한 영상과 새로운 가치를 창출하고 더 높은
        퀄리티와 감동을 위해 노력합니다.
      </p>
      <p class="quote">“an awesome sight !!!”</p>
      <p>
        모든 파트너들에게 엄청나고 기가막히고 굉장한 경험을 드릴 수 있도록 항상
        최선의 노력을 다합니다.
      </p>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
onMounted(() => {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach(
        (e) => e.isIntersecting && e.target.classList.add("visible")
      ),
    { threshold: 0.15 }
  );
  document.querySelectorAll(".fade-up").forEach((el) => io.observe(el));
});
</script>

<style scoped>
/* 페이지 배경 블랙 */
.about {
  background: #000;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* 헤더 고정 높이만큼 여백 확보 */
  padding: clamp(100px, 14vh, 160px) 16px 72px;
  overflow: hidden;
}

/* ========== 핵심: 영상 박스 ========== */
/* 원본 비율(1920/1460 ≈ 1.315)을 그대로 유지해서 크롭 방지 */
.video-wrapper {
  width: min(70vw, 800px);
  aspect-ratio: 1920 / 1460; /* 비율 고정 */
  margin-bottom: clamp(24px, 5vmin, 56px);
  border-radius: 16px;
  overflow: hidden;
  background: #000; /* 레터박스도 블랙 */
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
}

/* iOS/Safari 대응: 높이 자동, 크롭 금지 */
.video-wrapper video {
  display: block;
  width: 100%;
  height: auto; /* ← 고정 높이/100% 높이 사용 금지 */
  object-fit: contain; /* 전체 보이게 */
  object-position: center;
  -webkit-user-drag: none;
  user-select: none;
  background: #000;
}

/* ========== 텍스트 ========== */
.text-content {
  max-width: 780px;
  margin-inline: auto;
  line-height: 1.85;
  font-size: clamp(0.95rem, 2.1vw, 1.125rem);
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.text-content h1 {
  font-size: clamp(1.6rem, 4.2vw, 2.2rem);
  font-weight: 800;
  margin-bottom: 1.1em;
}
.text-content p {
  margin-bottom: 0.9em;
  opacity: 0.92;
}
.text-content .quote {
  font-style: italic;
  margin: 1.4em 0 1.1em;
  font-weight: 700;
  font-size: clamp(1.05rem, 3.4vw, 1.3rem);
  color: #7fb3ff;
}

/* 스크롤 애니메이션 */
.fade-up {
  opacity: 0;
  transform: translateY(48px);
  transition: opacity 0.7s, transform 0.7s;
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 모바일 보정 */
@media (max-width: 480px) {
  .about {
    padding-bottom: 56px;
  }
  .video-wrapper {
    border-radius: 12px;
  }
}
</style>
