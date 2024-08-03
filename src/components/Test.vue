<template>
  <div class="movie-grid">
    <div
      v-for="(movie, index) in movies"
      :key="movie.id"
      class="movie-item"
      :style="getMovieStyle(index)"
    >
      <img :src="movie.poster" alt="Movie Poster" class="poster" />
      <div class="info">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.releaseDate }}</p>
        <p>{{ movie.genre }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [], // 从后端获取的电影数据
      itemsPerRow: 3, // 每行显示的电影数量
    }
  },
  mounted() {
    // 在组件加载时获取电影数据
    this.fetchMovies()
  },
  methods: {
    fetchMovies() {
      // 使用axios或fetch API向后端发送请求获取电影数据
      // 这里假设后端返回的是上述格式的电影数据
      // 实际情况可能需要根据实际的后端API来调整
      this.movies = [
        {
          id: 1,
          title: 'Movie 1',
          poster:
            'http://sc0k96wge.hd-bkt.clouddn.com/film_review%2Fcover%2F%E8%8C%B6%E9%A6%86.png?e=1713593870&token=ICQuP4YAErcSNKJzhzPxDYs_RVXhl8S0JpUBU_Gt:Gqk-Z1BUyscuybSS8Jpg3l3qNes=',
          releaseDate: '2023-01-01',
          genre: 'Action',
        },
        {
          id: 2,
          title: 'Movie 2',
          poster:
            'http://sc0k96wge.hd-bkt.clouddn.com/film_review%2Fcover%2F%E8%8C%B6%E9%A6%86.png?e=1713593870&token=ICQuP4YAErcSNKJzhzPxDYs_RVXhl8S0JpUBU_Gt:Gqk-Z1BUyscuybSS8Jpg3l3qNes=',
          releaseDate: '2023-02-01',
          genre: 'Comedy',
        },
        {
          id: 1,
          title: 'Movie 1',
          poster:
            'http://sc0k96wge.hd-bkt.clouddn.com/film_review%2Fcover%2F%E8%8C%B6%E9%A6%86.png?e=1713593870&token=ICQuP4YAErcSNKJzhzPxDYs_RVXhl8S0JpUBU_Gt:Gqk-Z1BUyscuybSS8Jpg3l3qNes=',
          releaseDate: '2023-01-01',
          genre: 'Action',
        },
        {
          id: 2,
          title: 'Movie 2',
          poster:
            'http://sc0k96wge.hd-bkt.clouddn.com/film_review%2Fcover%2F%E8%8C%B6%E9%A6%86.png?e=1713593870&token=ICQuP4YAErcSNKJzhzPxDYs_RVXhl8S0JpUBU_Gt:Gqk-Z1BUyscuybSS8Jpg3l3qNes=',
          releaseDate: '2023-02-01',
          genre: 'Comedy',
        },
        {
          id: 1,
          title: 'Movie 1',
          poster:
            'http://sc0k96wge.hd-bkt.clouddn.com/film_review%2Fcover%2F%E8%8C%B6%E9%A6%86.png?e=1713593870&token=ICQuP4YAErcSNKJzhzPxDYs_RVXhl8S0JpUBU_Gt:Gqk-Z1BUyscuybSS8Jpg3l3qNes=',
          releaseDate: '2023-01-01',
          genre: 'Action',
        },
      ]
    },
    getMovieStyle(index) {
      // 根据索引计算每个电影项的样式，控制每行显示的数量
      const rowIndex = Math.floor(index / this.itemsPerRow)
      const colIndex = index % this.itemsPerRow
      return {
        'margin-right': colIndex < this.itemsPerRow - 1 ? '20px' : '0', // 控制每列的间距
        'margin-bottom':
          rowIndex < Math.floor(this.movies.length / this.itemsPerRow)
            ? '20px'
            : '0', // 控制每行的间距
      }
    },
  },
}
</script>

<style scoped>
.movie-grid {
  display: flex;
  flex-wrap: wrap;
}

.movie-item {
  width: calc(33.33% - 20px); /* 一行三列，减去间距 */
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.poster {
  width: 30%;
  height: auto;
}

.info {
  text-align: center;
}
</style>
