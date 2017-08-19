<template>
	<div class="SearchForm">

		<div class="row">
			<div class="bottom-fixed col m9">
				<div class="hoverable card glass">
					<div class="card-content">
						<div class="col m11">
							<form @submit.prevent="search()">
								<div class="col md12"><input type="text" v-model="query"></div>
								<div class="col md2"><button type="submit" class="btn">search</button></div>
							</form>
						</div>
						<div class="col m1">
							<a @click="minimizeResults()"><i v-show="results.length > 0" class="material-icons action muted">{{minimize? "arrow_drop_down": "arrow_drop_up"}}</i></a>
						</div>

						<div class="row">
							<div v-if="minimize" v-for="item in results">
								<div @click="addGifResponse(item)" class="col md2">

									<img class="hoverable image-result" :src="item.images ? item.images.original.url : '//placehold.it/200x200'">

								</div>
							</div>


						</div>
					</div>
				</div>
			</div>

			<div class="bottom-fixed card hoverable glass col m3 offset-m9">
				<div class="row">

					<form @submit.prevent="createQuote()">
						<div class="input-field">
							<div class="col md12"><input type="text" v-model="quoteContent"></div>
							<div class="col md2"><button type="submit" class="btn">Submit</button></div>
						</div>
					</form>

				</div>

			</div>
		</div>
	</div>

</template>

<script>
	// import { store } from '../store'
	import app from '../App'

	export default {
		name: 'SearchForm',
		props: ['quoteId'],
		data() {
			return {
				query: '',
				// submissions: store.state.submissions,
				minimize: false,
				quoteContent: ''
			}
		},
		methods: {
			search() {
				this.minimize = true;
				this.$store.dispatch('search', this.query)
			},
			minimizeResults() {
				this.minimize = !this.minimize
			},
			createQuote() {
				this.$store.dispatch('createQuote', this.quoteContent);
			},
			addGifResponse(gif) {
				this.$store.dispatch('addGifResponse', {
					gif,
					quoteId: this.quoteId
				})
			}
		},
		computed: {
			results() {
				return this.$store.state.results;
			}
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.bottom-fixed {
		position: fixed;
		bottom: 0;
	}

	.image-result {
		height: 10vh;
		width: 10vw;
		margin-left: .75vw;
		margin-right: .75vw;
	}

	.glass {
		background: rgba(0, 0, 0, .5);
		color: white;
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