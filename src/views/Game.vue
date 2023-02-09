<template>
    <div v-if="cards.length > 0">
        <Toast />

        <BaseCard v-bind="currentElement" class="center" :canFlip="canFlip" :deleteIcon="deleteIcon"></BaseCard>
        <div class="center">
            <InputText type="text" v-model="value" class="mid" />
            <Button label="Check " @click="checkAnswer"></Button>
        </div>
        <div class="center paddiv">
            <Button label="Next " @click="nextElement"></Button>
        </div>
    </div>

    <div v-else-if="cards.length === 0 && isMounted === true">
        <Dialog header="congratulations" v-model:visible="displayBasic" :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '50vw' }">
            <p>You have finished all the cards. You can add more cards or start a new game.</p>
            <template #footer>
                <Button label="Ok!" icon="pi pi-check" @click="closeBasic" autofocus />
            </template>
        </Dialog>
    </div>
</template>

<script>
import BaseCard from '../components/BaseCard.vue';
import Toast from 'primevue/toast';
import { getCards } from '../service/cardservice';

export default {
    components: { BaseCard, Toast },
    data() {
        return {
            value: '',
            currentElement: {},
            canFlip: false,
            deleteIcon: false,
            cards: [],
            displayBasic: true,
            isMounted: false
        };
    },

    methods: {
        showSuccess() {
            this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
        },
        showError() {
            this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
        },

        randomElement() {
            return this.cards[Math.floor(Math.random() * this.cards.length)];
        },
        checkAnswer() {
            if (this.value === this.currentElement.back) {
                this.showSuccess();
                this.canFlip = true;
            } else {
                this.showError();
            }
        },
        nextElement() {
            if (this.cards.length !== 0) {
                this.cards = this.cards.filter((item) => item.id !== this.currentElement.id);
            }
            this.currentElement = this.randomElement();
            this.canFlip = false;
        },
        closeBasic() {
            this.displayBasic = false;
        }
    },
    async mounted() {
        this.cards = await getCards();
        this.currentElement = this.randomElement();
        this.isMounted = true;
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
