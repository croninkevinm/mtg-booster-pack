<template>
  <div class="open-pack">
    <div id="nav">
      <router-link :to="{ name: 'Home' }">Set List</router-link>
    </div>
    <h1>{{ currentSet.name }}</h1>
    <!-- <img v-bind:src="'./images/set_logo/' + currentSet.code + '.png'" alt=""> -->
    <div class="cards">
      <Card
        class="card"
        v-for="card in packCards"
        :key="card.id"
        :cardImage="card.imageUrl"
        :isFoil="card.isFoil"
      />
      <!-- <div class="card" v-for="card in cards" :key="card.id">
      <img :src=card.imageUrl alt="">
    </div> -->
    </div>
    <!-- <h3 v-for="card in cards" :key="card.id">{{ card.name }}</h3> -->
  </div>
</template>

<script>
import { computed, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Card from '@/components/Card.vue';

export default {
  setup() {
    const CHANCE_FOIL_LAND = 0.4;
    const CHANCE_FOIL_EXTRA = 0.3;
    const CHANCE_FOIL_RARE = 0.3;

    const packCards = ref([]);
    const route = useRoute();
    const store = useStore();
    const currentSet = computed(() => store.getters.setsByCode.get(route.params.setCode));
    const currentSetCards = computed(() => store.getters.cardsByRarity);

    function getRandomCards(count, cards, foilChance = 0) {
      const cardSet = new Set();
      while (cardSet.size < Math.min(count, cards.length)) {
        const cardIndex = Math.floor(Math.random() * cards.length);
        cardSet.add(cards[cardIndex]);
      }
      const randomCards = [...cardSet];
      if (Math.random() < foilChance) {
        const foilIndex = Math.floor(Math.random() * randomCards.length);
        randomCards[foilIndex].isFoil = true;
      }
      return randomCards;
    }

    watch(
      route,
      () => {
        if (route.params.setCode) {
          console.log('getting cards for set: ', route.params.setCode);
          store.dispatch('getCards', route.params.setCode);
        }
      },
      {
        immediate: true,
      },
    );

    watch(currentSetCards, () => {
      const pack = [];
      const basicLands = currentSetCards.value.get('Basic Land');
      const commons = currentSetCards.value.get('Common');
      const uncommons = currentSetCards.value.get('Uncommon');
      const rares = currentSetCards.value.get('Rare');
      const allCards = currentSetCards.value.get('NoBasicLands');
      const extraFoil = (Math.random() < CHANCE_FOIL_EXTRA);

      // Get land
      pack.push(...getRandomCards(1, basicLands, CHANCE_FOIL_LAND));

      // Get commons
      if (extraFoil) {
        pack.push(...getRandomCards(9, commons));
      } else {
        pack.push(...getRandomCards(10, commons));
      }

      // Get uncommons
      pack.push(...getRandomCards(3, uncommons));

      if (extraFoil) {
        pack.push(...getRandomCards(1, allCards, 1));
      }

      // Get rare
      pack.push(...getRandomCards(1, rares, CHANCE_FOIL_RARE));
      packCards.value = pack;
    });

    return {
      currentSet,
      packCards,
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
