<template>
  <div id="app">

    <!--NAVBAR-->
    <nav class="navbar-primary fixed">
      <div class="nav-wrapper light-blue accent-4">
        <a href="#" class="brand-logo right">GifProQuo</a>
        <ul id="nav-mobile" class="left">
          <li><a @click="showLogIn()">Sign In</a></li>
          <li><a @click="showRegister()">Create Account</a></li>
          <li><a>LeaderBoard</a></li>
          <li>
            <div v-if="logIn" class="row">
              <div class="col m6 light-blue accent-4 login-box">
                <form @submit.prevent="search()">
                  <input type="text" placeholder="username" v-model="query">
                  <input type="text" placeholder="password" v-model="query">
                  <button type="submit" class="btn">log in</button>
                </form>
              </div>
            </div>
            <div v-if="register" class="row">
              <div class="col m6 light-blue accent-4 login-box">
                <form @submit.prevent="search()">
                  <input type="text" placeholder="username" v-model="query">
                  <input type="text" placeholder="email" v-model="query">
                  <input type="text" placeholder="password" v-model="query">
                  <button type="submit" class="btn">register</button>
                </form>
              </div>
            </div>
          </li>


        </ul>

      </div>
    </nav>

    <QuoteCard :quote="quotes[quoteIndex].content" class="fixed quote-card"></QuoteCard>
    <div class="row">


      <div class="col m2 paginate-button">
        <i @click="changeQuote(-1)" class="material-icons white-text fixed" style="font-size: 6vw">remove_circle_outline</i>
      </div>
      <div class="col m8 gif-card" v-for="{gif,index} in gifs">
        <GifCard :gif = "gifs[index]"></GifCard>
      </div>
      <div class="col m2 paginate-button">
        <i @click="changeQuote(1)" class="material-icons white-text fixed" style="font-size: 6vw">add_circle_outline</i>
      </div>


    </div>


    <SearchForm></SearchForm>


  </div>
</template>

<script>
  import { store } from './store'
  import QuoteCard from './components/QuoteCard'
  import GifCard from './components/GifCard'
  import SearchForm from './components/SearchForm'

  export default {
    name: 'app',
    components: {
      QuoteCard,
      GifCard,
      SearchForm,
    },
    data() {
      return {
        logIn: false,
        register: false,
        quotes: store.state.quotes,
        gifs: store.state.gifs,
        quoteIndex: 0
      }
    },
    mounted() {
      this.getQuote()
    },
    methods: {
      showLogIn() {
        this.logIn = !this.logIn
        this.register = false
      },
      showRegister() {
        this.register = !this.register
        this.logIn = false
      },
      getQuote() {
        store.getQuote(this.getGifs)
      },
      getGifs() {
        store.getGifs(this.quoteIndex)
      },
      changeQuote(num) {
        if (this.quoteIndex + num >= 0) {
          this.quoteIndex += num
        }
        getGifs()
      }
    }
  }

</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: url("http://i.imgur.com/vAu0EVA.jpg") center center fixed;
    background-size: cover;
    padding-bottom: 50rem;
    height: 100%;
  }

  .navbar-primary {
    font-family: "Permanent Marker";
    height: 5vh;
    color: white;
    z-index: 99;
  }

  .fixed {
    position: fixed;
  }

  .quote-card {
    margin-top: 8vh;
    z-index: 95;
  }

  .gif-card {
    margin-top: 25vh;
  }

  .paginate-button {
    margin-top: 30vh;
  }

  .login-reg-box {
    z-index: 100;
  }
</style>