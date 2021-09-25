<template>
<div class="home">
  <div class="sets">
    <router-link
      class="set"
      v-for="set in sets"
      :key="set.code"
      :to="{ name: 'Pack', params: { setCode: set.code } }"
    >
      <img v-bind:src="'./images/set_logo/' + set.code + '.png'" alt="">
      <h2>{{set.name}}</h2>
    </router-link>
  </div>
</div>
</template>

<script>

import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    // const sets = computed(() => store.state.sets);
    const sets = computed(() => store.getters.setsByRelease);

    store.dispatch('getSets');

    return {
      sets,
    };
  },
};
</script>

<style lang="scss">
.sets {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2em;

  .set {
    width: 300px;
    justify-content: center;
    text-align: center;
    border: 1px solid black;

    h2 {
      font-size: 1em;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
}

</style>
