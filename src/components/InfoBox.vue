<template functional>
  <section class="column info-box">
    <label class="info-box-title">
      {{ props.title }}
    </label>
    <label class="info-box-content">
      {{ props.content }}
    </label>
  </section>
</template>

<style scoped>
.info-box {
  padding: 0px 20px;
}
.info-box-title {
  color: #116193;
  font-size: 1.2rem;
  text-align: center;
}
.info-box-content {
  font-family: "Lato", sans-serif;
  color: #7f7f7f;
  font-size: 0.8rem;
  text-align: center;
}
</style>
