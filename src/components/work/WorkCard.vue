<template>
  <article class="card" @click="onTap" :aria-pressed="showMeta.toString()">
    <img :src="src" :alt="title" loading="lazy" />

    <!-- 정보 오버레이 -->
    <div class="meta" :class="{ show: showMeta }">
      <h3 class="title">{{ title }}</h3>
      <p class="date">{{ formattedDate }}</p>
    </div>
  </article>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  src: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true }, // "YYYY-MM-DD"
});

/**
 * 모바일(hover: none)에서 탭하면 오버레이 토글
 * 데스크톱(hover: hover)에서는 CSS :hover 처리
 */
const showMeta = ref(false);
let isTouchEnv = false;

const onTap = () => {
  if (isTouchEnv) showMeta.value = !showMeta.value;
};

onMounted(() => {
  // 터치/모바일 환경 감지
  isTouchEnv = window.matchMedia("(hover: none)").matches;
});

/* YYYY.MM.DD 포맷 */
const formattedDate = computed(() => {
  const d = new Date(props.date);
  if (isNaN(d)) return props.date;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${dd}`;
});
</script>

<style scoped>
.card {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4; /* 포스터 비율 고정 */
  overflow: hidden;

  background: #16171c; /* 로딩 배경 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.35s ease, filter 0.35s ease;
  -webkit-user-drag: none;
  user-select: none;
}

/* 공통 오버레이 기본 상태: 숨김 */
.meta {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
  color: #fff;
  padding: 12px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.12),
    rgba(0, 0, 0, 0.45)
  );
  backdrop-filter: blur(2px);

  opacity: 0;
  visibility: hidden;
  transform: translateY(6px);
  transition: opacity 0.22s ease, visibility 0.22s ease, transform 0.22s ease;
}

.title {
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 1.25;
  font-size: clamp(12px, 1.6vw, 18px);
}
.date {
  opacity: 0.9;
  font-size: clamp(11px, 1.2vw, 14px);
}

/* 데스크톱: 마우스 오버 시 표시 */
@media (hover: hover) {
  .card:hover img {
    transform: scale(1.045);
    filter: brightness(1.05);
  }
  .card:hover .meta {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

/* 모바일(터치): 탭하여 토글된 경우에만 표시 */
@media (hover: none) {
  .meta.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  /* 탭 피드백 */
  .card:active img {
    transform: scale(1.025);
    filter: brightness(1.04);
  }
}
</style>
