<template>
  <section class="work">
    <div class="grid">
      <WorkCard
        v-for="item in displayPosters"
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

/** 터치 환경 여부 + 활성 카드 id */
const isTouch = ref(false);
const activeId = ref(null);

/** 백엔드에서 받아올 포스터 목록 */
const posters = ref([]);

const displayPosters = computed(() => {
  return [...posters].sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
});

/** 데스크톱/모바일 구분 */
function detectTouch() {
  isTouch.value = matchMedia("(hover: none)").matches;
  if (!isTouch.value) {
    activeId.value = null; // 데스크톱으로 바뀌면 전부 접기
  }
}

/** 모바일에서만 카드 토글 */
function onToggle(id) {
  if (!isTouch.value) return;
  activeId.value = activeId.value === id ? null : id;
}

/** /api/works 에서 데이터 가져오기 */
async function fetchWorks() {
  try {
    const res = await fetch("/api/works");
    if (!res.ok) {
      console.error("Failed to fetch works:", res.status, res.statusText);
      return;
    }

    const data = await res.json();

    posters.value = data.map((w) => {
      const start = w.startDate ?? w.start_date ?? null;
      const end = w.endDate ?? w.end_date ?? null;
      const posterUrl = w.posterUrl ?? w.poster_url ?? "";

      let workList = [];
      // roles 배열로 오는 경우
      if (Array.isArray(w.roles)) {
        workList = w.roles;
      }
      // roleJson / role_json 이 JSON 문자열인 경우
      else if (typeof (w.roleJson ?? w.role_json) === "string") {
        try {
          workList = JSON.parse(w.roleJson ?? w.role_json);
        } catch (e) {
          console.warn("Failed to parse roleJson for work", w.id, e);
          workList = [];
        }
      }

      return {
        id: w.id,
        name: w.title,
        start,
        end,
        work: workList,
        src: posterUrl,
      };
    });
  } catch (error) {
    console.error("Error fetching works:", error);
  }
}

onMounted(() => {
  detectTouch();
  window.addEventListener("resize", detectTouch, { passive: true });

  // 페이지 진입 시 백엔드에서 목록 로드
  fetchWorks();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", detectTouch);
});
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
