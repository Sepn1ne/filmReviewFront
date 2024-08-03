<template>
  <a>
    <Header></Header>
    <el-col :offset="4" :span="16" style="margin-top: 10px"
      ><el-carousel :interval="4000" type="card" height="250px">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <img
            style="object-fit: scale-down; width: 100%; height: 100%"
            :src="item.idView"
            class="image"
          />
        </el-carousel-item> </el-carousel
    ></el-col>
    <hr class="hr-dashed" />
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
      imgList: [
        {
          id: 0,
          idView:
            'https://ts1.cn.mm.bing.net/th/id/R-C.5a803ba0b788a2ef7a83cd5af645133b?rik=9DDkTIVu7hElaA&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20171213%2f23947acedfee4d1db932e087ed5d8e8b.jpeg&ehk=4kcatm51XapLMIRz3u8Jk8qFl3wc2NoIoKwx5K5wRS8%3d&risl=&pid=ImgRaw&r=0',
        },
        {
          id: 1,
          idView:
            'https://ts1.cn.mm.bing.net/th/id/R-C.8c2465b8ec94aeb06efcc78469e6dc5b?rik=jyf9fwiE3N9rbQ&riu=http%3a%2f%2fimage12.m1905.cn%2fmapps%2fuploadfile%2fedu%2f2014%2f1115%2f2014111504141931809.jpg&ehk=HJx8gUzdR7b8M%2bGWU%2ftl57YoCqzJWZnrTF7X0kiyrqI%3d&risl=&pid=ImgRaw&r=0',
        },
        {
          id: 2,
          idView:
            'https://img.zcool.cn/community/01073e5c4fca88a801203d220045a0.jpg@1280w_1l_2o_100sh.jpg',
        },
        {
          id: 3,
          idView:
            'https://img.zcool.cn/community/018dfb5543a90a0000019ae99c1015.jpg@1280w_1l_2o_100sh.jpg',
        },
      ],
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

img {
  height: 300px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.hr-dashed {
  border: 0;
  border-top: 1px dashed #a2a9b6;
}
</style>
