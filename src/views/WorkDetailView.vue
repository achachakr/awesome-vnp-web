<template>
  <!-- 다른 페이지들처럼 섹션 루트 + 상단 패딩 -->
  <section class="work-detail">
    <main class="work-detail-main">
      <!-- 뒤로가기 -->
      <button type="button" class="back-btn" @click="goBack">
        ← Back
      </button>

      <!-- 로딩/에러 상태 -->
      <div v-if="loading" class="work-detail-state">
        불러오는 중...
      </div>
      <div v-else-if="error" class="work-detail-state error">
        {{ error }}
      </div>

      <!-- 실제 내용 -->
      <div v-else-if="work" class="work-detail-inner">
        <!-- 상단: 포스터 + 텍스트 정보 -->
        <section class="work-detail-head">
          <div class="poster-wrap" v-if="work.posterUrl">
            <img :src="work.posterUrl" :alt="work.title" />
          </div>

          <div class="info-wrap">
            <h1 class="title">{{ work.title }}</h1>
            <p v-if="periodText" class="period">{{ periodText }}</p>

            <ul v-if="roles.length" class="role-list">
              <li v-for="(role, idx) in roles" :key="idx">
                {{ role }}
              </li>
            </ul>
          </div>
        </section>

        <!-- 갤러리 -->
        <section v-if="images.length" class="work-detail-gallery">
          <h2 class="section-title">Gallery</h2>

          <div class="gallery-grid">
            <figure
              v-for="asset in images"
              :key="asset.id"
              class="gallery-item"
            >
              <img
                :src="asset.url"
                :alt="asset.caption || work.title"
                loading="lazy"
              />
              <figcaption
                v-if="asset.caption"
                class="caption"
              >
                {{ asset.caption }}
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
    </main>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 상태값
const loading = ref(true);
const error = ref("");
const work = ref(null);

// 라우트에서 id 가져오기 (/work/:id)
const workId = computed(() => route.params.id);

// 기간 표시 텍스트
const periodText = computed(() => {
  if (!work.value) return "";

  // 백엔드 DTO에 formattedPeriod가 있으면 우선 사용
  if (work.value.formattedPeriod) {
    return work.value.formattedPeriod;
  }

  const start = work.value.startDate;
  const end = work.value.endDate;

  if (!start && !end) return "";
  if (start && end) return `${start} ~ ${end}`;
  return start || end || "";
});

// 역할 리스트 (역할 JSON 파싱 결과)
const roles = computed(() => {
  if (!work.value || !Array.isArray(work.value.roleList)) return [];
  return work.value.roleList;
});

// 갤러리 이미지 리스트
const images = computed(() => {
  if (!work.value || !Array.isArray(work.value.assets)) return [];

  // WorkAssetPublicDto 구조에 맞춰서 매핑
  // 백엔드 필드명이 다르면 여기만 맞춰주면 됨
  return work.value.assets.map((asset) => ({
    id: asset.id,
    // url, caption 필드는 WorkAssetPublicDto에 맞게 조정
    url: asset.url || asset.imageUrl || asset.fileUrl,
    caption: asset.caption || asset.label || "",
  })).filter(a => !!a.url); // url 없는 건 제외
});

// 작품 상세 불러오기
async function fetchWork() {
  loading.value = true;
  error.value = "";

  try {
    const res = await fetch(`/api/works/${workId.value}`);
    if (!res.ok) {
      throw new Error(`Failed to load work detail: ${res.status}`);
    }

    const data = await res.json();
    work.value = data;
  } catch (e) {
    console.error(e);
    error.value = "작품 정보를 불러오는 중 오류가 발생했습니다.";
  } finally {
    loading.value = false;
  }
}

// 뒤로가기
function goBack() {
  router.back();
}

// 마운트 시 자동 로딩
onMounted(() => {
  fetchWork();
});
</script>


<style scoped>
/* 다른 페이지(.work, .about)와 동일하게
   헤더 고정 높이만큼 위에 패딩을 준다 */
.work-detail {
  min-height: 100vh;
  padding-top: clamp(80px, 12vh, 200px);
  padding-inline: clamp(12px, 2vw, 24px);
  background: #000;
  color: #fff;
}

/* 가운데 정렬 + 하단 마진 */
.work-detail-main {
  max-width: 1100px;
  margin: 0 auto 80px;
}

.back-btn {
  margin-bottom: 24px;
  padding: 0;
  border: none;
  background: none;
  color: #aaaaaa;
  font-size: 14px;
  cursor: pointer;
}
.back-btn:hover {
  color: #ffffff;
}

.work-detail-state {
  padding: 80px 0;
  text-align: center;
  font-size: 14px;
}
.work-detail-state.error {
  color: #ff6b6b;
}

/* 상단: 포스터 + 텍스트 */
.work-detail-head {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  margin-bottom: 48px;
}

.poster-wrap img {
  display: block;
  width: 260px;
  max-width: 100%;
  border-radius: 4px;
}

.info-wrap {
  flex: 1;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 12px;
}

.period {
  font-size: 14px;
  color: #bbbbbb;
  margin-bottom: 12px;
}

.role-list {
  margin: 0;
  padding-left: 18px;
  list-style: disc;
  font-size: 13px;
  line-height: 1.6;
}

/* 갤러리 */
.work-detail-gallery {
  margin-top: 40px;
}

.section-title {
  font-size: 18px;
  margin-bottom: 20px;
}

/* 여러 이미지를 타일 형태로 */
.gallery-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center; /* 갤러리 전체 가운데 정렬 */
}

.gallery-item {
  display: flex;
  justify-content: center; /* 가로 가운데 */
  align-items: center;      /* 세로 가운데 */
  width: 100%;
}

.gallery-item img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto; /* 이미지 자체 가운데 */
}

.caption {
  margin-top: 6px;
  font-size: 12px;
  color: #cccccc;
}

/* 모바일 대응 */
@media (max-width: 768px) {
  .work-detail {
    padding-top: 90px;
    padding-inline: 16px;
  }

  .work-detail-main {
    margin-bottom: 60px;
  }

  .work-detail-head {
    flex-direction: column;
    gap: 20px;
  }

  .poster-wrap img {
    width: 100%;
    max-width: 320px;
  }
}
</style>
