<template>
  <div>
    <button @click="toggle = !toggle">Toggle</button>
    <div class="" v-if="toggle">
      yes 
    </div>
    <div v-else>no</div>
  </div>
</template>

<script setup lang="ts">

const toggle = ref(false)

</script>