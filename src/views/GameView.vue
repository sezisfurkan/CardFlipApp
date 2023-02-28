<template>
    <Toast />
    <BlockUI :blocked="blockedDocument" :fullScreen="true"></BlockUI>
    <div v-if="cards.length > 0">
        <div class="mt-8">
            <div class="flex justify-content-center align-items-center">
                <div class="font-bold text-2xl">
                    SCORE: <span class="text-green-600">{{ score }}</span> || {{ length }} CARDS LEFT || TOTAL CARDS: {{ cards.length }}
                </div>
            </div>
            <BaseCard ref="baseCard" v-bind="currentElement" class="flex justify-content-center align-items-center" :canFlip="canFlip" :deleteIcon="deleteIcon"></BaseCard>
            <div class="flex justify-content-center align-items-center">
                <InputText type="text" v-model="value" />
                <Button label="Check" @click="checkAnswer" :disabled="check" class="mr-1 ml-1" />

                <Button label="Next" @click="nextElement" :disabled="!nextCard" />
            </div>
        </div>
    </div>

    <div v-else-if="cards.length === 0 && isMounted === true">
        <Dialog header="congratulations" v-model:visible="displayBasic" :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '50vw' }">
            <p>You have finished all the cards. You can add more cards or start a new game.</p>
            <p class="flex justify-content-center align-items-center">
                Your Score is <span style="color: green">{{ score }}</span> !
            </p>
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
import { useAuthStore } from '../store/auth';

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
            isMounted: false,
            score: 0,
            nextCard: false,
            blockedDocument: false,
            check: false,
            length: 0,
            authStore: useAuthStore()
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
                this.score++;
                this.nextCard = true;
                this.blockDocument();
                this.check = true;
                this.value = '';
                this.length--;

                setTimeout(() => {
                    this.$refs.baseCard.flipCard();
                }, 1000);
                setTimeout(() => {
                    this.$refs.baseCard.flipCard();
                }, 3000);
            } else {
                this.showError();
                this.nextCard = true;
            }
        },
        nextElement() {
            if (this.cards.length !== 0) {
                this.cards = this.cards.filter((item) => item.id !== this.currentElement.id);
                this.currentElement = this.randomElement();
            }

            this.canFlip = false;
            this.nextCard = false;
            this.check = false;
        },
        closeBasic() {
            this.displayBasic = false;
            this.$router.push('/');
        },
        blockDocument() {
            this.blockedDocument = true;

            setTimeout(() => {
                this.blockedDocument = false;
            }, 3000);
        }
    },
    async mounted() {
        this.cards = await getCards(this.authStore.user.uid);
        this.currentElement = this.randomElement();
        this.isMounted = true;
        this.length = this.cards.length;
    }
};
</script>

<style scoped></style>
