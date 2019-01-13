<template>
  <body class="movie-details">
    <header
      class="header"
      @click="$router.push({name: 'list'})"
    >
      <label>Movies</label>
    </header>
    <main class="movie-details-content">
      <header>
        <label class="title">
          {{ movie.title }}
        </label>
        <label class="release-date">
          {{ formatedDate }}
        </label>
      </header>
      <div class="row">
        <section class="column movie-content">
          <label class="title-with-border">
            Sinopse
          </label>
          <label class="overview">
            {{ movie.overview }}
          </label>
          <label class="title-with-border">
            Informações
          </label>
          <div class="row info-boxes">
            <info-box
              title="Situação"
              :content="getStatus(movie.status)"
            />
            <info-box
              title="Idioma"
              :content="movie.original_language"
            />
            <info-box
              title="Duração"
              :content="runTime(movie.runtime)"
            />
            <info-box
              title="Orçamento"
              :content="formatedCurrency(movie.budget)"
            />
            <info-box
              title="Receita"
              :content="formatedCurrency(movie.revenue)"
            />
            <info-box
              title="Lucro"
              :content="formatedCurrency(movie.revenue - movie.budget)"
            />
          </div>
          <div class="row genres">
            <div
              v-for="genre in movie.genres"
              :key="genre.id"
              class="genre"
            >
              <label>
                {{ genre.name }}
              </label>
            </div>
          </div>
        </section>
        <div class="average">
          <div class="average-border">
            <label>
              {{ movie.vote_average * 10 }}%
            </label>
          </div>
        </div>
        <img
          :alt="movie.title"
          :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path"
        >
      </div>
      <iframe
        v-if="video && video.site === 'YouTube'"
        :title="movie.title"
        width="98%"
        height="500"
        :src="'https://www.youtube.com/embed/' + video.key +'?controls=0'"
      />
    </main>
  </body>
</template>

<script>
import moment from 'moment'
import InfoBox from './InfoBox'
import { getMovie, getVideos } from '../api'
import { currency } from '../helpers'

export default {
  components: {
    'info-box': InfoBox
  },
  data () {
    return {
      movie: {},
      video: null
    }
  },
  computed: {
    formatedDate () {
      return moment(this.movie.release_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    }
  },
  created () {
    getMovie(this.$route.params.id).then((res) => { this.movie = res })
    getVideos(this.$route.params.id).then((res) => { this.video = res.results[0] })
  },
  methods: {
    formatedCurrency (value) {
      return currency(value)
    },
    runTime (value) {
      return moment(value, 'm').format('h[h]m[mim]')
    },
    getStatus (status) {
      switch (status) {
        case 'Released':
          return 'Lançado'
        case 'Rumored':
          return 'Rumores'
        case 'Planned':
          return 'Planejado'
        case 'In Production':
          return 'Em produção'
        case 'Post Production':
          return 'Pós produção'
        case 'Canceled':
          return 'Cancelado'
        default:
          return status
      }
    }
  }
}
</script>
<style scoped lang="css">
.movie-details .header {
  text-align: center;
  cursor: pointer;
  background-color: #116193;
  width: 100%;
  padding: 6px 0;
}
.movie-details .header label {
  color: #01dcdc;
  font-size: 1.6rem;
  cursor: pointer;
}

.info-boxes {
  padding: 20px 20px;
}

.movie-details-content {
  margin-top: 30px;
  background-color: #f2f2f2;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.movie-details-content header {
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #e6e6e6;
  padding: 20px 0px;
}

.movie-details-content .title {
  font-weight: 500;
  color: #116193;
  font-size: 1.4rem;
  padding-left: 40px;
}

.movie-details-content .overview {
  font-family: "Lato", sans-serif;
  color: #7f7f7f;
  font-size: 1rem;
  overflow: hidden;
  padding: 0px 40px;
}

.movie-details-content .title-with-border {
  font-weight: 500;
  margin: 20px 40px;
  padding-bottom: 5px;
  border-bottom: 2px solid #01dcdc;
  color: #116193;
  font-size: 1.2rem;
}

.movie-details-content .release-date {
  padding-left: 70px;
  color: #868686;
  font-size: 0.8rem;
  padding-right: 40px;
}

.movie-details .average {
  background-color: #116193;
  padding: 2px;
  bottom: 580px;
  left: 60%;
  position: absolute;
  width: 66px;
  height: 66px;
  border-radius: 100%;
}

.movie-details .average-border {
  background-color: #116193;
  border: 3px solid #01dcdc;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 100%;
}

.movie-details .average label {
  color: #01dcdc;
  font-size: 1.4rem;
}
.movie-content {
  min-width: 70%;
  width: 70%;
}

.movie-details img {
  width: 30%;
  object-fit: contain;
}

.genres {
  padding: 20px 40px;
}

.genre {
  border-radius: 20px;
  border: 1px solid #116193;
  padding: 5px 10px;
  margin-right: 5px;
}

.genre label {
  color: #116193;
  font-size: 0.8rem;
  font-weight: 500;
}

iframe {
  margin-bottom: 60px;
}
</style>
