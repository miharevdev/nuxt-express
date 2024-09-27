<template>
  <div class="app">
    <div v-if="!auth && isLoaded" class="flex justify-center items-center h-full w-full">
      <auth-form @setAuthState="setAuthState" />
    </div>
    <main-sidebar v-if="auth" />
    <div v-if="auth" class="flex flex-col h-full">
      <main-header @logout="logout" :user="user" />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import MainHeader from "~/components/MainHeader.vue";
import MainSidebar from "~/components/sidebars/MainSidebar.vue";
import AuthForm from "~/components/forms/AuthForm.vue";
import { network } from "~/assets/js/helpers/network";
import { moduleKeys } from "../assets/js/helpers/check_ac/moduleKeys.js"

export default {
  components: {
    MainHeader,
    MainSidebar,
    AuthForm
  },

  data() {
    return {
      isLoaded: true,
      user: [],
      auth: false
    }
  },

  head() {
    return {
      // Установка rel="canonical" на всех страницах шаблона.
      link: [{ rel: "canonical", href: `${process.env.baseUrl}${this.$route.path}` }],

      // Пример установки общих мета-тегов на страницах.
      meta: [{ hid: "og:url", property: "og:url", content: `${process.env.baseUrl}${this.$route.path}` }],
    };
  },

  mounted() {
    this.setAuthState();
  },

  methods: {
    setAuthState() {
      this.isLoaded = false;
      network.user()
      .then((res) => {
        res.data.user.modules.forEach(module => {
          moduleKeys.push(module.key)
        });
        this.user = res.data.user;
        this.auth = true;
      })
      .catch(() => {
        this.auth = false;
        this.isLoaded = true;
      })
    },

    logout() {
      this.setAuthState();
      this.isLoaded = true;
    }
  }
};
</script>
