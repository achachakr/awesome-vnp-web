import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"), // 홈 전용 뷰 생성 필요
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/work",
    name: "work",
    component: () => import("@/views/WorkView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/ContactView.vue"),
  },
  // 잘못된 URL은 홈으로 리다이렉트
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Vue CLI용
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
