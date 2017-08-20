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
					<div class="col m6" v-for="gif in gifs">
						<GifCard :gif="gif"></GifCard>
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
				}
			}
		},
		mounted() {
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
			},
			register() {
				this.$store.dispatch('register', this.accountUser)
			}

		},
		computed: {
			quote() {
				return this.$store.state.quote
			},
			gifs() {
				return this.$store.state.gifResponses
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