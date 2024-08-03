<template>
  <a>
    <Header v-if="update"></Header>
    <!--form表单-->
    <el-row type="flex" class="bg-login" justify="center" align="bottom">
      <el-col class="login-card">
        <el-row class="title">{{ login === true ? '登录' : '注册' }}</el-row>
        <!--loginForm-->
        <el-form
          v-if="login"
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="21%"
          class="loginForm"
        >
          <el-form-item label="邮箱" prop="email" style="width: 280px">
            <el-input v-model="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 280px">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-button type="primary" size="mini" round @click="change">
            注册
          </el-button>
          <el-button type="primary" @click="submitLogin('loginForm')">
            立即登陆
          </el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form>
        <!--signupForm-->
        <el-form
          v-else
          :model="signupForm"
          :rules="rules"
          ref="signupForm"
          label-width="25%"
          class="signupForm"
          label-position="right"
        >
          <el-form-item label="邮箱" prop="email" style="width: 280px">
            <el-input v-model="signupForm.email"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName" style="width: 280px">
            <el-input v-model="signupForm.nickName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 280px">
            <el-input v-model="signupForm.password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" style="width: 280px">
            <el-input v-model="signupForm.code" style="width: 80px"></el-input>

            <el-button size="mini" style="margin-left: 0px" @click="getCode">
              {{ codeContent }}
            </el-button>
          </el-form-item>
          <el-button type="primary" size="mini" round @click="change">
            登录
          </el-button>
          <el-button type="primary" @click="submitSignup('signupForm')">
            立即注册
          </el-button>
          <el-button @click="resetForm('signupForm')">重置</el-button>
        </el-form>
      </el-col>
    </el-row>
    <Down></Down>
  </a>
</template>

<script>
import Header from '../components/Header.vue'
import router from '../router'
import Down from '@/components/Down.vue'

export default {
  name: 'Login',
  components: {
    Header,
    Down,
  },
  data() {
    return {
      update: true,
      // 登录的表单信息
      loginForm: {
        // 账户数据
        email: '',
        // 密码数据
        password: '',
      },
      // 注册的表单信息
      signupForm: {
        // 邮件
        email: '',
        //用户名
        nickName: '',
        //密码
        password: '',
        // 验证码
        code: '',
      },
      login: true,
      hasSentCode: false,
      totalTime: 60,
      codeContent: '发送验证码',
      // 表单验证
      rules: {
        // 设置账户效验规则
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '长度在 3 到 16 个字符的邮箱',
            trigger: 'blur',
          },
        ],
        // 设置密码效验规则
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符的密码',
            trigger: 'blur',
          },
        ],
        // 设置验证码效验规则
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            min: 6,
            max: 6,
            message: '请输入6位的验证码',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  methods: {
    // 提交登录表单
    submitLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 表单验证成功
          this.$axios.post('/user/login', this.loginForm).then((res) => {
            console.log(res)
            // 拿到结果
            //let loginUser = JSON.parse(res.data);

            // 判断结果
            if (res.data.success) {
              // 登录成功
              this.$message.success(
                `登录成功！欢迎用户${res.data.data.nickName}!`
              )
              // 1.将用户的相关数据存入localStorage
              localStorage.setItem('userId', res.data.data.id)
              localStorage.setItem('nickName', res.data.data.nickName)
              localStorage.setItem('icon', res.data.data.icon)
              // 2.发送请求，获取该用户的token
              this.$axios
                .get('/user/token/' + res.data.data.id)
                .then((tokenRes) => {
                  console.log(tokenRes)
                  if (tokenRes.data.success) {
                    // 获取token成功！
                    // 3.在localStorage存储用户token,之后在相应的请求中添加token
                    localStorage.setItem('token', tokenRes.data.data)
                    console.log(
                      '成功将token写入localStorage,token为:' +
                        tokenRes.data.data
                    )

                    // 刷新Header组件的方法！
                    // 移除组件
                    this.update = false
                    // 在组件移除后，重新渲染组件
                    // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
                    this.$nextTick(() => {
                      this.update = true
                    })

                    //跳转页面
                    router.push('/')
                  } else {
                    localStorage.clear()
                    this.$message.error('未能成功获取用户token')
                  }
                })
            } else {
              //alert("登陆失败！");
              this.$message.error(res.data.errorMsg)
              localStorage.clear()
            }
          })
          // alert('submit')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //注册
    submitSignup(formName) {
      console.log(this.signupForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 表单验证成功
          console.log('注册')
          this.$axios.post('/user/signup', this.signupForm).then((res) => {
            console.log(res)

            // 判断结果
            if (res.data.success) {
              /*登陆成功*/
              this.$message.success(`注册成功!请重新登录!`)
              /*跳转页面*/
              this.login = !this.login
              // router.push('/home')
            } else {
              /*打印错误信息*/
              //alert("登陆失败！");
              //this.$message.error('注册失败！')
              this.$message.error(res.data.errorMsg)
            }
          })
          alert('提交注册')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //获取验证码
    getCode() {
      if (this.signupForm.email == '') {
        this.$message.error('邮箱不能为空！')
        return
      }
      if (!this.hasSentCode) {
        console.log('获取验证码')
        console.log('/user/code/' + this.signupForm.email)
        this.$axios.get('/user/code/' + this.signupForm.email).then((res) => {
          console.log(res.data)
          if (res.data.success) {
            let clock = window.setInterval(() => {
              this.codeContent = this.totalTime + 's后重新发送'
              this.totalTime--
              if (this.totalTime < 0) {
                this.totalTime = 60
                this.codeContent = '重新发送验证码'
                this.hasSentCode = false
                window.clearInterval(clock)
              }
            }, 1000)
            this.$message.success('验证码已经发送至您的邮箱！')
          } else {
            this.$message.error(res.data.errorMsg)
          }
        })
      } else {
        this.$message.warning('请勿重复发送验证码！')
      }
      this.hasSentCode = !this.hasSentCode
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 注册与登录进行切换
    change() {
      this.login = !this.login
    },
  },
}
</script>

<style scoped>
.bg-login {
  margin-top: 150px;
  height: 100%;
  background-size: 200%;
}

.btn-ground {
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.title {
  text-shadow: -3px 3px 1px #ddd7dc;
  text-align: center;
  margin-bottom: 20px;
  color: #409eff;
  font-size: 40px;
}

.login-card {
  background-color: #ffffff;
  opacity: 0.9;
  box-shadow: 0 0 20px #e2dfdf;
  border-radius: 10px;
  padding: 40px 15px 30px 15px;
  width: auto;
}
.signupForm {
  width: auto;
}
</style>
