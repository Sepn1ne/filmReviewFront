<template>
  <div id="app">
    <!-- 重定位到  / -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  mounted() {
    console.log('根组件挂载')
    const myToken = localStorage.getItem('token')
    if (myToken == null) {
      console.log('没有token')
      localStorage.clear()
    } else {
      //在根组件挂载的时候，向后端发起请求来判断token是否过期
      //如果过期，则清除token，使得用户需要重新登录
      //否则用户无需登录
      this.judgeToken(myToken)
    }
  },
  methods: {
    judgeToken(myToken) {
      console.log(myToken)
      this.$axios
        .post(
          '/user/token',
          {
            token: myToken,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          //传来的数据data为boolean，true表示未过期，否则已过期
          if (res.data.data) {
            //没有过期则继续使用
            console.log('token未过期,可继续使用')
          } else {
            //已经过期则清除localStorage
            console.log('token超时,已清除LocalStorage')
            localStorage.clear()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

body {
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
