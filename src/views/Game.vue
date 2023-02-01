<template>
    <Toast />

    <BaseCard v-bind="currentElement" class="center" :canFlip="canFlip"></BaseCard>
    <div class="center">
        <InputText type="text" v-model="value" class="mid" />
        <Button label="Check " @click="checkAnswer"></Button>
    </div>
    <div class="center paddiv">
        <Button label="Next " @click="NextElement"></Button>
    </div>
</template>

<script>
import BaseCard from '../components/BaseCard.vue';
import { useCardStore } from '../stores/CardStore';
import Toast from 'primevue/toast';

export default {
    components: { BaseCard, Toast },
    data() {
        return {
            cardStore: useCardStore(),
            value: '',
            currentElement: {},
            canFlip: true
        };
    },
    mounted() {
        this.randomElement();
    },
    methods: {
        showSuccess() {
            this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
        },
        showError() {
            this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
        },
        checkAnswer() {
            if (this.value === this.randomElement.back) {
                this.showSuccess();
            } else {
                this.showError();
            }
        },
        randomElement() {
            this.currentElement = this.cardStore.cards[Math.floor(Math.random() * this.cardStore.cards.length)];
        },
        NextElement() {
            this.currentElement = this.cardStore.cards[Math.floor(Math.random() * this.cardStore.cards.length)];
            console.log(this.currentElement.id);
        }
    }
};
</script>

<style scoped>
.center {
    display: flex;
    justify-content: center;
}
.paddiv {
    padding-top: 2%;
}
</style>
