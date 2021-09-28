import { createStore } from 'vuex';

export default createStore({
  state: {
    sets: [],
    cards: [],
    setCards: [],
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

    cardsByRarity(state) {
      const { setCards } = state;
      return setCards.reduce((byRarity, card) => {
        let { rarity } = card;
        if (card.type.toLowerCase().includes('basic land')) {
          rarity = 'Basic Land';
        } else if (
          rarity.toLowerCase().includes('mythic')
          || rarity.toLowerCase().includes('rare')
        ) {
          rarity = 'Rare';
        }
        if (!byRarity.has(rarity)) {
          byRarity.set(rarity, []);
        }
        if (!byRarity.has('NoBasicLands')) {
          byRarity.set('NoBasicLands', []);
        }
        byRarity.get(rarity).push(card);
        if (rarity !== 'Basic Land') {
          byRarity.get('NoBasicLands').push(card);
        }
        return byRarity;
      }, new Map());
    },
  },
  actions: {
    async getSets({ state }) {
      const response = await fetch('https://api.magicthegathering.io/v1/sets');
      const json = await response.json();
      // state.sets = json.sets.filter((set) => set.booster);
      state.sets = json.sets.filter((set) => {
        // 'masters', 'memorabilia', 'commander', 'token', 'archenemy', 'box'
        // 'draft_innovation', 'from_the_vault', 'funny', 'starter', 'duel_deck'
        // 'masterpiece', 'promo', 'premium_deck', 'planechase', 'vanguard'
        const setTypes = ['core', 'expansion'];
        return setTypes.includes(set.type.toLowerCase()) && !set.onlineOnly;
      });
    },

    async getBooster({ state }, setCode) {
      const response = await fetch(
        `https://api.magicthegathering.io/v1/sets/${setCode}/booster`
      );
      const json = await response.json();
      state.cards = json.cards.reverse().filter((card) => card.imageUrl);
    },

    async getCards({ state }, setCode) {
      let page = 1;
      let hasMore = true;
      const setCards = [];
      while (hasMore) {
        // eslint-disable-next-line no-await-in-loop
        const response = await fetch(
          `https://api.magicthegathering.io/v1/cards?set=${setCode}&page=${page}`
        );
        // eslint-disable-next-line no-await-in-loop
        const json = await response.json();
        const { cards } = json;
        if (cards.length < 100) {
          hasMore = false;
        } else {
          page += 1;
        }
        // setCards = setCards.concat(cards);
        setCards.push(...cards);
      }
      state.setCards = setCards.filter((card) => card.imageUrl);
      console.log(state.setCards);
    },
  },
});
