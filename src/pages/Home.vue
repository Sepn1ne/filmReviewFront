<template>
  <a>
    <Header></Header>
    <el-row>
      <el-col :span="14" :offset="5" class="background-card">
        <el-row :gutter="20" style="margin-top: 10px">
          <el-col v-for="(movie, index) in movieList" :key="index" :span="6"
            ><div
              class="grid-content"
              @click="getDetail(movie.id)"
              style="margin-top: 15px"
            >
              <div>
                <img :src="movie.cover" /> <br />
                <div>{{ movie.filmName }}</div>
                <div>{{ movie.score }}</div>
              </div>
            </div></el-col
          >
        </el-row>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="this.currentPage"
          :page-count="this.pageCount"
          @current-change="handleCurrentChange"
          style="margin-top: 10px"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <Down></Down>
  </a>
</template>

<script>
import Down from '@/components/Down.vue'
import Header from '../components/Header.vue'

export default {
  components: {
    Header,
    Down,
  },
  data() {
    return {
      currentPage: 1, //当前页数
      pageCount: 1, //总页数
      movieList: [], // 从后端获取的电影数据
    }
  },
  mounted() {
    // 在组件加载时获取电影数据
    this.fetchMovies()
    console.log(this.movieList)
  },
  methods: {
    fetchMovies() {
      // 使用axios向后端发送请求获取电影数据
      this.$axios.get('/film/page/' + this.currentPage).then((res) => {
        this.movieList = res.data.data
        this.pageCount = res.data.total
      })
    },
    //页码发生改变的时候调用
    handleCurrentChange(val) {
      console.log(`当前页为:${val}`)
      this.currentPage = val
      this.$axios.get('/film/page/' + this.currentPage).then((res) => {
        this.movieList = res.data.data
        this.pageCount = res.data.total
      })
    },
    getDetail(id) {
      console.log(id)
      this.$router.push({ name: 'FilmDetail', query: { filmId: id } })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: 300px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
