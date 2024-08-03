<template>
  <el-container>
    <el-header style="background-color: rgb(255, 255, 255)">
      <el-row>
        <el-col :span="6" :offset="6"
          ><div class="selects" style="text-align: center">
            <div v-for="(item, index) in asideData" :key="index">
              <el-col :span="item.s"
                ><router-link :to="item.link">{{
                  item.name
                }}</router-link></el-col
              >
              <!-- <router-link to="/home">电影</router-link>
              <router-link to="/home">电视剧</router-link>
              <router-link to="/home">正在热映</router-link>
              <router-link to="/home">评分榜单</router-link> -->
              <!-- <router-link to="/login">登录</router-link> -->
            </div>
          </div></el-col
        >
        <el-col :span="3" :offset="1">
          <el-input
            v-model="input"
            placeholder="请输入电影名称"
            prefix-icon="el-icon-search"
            @keyup.enter.native="searchFilm"
          >
          </el-input>
        </el-col>

        <el-col v-if="hasLogin" :span="3">
          <img class="head-icon" :src="icon" />
          <el-link
            target="_blank"
            :underline="false"
            style="margin-bottom: 15px"
            @click="logout"
            >退出登录</el-link
          >
        </el-col>
        <el-col v-else :span="3">
          <div>
            <div><router-link to="/login">未登录，点击登录</router-link></div>
          </div>
        </el-col>
      </el-row>
    </el-header>
  </el-container>
</template>

<script>
//不导出别的组件无法使用
export default {
  name: 'Header',
  components: {},
  data() {
    return {
      hasLogin: false,
      icon: '',
      input: '',
      asideData: [
        {
          link: '/home',
          name: '电影',
          s: 5,
        },
        {
          link: '/test',
          name: '电视剧',
          s: 6,
        },
        {
          link: '/screening',
          name: '正在热映',
          s: 7,
        },
        {
          link: '/rating',
          name: '评分榜单',
          s: 6,
        },
      ],
    }
  },
  methods: {
    //退出登录
    logout() {
      console.log('退出登录')
      localStorage.clear()
      location.reload()
      this.$message.info('退出登录')
    },
    //搜索框搜索
    searchFilm() {
      console.log('点击搜索！')
      const filmNmae = this.input
      //查询filmName对应的电影是否存在，如果存在则跳转到filmDetail页面
      this.$axios.get('/film/name/' + filmNmae).then((res) => {
        if (res.data.success) {
          this.$message.success('查询到电影')
          this.$router.push({
            name: 'FilmDetail',
            query: { filmId: res.data.data },
          })
        } else {
          this.$message.error(res.data.errorMsg)
        }
      })
    },
  },
  mounted() {
    // 1.在组件加载时通过localStorage获取当前是否处于登录状态，
    if (localStorage.getItem('token')) {
      this.hasLogin = true
      this.icon = localStorage.getItem('icon')
    } else {
      this.hasLogin = false
    }
    // 2.若localStorage中没有存储用户token，则用户未登录
  },
}
</script>

<style>
.el-header {
  background-color: #212e68;
  color: #333;
  text-align: center;
  line-height: 90px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

/* .selects {
  display: flex;
  justify-content: space-between;
  font-family: 'PingFang SC';
  font-size: x-large;
} */

.head-icon {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: center;
  margin-top: 5px;
}

.selects .router-link-active {
  text-decoration: none;
  /* 高亮的颜色 */
  color: rgb(27, 112, 240);
  border-bottom: 2px solid rgb(27, 112, 240);
}

.selects a {
  text-decoration: none;
  color: #000000;
  /* display: flex;
  justify-content: space-between; */
  font-family: 'PingFang SC';
  font-size: x-large;
}
</style>
