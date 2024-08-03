<template>
  <div>
    <Header></Header>
    <br />
    <div class="filmTitle" style="margin-bottom: 10px; font-weight: 700">
      {{ this.filmDetail.filmName }} ({{ this.filmDetail.releaseYear }})
    </div>

    <el-col :span="12" :offset="6" class="background-card">
      <el-row :gutter="10">
        <!-- 电影封面 -->
        <el-col :span="8" style="padding-top: 5px"
          ><div class="grid-content">
            <img class="film-cover" :src="filmDetail.cover" /></div
        ></el-col>
        <!-- 电影介绍以及院线点评 -->
        <el-col :span="8"
          ><div class="grid-content text-info">
            <div>导演：{{ this.filmDetail.director }}</div>
            <div>编剧：{{ this.filmDetail.scriptwriter }}</div>
            <div>
              主要演员：{{ this.filmDetail.actorFirst }} /
              {{ this.filmDetail.actorSecond }} /
              {{ this.filmDetail.actorThird }}
            </div>
            <div>片名：{{ this.filmDetail.filmName }}</div>
            <div>制片国家：{{ this.filmDetail.producingCountry }}</div>
            <div>上映日期：{{ this.filmDetail.releaseYear }} 年</div>
            <div>片长：{{ this.filmDetail.movieLength }} 分钟</div>
            <br />
            <div v-if="!this.filmChainScore.exist">
              <div style="text-align: center">
                <img class="review-fail" src="../assets/cry.png" />
              </div>
              <div style="font-size: large; text-align: center">
                <div>抱歉！本电影暂不支持院线点评！</div>
              </div>
            </div>
            <div v-else>
              <div>
                <el-row
                  style="font-size: large; margin-top: 5px; text-align: center"
                  ><div>院线评分</div></el-row
                >
                <el-row
                  ><el-col :span="7"
                    ><div style="font-size: x-large; text-align: end">
                      {{ this.filmChainScore.cinemaChainScore * 2 }}
                    </div></el-col
                  >
                  <el-col :span="17" class="el-rate-text"
                    ><el-rate
                      v-model="filmChainScore.cinemaChainScore"
                      disabled
                      allow-half
                      text-color="#ff9900"
                      score-template="{value}"
                      :max="5"
                    ></el-rate></el-col
                ></el-row>
                <el-row style="text-align: center; margin-top: 4px"
                  ><div>
                    共有{{ filmChainScore.sum }}个人进行过权威评分~
                  </div></el-row
                >
              </div>
            </div>
          </div></el-col
        >
        <!-- 普通点评 -->
        <el-col :span="8"
          ><div class="grid-content">
            <div style="margin-left: 2px; margin-top: 15px">大众评分</div>
            <el-row style="margin-top: 3px">
              <el-col
                :span="8"
                style="font-size: xx-large; text-align: center"
                >{{ this.filmScore.nomralRate * 2 }}</el-col
              >
              <el-col :span="16" class="el-rate-text" style="font-size: larger"
                ><el-rate
                  v-model="filmScore.nomralRate"
                  disabled
                  allow-half
                  text-color="#ff9900"
                  score-template="{value}"
                  :max="5"
                >
                </el-rate>
              </el-col>
              <el-col :span="4"> </el-col>
            </el-row>
            <div>
              <el-row>
                <el-col :span="6" class="progressText">五星</el-col>
                <el-col :span="14" class="progress">
                  <el-progress
                    :text-inside="true"
                    :percentage="filmScore.fiveStarPercentage"
                    :stroke-width="15"
                    :color="progressColor"
                  ></el-progress
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="progressText">四星</el-col>
                <el-col :span="14" class="progress">
                  <el-progress
                    :text-inside="true"
                    :percentage="filmScore.fourStarPercentage"
                    :stroke-width="15"
                    :color="progressColor"
                  ></el-progress
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="progressText">三星</el-col>
                <el-col :span="14" class="progress">
                  <el-progress
                    :text-inside="true"
                    :percentage="filmScore.threeStarPercentage"
                    :stroke-width="15"
                    :color="progressColor"
                  ></el-progress
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="progressText">两星</el-col>
                <el-col :span="14" class="progress">
                  <el-progress
                    :text-inside="true"
                    :percentage="filmScore.twoStarPercentage"
                    :stroke-width="15"
                    :color="progressColor"
                  ></el-progress
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="progressText">一星</el-col>
                <el-col :span="14" class="progress">
                  <el-progress
                    :text-inside="true"
                    :percentage="filmScore.oneStarPercentage"
                    :stroke-width="15"
                    :color="progressColor"
                  ></el-progress
                ></el-col>
              </el-row>
            </div>
            <div style="margin-top: 50px">
              <el-button
                type="success"
                plain
                @click="purchase.dialogVisible = true"
                >点击购票</el-button
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>

    <biv>
      <el-col
        :span="12"
        :offset="6"
        class="box-start"
        style="margin-top: 15px; font-size: 20px; color: rgb(0, 153, 255)"
      >
        {{ this.filmDetail.filmName }}的电影简介:
      </el-col>
      <el-col
        :span="12"
        :offset="6"
        class="box-start"
        style="margin-top: 8px; font-size: 13px"
      >
        <div v-html="this.filmDetail.intro"></div>
      </el-col>
    </biv>

    <!-- 评分和点评的盒子 -->
    <div>
      <el-col
        :span="12"
        :offset="6"
        class="box-start"
        style="margin-top: 8px; font-size: 17px; color: rgb(0, 153, 255)"
      >
        <el-row class="box-start">
          <el-col :span="2">评分</el-col>
          <el-col :span="5">
            <div class="box-start">
              <el-rate
                v-model="publishScoreForm.score"
                @change="pubScore()"
              ></el-rate>
            </div>
          </el-col>
        </el-row>
        <el-row
          ><el-button
            type="text"
            @click="dialog.dialogFormVisible = true"
            style="text-align: start"
            >点击发布评价</el-button
          >
        </el-row>
      </el-col>
    </div>

    <!-- 弹窗 -->
    <el-col>
      <!-- 购票的弹窗 -->
      <el-dialog
        title="购票"
        :visible.sync="purchase.dialogVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-row gutter="10" style="margin-top: 10px; font-size: medium">
          <div class="block">
            <el-col :span="4"><span class="demonstration">日期</span></el-col>
            <el-col :span="8">
              <el-date-picker
                v-model="stickDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker
            ></el-col>
          </div>
          <el-col :span="3">地点</el-col>
          <el-col :span="8"
            ><el-cascader
              :props="props"
              @change="handleSelectChange"
            ></el-cascader
          ></el-col>
        </el-row>

        <el-row style="margin-top: 20px"></el-row>
        <el-radio-group v-if="hasStocks" v-model="radio1">
          <el-col
            v-for="(film, index) in filmStock"
            :key="index"
            :span="12"
            style="margin-top: 20px"
            ><el-radio-button :label="index + 1"
              >{{ film.cinemaName }} {{ film.keepTimes }} 库存:{{
                film.stock
              }}</el-radio-button
            ></el-col
          >
        </el-radio-group>

        <span slot="footer" class="dialog-footer">
          <el-button @click="purchase.dialogVisible = false">取 消</el-button>
          <el-button
            type="success"
            @click="
              purchase.dialogVisible = false
              purchaseAction()
            "
            >购 买</el-button
          >
        </span>
      </el-dialog>

      <!-- 写评论的弹窗 -->
      <el-dialog
        title="写评论"
        :visible.sync="dialog.dialogFormVisible"
        width="30%"
      >
        <el-form ref="form" :model="dialog.form" label-width="80px">
          <el-form-item label="评论标题">
            <el-input v-model="dialog.form.title"></el-input>
          </el-form-item>
          <el-form-item label="评论内容">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="dialog.form.textarea"
            >
            </el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog.dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              dialog.dialogFormVisible = false
              publishComment()
            "
            >点击发布</el-button
          >
        </div>
      </el-dialog>
    </el-col>

    <el-col
      :span="12"
      :offset="6"
      style="margin-top: 0px; margin-bottom: 2px; text-align: start"
    >
      <p style="margin-top: 30px; margin-bottom: 0px; font-weight: 600">
        {{ this.filmDetail.filmName }}的热评:
      </p>
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

    <el-col
      :span="12"
      :offset="6"
      style="margin-bottom: 50px; margin-top: 30px; text-align: start"
    >
      <el-link type="default" @click="moreComments"> 查看更多点评 </el-link>
    </el-col>
    <Down></Down>
  </div>
</template>

<script>
import Header from '@/components/Header'
// import Comment from '@/components/Comment'
import Down from '@/components/Down.vue'
import axios from 'axios'

export default {
  name: 'FilmDetail',
  components: {
    Header,
    // Comment,
    Down,
  },
  data() {
    return {
      //是否查询到电影库存
      hasStocks: false,
      //电影库存信息
      filmStock: [],
      stickDate: '',
      radio1: '1',
      //配置级联选择器
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(() => {
            if (node.level == 0) {
              axios
                .get('http://localhost:8081/filmreview/city/province')
                .then((res) => {
                  const provinces = res.data.data
                  console.log(provinces)
                  let nodes = []
                  for (let p of provinces) {
                    nodes.push({
                      value: p.id,
                      label: p.cityname,
                      leaf: level >= 3,
                    })
                  }
                  console.log(nodes)
                  resolve(nodes)
                })
            } else if (node.level == 1) {
              axios
                .get('http://localhost:8081/filmreview/city/city/' + node.value)
                .then((res) => {
                  const provinces = res.data.data
                  console.log(provinces)
                  let nodes = []
                  for (let p of provinces) {
                    nodes.push({
                      value: p.id,
                      label: p.cityname,
                      leaf: level >= 2,
                    })
                  }
                  console.log(nodes)
                  resolve(nodes)
                })
              console.log(node.value)
            } else if (node.level == 2) {
              axios
                .get(
                  'http://localhost:8081/filmreview/city/district/' + node.value
                )
                .then((res) => {
                  const provinces = res.data.data
                  console.log(provinces)
                  let nodes = []
                  for (let p of provinces) {
                    nodes.push({
                      value: p.id,
                      label: p.cityname,
                      leaf: level >= 2,
                    })
                  }
                  console.log(nodes)
                  resolve(nodes)
                })
              console.log(node.value)
            } else if (node.level == 3) {
              console.log(3333333333333)
            }
          }, 300)
        },
      },
      //购买的对话框
      purchase: {
        dialogVisible: false,
      },
      //热评top5
      commentList: [],
      //发布点评的对话框
      dialog: {
        dialogFormVisible: false,
        form: {
          title: '',
          textarea: '',
        },
        formLabelWidth: '120px',
      },
      publishScoreForm: {
        filmId: '',
        scored: 0,
        score: 0,
      },
      //发布点评的请求体
      publishCommentForm: {
        filmId: '',
        title: '',
        commented: 0,
        content: '',
      },
      filmId: '',
      //该电影相关的信息
      filmDetail: {
        filmName: '',
        cover: '',
        releaseYear: '',
        producingCountry: '',
        actorFirst: '',
        actorSecond: '',
        actorThird: '',
        director: '',
        scriptwriter: '',
        movieLength: '',
        intro: '',
      },
      //该电影的大众点评
      filmScore: {
        nomralRate: '',
        fiveStarPercentage: '',
        fourStarPercentage: '',
        threeStarPercentage: '',
        twoStarPercentage: '',
        oneStarPercentage: '',
      },
      // nomralRate: 9.3 / 2,
      progressColor: 'rgb(247, 186, 42)',
      //该电影的院线点评
      filmChainScore: {
        exist: '',
        cinemaChainScore: '',
        fiveStarPercentage: '',
        fourStarPercentage: '',
        threeStarPercentage: '',
        twoStarPercentage: '',
        oneStarPercentage: '',
        sum: '',
      },
      myCommentScore: null,
    }
  },
  mounted() {
    console.log('created FilmDetail')
    // 接收GoodsInfo.vue传过来的goodsId
    this.filmId = this.$route.query.filmId
    console.log('接受到的电影id为' + this.filmId)
    this.getFilmsInfo()
    console.log('获取该电影的普通评分')
    this.getNormalRate()
    console.log('获取该电影的院线评分')
    this.getChainRate()
    console.log('获取该电影的热门评分')
    this.fetchComments()
  },
  methods: {
    //购买
    purchaseAction() {
      console.log(this.radio1)
      //csId 为电影上映时候的id
      let csId = this.filmStock[this.radio1 - 1].id
      this.$axios.get('/filmreview/filmOrder/create/' + csId).then((res) => {
        if (res.data.success) {
          this.$message.success(`创建订单成功！订单id为:${res.data.data}`)
        } else {
          this.$message.error(res.data.errorMsg)
        }
      })
    },
    //级联选择器选择时，查询对应地点的当日余票
    handleSelectChange(val) {
      console.log(val[2])
      let district = val[2]
      this.$axios
        .get(
          '/filmreview/cinemaScreening/stock/' +
            district +
            '/' +
            this.filmId +
            '/' +
            this.stickDate
        )
        .then((res) => {
          if (res.data.success) {
            this.hasStocks = true
            this.filmStock = res.data.data
            console.log(res.data.data)
            console.log('获得当日余票')
          } else {
            console.log(res.data.errorMsg)
          }
        })
    },
    fetchComments() {
      // 使用axios向后端发送请求获取电影数据
      this.$axios.get('/filmComment/top5/' + this.filmId).then((res) => {
        this.commentList = res.data.data
        console.log(this.commentList)
      })
    },
    //进行评分
    pubScore() {
      this.publishScoreForm.scored = 1
      this.publishScoreForm.filmId = this.filmId
      this.$axios
        .post('/filmComment/score', this.publishScoreForm)
        .then((res) => {
          console.log(res)

          if (res.data.success) {
            this.$message.success(`发布评分成功！`)
          } else {
            this.$message.error(res.data.errorMsg)
          }
        })
        .catch(function (error) {
          //在发送请求的过程中出现问题了，就会被捕捉到
          console.log(error)
        })
    },
    //进行评论
    publishComment() {
      console.log(this.dialog.textarea)
      //获取当前的用户id,电影id,发布内容
      this.publishCommentForm.commented = 1
      this.publishCommentForm.filmId = this.filmId
      this.publishCommentForm.content = this.dialog.form.textarea
      this.publishCommentForm.title = this.dialog.form.title
      this.$axios.post('/filmComment', this.publishCommentForm).then((res) => {
        console.log(res)

        if (res.data.success) {
          this.$message.success(`发布评论成功！`)
        } else {
          this.$message.error(res.data.errorMsg)
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        // eslint-disable-next-line
        .then((_) => {
          done()
        })
        // eslint-disable-next-line
        .catch((_) => {})
    },
    getFilmsInfo() {
      this.$axios.get('/film/' + this.filmId).then((res) => {
        console.log(res)
        if (res.data.success) {
          console.log('获取成功！')
          //如果成功，则将数据注入data
          this.filmDetail.filmName = res.data.data.filmName
          this.filmDetail.cover = res.data.data.cover
          this.filmDetail.releaseYear = res.data.data.releaseYear
          this.filmDetail.producingCountry = res.data.data.producingCountry
          this.filmDetail.actorFirst = res.data.data.actorFirst
          this.filmDetail.actorSecond = res.data.data.actorSecond
          this.filmDetail.actorThird = res.data.data.actorThird
          this.filmDetail.director = res.data.data.director
          this.filmDetail.scriptwriter = res.data.data.scriptwriter
          this.filmDetail.movieLength = res.data.data.movieLength
          //对电影简介中的\n改变为换行符号<br/>
          let text = res.data.data.intro
          let arr = text.split('\\n')
          console.log(arr)
          this.filmDetail.intro = ''
          for (let i = 0; i < arr.length; i++) {
            let addContent =
              '<div style="text-indent: 2em">' + arr[i] + '</div>'
            this.filmDetail.intro = this.filmDetail.intro + addContent
          }

          console.log(this.filmDetail.intro)
        } else {
          this.$message.error('该电影不存在!!')
        }
      })
    },

    // 普通评分
    getNormalRate() {
      this.$axios.get('/filmScore/' + this.filmId).then((res) => {
        console.log(res)
        if (res.data.success) {
          console.log('获取成功！')
          //如果成功，则将数据注入filmScore
          let sum =
            res.data.data.normalFive +
            res.data.data.normalFour +
            res.data.data.normalThree +
            res.data.data.normalTwo +
            res.data.data.normalOne
          console.log(`点评的总人数为${sum}`)
          this.filmScore.nomralRate = parseFloat(
            (res.data.data.normalScore / 2).toFixed(1)
          )
          this.filmScore.fiveStarPercentage = parseFloat(
            ((res.data.data.normalFive / sum) * 100).toFixed(1)
          )
          this.filmScore.fourStarPercentage = parseFloat(
            ((res.data.data.normalFour / sum) * 100).toFixed(1)
          )
          this.filmScore.threeStarPercentage = parseFloat(
            ((res.data.data.normalThree / sum) * 100).toFixed(1)
          )
          this.filmScore.twoStarPercentage = parseFloat(
            ((res.data.data.normalTwo / sum) * 100).toFixed(1)
          )
          this.filmScore.oneStarPercentage = parseFloat(
            ((res.data.data.normalOne / sum) * 100).toFixed(1)
          )
        } else {
          this.$message.error('该电影不存在!!')
        }
      })
    },

    // 院线点评
    getChainRate() {
      this.$axios.get('/filmChainScore/' + this.filmId).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.filmChainScore.exist = true
          console.log('获取成功！')
          //如果成功，则将数据注入filmScore
          let sum =
            res.data.data.cinemaFive +
            res.data.data.cinemaFour +
            res.data.data.cinemaThree +
            res.data.data.cinemaTwo +
            res.data.data.cinemaOne
          console.log(`点评的总人数为${sum}`)
          this.filmChainScore.sum = sum
          this.filmChainScore.cinemaChainScore = parseFloat(
            (res.data.data.cinemaChainScore / 2).toFixed(1)
          )
          this.filmChainScore.fiveStarPercentage = parseFloat(
            ((res.data.data.cinemaFive / sum) * 100).toFixed(1)
          )
          this.filmChainScore.fourStarPercentage = parseFloat(
            ((res.data.data.cinemaFour / sum) * 100).toFixed(1)
          )
          this.filmChainScore.threeStarPercentage = parseFloat(
            ((res.data.data.cinemaThree / sum) * 100).toFixed(1)
          )
          this.filmChainScore.twoStarPercentage = parseFloat(
            ((res.data.data.cinemaTwo / sum) * 100).toFixed(1)
          )
          this.filmChainScore.oneStarPercentage = parseFloat(
            ((res.data.data.cinemaOne / sum) * 100).toFixed(1)
          )
        } else {
          this.filmChainScore.exist = false
          console.log('该电影不存在院线点评')
        }
      })
    },

    //更多点评
    moreComments() {
      this.$router.push({
        name: 'FilmComment',
        query: { filmId: this.filmId, filmName: this.filmDetail.filmName },
      })
    },
  },
}
</script>

<style scoped>
.review-fail {
  height: 100px;
  text-align: center;
}

.el-rate-text {
  margin-top: 5px;
  text-align: start;
}

/* 设置星星的大小 */
/* :deep(.el-rate__icon) {
  font-size: 25px;
} */
.text-info {
  display: flex;
  flex-direction: column;
  text-align: start;
}
.filmTitle {
  font-size: x-large;
  font-family: ui-rounded;
}
.background-card {
  background-color: azure;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.film-cover {
  height: 350px;
  object-fit: cover;
}

.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.box-start {
  text-align: start;
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
  margin-top: 12px;
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
