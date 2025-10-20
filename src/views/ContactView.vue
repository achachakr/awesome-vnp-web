<template>
  <section class="contact-page">
    <!-- 상단 이미지 영역 -->
    <div class="contact-hero">
      <img src="@/assets/images/etc/awesome-contact-bg.png" alt="Awesome V&P" />
    </div>
    <h1 ref="titleRef" class="title fade-up">Contact</h1>

    <div class="contact-container">
      <!-- 회사 정보 -->
      <div class="info-card">
        <h2>어썸브이앤피</h2>
        <p><strong>E-mail</strong> awesomevnp2023@gmail.com</p>
        <p><strong>Phone</strong> 010-2495-3065</p>
        <p><strong>Address</strong> 서울 관악구 남부순환로 226길 20</p>
        <p><strong>Business</strong> 공연 · 방송 · 영상 제작 / 운영</p>

        <!-- 지도 -->
        <iframe
          src="https://www.google.com/maps?q=서울시%20관악구%20남부순환로%20226길%2020&output=embed"
          width="100%"
          height="250"
          style="border-radius: 10px; border: none; margin-top: 10px"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>

      <!-- 문의 폼 -->
      <div class="form-card">
        <h2>문의하기</h2>
        <form>
          <input type="text" placeholder="이름" required />
          <input type="email" placeholder="이메일" required />
          <textarea
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
// 현재 정적 구성으로 별도 JS 없음
</script>

<style scoped>
.contact-page {
  background-color: #000;
  min-height: 100vh;
  padding-top: clamp(80px, 12vh, 160px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 상단 이미지 */
.contact-hero {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 60px;
  display: flex;
  justify-content: center;
}
.contact-hero img {
  width: 100%;
  max-width: 800px;
  height: auto;
  object-fit: contain;
  animation: fadeIn 1.2s ease-out;
}

.title {
  text-align: center;
  font-weight: 800;
  letter-spacing: 0.02em;
  font-size: clamp(1.6rem, 4.4vw, 2.4rem);
  margin-bottom: clamp(18px, 3vmin, 28px);
}

/* 본문 컨테이너 */
.contact-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  max-width: 1100px;
  width: 90%;
  margin: 0 auto 80px;
}

/* 정보 카드 */
.info-card,
.form-card {
  background-color: #141414;
  padding: 28px;
  border-radius: 12px;
  flex: 1 1 400px;
  max-width: 500px;
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.info-card:hover,
.form-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
}

.info-card h2 {
  margin-bottom: 12px;
  font-weight: 700;
}

/* 문의 폼 */
.form-card form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-card input,
.form-card textarea {
  background-color: #1b1b1b;
  color: #fff;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  width: 100%;
  resize: none;
}

.form-card input::placeholder,
.form-card textarea::placeholder {
  color: #888;
}

.form-card button {
  background-color: #3182f6;
  border: none;
  color: #fff;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-card button:hover {
  background-color: #1e6fe2;
}

/* 반응형 */
@media (max-width: 768px) {
  .contact-hero img {
    max-width: 280px;
  }
  .contact-container {
    flex-direction: column;
    align-items: center;
    gap: 30px;
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
