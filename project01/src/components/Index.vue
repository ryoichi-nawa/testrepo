<template>
  <div>
    <Search @loadStart='onLoadStart' @loadComplete='onLoadComplete' />
    <Result :results='results' :current='current' :isShowLoading='loadProgress' />
  </div>
</template>

<script>
import Search from '@/components/Search';
import Result from '@/components/Result';

export default {
  components: {
    Search,
    Result,
  },
  data() {
    return {
      results: [],
      current: 1,
      loadProgress: false,
    }
  },
  methods: {
    onLoadStart() {
      this.loadProgress = true;
    },
    onLoadComplete({ results, current }) {
      this.results = results;
      this.current = current;
      this.loadProgress = false;
    },
  },
};
</script>

<style scoped>
.root {
  padding-top: 70px;
}

.search {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>


<style>
html {
  font-size: 62.5%;
}

body {
  margin: 0;
  color: #35495e;
}

p {
  margin: 0;
}

ul {
  padding: 0;
  margin: 0;
}
</style>
