<template>
  <router-view/>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    store.dispatch('getSets');
  },
};
</script>

<style lang="scss">
</style>
