<template>
  <header :class="['site-header', { scrolled }]">
    <div class="container">
      <!-- [좌] 햄버거 + 데스크톱 메뉴 -->
      <div class="left">
        <button
          class="hamburger"
          :class="{ open: menuOpen }"
          aria-label="Menu"
          @click="toggleMenu"
        >
          <span></span><span></span><span></span>
        </button>

        <nav class="nav-desktop">
          <RouterLink to="/work" class="nav-link" active-class="active">
            WORK
          </RouterLink>
          <RouterLink to="/about" class="nav-link" active-class="active">
            ABOUT
          </RouterLink>
          <RouterLink to="/contact" class="nav-link" active-class="active">
            CONTACT
          </RouterLink>
        </nav>
      </div>

      <!-- [가운데] 로고 (정중앙) -->
      <RouterLink to="/" class="brand" aria-label="Awesome VNP Home">
        <img src="@/assets/images/logo/awesome-logo.svg" alt="Awesome VNP" />
      </RouterLink>

      <!-- [오른쪽] 균형 맞추는 스페이서 -->
      <div class="spacer" aria-hidden="true"></div>
    </div>

    <!-- 오버레이 + 모바일 메뉴(왼쪽 슬라이드) -->
    <div v-show="menuOpen" class="overlay" @click="closeMenu"></div>
    <nav class="nav-mobile" :class="{ open: menuOpen }">
      <RouterLink to="/work" class="m-link" @click="closeMenu">
        WORK
      </RouterLink>
      <RouterLink to="/about" class="m-link" @click="closeMenu">
        ABOUT
      </RouterLink>
      <RouterLink to="/contact" class="m-link" @click="closeMenu">
        CONTACT
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const scrolled = ref(false);
const menuOpen = ref(false);
const onScroll = () => (scrolled.value = window.scrollY > 10);
const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const closeMenu = () => (menuOpen.value = false);
onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024 && menuOpen.value) menuOpen.value = false;
  });
});
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped>
/* 헤더 */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  /* 좌우 여백을 뷰포트에 맞게 가변 */
  padding: 20px clamp(20px, 4vw, 64px);
  background: transparent;
  color: #fff;
  opacity: 0.9;
  transition: background-color 0.25s, color 0.25s, padding 0.25s;
}
.site-header.scrolled {
  background: #fff;
  color: #111;
  padding: 14px clamp(20px, 4vw, 64px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
/* 3열: 좌 / 중앙(로고) / 우(스페이서) */
.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1920px; /* ← 너무 좌우로 퍼지지 않게 */
  margin: 0 auto; /* ← 화면 중앙에 컨테이너 정렬 */
}

/* 좌측 묶음 */
.left {
  display: flex;
  align-items: center;
  gap: 28px;
}

/* 햄버거(모바일 전용, 좌측 배치) */
.hamburger {
  display: none;
  position: relative;
  width: 28px;
  height: 22px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  color: inherit;
}
.hamburger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  transition: all 0.3s;
}
.hamburger span:nth-child(1) {
  top: 0;
}
.hamburger span:nth-child(2) {
  top: 10px;
}
.hamburger span:nth-child(3) {
  top: 20px;
}
.hamburger.open span:nth-child(1) {
  top: 10px;
  transform: rotate(45deg);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  top: 10px;
  transform: rotate(-45deg);
}

/* 데스크톱 메뉴 */
.nav-desktop {
  display: flex;
  gap: 32px;
}
.nav-link {
  text-decoration: none;
  color: inherit;
  font-weight: 700;
  letter-spacing: 0.05em;
  opacity: 0.9;
  transition: opacity 0.2s;
}
.nav-link:hover {
  opacity: 1;
}
.nav-link.active {
  text-decoration: underline;
  text-underline-offset: 6px;
}

/* 중앙 로고 (진짜 가운데) */
.brand {
  justify-self: center;
  line-height: 0;
} /* ⬅︎ 핵심 */
.brand img {
  height: 8rem;
  width: auto;
  transition: filter 0.25s, transform 0.25s;
}
.site-header.scrolled .brand img {
  filter: invert(1);
  transform: scale(0.92);
}

/* 오른쪽 스페이서: 좌측 영역과 균형 */
.spacer {
  justify-self: end;
  width: 220px;
  height: 1px;
} /* 대략 좌측(햄버거+메뉴) 폭 보정 */
@media (max-width: 1280px) {
  .spacer {
    width: 140px;
  }
}
@media (max-width: 1024px) {
  .spacer {
    width: 28px;
  }
} /* 모바일에선 햄버거 너비 만큼만 */

/* 오버레이 & 모바일 메뉴 (왼쪽 슬라이드) */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 998;
}
.nav-mobile {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px;
  display: flex;
  flex-direction: column;
  padding: 100px 24px 28px;
  gap: 24px;
  background: #fff;
  color: #111;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 999;
}
.nav-mobile.open {
  transform: translateX(0);
}
.m-link {
  text-decoration: none;
  color: inherit;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.05em;
}

/* 반응형 */
@media (max-width: 1024px) {
  .nav-desktop {
    display: none;
  } /* 데스크톱 메뉴 숨김 */
  .hamburger {
    display: inline-block;
  } /* 햄버거 표시(왼쪽) */
}
@media (max-width: 600px) {
  .brand img {
    height: 48px;
  }
}
</style>
