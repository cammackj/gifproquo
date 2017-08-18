<template>
  <div id="app">

  <!--NAVBAR-->
  <nav class="navbar-primary">
    <div class="nav-wrapper light-blue accent-4">
      <a href="#" class="brand-logo center">GifProQuo</a>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li><a href="sass.html">Sign In</a></li>
        <li><a href="badges.html">Create Account</a></li>
        <li><a href="collapsible.html">LeaderBoard</a></li>
      </ul>
    </div>
  </nav>

<CardCarousel></CardCarousel>
  
  
</div>
</template>

<script>
import CardCarousel from './components/CardCarousel'

export default {
  name: 'app',
  components: {
    CardCarousel
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url("http://i.imgur.com/vAu0EVA.jpg");
  background-size: cover;
  padding-bottom: 30rem;
  height: 100%;
}

.navbar-primary {
  font-family: "Permanent Marker";
  height: 5vh;
  color: white;
}


</style>
