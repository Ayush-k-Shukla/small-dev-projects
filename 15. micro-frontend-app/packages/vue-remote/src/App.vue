<template>
  <div class="vue-app">
    <h2>Vue Remote Application</h2>
    <p>This component is rendered by Vue 3.</p>
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const count = ref(0);
    return { count };
  },
});
</script>

<style scoped>
.vue-app {
  border: 1px solid green;
  padding: 20px;
  margin: 10px;
}
</style>
