<template>
  <div class="container">
    <div class="content__main">
      <div
        class="contract__result"
        :class="result"
      >
        <p class="contract__result-title">{{ elemsText.title }}</p>
        <p class="contract__result-subitle">{{ elemsText.subtitle }}</p>
        <p class="contract__result-thx">Спасибо</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['result'],
  methods: {
    sideClose() {
      this.$store.dispatch('setSideState', false);
    },
  },
  computed: {
    sideFlag() {
      return this.$store.getters.sideOpen;
    },
    elemsText() {
      let title = 'Платеж проведён!';
      let subtitle = 'Деньги поступят в ближайшее время.';

      if (this.result === 'fail') {
        title = 'Платеж НЕ проведён!';
        subtitle = 'Повторите попытку через некоторое время.';
      }

      return { title, subtitle };
    },
  },
};
</script>
