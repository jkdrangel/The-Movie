<template>
  <body class="list">
    <header class="header">
      <label>Movies</label>
    </header>
    <main class="content">
      <div class="input-box">
        <input
          v-model="query"
          placeholder="Busque um filme pelo nome, ano ou gênero..."
          @change="(evt)=>querySearch(evt.target.value)"
        >
      </div>
      <div
        v-for="movie in movies"
        :key="movie.id"
      >
        <movie-card :movie="movie" />
      </div>
      <div class="row movies-pages">
        <div
          v-for="page in generatePages()"
          :key="page"
        >
          <div
            :class="page === atual_page? 'page-indicator-active': 'page-indicator'"
            @click="changePage(page)"
          >
            <div :class="page === atual_page? 'page-indicator-active-border': ''">
              <label>
                {{ page }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
</template>

<script>
import { searchMovie } from '../api'
import MovieCard from './MovieCard'

export default {
  components: {
    'movie-card': MovieCard
  },
  data () {
    return {
      query: '',
      movies: [],
      total_pages: 1,
      atual_page: 1
    }
  },
  mounted () {
    searchMovie().then((res) => { this.movies = res.results })
  },
  methods: {
    querySearch (term) {
      if (term !== '') {
        searchMovie(term).then((res) => { this.movies = res.results; this.total_pages = res.total_pages })
      } else {
        searchMovie().then((res) => { this.movies = res.results })
      }
    },
    changePage (page) {
      this.atual_page = page
      searchMovie(this.query, page).then((res) => { this.movies = res.results; this.total_pages = res.total_pages })
    },
    generatePages () {
      return [this.atual_page - 2, this.atual_page - 1, this.atual_page, this.atual_page + 1, this.atual_page + 2].filter(a => a > 0 && a <= this.total_pages)
    }
  }
}
</script>
<style scoped lang="css">
.movies-pages {
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-indicator {
  margin: 0px 10px;
  color: #116193;
  font-size: 1.2rem;
}

.page-indicator-active {
  margin: 0px 10px;
  background-color: #116193;
  padding: 2px;
  width: 46px;
  height: 46px;
  border-radius: 100%;
}

.page-indicator-active-border {
  background-color: #116193;
  border: 3px solid #01dcdc;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.page-indicator-active label {
  color: #01dcdc;
  font-size: 1.2rem;
}

.header {
  background-color: #116193;
  width: 100%;
  padding: 10px 0;
  text-align: center;
}
.header label {
  color: #01dcdc;
  font-size: 2rem;
}
.list .content {
  margin: auto;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.content .input-box {
  margin: 40px 0;
  border-radius: 30px;
  padding: 10px 30px;
  background-color: #ebebeb;
}
.input-box input {
  background-color: #ebebeb;
  color: #01dcdc;
  width: 100%;
  border-width: 0;
  border-style: none;
  border-color: unset;
  border-image: unset;
}
</style>
