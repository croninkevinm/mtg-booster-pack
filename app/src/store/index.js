import { createStore } from 'vuex';

export default createStore({
  state: {
    sets: [],
    cards: [],
  },
  getters: {
    setsByRelease(state) {
      return state.sets.sort(
        /* eslint-disable comma-dangle */
        (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
      );
    },
    setsByCode(state) {
      return new Map(state.sets.map((set) => [set.code, set]));
    },
    booster(state) {
      const { cards } = state;
      const foilIndex = Math.floor(Math.random() * cards.length);
      cards[foilIndex].isFoil = true;
      return cards;
    },
  },
  actions: {
    async getSets({ state }) {
      const response = await fetch('https://api.magicthegathering.io/v1/sets');
      const json = await response.json();
      state.sets = json.sets.filter((set) => set.booster);
    },
    async getBooster({ state }, setCode) {
      const response = await fetch(
        `https://api.magicthegathering.io/v1/sets/${setCode}/booster`
      );
      const json = await response.json();
      state.cards = json.cards.reverse().filter((card) => card.imageUrl);
    },
  },
});
