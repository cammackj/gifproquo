<template>
    <div class="SearchForm">
        <div class="row">
            <div class="bottom-fixed col s9">
                <div class="hoverable card glass">
                    <div class="card-content row">
                        <div class="col m11">
                            <form @submit.prevent="search()">
                                <div class="col md12"><input type="text" v-model="query"></div>
                                <div class="col md2"><button type="submit" class="btn">search</button></div>
                            </form>
                        </div>

                        <div class="col m1">
                            <a @click="minimizeResults()"><i v-show="results.length > 0" class="material-icons action muted">{{minimize? "arrow_drop_up" : "arrow_drop_down"}}</i></a>
                        </div>

                        <div class="col m12 row">
                            <div v-show="!minimize" v-for="item in results">
                                <div @click="addGifResponse(item)" class="col s2 muted action">
                                    <img class="hoverable image-result" :src="item.images ? item.images.original.url : '//placehold.it/200x200'">
                                </div>
                            </div>
                            <div v-show="!minimize">
                                <i @click="prevSearchPage()" class="material-icons action muted">remove_circle_outline</i>
                                <i @click="nextSearchPage()" class="material-icons action muted">add_circle_outline</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bottom-fixed col s3 offset-s9">
                <div class="card hoverable glass">
                    <div class="row">
                        <form @submit.prevent="createQuote()">
                            <div class="input-field">
                                <div class="col md12"><input type="text" maxlength="140" v-model="quoteContent"></div>
                                <div class="col md2"><button type="submit" class="btn">Submit</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import app from '../App'

    export default {
        name: 'SearchForm',
        props: ['quoteId'],
        data() {
            return {
                query: '',
                minimize: true,
                quoteContent: '',
                searchOffset: 0,
                lastQuery: ''
            }
        },
        methods: {
            search() {
                this.minimize = false;
                this.searchOffset = 0;
                this.lastQuery = this.query;
                this.$store.dispatch('search', { query: this.query, offset: this.searchOffset })
            },
            nextSearchPage() {
                this.searchOffset += 24;
                this.$store.dispatch('search', { query: this.query, offset: this.searchOffset })
            },
            prevSearchPage() {
                this.searchOffset = Math.max(0, this.searchOffset - 24);
                this.$store.dispatch('search', { query: this.query, offset: this.searchOffset })
            },
            minimizeResults() {
                this.minimize = !this.minimize
            },
            createQuote() {
                if (this.quoteContent.length > 10)
                    this.$store.dispatch('createQuote', this.quoteContent);
                else
                    alert("Quote must be at least 10 characters")
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
        z-index: 100;
    }

    .image-result {
        height: 10vh;
        width: 10vw;
        margin-left: .75vw;
        margin-right: .75vw;
    }
</style>