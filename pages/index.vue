<template>
  <main>
    <nuxt-child />
  </main>
</template>

<script>
export default {
  data() {
    return {}
  },

  mounted() {
    this.$router.push("/dashboard");
  },

  head() {
    // У всех страниц должны быть title и description.
    let title = "Шаблон Nuxt-Express";
    let description = "Описание контента главной страницы сайта";

    return {
      title: title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:description", property: "og:description", content: description },
      ],
    };
  },
};
</script>
