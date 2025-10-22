<template>
  <section class="work">
    <div class="grid">
      <WorkCard
        v-for="item in posters"
        :key="item.id"
        :id="item.id"
        :image="item.src"
        :name="item.name"
        :start="item.start"
        :end="item.end"
        :work="item.work"
        :active="isTouch && activeId === item.id"
        @toggle="onToggle"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import WorkCard from "@/components/work/WorkCard.vue";

/* 터치환경 감지 + 활성 카드 제어 */
const isTouch = ref(false);
const activeId = ref(null);

function detectTouch() {
  isTouch.value = matchMedia("(hover: none)").matches;
  if (!isTouch.value) activeId.value = null; // 데스크톱 전환 시 모두 닫기
}
onMounted(() => {
  detectTouch();
  window.addEventListener("resize", detectTouch, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener("resize", detectTouch));

function onToggle(id) {
  // 같은 걸 다시 누르면 닫기, 다른 걸 누르면 이전 닫고 새로 열기
  activeId.value = activeId.value === id ? null : id;
}

/* 예시 데이터: work는 배열 */

/* 예시 데이터: work는 배열 */
const posters = [
  {
    id: 7,
    name: "2024 나훈아 콘서트 - 고마웠습니다.",

    work: ["메인 LED 콘텐츠 제작", "아티스트 인트로 제작", "실시간 VJ & 운영"],
    src: new URL("@/assets/images/posters/poster_na.jpeg", import.meta.url)
      .href,
  },
  {
    id: 8,
    name: "2025 세계 꽃문화관광축제 호수야 놀자",
    start: "2025-10-08",
    end: "2025-10-12",
    work: ["메인 LED 콘텐츠 제작", "프로그램 별 콘텐츠 운영"],
    src: new URL("@/assets/images/posters/poster_hsy.jpg", import.meta.url)
      .href,
  },
  {
    id: 1,
    name: "LAY ZHANG GRANDLINE 5 2025 TOUR",
    start: "2025-08",
    end: "2025-09",
    work: [
      "메인 LED 콘텐츠 제작",
      "오프닝 시퀀스 디자인",
      "실시간 VJ & 운영",
      "DISUGISE",
    ],
    src: new URL("@/assets/images/posters/poster13.png", import.meta.url).href,
  },
  {
    id: 2,
    name: "2025 울산고래축제",
    start: "2025-09-25",
    end: "2025-09-28",
    work: [
      "메인 LED 콘텐츠 제작",
      "주제영상 제작",
      "실시간 VJ & 운영",
      "AR 콘텐츠 디자인",
      "레이저 쇼",
    ],
    src: new URL("@/assets/images/posters/poster02.jpg", import.meta.url).href,
  },
  {
    id: 3,
    name: "2025 환경콘서트",
    start: "2025-09-27",
    work: ["메인 LED 콘텐츠 제작", "오프닝 퍼포먼스 제작", "실시간 VJ & 운영"],
    src: new URL("@/assets/images/posters/poster01.png", import.meta.url).href,
  },
  {
    id: 4,
    name: "2025 강남페스티벌",
    start: "2025-09-27",
    end: "2025-09-28",
    work: ["메인 LED 콘텐츠 제작", "아티스트 인트로 제작", "실시간 VJ & 운영"],
    src: new URL("@/assets/images/posters/poster_2025gn.jpg", import.meta.url)
      .href,
  },
  {
    id: 5,
    name: "2025 사운드플래닛 페스티벌",
    start: "2025-09-13",
    end: "2025-09-14",
    work: [
      "메인 LED 콘텐츠 제작",
      "오프닝 퍼포먼스 제작",
      "아티스트 인트로 제작",
      "실시간 VJ & 운영",
    ],
    src: new URL("@/assets/images/posters/poster05.png", import.meta.url).href,
  },
  {
    id: 6,
    name: "7 ROCK PRIME 2025",
    start: "2025-08-15",
    end: "2025-08-16",
    work: ["메인 LED 콘텐츠 제작", "아티스트 인트로 제작", "실시간 VJ & 운영"],
    src: new URL("@/assets/images/posters/poster03.jpg", import.meta.url).href,
  },

  // ...
];
</script>

<style scoped>
.work {
  padding-top: clamp(80px, 12vh, 200px);
  padding-inline: clamp(12px, 2vw, 24px);
  max-width: 1100px;
  margin: 0 auto 80px;
}

/* 데스크톱3 / 태블릿2 / 모바일2 */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
/* 모바일도 2열 */
@media (max-width: 560px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .work {
    padding-inline: 12px;
  }
}
</style>
