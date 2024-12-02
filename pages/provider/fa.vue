<template>
  <div class="">
    <div class="economic-calendar-tg">
      <div v-html="data"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTgju } from "~/composables/providers/tgju";

const { data } = useTgju();
</script>

<style lang="css">
@font-face {
  font-family: Vazir;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("https://eplanetbrokers.com/wp-content/uploads/2024/03/Vazir.woff")
    format("woff");
}

@font-face {
  font-family: Vazir;
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("https://eplanetbrokers.com/wp-content/uploads/2024/03/Vazir-Bold.woff")
    format("woff");
}

table#calendar {
  width: 100%;
  border: 1px solid #eee;
  font-family: Vazir;
  font-size: 13px;
  direction: rtl;
}

tbody {
}
thead {
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid #0f318d;
  position: sticky;
  top: 0;
}

th {
  padding: 8px;
  text-align: right !important;
  background: #0f318d;
  color: white;
}

#calendar > tbody > tr > td {
  background: #f8f8f8;
  padding: 10px;
}
#calendar > tbody > tr {
  border-bottom: 1px solid #eee;
}
.td-alert,
.d-none {
  /* display: none !important; */
}
</style>
