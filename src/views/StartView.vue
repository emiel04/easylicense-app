<template>
  <main class="">
    <!-- First element -->
    <div class="text-center grid-area-1 welcome">
      <h1 class="title-text">
        {{ $t("start-title") }}
        <strong class="font-bold underline">easy theory license</strong>
      </h1>
      <p class="text-lg mb-5">
        <strong class="font-bold">{{ $t("start-subtitle-bold") }}</strong> {{ $t("start-subtitle") }}
      </p>
    </div>

    <!-- Second element -->
    <div class="space-y-4 text-base grid-area-2 text-center content">
      <p>
        {{ $t("start-p1") }}
      </p>
      <p>
        {{ $t("start-p2") }}
      </p>
      <p>
        {{ $t("start-p3") }}
      </p>
    </div>

    <!-- Third element -->
    <div class="text-center grid-area-3 buttons flex gap-1 justify-center max-w-80">
      <RouterLink to="/theory" class="btn btn-primary flex-grow basis-0">{{ $t("start-start-studying") }}</RouterLink>
      <RouterLink to="/reviews" class="btn btn-primary flex-grow basis-0">{{ $t("start-see-reviews") }}</RouterLink>
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

<script lang="ts">
import type {User} from "@/modules/core/types/user";

export default {
  name: 'StartView',
  data() {
    return {
      user: null as User | null
    }
  },
  created() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      if (this.user?.admin) {
        this.$router.push('theory');
      }
    }else{
      this.$router.push('/login');
    }
  },
}
</script>