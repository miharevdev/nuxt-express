<template>
  <svg
    class="pt-0.5"
    xmlns="http://www.w3.org/2000/svg"
    baseProfile="tiny"
    version="1.2"
    viewBox="0 0 28 28"
    @click="click"
  >
    <path :d="iconName" :stroke="color" stroke-width="1.5" stroke-linecap="round" fill="#fff"/>
  </svg>
</template>

<script>
import { svgUnit } from "../../../assets/js/svgUnit.js";

export default {
  name: 'SvgIcon',

  props: {
    name: { type: String, require: true, default: "close-input"},
    color: { type: String, default: "#64748b" },
  },

  computed: {
    iconName() {
      return svgUnit[this.name]
    }
  },

  methods: {
    click() {
      this.$emit("clickSVG")
    }
  }
}
</script>
