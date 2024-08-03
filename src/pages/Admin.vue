<template>
  <div>
    <el-col :offset="4" :span="16">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">电影管理</el-menu-item>
        <el-menu-item index="2">点评管理</el-menu-item>
        <el-menu-item index="3">用户管理</el-menu-item>
        <el-menu-item index="4">影院管理</el-menu-item>
      </el-menu>
      <br /><br />
      <el-row>
        <el-col :span="2">
          <el-button type="primary" @click="dialogFormVisible = true"
            >添加电影</el-button
          >
        </el-col>
        <el-col :offset="2" :span="4"
          ><el-input
            placeholder="请输入电影ID或名称"
            prefix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input
        ></el-col>
        <el-dialog title="添加电影" :visible.sync="dialogFormVisible">
          <el-form :model="form" style="text-align: start">
            <el-row>
              <el-col :span="8"
                ><el-form-item label="电影名称" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.name"
                    autocomplete="off"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="6"
                ><el-form-item label="上映年份" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.name"
                    autocomplete="off"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="6"
                ><el-form-item label="导演" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.name"
                    autocomplete="off"
                  ></el-input> </el-form-item
              ></el-col>
            </el-row>

            <el-row>
              <el-col :span="8"
                ><el-form-item label="编剧" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.name"
                    autocomplete="off"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="16"
                ><el-form-item label="演员" :label-width="formLabelWidth">
                  <el-col :span="6"
                    ><el-input v-model="form.name" autocomplete="off"></el-input
                  ></el-col>
                  <el-col :offset="1" :span="6"
                    ><el-input v-model="form.name" autocomplete="off"></el-input
                  ></el-col>
                  <el-col :offset="1" :span="6"
                    ><el-input v-model="form.name" autocomplete="off"></el-input
                  ></el-col> </el-form-item
              ></el-col>
            </el-row>

            <el-row
              ><el-form-item label="电影简介" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5 }"
                  placeholder="请输入内容"
                  v-model="textarea2"
                >
                </el-input>
              </el-form-item>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </el-row>
      <el-row
        ><el-col
          ><el-table
            class="tableClass"
            :data="tableData"
            border
            style="width: 100%; margin-top: 10px"
            :fit="false"
            ref="multipleTable"
          >
            <el-table-column prop="id" label="电影ID" width="50">
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleClickEdit(scope.row)"
                  type="text"
                  size="small"
                  >编辑</el-button
                >
                <el-button
                  @click="handleClickDel(scope.row)"
                  type="text"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
            <el-table-column prop="filmName" label="电影名称" width="150">
            </el-table-column>
            <el-table-column prop="releaseYear" label="上映日期" width="100">
            </el-table-column>

            <el-table-column prop="director" label="导演" width="100">
            </el-table-column>
            <el-table-column prop="scriptwriter" label="编剧" width="100">
            </el-table-column>
            <el-table-column prop="actorFirst" label="主演1" width="100">
            </el-table-column>
            <el-table-column prop="actorSecond" label="主演2" width="100">
            </el-table-column>
            <el-table-column prop="actorThird" label="主演3" width="100">
            </el-table-column>
            <el-table-column prop="movieLength" label="时长(分钟)" width="90">
            </el-table-column>
            <el-table-column prop="intro" label="简介" width="2000">
            </el-table-column> </el-table></el-col
      ></el-row>

      <el-row style="text-align: start"
        ><el-pagination
          layout="prev, pager, next"
          :current-page="this.currentPage"
          :page-count="this.pageCount"
          @current-change="handleCurrentChange"
          style="margin-top: 10px"
        >
        </el-pagination
      ></el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      currentPage: 1, //当前页数
      pageCount: 1, //总页数
      activeIndex2: '1',
      tableData: [
        // {
        //   id: 1,
        //   filmName: '哥斯拉大战金刚2',
        //   releaseDate: '2024年',
        //   intro:
        //     '继上一次的怪兽高燃对战之后，金刚和哥斯拉将再度联手对抗一个潜伏在世界中的巨大威胁，并逐步探索这些巨兽们的起源以及骷髅岛等地的奥秘。同时，上古之战的面纱也将会被揭晓，而正是那场战斗创造出了这些超凡的生物，并深刻影响了人类世界的命运。',
        //   director: '亚当·温加德',
        //   scriptwriter: '特里·鲁西奥 /  亚当·温加德',
        //   actors: '特里·鲁西奥 / 西蒙·巴雷特 / 杰瑞米·斯莱特 / 亚当·温加德',
        //   length: '120min',
        // },
      ],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '120px',
      textarea2: '',
    }
  },
  mounted() {
    this.fetchFilmInfo()
  },
  methods: {
    fetchFilmInfo() {
      console.log()
      this.$axios.get('/film/top/' + this.currentPage).then((res) => {
        this.tableData = res.data.data
        this.pageCount = res.data.total
      })
      this.$nextTick(() => {
        this.$refs.multipleTable.doLayout()

        // el-table加ref="multipleTable"
      })
    },
    //页码发生改变的时候调用
    handleCurrentChange(val) {
      console.log(`当前页为:${val}`)
      this.currentPage = val
      this.$axios.get('/film/top/' + this.currentPage).then((res) => {
        this.tableData = res.data.data
        this.pageCount = res.data.total
      })
      this.$nextTick(() => {
        this.$refs.multipleTable.doLayout()

        // el-table加ref="multipleTable"
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClickDel(row) {
      console.log('del' + row)
    },
    handleClickEdit(row) {
      console.log('edit' + row)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
