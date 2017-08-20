<template>
	<div id="app">

		<!--NAVBAR-->
		<nav class="navbar-primary fixed">
			<div class="nav-wrapper light-blue accent-4">
				<a href="#" class="brand-logo right">GifProQuo</a>
				<ul id="nav-mobile" class="left">
					<li v-if="loggedIn"><a>{{username}}</a></li>
					<li v-if="!loggedIn"><a @click="showLogIn()">Sign In</a></li>
					<li v-if="!loggedIn"><a @click="showRegister()">Create Account</a></li>
					<li v-if="loggedIn"><a @click="logOut()">Log Out</a></li>
					<li><a>LeaderBoard</a></li>
					<li>
						<div v-if="viewLogIn" class="row">
							<div class="col m6 light-blue accent-4 login-box">
								<form @submit.prevent="login()">
									<input type="text" placeholder="username" v-model="accountUser.username">
									<input type="text" placeholder="password" v-model="accountUser.password">
									<button type="submit" class="btn">log in</button>
								</form>
							</div>
						</div>
						<div v-if="viewRegister" class="row">
							<div class="col m6 light-blue accent-4 login-box">
								<form @submit.prevent="register()">
									<input type="text" placeholder="username" v-model="accountUser.username">
									<input type="text" placeholder="email" v-model="accountUser.email">
									<input type="text" placeholder="password" v-model="accountUser.password">
									<button type="submit" class="btn">register</button>
								</form>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</nav>

		<QuoteCard :quote="quote.content" class="fixed quote-card"></QuoteCard>

		<div class="row">
			<div class="col m2 paginate-button">
				<i @click="getPrevQuote(quote._id)" class="material-icons white-text fixed action muted" style="font-size: 6vw">remove_circle_outline</i>
			</div>
			<div class="col m8 gif-card">
				<div class="row">
					<div v-for="(gif, index) in gifs">
						<GifCard class="col s12 m6 l4" :gif="gif"></GifCard>
						<div v-if="(index + 1) % 2 == 0" class="clearfix hide-on-large-only hide-on-small-only"></div>
						<div v-if="(index + 1) % 3 == 0" class="clearfix hide-on-med-and-down"></div>
					</div>
				</div>
			</div>
			<div class="col m2 paginate-button">
				<i @click="getNextQuote(quote._id)" class="material-icons white-text fixed action muted" style="font-size: 6vw">add_circle_outline</i>
			</div>
		</div>

		<SearchForm :quoteId="quote._id"></SearchForm>
	</div>
</template>

<script>
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
				viewLogIn: false,
				viewRegister: false,
				quoteIndex: 0,
				accountUser: {
					username: '',
					email: '',
					password: ''
				},
			}
		},
		mounted() {
			this.checkForUser()
			this.getQuote()
		},
		methods: {
			showLogIn() {
				this.viewLogIn = !this.viewLogIn
				this.viewRegister = false
			},
			showRegister() {
				this.viewRegister = !this.viewRegister
				this.viewLogIn = false
			},
			getQuote() {
				this.$store.dispatch('getQuote', this.getGifs)
			},
			getGifs(quoteId) {
				this.$store.dispatch('getGifs', quoteId)
			},
			getNextQuote(quoteId) {
				this.$store.dispatch('getNextQuote', quoteId)
			},
			getPrevQuote(quoteId) {
				this.$store.dispatch('getPrevQuote', quoteId)
			},
			login() {
				this.$store.dispatch('login', this.accountUser)
				this.viewLogIn = false;
			},
			register() {
				this.$store.dispatch('register', this.accountUser)
				this.viewRegister = false;
			},
			checkForUser() {
				this.$store.dispatch('checkForUser')
			},
			logOut() {
				this.$store.dispatch('logOut')
			}
		},
		computed: {
			quote() {
				return this.$store.state.quote
			},
			gifs() {
				return this.$store.state.gifResponses
			},
			loggedIn() {
				return this.$store.state.loggedIn
			},
			username() {
				return this.$store.state.username
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
		width: 100%;
	}

	.gif-card {
		margin-top: 25vh;
	}

	.paginate-button {
		margin-top: 30vh;
	}

	.bottom-fixed {
		z-index: 100;
	}

	.action {
		cursor: pointer;
	}

	.muted {
		opacity: 0.8;
	}

	.muted:hover {
		opacity: 1;
	}
</style>