<template>
  <div>
    <Header></Header>
    <el-row>
      <el-col
        :span="12"
        :offset="6"
        class="background-card"
        style="text-align: start; margin-top: 15px; font-size: x-large"
      >
        <div>{{ this.filmName }}的影评...</div>
        <div>
          <el-row style="line-height: 15px"
            ><el-link
              :type="flag ? 'primary' : 'default'"
              @click="changeSortToWelcom"
              :underline="false"
              >最受欢迎的</el-link
            >
            <el-link type="default" :underline="false">/</el-link>
            <el-link
              :type="!flag ? 'primary' : 'default'"
              @click="changeSortToNew"
              :underline="false"
              >最新发布的</el-link
            ></el-row
          >
        </div>
      </el-col>
      <div>
        <el-col
          :span="12"
          :offset="6"
          v-for="(comment, index) in this.commentList"
          :key="index"
        >
          <!-- 分割线 -->
          <el-divider></el-divider>
          <el-row style="margin-bottom: 5px">
            <!-- 头像 -->
            <el-col :span="1">
              <img class="head-icon" :src="comment.icon" />
            </el-col>
            <!-- 昵称 -->
            <el-col :span="1.8" class="name">
              {{ comment.nickName }}
            </el-col>
            <!-- 评分显示 -->
            <el-col :span="2.2"
              ><el-rate
                v-model="comment.score"
                disabled
                text-color="#ff9900"
                score-template="{value}"
                class="rate-style"
              >
              </el-rate
            ></el-col>
            <!-- 评分显示 -->
            <el-col v-if="comment.hasPurchase" :span="1.2">
              <el-tooltip
                class="item"
                effect="dark"
                content="权威评论(已购票)"
                placement="top"
              >
                <el-button
                  type="success"
                  icon="el-icon-check"
                  circle
                  size="mini"
                  style="margin-top: 5px; margin-right: 3px"
                ></el-button>
              </el-tooltip>
            </el-col>
            <!-- 发表时间 -->
            <el-col :span="6" class="pubTime-style">
              {{ comment.pubTime }}
            </el-col>
          </el-row>
          <!-- 评论的小标题 -->
          <el-row class="title-style">
            <el-col :span="24">
              <div>{{ comment.title }}</div>
            </el-col>
          </el-row>
          <!-- 评论内容 -->
          <el-row class="content-style">
            <el-col :span="24">
              <div>{{ comment.content }}</div>
            </el-col>
          </el-row>

          <el-row style="margin-top: 10px">
            <el-col :span="1" style="background-color: #e4effa">
              <div>
                <img
                  src="https://img1.doubanio.com/f/zerkalo/536fd337139250b5fb3cf9e79cb65c6193f8b20b/pics/up.png"
                  style="width: 14px; height: 12px"
                />
                <a style="font-size: 12px">{{ comment.up }}</a>
              </div>
            </el-col>
            <el-col :span="1" :offset="1" style="background-color: #e4effa">
              <div style="float: left; display: flex; height: 20px">
                <img
                  src="https://img1.doubanio.com/f/zerkalo/68849027911140623cf338c9845893c4566db851/pics/down.png"
                  style="
                    width: 14px;
                    height: 12px;
                    margin-left: 2px;
                    margin-top: 3px;
                    float: left;
                    margin-right: 3px;
                  "
                />
                <div style="font-size: 12px; float: right; line-height: 20px">
                  {{ comment.down }}
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </div>
      <el-col :span="14" :offset="5" class="background-card">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="this.currentPage"
          :page-count="this.pageCount"
          @current-change="handleCurrentChange"
          style="margin-top: 40px"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <Down></Down>
  </div>
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
      commentList: [],
      currentPage: 1, //当前页数
      pageCount: 1, //总页数
      filmId: '',
      filmName: '',
      flag: true,
    }
  },
  mounted() {
    // 在组件加载时获取电影数据
    this.fetchComments()
  },

  methods: {
    fetchComments() {
      this.filmId = this.$route.query.filmId
      this.filmName = this.$route.query.filmName

      // 使用axios向后端发送请求获取电影数据
      this.$axios
        .get(
          '/filmComment/' +
            (this.flag ? 'up/' : 'pub/') +
            this.filmId +
            '/' +
            this.currentPage
        )
        .then((res) => {
          //向vuex提交数据
          //this.$store.commit('changeFilmList', res.data.data)
          this.commentList = res.data.data
          this.pageCount = res.data.total
        })
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    //页码发生改变的时候调用
    handleCurrentChange(val) {
      console.log(`当前页为:${val}`)
      this.currentPage = val
      this.$axios
        .get(
          '/filmComment/' +
            (this.flag ? 'up/' : 'pub/') +
            this.filmId +
            '/' +
            this.currentPage
        )
        .then((res) => {
          //this.$store.commit('changeFilmList', res.data.data)
          this.commentList = res.data.data
          this.pageCount = res.data.total
        })
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    //点击最受欢迎的调用
    changeSortToWelcom() {
      if (this.flag === false) {
        this.flag = true
        this.fetchComments()
      }
    },
    //点击最新发布的时候调用
    changeSortToNew() {
      if (this.flag === true) {
        this.flag = false
        this.fetchComments()
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.head-icon {
  border-radius: 50%;
  width: 33px;
  height: 33px;
  object-fit: cover;
  object-position: center;
  margin-top: 2px;
}
.name {
  text-align: start;
  margin-top: 10px;
  color: rgb(94, 94, 250);
}
.rate-style {
  margin-top: 10px;
  text-align: start;
}
.pubTime-style {
  margin-top: 10px;
  text-align: start;
  font-size: small;
}
.content-style {
  text-align: start;
  font-size: 14px;
  margin-top: 5px;
}
.title-style {
  text-align: start;
  font-size: 16px;
  margin-top: 5px;
  color: rgb(34, 149, 226);
}
</style>
