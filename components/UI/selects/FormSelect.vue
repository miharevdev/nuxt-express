<template>
    <div class="">
        <div class="relative flex flex-col justify-start" :class="[!title ? 'pt-4' : '']">
            <span class="label-text text-gray-500">{{ title }}</span>
            <div class="flex" @mouseover="showIcon = true" @mouseleave="showIcon = false">
                <input 
                    class="h-10 px-3 outline-none rounded-md text-sm text-slate-500 cursor-pointer border border-solid border-gray-300" 
                    v-model="input" 
                    :type="type"
                    :placeholder="placeholder"
                    :readonly="readonly"
                    :disabled="inactive"
                    @change="inputHandler"
                    @click="action"
                    >
                <div v-if="!inactive" @click="clearField">
                    <svg-icon v-if="input !== 'Не выбрано'" color="#64748b" class="flex absolute top-5 right-0 h-9 w-9 -mt-0.5 mr-0" />
                </div>
            </div>
                <ul v-if="isOpen && currentDic != ''" 
                    class="absolute top-14 z-10 w-full flex flex-col justify-start mt-0.5 px-3 py-2 bg-white outline-none rounded-md text-gray-500 border-solid border border-gray-300"
                    @mouseleave="isOpen = false">
                    <li v-for="(dic_item, i) in currentDic" :key="i" class="flex justify-start items-center min-h-10 text-sm hover:text-slate-700" 
                        @click="selectUnit(dic_item)">
                        {{ dic_item.name }}
                    </li>
                </ul>
            <span v-if="hasWarning" class="flex h-5 items-center text-xs text-red-600">{{ message }}</span>
        </div>
    </div>
</template>

<script>
import { loadDic } from "../../../assets/js/dictionaries.js";
import SvgIcon from "../../UI/icons/SvgIcon.vue";

    export default {
        props: {
            value: { type: String, default: "" },
            type: { type: String, default: "text" },
            title: { type: String, default: "ddd" },
            placeholder: { type: String, default: "Select" },
            hasWarning: { type: Boolean, default: false },
            message: { type: String, default: "Warning mesage" },
            dictionary: { type: [String, Array], require: true },
            withoutFilter: { type: Boolean, default: false },
            readonly: { type: Boolean, default: true },
            inactive: { type: Boolean, default: false },
        },

        components: {
            SvgIcon
        },

        data() {
            return {
                input: "Не выбрано",
                isOpen: false,
                currentDic: [],
                showIcon: false
            }
        },

        mounted() {
            if (this.value !== "") {
                this.input = this.value;
            }
            if (typeof this.dictionary == "string") {
                if (this.withoutFilter) {
                    this.currentDic = [{ id: null, name: "Не выбрано"}, ...loadDic(this.dictionary)]
                } else {
                    this.currentDic = loadDic(this.dictionary);
                }
            }
            return;
        },

        methods: {
            inputHandler() {
                this.$emit("input", this.input);
            },

            action() {
                this.isOpen = !this.isOpen;
            },

            selectUnit(unit) {
                this.isOpen = false
                this.input = unit.name;
                this.$emit("selectUnit", unit);
            },

            clearField() {
                this.input = "Не выбрано";
            }
        },
    }
</script>
