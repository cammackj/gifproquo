<template>
  <div class="QuoteCard">

    
    <div class="row">
      <div class="col m12 offset-m7 quote-column">
        <div class="hoverable card glass quote-card">
          <div class="card-content">
            <blockquote class="card-title quote">"{{quote}}" - unknown </blockquote>

          </div>
        </div>
      </div>
    </div>
  </div>


  </div>
</template>

<script>
  export default {
    name: 'QuoteCard',
    props: ['quote'],
    data() {
      return {
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .quote {
    font-family: "Permanent Marker";
  }

  .glass {
    background: rgba(0, 0, 0, .5);
    color: white;
  }
  .quote-column {
    position: center;
  }
</style>