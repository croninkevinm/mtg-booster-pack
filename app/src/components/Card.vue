<template>
<div class="card" @click="revealCard">
  <div class="card-inner">
    <div class="card-back">
      <img v-bind:src="'./images/card_back.png'" alt="Card Back">
    </div>
    <div v-if="isFoil" class="card-front foil">
      <img :src="cardImage">
    </div>
    <div v-else class="card-front">
      <img :src="cardImage">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    cardImage: String,
    isFoil: Boolean,
  },
  methods: {
    revealCard(event) {
      const clicked = event.target.parentNode;
      // console.log(clicked);

      if (clicked.classList.contains('card-back')) {
        const card = clicked.parentNode.parentNode;
        card.classList.add('card-revealed');
      }
    },
  },
  setup() {
  },
};
</script>

<style scoped lang="scss">
.card {
  perspective: 1000px;
  cursor: pointer;

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
}
.card-revealed .card-inner {
  transform: rotateY(180deg);
}
.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}
.card-front {
  transform: rotateY(180deg);
}
img {
  width: 100%;
  height: auto;
}

// https://codepen.io/simeydotme/pen/PrQKgo
.foil:before,
.foil:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-repeat: no-repeat;
  opacity: .5;
  mix-blend-mode: color-dodge;
  transition: all .33s ease;
}
.foil:before {
  background-position: 50% 50%;
  background-size: 300% 300%;
  background-image: linear-gradient(
    115deg,
    transparent 0%,
    var(--color1) 25%,
    transparent 47%,
    transparent 53%,
    var(--color2) 75%,
    transparent 100%
  );
  opacity: .5;
  filter: brightness(.5) contrast(1);
  z-index: 1;
}
.foil:after {
  opacity: 1;
  background-image: url("../../public/images/sparkles.gif"),
    url("../../public/images/holo.png"),
    linear-gradient(125deg, #ff008450 15%, #fca40040 30%,
      #ffff0030 40%, #00ff8a20 60%, #00cfff40 70%, #cc4cfa50 85%);
  background-position: 50% 50%;
  background-size: 160%;
  background-blend-mode: overlay;
  z-index: 2;
  filter: brightness(1) contrast(1);
  transition: all .33s ease;
  mix-blend-mode: color-dodge;
  opacity: .75;
}
</style>
