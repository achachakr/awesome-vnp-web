<template>
  <section class="contact-page">
    <!-- 상단 이미지 -->
    <div class="contact-hero">
      <img src="@/assets/images/etc/awesome-contact-bg.png" alt="Awesome V&P" />
    </div>

    <h1 class="title">Contact</h1>

    <div class="contact-container">
      <!-- 회사 정보 -->
      <div class="card info-card">
        <h2>어썸브이앤피</h2>
        <p>awesomevnp2023@gmail.com</p>
        <p>010-2495-3065</p>
        <p>서울 관악구 남부순환로 226길 20</p>
        <p>공연 · 방송 · 영상 제작 / 운영</p>

        <!-- 지도 (반응형) -->
        <div class="map-wrap">
          <iframe
            title="Awesome VNP Map"
            src="https://www.google.com/maps?q=서울시%20관악구%20남부순환로%20226길%2020&output=embed"
            loading="lazy"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- 문의 폼 -->
      <div class="card form-card">
        <h2>문의하기</h2>
        <form @submit.prevent>
          <input type="text" placeholder="이름" required />
          <input type="email" placeholder="이메일" required />
          <textarea
            rows="6"
            placeholder="프로젝트 개요, 일정, 예산, 협업 범위를 간단히 적어주세요."
            required
          ></textarea>
          <button type="submit">보내기</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
// 스크립트 로직 없음
</script>

<style scoped>
/* 페이지 기본 */
.contact-page {
  background: #000;
  min-height: 100vh;
  padding-top: clamp(80px, 12vh, 160px);
  padding-bottom: 80px;
}

/* 상단 비주얼 */
.contact-hero {
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto 36px;
  padding: 0 16px;
}
.contact-hero img {
  width: 100%;
  max-width: 800px;
  height: auto;
  object-fit: contain;
  animation: fadeIn 1.2s ease-out both;
}

/* 타이틀 */
.title {
  text-align: center;
  color: #fff;
  font-weight: 800;
  letter-spacing: 0.02em;
  font-size: clamp(1.6rem, 4.4vw, 2.4rem);
  margin: 0 0 clamp(18px, 3vmin, 28px);
}

/* === 핵심: 가운데 그리드 레이아웃 ===
   - 2열(PC), 1열(모바일)
   - 그리드를 '가운데'에 배치 (justify-content:center)
*/
.contact-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(280px, 520px));
  gap: 32px;
  justify-content: center; /* 그리드 자체를 수평 중앙 정렬 */
  align-content: start;
  width: 100%;
  max-width: 1140px; /* 520*2 + gap */
  margin: 0 auto;
  padding: 0 16px;
}

/* 카드 공통 */
.card {
  background: #141414;
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  border: 1px solid #222;
  padding: 24px;
  text-align: center;
}
.card h2 {
  margin: 0 0 12px;
  font-weight: 700;
}

/* 지도 반응형 박스 (aspect-ratio) */
.map-wrap {
  margin-top: 12px;
  border-radius: 10px;
  overflow: hidden;
  border: 0;
  aspect-ratio: 16 / 10;
  background: #0f0f0f;
}
.map-wrap iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

/* 폼: 중앙 정렬 + 오버플로 방지 */
.form-card form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
}
.form-card input,
.form-card textarea {
  width: 100%;
  box-sizing: border-box; /* 오버플로 방지 */
  background: #1b1b1b;
  color: #fff;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 16px; /* iOS 확대 방지 */
  resize: none;
  text-align: center; /* 가운데 정렬 */
}
.form-card input::placeholder,
.form-card textarea::placeholder {
  color: #9aa0aa;
  text-align: center;
}

.form-card button {
  width: 100%;
  height: 44px;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  background: #3182f6;
  color: #fff;
  font-weight: 700;
  transition: filter 0.2s ease, transform 0.2s ease;
}
.form-card button:hover {
  filter: brightness(1.07);
  transform: translateY(-1px);
}

/* 반응형: 모바일 1열, 카드 폭 통일 */
@media (max-width: 900px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 24px;
    max-width: 350px; /* 모바일에서 너무 넓지 않게 */
  }
}

/* 부드러운 페이드인 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
