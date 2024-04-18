<script lang="ts">
export default {
  name: 'StartView'
}
</script>

<template>
  <main class="">
    <!-- First element -->
    <div class="text-center grid-area-1 welcome">
      <h1 class="title-text">
        Welcome to
        <strong class="font-bold underline">easy theory license</strong>
      </h1>
      <p class="text-lg mb-5">
        <strong class="font-bold">THE</strong> place to study for your provisional license
      </p>
    </div>

    <!-- Second element -->
    <div class="space-y-4 text-base grid-area-2 text-center content">
      <p>
        Are you preparing for your driving license theory exam in the Flemish part of Belgium? Look no further! Easy Theory License is THE place to be for mastering the driving license B theory. Our platform offers comprehensive lessons tailored to help you understand the ins and outs of road rules, signs, and regulations.
      </p>
      <p>
        With our user-friendly interface, you can easily follow structured lessons designed to cover all the essential topics you need to know. But that's not all! We also provide a progress tracking feature, allowing you to monitor your advancement and identify areas that may require additional focus.
      </p>
      <p>
        Join us today and embark on your journey towards obtaining your driving license with confidence!
      </p>
    </div>

    <!-- Third element -->
    <div class="text-center grid-area-3 buttons flex gap-1 justify-center max-w-80">
      <RouterLink to="/theory" class="btn btn-primary flex-grow basis-0">Start studying</RouterLink>
      <RouterLink to="/reviews" class="btn btn-primary flex-grow basis-0">See reviews</RouterLink>
    </div>
  </main>


</template>
<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 0;
  justify-items: center;
}

.welcome { grid-area: 1 / 1 / 2 / 1; }
.content { grid-area: 2 / 3 / 3 / 1; }
.buttons { grid-area: 4 / 1 / 4 / 2; }

</style>