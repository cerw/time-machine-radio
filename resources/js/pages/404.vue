<template>
  <div id="lostPanel">
    <div class="text-center">
      <h1>You are lost.</h1>
      <h4>This page doesn't exist.</h4>
      <router-link to="/">
        Take me home.
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NotFound'
}
</script>

<style>
    #lostPanel {
        position: fixed;
        width: 20%; /* Set your desired with */
        z-index: 2; /* Make sure its above other items. */
        top: 50%;
        left: 50%;
        margin-top: -10%; /* Changes with height. */
        margin-left: -10%; /* Your width divided by 2. */

        /* You will not need the below, its only for styling   purposes. */
        padding: 0px;
        border-radius: 5px;
        text-align: center;
    }
</style>
