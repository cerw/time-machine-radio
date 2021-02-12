<template>
  <ul class="nav nav-tabs nav-fill p-0">
    <li class="nav-item">
      <router-link
        :to="{ name: 'Home' }"
        class="nav-link"
        :class="{active: $route.name == 'Home'}"
      >
        <i class="bi bi-house-door" />
        Home
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        :to="{ name: 'Archive' }"
        class="nav-link"
        :class="{active: $route.name == 'Archive'}"
      >
        <i class="bi bi-file-earmark-zip" />
        Archive
      </router-link>
    </li>

    <!-- <li class="nav-item">
      <router-link
        :to="{ name: 'People' }"
        class="nav-link"
        :class="{active: $route.name == 'People'}"
      >
        People
      </router-link>
    </li> -->
    <li class="nav-item">
      <router-link
        :to="{ name: 'Latest' }"
        class="nav-link"
        :class="{active: $route.name == 'Latest'}"
      >
        <i class="bi bi-broadcast" />

        Live
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        :to="{ name: 'Grid' }"
        class="nav-link"
        :class="{active: $route.name == 'Grid'}"
      >
        <i class="bi bi-soundwave" />
        Grid
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Navigation'
}
</script>

<style>

</style>
