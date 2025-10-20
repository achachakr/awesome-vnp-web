<template>
  <div id="app">
    <BaseHeader />
    <main>
      <router-view />
    </main>
    <BaseFooter />
  </div>
</template>

<script>
import BaseHeader from "@/components/common/BaseHeader.vue";
import BaseFooter from "./components/common/BaseFooter.vue";
export default { components: { BaseHeader, BaseFooter } };
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  background: #0b0d10;
  color: #fff;
  font-family: "Pretendard", "Noto Sans KR", system-ui, -apple-system,
    BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue",
    Arial, sans-serif;
}

body,
html {
  margin: 0;
  padding: 0;
  background: #0e1218;
  overflow-x: hidden;
}
</style>
