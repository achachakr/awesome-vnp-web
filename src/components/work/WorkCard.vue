<template>
  <article
    class="card"
    :class="{ active }"
    @click="goDetail"
    :aria-pressed="String(active)"
  >
    <img class="poster" :src="image" :alt="name" loading="lazy" />

    <div class="overlay">
      <div class="credits">
        <h3 class="name">{{ name }}</h3>
        <p class="date">{{ dateText }}</p>

        <div class="roll-mask">
          <div class="roll-track" :class="{ running: active }">
            <ul class="roll-list">
              <li v-for="(line, i) in work" :key="i">{{ line }}</li>
            </ul>
            <ul class="roll-list clone">
              <li v-for="(line, i) in work" :key="'c' + i">{{ line }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: { type: [String, Number], required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  start: { type: String, required: true }, // YYYY-MM-DD
  end: { type: String, default: "" }, // YYYY-MM-DD (optional)
  work: { type: Array, required: true }, // ['라인1','라인2',...]
  active: { type: Boolean, default: false }, // 부모 제어
});

const emit = defineEmits(["toggle"]);

const router = useRouter();

const periodText = computed(() => {
  if (!props.start && !props.end) return "";
  if (props.start && !props.end) return props.start;
  if (!props.start && props.end) return props.end;
  return `${props.start} ~ ${props.end}`;
});

function onToggle() {
  emit("toggle", props.id);
}

let isTouch = false;
onMounted(() => {
  isTouch = matchMedia("(hover: none)").matches;
});

function onTap() {
  if (isTouch) emit("toggle", props.id);
}

const fmt = (s) => {
  const d = new Date(s);
  if (isNaN(d)) return s;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${dd}`;
};
const dateText = computed(() =>
  props.end ? `${fmt(props.start)} - ${fmt(props.end)}` : fmt(props.start)
);

function goDetail() {
  // 상세 페이지로 이동
  router.push({
    name: "work-detail",
    params: { id: props.id },
  });
}
</script>

<style scoped>
.card {
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;

  background: #121318;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.28);
}
.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.45s ease, filter 0.45s ease, opacity 0.45s ease;
}
.overlay {
  position: absolute;
  inset: 0;
  color: #fff;
  background: rgba(0, 0, 0, 0.84);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 16px;
}
.credits {
  width: min(92%, 440px);
  text-align: center;
}
.name {
  margin: 0 0 6px;
  font-weight: 900;
  letter-spacing: 0.02em;
  font-size: clamp(14px, 1.8vw, 20px);
  line-height: 1.2;
}
.date {
  margin: 0 0 10px;
  opacity: 0.92;
  font-size: clamp(12px, 1.4vw, 14px);
}

/* 롤링 */
.roll-mask {
  position: relative;
  overflow: hidden;
  height: 96px;
  margin-top: 6px;

  /* 중앙(#fff)=보임, 위/아래 transparent=가림 */
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    #fff 18%,
    #fff 82%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    #fff 18%,
    #fff 82%,
    transparent 100%
  );
}
.roll-track {
  display: flex;
  flex-direction: column;
  transform: translateY(0);
  animation: rollUp 10s linear infinite;
  animation-play-state: paused; /* 기본 멈춤 */
  will-change: transform;
}
.roll-track.running {
  animation-play-state: running;
} /* 활성화 시 재생 */

.roll-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.roll-list li {
  line-height: 1.6;
  font-size: clamp(12px, 1.5vw, 15px);
  opacity: 0.96;
}

/* 데스크톱: hover 시 활성화 */
@media (hover: hover) {
  .card:hover .poster {
    transform: scale(1.065);
    filter: blur(3px) brightness(0.86);
  }
  .card:hover .overlay {
    opacity: 1;
  }
  .card:hover .roll-track {
    animation-play-state: running;
  }
}

/* 모바일: active 클래스(부모 제어) */
@media (hover: none) {
  .card.active .poster {
    transform: scale(1.065);
    filter: blur(3px) brightness(0.86);
  }
  .card.active .overlay {
    opacity: 1;
  }
  /* .roll-track.running 는 위에서 처리 */
}

/* 무한 루프 */
@keyframes rollUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

/* 모션 최소화 */
@media (prefers-reduced-motion: reduce) {
  .poster,
  .overlay {
    transition: none;
  }
  .roll-track {
    animation: none;
  }
}
</style>
