<template>
<div class="open-pack">
  <div id="nav">
    <router-link :to="{ name: 'Home' }">Set List</router-link>
  </div>
  <h1>{{currentSet.name}}</h1>
  <!-- <img v-bind:src="'./images/set_logo/' + currentSet.code + '.png'" alt=""> -->
  <div class="cards">
    <Card class="card" v-for="card in cards" :key="card.id"
      :cardImage="card.imageUrl" :isFoil=card.isFoil />
    <!-- <div class="card" v-for="card in cards" :key="card.id">
      <img :src=card.imageUrl alt="">
    </div> -->
  </div>
  <!-- <h3 v-for="card in cards" :key="card.id">{{ card.name }}</h3> -->
</div>
</template>

<script>

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Card from '@/components/Card.vue';

export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const currentSet = computed(() => store.getters.setsByCode.get(route.params.setCode));
    const cards = computed(() => store.getters.booster);
    // const cards = computed(() => store.state.cards);

    store.dispatch('getBooster', route.params.setCode);

    return {
      currentSet,
      cards,
    };
  },
  components: {
    Card,
  },
};
</script>

<style lang="scss">
 .cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2em;

  .card {
    width: 300px;
    height: 418px;
  }
 }
</style>
