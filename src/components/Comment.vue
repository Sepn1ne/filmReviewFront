<template>
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
        <!-- 发表时间 -->
        <el-col :span="6" class="pubTime-style">
          {{ comment.publishTime }}
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
            <a style="font-size: 12px">12</a>
          </div>
        </el-col>
        <el-col :span="1" :offset="1" style="background-color: #e4effa">
          <div style="float: left">
            <img
              src="https://img1.doubanio.com/f/zerkalo/68849027911140623cf338c9845893c4566db851/pics/down.png"
              style="
                width: 14px;
                height: 12px;
                margin-left: 2px;
                margin-top: 3px;
              "
            />
            <a style="font-size: 12px">11</a>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 从后端获取的评论
      commentList: [],
      // comment: {
      //   nickName: 'Hisoka',
      //   icon: 'http://sc0k96wge.hd-bkt.clouddn.com/film_review%2Fhead%2Fth1.jpg?e=1714745400&token=ICQuP4YAErcSNKJzhzPxDYs_RVXhl8S0JpUBU_Gt:kGw46rbbGBGWzRBMQFn3QeMWTLk=',
      //   score: '5',
      //   hasPurchase: false, //判断是否购买电影票
      //   publishTime: '2024年3月12日22:34',
      //   title: '这是点评的标题',
      //   content: '    这是一个很好的电影..',
      // },
    }
  },
  mounted() {
    // 在组件加载时获取电影数据
    this.fetchComments()
    console.log(this.commentList)
  },
  methods: {
    fetchComments() {
      //获取vuex中的数据
      this.commentList = this.$store.state.commentList
    },
  },
}
</script>

<style scoped>
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
