<template>
  <div class='container'>
    <div class='row'>
      <div class='pull-right'>
        <button type='button' class='btn btn-primary btn-sm' @click='search()'>検  索</button>
        <button type='button' class='btn btn-primary btn-sm' @click='clear()'>クリア</button>
      </div>
    </div>

    <div class='row'>
      <div class='form-group'>
        <div class='col-xs-5'>
          <ol>
            <li>appid、発行年月日は必須入力とする。</li>
            <li>クリアボタン押下でもappidは残す。</li>
            <li>検索件数の上限は {{ this.maxSearchCount }} 件固定としている。</li>
          </ol>
        </div>
      </div>
    </div>

    <div class='row' style='margin-top:0.8em;'>
      <div class='form-group'>
        <div class='col-xs-4'>
          <label :class='{ errorLabel: isRequiredErrorForAppId }'>appid（必須）</label>
          <input type='text' v-model='applicationId' class='form-control' placeholder='正しい appid を入力してください'>
        </div>
      </div>
    </div>

    <div class='row' style='margin-top:0.8em;'>
      <div class='form-group'>
        <div class='col-xs-3'>
          <label :class='{ errorLabel: isRequiredErrorForDay }'>発行年月日（必須）</label>
          <datepicker
              v-model='fromDay'
              ref='datepicker'
              :monday-first='true'
              :language='ja'
              wrapper-class='calender-text-box-wrapper'
              input-class='calender-text-box'
              placeholder='開始'
              @closed='fromDayClosed'
              format='yyyy/MM/dd' />   
          <datepicker
              v-model='toDay'
              ref='datepicker'
              :monday-first='true'
              :language='ja'
              wrapper-class='calender-text-box-wrapper'
              input-class='calender-text-box'
              placeholder='終了'
              @closed='toDayClosed'
              style='margin-top:2pt;'
              format='yyyy/MM/dd' />   
        </div>

        <div class='col-xs-3'>
          <label for='name'>著者名</label>
          <div id='areaAuthor'>
            <input type='text' id='author_1' class='form-control'>
          </div>
          <button type='button' class='btn btn-primary btn-xs' style='margin-top:2pt;' onclick='addAuthor(this)'>追加</button>
        </div>

        <div class='col-xs-3'>
          <label for='name'>キーワード</label>
          <div id='areaKeyword'>
            <input type='text' id='keyword_1' class='form-control'>
          </div>
          <button type='button' class='btn btn-primary btn-xs' style='margin-top:2pt;' onclick='addKeyword(this)'>追加</button>
        </div>

        <div class='col-xs-3'>
          <label for='name'>タイトル</label>
          <input type='text' v-model='title' class='form-control'>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { Util } from "../utils/Util";
import moment from "moment";
import axios from "axios";
import Datepicker from "vuejs-datepicker";
import { ja } from 'vuejs-datepicker/dist/locale';

export default {
  components: {
    Datepicker
  },
  data: function() {
    return {
        ja: ja,
        applicationId: "",
        countAuthor: 1,
        countKeyword: 1,
        fromDay: "",
        toDay: "",
        title: "",
        // 最大検索件数
        maxSearchCount: 100,
    }
  },
  created() {
    window.addAuthor = this.addAuthor;
    window.addKeyword = this.addKeyword;
  },
  computed: {
    isRequiredErrorForAppId() {
      return this.applicationId.length == 0;
    },
    isRequiredErrorForDay() {
      return this.fromDay.length == 0 || this.toDay.length == 0;
    },
  },
  methods: {
    customFormatter(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
    fromDayClosed() {
      if (this.fromDay) {
        this.fromDay = moment(this.fromDay).format('YYYY/MM/DD');
      }
    },
    toDayClosed() {
      if (this.toDay) {
        this.toDay = moment(this.toDay).format('YYYY/MM/DD');
      }
    },
    /**
     * 著者名 追加
     * @param {Object} e  エレメント
     */
    addAuthor: function(e) {
      let prev = e.previousElementSibling;

      var e = document.createElement('input');
      e.type = 'text';
      this.countAuthor++;
      e.id = 'author_' + this.countAuthor;
      e.className = 'form-control';
      e.style.cssText = 'margin-top: 2pt';

      prev.appendChild(e);
    },
    /**
     * キーワード 追加
     * @param {Object} e  エレメント
     */
    addKeyword: function(e) {
      let prev = e.previousElementSibling;

      var e = document.createElement('input');
      e.type = 'text';
      this.countKeyword++;
      e.id = 'keyword_' + this.countKeyword;
      e.className = 'form-control';
      e.style.cssText = 'margin-top: 2pt';

      prev.appendChild(e);
    },
    /**
     * クリア押下
     */
    clear() {
      this.fromDay = "";
      this.toDay = "";
      this.title = "";

      for (var i = this.countAuthor; i >= 1; i--) {
        let e = document.getElementById('author_' + i);
        if (i > 1) {
          e.remove();
        } else {
          e.value = "";
        }
      }
      for (var i = this.countKeyword; i >= 1; i--) {
        let e = document.getElementById('keyword_' + i);
        if (i > 1) {
          e.remove();
        } else {
          e.value = "";
        }
      }
      this.countAuthor = 1;
      this.countKeyword = 1;
      this.$emit("loadComplete", { results: [], current: 1 });
    },
    /**
     * 検索押下
     */
    async search() {
      // バリデーション
      const message = this.Valid();
      if (message != "") {
        alert(message);
        return;
      }

      // 発行年月日
      let day1 = this.fromDay.split("/");
      let day2 = this.toDay.split("/");
      // 著者名
      let authors = [];
      for (let i = 1; i <= this.countAuthor; i++) {
        let e = document.getElementById('author_' + i);
        if (e.value.trim() != "") {
          authors.push(e.value.trim());
        }
      }
      // キーワード
      let keywords = [];
      for (let i = 1; i <= this.countKeyword; i++) {
        let e = document.getElementById('keyword_' + i);
        if (e.value.trim() != "") {
          keywords.push(e.value.trim());
        }
      }

      // GETパラメータ
      const params = {
        "appid": this.applicationId,
        "lang": "ja",
        "format": "json",
        "count": 100, // TODO
        "from": day1[0] + day1[1],
        "until": day2[0] + day2[1],
        "title": this.title,
        "creator": authors.join(" "),
        "q": keywords.join(" "),
        "sortorder": 0,
      };

      const results = [];

      this.$emit("loadStart");

      const axiosInstance = axios.create({
        baseURL: "https://cir.nii.ac.jp/opensearch" });

      axiosInstance.get("/all", {
          params: params,
      })
      .then(res => {
        const { data } = res;
        const array = data.items;
        array.forEach((e, i) => {
          results.push({
            "id": (i + 1),
            "url": (e["link"])["@id"],
            "title": e["title"],
            "issueDay": e.hasOwnProperty("prism:publicationDate") ? (new Date(e["prism:publicationDate"])).toISOString() : "",
            "author": e.hasOwnProperty("dc:creator") ? e["dc:creator"].join(", ") : "",
          });
        });

      })
      .catch(error => {
        console.log(error);
        alert("想定外の異常が発生しました。");
      })
      .finally (
        () => this.$emit("loadComplete", { results: results, current: 1 })
      );

    },

    /**
     * バリデーション
     */
    Valid() {
      if (this.applicationId == '') {
        return "appidが入力されていません。"
      }
      if (this.fromDay == '' || this.toDay == '') {
        return "発行年月日が入力されていません。"
      }
      if (!Util.isValidDay(this.fromDay) || !Util.isValidDay(this.toDay)) {
        return "発行年月日に入力された値が不正です。"
      }
      if (Util.convertDate(this.fromDay) > Util.convertDate(this.toDay)) {
        return "発行年月日（開始・終了）の前後関係が不正です。"
      }
      return "";
    },
  },
};
</script>

<style>
  .calender-text-box {
      text-align: center;
      border: 1px solid #ccc;
      outline: none;
      width: 120px;
  }
  .vdp-datepicker__calendar {
      width: 96% !important;
  }
  .errorLabel {
    color: red;
  }
  ol {
    background: #f3fbff;
    border: 2px skyblue dashed;
  }
</style>
