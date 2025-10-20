<template>
  <section class="contact">
    <h1 ref="titleRef" class="title fade-up">Contact</h1>

    <div class="content">
      <!-- 좌: 정보 + 지도 -->
      <div ref="infoRef" class="left fade-up">
        <div class="card info">
          <h2>어썸브이앤피</h2>
          <ul class="list">
            <li>
              <span class="label">E-mail</span>
              <a :href="`mailto:${email}`" class="value">{{ email }}</a>
            </li>
            <li>
              <span class="label">Phone</span>
              <a :href="`tel:${tel}`" class="value">{{ tel }}</a>
            </li>
            <li>
              <span class="label">Address</span>
              <span class="value">{{ address }}</span>
            </li>
            <li>
              <span class="label">Business</span>
              <span class="value">공연 · 방송 · 행사 영상 제작 / 운영</span>
            </li>
          </ul>
        </div>

        <!-- 지도 -->
        <div class="card map">
          <iframe
            title="Awesome VNP Map"
            :src="mapSrc"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <!-- 우: 문의 폼 -->
      <form ref="formRef" class="card form fade-up" @submit.prevent="onSubmit">
        <h2>문의하기</h2>

        <div class="row">
          <label for="name">이름</label>
          <input
            id="name"
            v-model.trim="form.name"
            type="text"
            placeholder="홍길동"
            :class="{ invalid: errors.name }"
            autocomplete="name"
            required
          />
          <p v-if="errors.name" class="err">{{ errors.name }}</p>
        </div>

        <div class="row">
          <label for="email">이메일</label>
          <input
            id="email"
            v-model.trim="form.email"
            type="email"
            placeholder="you@example.com"
            :class="{ invalid: errors.email }"
            autocomplete="email"
            required
          />
          <p v-if="errors.email" class="err">{{ errors.email }}</p>
        </div>

        <div class="row">
          <label for="message">메시지</label>
          <textarea
            id="message"
            v-model.trim="form.message"
            rows="6"
            placeholder="프로젝트 개요, 일정, 예산 범위를 간단히 적어주세요."
            :class="{ invalid: errors.message }"
            required
          ></textarea>
          <p v-if="errors.message" class="err">{{ errors.message }}</p>
        </div>

        <button class="submit" type="submit" :disabled="submitting">
          {{ submitting ? "전송 중..." : "보내기" }}
        </button>

        <!-- 완료 토스트 -->
        <transition name="toast">
          <div v-if="toast.show" class="toast" role="status" aria-live="polite">
            {{ toast.text }}
          </div>
        </transition>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

/* ===== 연락처 (업데이트) ===== */
const address = "서울 관악구 남부순환로 226길 20";
const email = "awesomevnp2023@gmail.com";
const tel = "010-2495-3065";

/* 구글 맵 임베드: API키 없이 사용 가능한 쿼리 임베드 */
const mapSrc =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(address) +
  "&output=embed";

/* ===== 폼 상태 ===== */
const form = reactive({ name: "", email: "", message: "" });
const errors = reactive({ name: "", email: "", message: "" });
const submitting = ref(false);
const toast = reactive({ show: false, text: "" });

const validate = () => {
  errors.name = form.name ? "" : "이름을 입력해주세요.";
  errors.email = /\S+@\S+\.\S+/.test(form.email)
    ? ""
    : "올바른 이메일을 입력해주세요.";
  errors.message =
    form.message.length >= 10 ? "" : "메시지는 10자 이상 작성해주세요.";
  return !errors.name && !errors.email && !errors.message;
};

const onSubmit = async () => {
  if (!validate()) return;
  submitting.value = true;
  await new Promise((r) => setTimeout(r, 700)); // 데모용 딜레이
  submitting.value = false;

  toast.text = "문의가 등록되었습니다. 빠르게 연락드릴게요!";
  toast.show = true;

  form.name = "";
  form.email = "";
  form.message = "";
  setTimeout(() => (toast.show = false), 3000);
};

/* ===== 스크롤 애니메이션 ===== */
const titleRef = ref(null);
const infoRef = ref(null);
const formRef = ref(null);

onMounted(() => {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach(
        (e) => e.isIntersecting && e.target.classList.add("visible")
      ),
    { threshold: 0.15 }
  );
  [titleRef.value, infoRef.value, formRef.value].forEach(
    (el) => el && io.observe(el)
  );
});
</script>

<style scoped>
/* 페이지 레이아웃 */
.contact {
  background: #0e0f12;
  min-height: 100vh;
  color: #fff;
  padding: clamp(96px, 12vh, 140px) clamp(16px, 4vw, 40px) 80px;
  box-sizing: border-box;
  margin-top: 60px;
  margin-bottom: 60px;
}

.title {
  text-align: center;
  font-weight: 800;
  letter-spacing: 0.02em;
  font-size: clamp(1.6rem, 4.4vw, 2.4rem);
  margin-bottom: clamp(18px, 3vmin, 28px);
}

/* 2컬럼 레이아웃 */
.content {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: clamp(16px, 3vw, 28px);
  max-width: 1200px;
  margin: 0 auto;
}
@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
}

/* 카드 공통 */
.card {
  background: #14161b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.25);
  padding: clamp(16px, 2.4vw, 24px);
}

/* 정보 카드 */
.info h2 {
  font-size: clamp(1.1rem, 2.6vw, 1.4rem);
  margin: 0 0 12px;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}
.list .label {
  display: inline-block;
  min-width: 86px;
  opacity: 0.9;
  color: #b6bdd0;
  font-size: 0.95rem;
}
.list .value {
  color: #fff;
  text-decoration: none;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.list a:hover {
  text-decoration: underline;
}

/* 지도 카드 */
.map {
  padding: 0;
  overflow: hidden;
}
.map iframe {
  display: block;
  width: 100%;
  height: min(46vh, 420px);
  border: 0;
  filter: grayscale(10%);
  border-radius: 12px;
}

/* 폼 */
.form h2 {
  margin: 0 0 12px;
  font-size: clamp(1.1rem, 2.6vw, 1.4rem);
}
.row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}
label {
  text-align: left;
  opacity: 0.92;
}

/* ✅ placeholder 오버플로우 방지: 박스 기준 계산 */
input,
textarea {
  width: 100%;
  box-sizing: border-box; /* ← 핵심 */
  color: #fff;
  background: #0f1115;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 12px 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
input::placeholder,
textarea::placeholder {
  color: #98a0b3;
  opacity: 0.9;
  white-space: normal; /* 텍스트가 넘칠 때 줄바꿈 */
}

/* 모바일에서 입력 필드가 컨테이너를 넘지 않도록 */
@media (max-width: 480px) {
  input,
  textarea {
    font-size: 16px;
  } /* iOS 확대 방지 */
}

input:focus,
textarea:focus {
  border-color: #4da3ff;
  box-shadow: 0 0 0 3px rgba(77, 163, 255, 0.15);
}
.invalid {
  border-color: #ff6b6b !important;
}
.err {
  color: #ff8585;
  font-size: 0.9rem;
  margin: -2px 0 6px;
}

.submit {
  margin-top: 8px;
  width: 100%;
  height: 46px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  background: #4da3ff;
  color: #0b0c10;
  font-weight: 800;
  transition: transform 0.15s ease, filter 0.15s ease, opacity 0.2s;
}
.submit:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}
.submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 토스트 */
.toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  background: rgba(30, 32, 38, 0.95);
  color: #fff;
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 8px);
}

/* 스크롤 애니메이션 */
.fade-up {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
