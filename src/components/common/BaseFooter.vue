<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="address">
        20, Nambusunhwan-ro 226-gil, Gwanak-gu, Seoul, Republic of Korea
      </p>

      <!-- 연락처 -->
    </div>

    <!-- 푸터 하단 -->
    <div class="footer-bottom">
      <p>Copyright © 2025 AWESOME V&P inc.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  components: {},
};
</script>

<style scoped>
/* 기본 스타일 */
.footer {
  background: #222;
  color: white;
  text-align: center;
  padding: 40px 20px;
}

/* 제목 */
.footer-content h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
}

/* 주소 */
.address {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #bbb;
}

/* 연락처 */
.contact-info {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
}

/* 개별 연락처 아이템 */
.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.contact-item:hover {
  color: rgb(111, 163, 253);
}

/* 아이콘만 있는 인스타그램 */
.contact-item:last-child {
  font-size: 1.1rem;
}

.contact-item:last-child:hover {
  color: rgb(111, 163, 253);
}

/* 푸터 바텀 */
.footer-bottom {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #aaa;
}

/* 🛠️ 반응형 스타일 추가 */
@media (max-width: 1024px) {
  .contact-info {
    flex-wrap: wrap;
    gap: 15px;
  }
}

@media (max-width: 767px) {
  .footer-content h2 {
    font-size: 1.8rem;
  }

  .contact-info {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .contact-item {
    font-size: 1rem;
  }

  .footer-bottom {
    font-size: 0.8rem;
  }
}
</style>
