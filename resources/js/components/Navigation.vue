<template>
  <ul class="nav nav-tabs nav-fill">
    <li class="nav-item">
      <router-link
        :to="{ name: 'Home' }"
        class="nav-link"
        :class="{active: $route.name == 'Home'}"
      >
        Home
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        :to="{ name: 'Archive' }"
        class="nav-link"
        :class="{active: $route.name == 'Archive'}"
      >
        Archive
      </router-link>
    </li>

    <li class="nav-item">
      <router-link
        :to="{ name: 'People' }"
        class="nav-link"
        :class="{active: $route.name == 'People'}"
      >
        People
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        :to="{ name: 'Latest' }"
        class="nav-link"
        :class="{active: $route.name == 'Latest'}"
      >
        Live
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        :to="{ name: 'Grid' }"
        class="nav-link"
        :class="{active: $route.name == 'Grid'}"
      >
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
