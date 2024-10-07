<template>
    <div class="flex flex-col justify-start" :class="[!title ? 'pt-4' : '']">
        <span class="label-text text-gray-500">{{ title }}</span>
        <div class="flex flex-nowrap">
            <input 
                class="h-10 px-3 outline-none text-gray-500 border-solid border border-gray-300"
                :class="[hasButton ? 'rounded-l-md mr-px' : 'rounded-md']"
                v-model="input"
                :disabled="inactive"
                :type="type" 
                :placeholder="placeholder" 
                @change="inputHandler">
            <button v-if="hasButton" class="h-10 px-2 bg-white rounded-r-md hover:bg-slate-100 hover:text-slate-500" type="button">
                Найти
            </button>
        </div>
        <span v-if="hasWarning" class="flex h-5 items-center text-xs text-red-600">{{ message }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            value: { type: String, default: "" },
            type: { type: String, default: "text" },
            title: { type: String, default: "" },
            placeholder: { type: String, default: "" },
            hasWarning: { type: Boolean, default: false },
            hasButton: { type: Boolean, default: false },
            message: { type: String, default: "Warning mesage" },
            inactive: { type: Boolean, default: false }
        },

        data() {
            return {
                input: ""
            }
        },

        watch: {
            value: {
                handler(val) {
                    this.input = val;
                }
            }
        },

        mounted() {
            if (this.value !== "") {
                this.input = this.value;
            }
        },

        methods: {
            inputHandler() {
                this.$emit("input", this.input);
            }
        },
    }
</script>