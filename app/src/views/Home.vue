<template>
<div class="home">
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{ name: 'Home' }">
        Magic Booster Sim
      </router-link>
    </div>

    <div class="navbar-menu">
      <form>
        <input type="text" v-model="filter">
      </form>
    </div>
  </nav>
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

import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const filter = ref('');
    const store = useStore();
    const loading = computed(() => store.state.loading);
    const sets = computed(() => store
      .getters
      .setsByRelease
      .filter((set) => {
        const filterValue = filter.value.toLowerCase();
        let matchType = '';
        if (filterValue.includes(':')) {
          matchType = filterValue.split(':')[0].trim();
        }
        const filterText = filterValue.split(':').pop().trim();
        const filterRegExp = new RegExp(filterText);
        if (matchType === 'code' || matchType === 'id') {
          return set.code.toLowerCase().match(filterRegExp);
        }
        if (matchType === 'block') {
          // eslint-disable-next-line no-param-reassign
          if (!set.block) { set.block = ''; }
          return set.block.toLowerCase().match(filterRegExp);
        }
        return set.name.toLowerCase().match(filterRegExp);
      }));

    return {
      sets,
      filter,
      loading,
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
    // border: 1px solid black;

    h2 {
      font-size: 1em;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
}

form {
  width: 90%;
  margin: 1em auto;

  input {
    width: 100%;
  }
}

</style>
