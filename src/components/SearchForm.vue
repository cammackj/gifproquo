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
                            <a @click="minimizeResults()"><i class="material-icons">list</i></a>
                        </div>

                        <div class="row">
                            <div v-if="minimize" v-for="res in results">
                                <div class="col md2">

                                    <img class="hoverable image-result" :src="res.images.original.url">

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div class="bottom-fixed card hoverable glass col m3 offset-m9">
                <div class="row">

                    <form>
                        <div class="input-field">
                            <div class="col md12"><input type="text" ></div>
                                <div class="col md2"><button type="submit" class="btn">Submit</button></div>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import { store } from '../store'
    export default {
        name: 'SearchForm',
        data() {
            return {
                results: [],
                query: '',
                submissions: store.state.submissions,
                minimize: false
            }
        },
        methods: {
            search() {
                store.search(this.query)
                    .then(res => {
                        this.results = res.data
                    })
            }, minimizeResults() {
                this.minimize = !this.minimize
            }
        },
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
</style>