<template>
  <section class="newsletter">
    <h2>Newsletter</h2>
    <form>
      <input type="email" placeholder="Your email" />
      <button type="submit">Subscribe</button>
    </form>
  </section>
</template>

<script setup lang="ts">
// Newsletter logic here
</script>

<style scoped>
.newsletter {
  margin: 2rem 0;
}
.newsletter form {
  display: flex;
  gap: 0.5rem;
}
</style>
