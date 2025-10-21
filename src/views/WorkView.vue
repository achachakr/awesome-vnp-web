<template>
  <section class="work-page">
    <div ref="gridRef" class="grid">
      <WorkCard
        v-for="(item, i) in posters"
        :key="item.id"
        :src="item.src"
        :title="item.title"
        :date="item.date"
        :data-index="i"
        class="revealable"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import WorkCard from "@/components/work/WorkCard.vue";

const gridRef = ref(null);
let io; // IntersectionObserver 인스턴스

// 포스터 목록 (예시)
const posters = [
  {
    id: 1,
    title: "LAY ZHANG GRANDLINE 5 2025 TOUR",
    date: "",
    src: new URL("@/assets/images/posters/poster13.png", import.meta.url).href,
  },
  {
    id: 1,
    title: "2025 환경콘서트",
    date: "2025-09-27",
    src: new URL("@/assets/images/posters/poster01.png", import.meta.url).href,
  },
  {
    id: 2,
    title: "2025 울산고래축제",
    date: "2025-09-25~28",
    src: new URL("@/assets/images/posters/poster02.jpg", import.meta.url).href,
  },
  {
    id: 3,
    title: "세븐락프라임 페스티벌",
    date: "2025-08-15~16",
    src: new URL("@/assets/images/posters/poster03.jpg", import.meta.url).href,
  },
  {
    id: 4,
    title: "",
    date: "",
    src: new URL("@/assets/images/posters/poster04.jpg", import.meta.url).href,
  },
  {
    id: 5,
    title: "",
    date: "",
    src: new URL("@/assets/images/posters/poster05.png", import.meta.url).href,
  },
  {
    id: 6,
    title: "",
    date: "",
    src: new URL("@/assets/images/posters/poster06.jpg", import.meta.url).href,
  },
  {
    id: 7,
    title: "",
    date: "",
    src: new URL("@/assets/images/posters/poster07.png", import.meta.url).href,
  },
  {
    id: 8,
    title: "",
    date: "",
    src: new URL("@/assets/images/posters/poster08.jpg", import.meta.url).href,
  },
  {
    id: 9,
    title: "",
    date: "",
    src: new URL("@/assets/images/posters/poster09.jpg", import.meta.url).href,
  },
  {
    id: 10,
    title: "",
    date: "",
    src: new URL("@/assets/images/posters/poster10.jpg", import.meta.url).href,
  },
  {
    id: 11,
    title: "",
    date: "",
    src: new URL("@/assets/images/posters/poster11.jpg", import.meta.url).href,
  },
  {
    id: 12,
    title: "",
    date: "",
    src: new URL("@/assets/images/posters/poster12.png", import.meta.url).href,
  },
];

// 현재 grid의 컬럼 수를 계산 (반응형 대응)
const getColCount = () => {
  if (!gridRef.value) return 3;
  const style = getComputedStyle(gridRef.value);
  const cols = style.gridTemplateColumns.split(" ").length;
  return Math.max(1, cols);
};

const setupReveal = () => {
  if (!gridRef.value) return;

  const STAGGER = 0.06; // 카드 간 딜레이
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // 화면에 들어온 카드들에만 스태거 적용
        const el = entry.target; // .revealable (WorkCard 루트)
        const index = Number(el.getAttribute("data-index")) || 0;
        const cols = getColCount();

        // 같은 행에서 좌→우로 짧은 스태거, 행이 내려갈 때 살짝 추가
        const col = index % cols; // 0..cols-1
        const row = Math.floor(index / cols); // 0..N
        const delay = col * STAGGER + row * 0.02; // 행별 살짝 추가

        el.style.animationDelay = `${delay}s`;
        el.classList.add("fade-in");
        io.unobserve(el);
      });
    },
    { threshold: 0.15 }
  );

  gridRef.value.querySelectorAll(".revealable").forEach((card) => {
    // 초기 상태(숨김)
    card.classList.remove("fade-in");
    card.style.animationDelay = "0s";
    io.observe(card);
  });
};

onMounted(async () => {
  await nextTick();
  setupReveal();

  // 리사이즈 시 컬럼 수가 바뀌면, 이미 보인 카드 제외하고 재설정
  const onResize = () => {
    if (!gridRef.value) return;
    // 아직 안 나타난 카드만 다시 observe
    gridRef.value
      .querySelectorAll(".revealable:not(.fade-in)")
      .forEach((c) => io.observe(c));
  };
  window.addEventListener("resize", onResize, { passive: true });
  // 정리
  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize);
  });
});

onBeforeUnmount(() => {
  if (io) io.disconnect();
});
</script>

<style scoped>
/* ✅ A안: Work 페이지 배경/높이 통일 */
.work-page {
  background: #0e0f12;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;

  /* 헤더 높이 고려 + 여백 */
  padding-top: clamp(84px, 12vh, 120px);
  padding-inline: clamp(12px, 2vw, 24px);
  padding-bottom: 60px;
}

/* ✅ 그리드: 데스크톱 3, 태블릿 2, 모바일 2 */
.grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  margin-top: 60px;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: 900px;
  }
}
@media (max-width: 560px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    max-width: 520px;
  }
}
@media (max-width: 360px) {
  .grid {
    gap: 8px;
  }
}

/* ✅ 카드 등장 애니메이션(자동 스태거) */
.revealable {
  opacity: 0;
  transform: translateY(12px) scale(0.995);
}
.revealable.fade-in {
  animation: fadeUp 0.55s ease forwards;
}
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
