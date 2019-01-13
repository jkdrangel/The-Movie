<template>
  <div
    class="movie-card"
    @click="$router.push({name: 'movie', params: { id: movie.id }})"
  >
    <img
      :alt="movie.title"
      :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path"
    >
    <section class="movie-card-content">
      <div class="average">
        <div class="average-border">
          <label>
            {{ movie.vote_average * 10 }}%
          </label>
        </div>
      </div>
      <label class="title">
        {{ movie.title }}
      </label>
      <label class="release-date">
        {{ formatedDate }}
      </label>
      <label class="overview">
        {{ movie.overview }}
      </label>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    formatedDate () {
      return moment(this.movie.release_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    }
  }
}

</script>

<style scoped>
.movie-card {
  position: relative;
  display: flex;
  flex-direction: row;
  flex: 1;
  max-height: 270px;
  margin-bottom: 40px;
}

.movie-card label {
  text-align: left;
}

.movie-card img {
  width: 180px;
  max-height: 270px;
  object-fit: contain;
}

.movie-card .average {
  background-color: #116193;
  padding: 2px;
  top: 15px;
  left: 190px;
  position: absolute;
  width: 46px;
  height: 46px;
  border-radius: 100%;
}

.average-border {
  background-color: #116193;
  border: 3px solid #01dcdc;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.movie-card .average label {
  color: #01dcdc;
  font-size: 1.1rem;
}

.movie-card-content {
  background-color: #ebebeb;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.movie-card .title {
  background-color: #116193;
  font-weight: 500;
  padding: 10px 0 2px 70px;
  color: #01dcdc;
  font-size: 1.6rem;
}

.movie-card .release-date {
  font-family: "Lato", sans-serif;
  padding-left: 70px;
  padding-top: 6px;
  color: #868686;
  font-size: 0.9rem;
}

.movie-card .overview {
  font-family: "Lato", sans-serif;
  color: #7f7f7f;
  padding-top: 16px;
  padding-left: 15px;
  padding-right: 15px;
  font-weight: bold;
  font-size: 0.75rem;
  overflow: hidden;
}
</style>
