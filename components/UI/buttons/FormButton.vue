<template>
    <div class="">
        <button 
            class="h-10 px-3 outline-none text-gray-500 border-solid border rounded-md border-gray-300 hover:border-gray-400 bg-white cursor-pointer"
            :type="type"
            @click="handler">
            {{ title }}
        </button>
    </div>
</template>

<script>
    export default {
        props: {
            type: { type: String, default: "button" },
            title: { type: String, default: "" }
        },

        methods: {
            handler() {
                this.$emit("handler")
            }
        }
    }
</script>