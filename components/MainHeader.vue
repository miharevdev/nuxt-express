<template>
  <header class="flex justify-between items-center w-full px-6 text-slate-600">
    <div class="flex justify-end items-center h-full w-full">
      <span class="flex justify-end items-center h-full px-4 mb-0.5 text-sm">{{ user.email }}</span>
    </div>
    <div class="flex justify-center items-center min-h-5 min-w-5 h-6 w-6">
      
      <svg-icon  class="flex justify-center items-center" name="exit" @clickSVG="clickSVG" />
    </div>
  </header>
</template>

<script>
import SvgIcon from "./UI/icons/SvgIcon.vue";
import { network } from "~/assets/js/helpers/network";

  export default {
    props: {
      user: { type: Object, default: () => { return {} } }
    },

    components: {
      SvgIcon
    },
    
    methods: {
      clickSVG() {
        network.logout()
        .then(() => {
          this.$emit("logout")
        })
        .catch(() => {
          this.$emit("logout")
        })
      }
    }
  }
</script>