<template>
    <div>
        <div class="scene scene--card">
            <div class="card" @click="cardOne == 'start' && canFlip ? (cardOne = 'flipped') : (cardOne = 'start')" v-bind:class="{ flipme: cardOne == 'flipped' }">
                <div class="card__face card__face--front">
                    {{ front }}
                    <Button class="pi pi-trash button" @click="onClick"></Button>
                </div>
                <div class="card__face card__face--back">
                    {{ back }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCardStore } from '../stores/CardStore';
export default {
    props: {
        front: String,
        back: String,
        id: Number,
        canFlip: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            cardOne: 'start',
            useCard: useCardStore()
        };
    },

    methods: {
        onClick() {
            this.$emit('remove', this.id);
        }
    }
};
</script>

<style scoped>
.scene {
    width: 200px;
    height: 260px;
    border: 1px solid #ccc;
    margin: 40px 0;
    perspective: 600px;
}

.card {
    width: 100%;
    height: 100%;
    transition: transform 1s;
    transform-style: preserve-3d;
    cursor: pointer;
    position: relative;
}

.card__face {
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 260px;
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    backface-visibility: hidden;
}

.card__face--front {
    background: #3b82f6;
}

.card__face--back {
    background: rgb(21, 164, 97);
    transform: rotateY(180deg);
}

/* this style is applied when the card is clicked */
.flipme {
    transform: rotateY(180deg);
}
.button {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #3b82f6;
}
</style>
