<template>

  <div class='container' style="margin-top:3em; margin-bottom:3em;">
    <div v-if="results.length > 0">
      <table class="table table-bordered">
        <thead>
          <th class="header">タイトル</th>
          <th class="header">著者</th>
          <th class="header">発行年月日</th>
          <th class="header">詳細</th>
        </thead>
        <tbody>
          <tr v-for="item in getItems" :key="item.id">
            <td>
              <div class='title'> {{ item.title }} </div>
            </td>

            <td>
              <div class='author'> {{ item.author }} </div>
            </td>

            <td>
              <div class='issueDay'> {{ item.issueDay }} </div>
            </td>

            <td>
              <p><a class='linked' :href='item.url' target='_blank'>詳細</a></p>
            </td>
          </tr>
        </tbody>

      </table>
      <div>
        <VueJsPaginate
          :page-count="getPaginateCount"
          :prev-text="'<'"
          :next-text="'>'"
          :click-handler="paginateClickCallback"
          :container-class="'pagination justify-content-center'"
          :page-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-class="'page-item'"
          :prev-link-class="'page-link'"
          :next-class="'page-item'"
          :next-link-class="'page-link'"
          :first-last-button="true"
          :first-button-text="'<<'"
          :last-button-text="'>>'"
        ></VueJsPaginate>
      </div>
    </div>

    <Loading class='loading' v-show='isShowLoading'/>
  </div>

</template>

<script>
import VueJsPaginate from "vuejs-paginate";
import Loading from "@/components/Loading";

export default {
  props: [ 'results', 'current', 'isShowLoading', ],
  components: {
    Loading,
    VueJsPaginate,
  },
  data: function() {
    return {
      perPage: 10,
    }
  },
  computed: {
    getItems: function () {
      let start = ((this.current == undefined ? 1 : this.current) - 1) * this.perPage;
      let end = (this.current == undefined ? 1 : this.current) * this.perPage;
      return this.results.slice(start, end);
    },
    getPaginateCount: function () {
      return Math.ceil(this.results.length / this.perPage);
    },
  },
  methods: {
    paginateClickCallback: function (pageNum) {
      this.current = Number(pageNum);
    },
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
  height: 2.5em;
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
  background: #f5f5f5;
  opacity: 0.5;
}
</style>
