<template>
	<div class="GifCard">
		<div class="card-action">
			<div>
				<div class="hoverable card glass">
					<div class="card-image">
						<img :src="gif.gifUrl">
						<span class="card-title">{{gif.totalScore}}</span>
					</div>
					<div class="card-content">
						<div class="row"><a @click="vote(-1)" class="btn-floating waves-effect waves-light left red cardbutton"><i class="material-icons">keyboard_arrow_down</i></a>
							<a @click="vote(1)" class="btn-floating waves-effect waves-light left blue cardbutton"><i class="material-icons">keyboard_arrow_up</i></a>
							<a class="btn-floating waves-effect waves-light right green cardbutton" @click="toggleComments()"><i class="material-icons">comment</i></a>
						</div>

						<div class="card black-text">
							<p v-if="showComments">I am a very simple card. I am good at containing small bits of information. I am convenient because I require little
								markup to use effectively.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'GifCard',
		props: ['gif'],
		data() {
			return {
				showComments: false,
				comments: []
			}
		},
		methods: {
			toggleComments() {
				this.showComments = !this.showComments
			},
			getComments() {
				// store.getComments(this.gif._id)
			},
			vote(voteNum) {
				this.$store.dispatch('gifVote', { gifId: this.gif._id, vote: voteNum })
			}
		},
		mounted() {
			// this.getComments().then(data => {
			//     this.comments = data
			// })
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.glass {
		background: rgba(0, 0, 0, .5);
		color: white;
	}
</style>