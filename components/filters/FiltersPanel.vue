<template>
    <div class="flex justify-start items-center flex-wrap min-h-20 h-20 w-full p-5 pt-6 sm:pt-2 gap-2 sm:gap-4 bg-slate-50 text-gray-300" :class="[rounded ? 'rounded-md' : '']">
        <form-button 
            v-for="button in buttonUnits" 
            :key="button.key" 
            class="pt-4 text-sm" 
            :title="button.cap" 
            @handler="handler(button.key)" />

        <form-input 
            v-for="input in inputUnits"
            :query="input.query"
            :key="input.cap"
            :hasButton="input.hasButton"
            :title="input.cap" />

        <form-select 
            v-for="select in selectUnits"
            class=""
            :query="select.query"
            :withoutFilter="select.withoutFilter"
            :dictionary="select.dic"
            :key="select.cap" 
            :title="select.cap" />
    </div>
</template>

<script>
import FormInput from "/components/UI/inputs/FormInput.vue";
import FormSelect from "/components/UI/selects/FormSelect.vue";
import FormButton from "../UI/buttons/FormButton.vue";

    export default {
        props: {
            filters: { type: Array, default: () => { return [] } },
            hasButton: { type: Boolean, default: false },
            rounded: { type: Boolean, default: false },
        },

        components: {
            FormInput,
            FormSelect,
            FormButton
        },

        data() {
            return {
                inputUnits: [],
                selectUnits: [],
                buttonUnits: []
            }
        },

        mounted() {
            this.checkFilters()
        },

        methods: {
            checkFilters() {
                this.filters.forEach(f => {
                    if (f.type === "input") {
                        this.inputUnits.push(f);
                    } else if (f.type === "select") {
                        this.selectUnits.push(f);
                    } else if (f.type === "button") {
                        this.buttonUnits.push(f);
                    }
                });
            },

            handler(button_key) {
                this.$emit("action", button_key)
            }
        }
    }
</script>