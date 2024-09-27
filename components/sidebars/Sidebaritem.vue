<template>
    <div class="flex justify-center md:justify-start items-center h-10 w-full pt-0" @click="handler(item)">
        <div class="flex justify-center items-center min-h-5 min-w-5 mr-2 ml-2 md:ml-0">
            <svg-icon :color="color" class="flex justify-center items-center" :name="item.icon" @clickSVG="clickSVG" />
        </div>
        <nuxt-link 
            exact-active-class="active" 
            class="hidden md:flex items-center text-xs text-gray-500 font-medium h-full w-full" 
            :to="item.path">
            {{ item.cap }}
        </nuxt-link>
    </div>
</template>

<script>
import SvgIcon from "../UI/icons/SvgIcon.vue";

    export default {
        props: {
            item: { type: Object, default: () => { return {} } },
            color: { type: String, default: "#64748b" },
        },

        data() {
            return {
                tooltip: false
            }
        },

        components: {
            SvgIcon
        },

        methods: {
            handler() {
                this.$emit("itemHandler", this.item);
            },

            clickSVG() {
                this.$router.push(this.item.path)
            }
        }
    }
</script>

<style lang="css" scoped>
.active {
    color: #334155;
}
</style>