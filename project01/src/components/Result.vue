<template>

  <div class='container'>
    <div style="margin-top:3em; margin-bottom:3em;">
      <table border="1">
        <tr v-for='item of results' :key='item.id'>

          <td v-if="item.id == '#'" class='header'> {{ item.title }} </td>
          <td v-else>
            <div class='title'> {{ item.title }} </div>
          </td>

          <td v-if="item.id == '#'" class='header'> {{ item.author }} </td>
          <td v-else>
            <div class='author'> {{ item.author }} </div>
          </td>

          <td v-if="item.id == '#'" class='header'> {{ item.issueDay }} </td>
          <td v-else>
            <div class='issueDay'> {{ item.issueDay }} </div>
          </td>

          <td v-if="item.id == '#'" class='header'>{{ item.url }}</td>
          <td v-else>
            <p><a class='linked' :href='item.url' target='_blank'>詳細</a></p>
          </td>
        </tr>
      </table>
    </div>

    <Loading class='loading' v-show='isShowLoading'/>
  </div>

</template>

<script>
import Loading from "@/components/Loading";

export default {
  props: [ "results", "isShowLoading" ],
  components: {
    Loading,

  },
  data: function() {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
};
</script>


<style scoped>
.linked {
  display: block;
  color: #1e90ff;
  font-size: 1.3rem;
  font-weight: 700;
  text-decoration: none;
  word-wrap: break-word;
  margin: 0.5em;
}

.title {
  margin: 0.5em;
  font-size: 1.5rem;
  font-weight: 300;
  text-decoration: none;
}

.author {
  margin: 0.5em;
  font-size: 1.2rem;
  text-decoration: none;
}

.issueDay {
  margin: 0.5em;
  font-size: 1.2rem;
  text-decoration: none;
}

.header {
  background: #c0c0c0;
  text-align: center;
}

.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  /*
  background: #35495e;
  */
  background: #f5f5f5;
  opacity: 0.5;
}
</style>
