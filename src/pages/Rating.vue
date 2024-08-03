<template>
  <a>
    <Header></Header>

    <el-row>
      <el-col :span="9" :offset="8" class="background-card">
        <el-row v-for="(movie, index) in movieList" :key="index" :gutter="30">
          <hr class="hr-dashed" />
          <div style="height: 130px; width: 100%">
            <el-col :span="4"
              ><div>
                <img
                  width="90px"
                  height="130px"
                  :src="movie.cover"
                  @click="getDetail(movie.id)"
                />
              </div>
            </el-col>
            <el-col :span="18">
              <el-row style="text-align: start"
                ><el-link
                  @click="getDetail(movie.id)"
                  type="primary"
                  style="
                    font-size: large;

                    color: rgb(50, 50, 219);
                  "
                  >{{ movie.filmName }}</el-link
                ></el-row
              >
              <el-row
                style="
                  font-size: x-small;
                  text-align: start;
                  margin-top: 12px;
                  font-style: italic;
                "
              >
                <div>
                  {{ movie.releaseYear }} / {{ movie.producingCountry }} /
                  {{ movie.director }} / {{ movie.scriptwriter }} /
                  {{ movie.actorFirst }} / {{ movie.actorSceond }}
                  {{ movie.actorThird }} /
                </div>
                <div class="wrap" style="margin-top: 6px">
                  <div class="text">
                    {{ movie.intro }}
                  </div>
                </div>

                <el-row style="margin-top: 6px">
                  <el-col :span="1" style="margin-top: 2px">{{
                    movie.score * 2
                  }}</el-col>
                  <el-col :span="8" style="text-align: start"
                    ><el-rate
                      v-model="movie.score"
                      disabled
                      text-color="#ff9900"
                      score-template="{value}"
                    >
                    </el-rate
                  ></el-col>
                </el-row>
              </el-row>
            </el-col>
          </div>
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
  </a>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  components: {
    Header,
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
      this.$axios.get('/film/top/' + this.currentPage).then((res) => {
        this.movieList = res.data.data
        this.pageCount = res.data.total
      })
    },
    //页码发生改变的时候调用
    handleCurrentChange(val) {
      console.log(`当前页为:${val}`)
      this.currentPage = val
      this.$axios.get('/film/top/' + this.currentPage).then((res) => {
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
.wrap {
  height: 40px;
  line-height: 20px;
  overflow: hidden;
}

.wrap .text {
  float: right;
  margin-left: -5px;
  width: 100%;
  word-break: break-all;
}

.wrap::before {
  float: left;
  width: 5px;
  content: '';
  height: 40px;
}

.wrap::after {
  float: right;
  content: '...';
  height: 20px;
  line-height: 20px;
  /* 为三个省略号的宽度 */
  width: 3em;
  /* 使盒子不占位置 */
  margin-left: -3em;
  /* 移动省略号位置 */
  position: relative;
  left: 100%;
  top: -20px;
  padding-right: 5px;
  background-color: #fff;
}

.hr-dashed {
  border: 0;
  border-top: 1px dashed #a2a9b6;
}
</style>
