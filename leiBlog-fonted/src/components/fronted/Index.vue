<template>
  <v-app>
    <Navbar />
    <v-content>
      <transition appear name="fade">
        <router-view />
      </transition>
    </v-content>
    <pageFooter />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/fronted/Navbar";
import pageFooter from "@/components/fronted/pageFooter";
export default {
  name: "fontedindex",
  components: {
    Navbar,
    pageFooter
  },
  data: () => ({
  }),
  mounted() {
    this.request({
      method: "get",
      url: "http://pv.sohu.com/cityjson?ie=utf-8",
      withCredentials: false
    })
      .then(res => {
        const strObj = res.data
          .replace("var", "")
          .replace("returnCitySN", "")
          .replace("=", "")
          .replace(";", "");
        const visitInfo1 = JSON.parse(strObj);
        const visitInfo2 = this.getBrowserInfo();
        let visitInfo = visitInfo1;
        visitInfo.os = visitInfo2[0];
        visitInfo.browser = visitInfo2[1];
        visitInfo.browserVersion = visitInfo2[2];
        visitInfo.date = this.getDate();
        this.request.post("/history/updateHistory", { info: visitInfo });
      })
      .catch(() => {
        const visitInfo2 = this.getBrowserInfo();
        let visitInfo = {};
        visitInfo.os = visitInfo2[0];
        visitInfo.browser = visitInfo2[1];
        visitInfo.browserVersion = visitInfo2[2];
        visitInfo.date = this.getDate();
                this.request.post("/history/updateHistory", { info: visitInfo });
      });
  },
  methods: {
    getDate: function() {
      let mydate, y, m, d, hh, mm, ss;
      mydate = new Date();
      y = mydate.getFullYear();
      m = mydate.getMonth() + 1;
      d = mydate.getDate();
      hh = mydate.getHours();
      mm = mydate.getMinutes();
      ss = mydate.getSeconds();
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      if (hh < 10) hh = "0" + hh;
      if (mm < 10) mm = "0" + mm;
      if (ss < 10) ss = "0" + ss;
      let date = y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
      return date;
    },
    getBrowserInfo() {
      var agent = navigator.userAgent.toLowerCase();
      var arr = [];
      var system = agent
        .split(" ")[1]
        .split(" ")[0]
        .split("(")[1];
      arr.push(system);
      var regStr_edge = /edge\/[\d.]+/gi;
      var regStr_ie = /trident\/[\d.]+/gi;
      var regStr_ff = /firefox\/[\d.]+/gi;
      var regStr_chrome = /chrome\/[\d.]+/gi;
      var regStr_saf = /safari\/[\d.]+/gi;
      var regStr_opera = /opr\/[\d.]+/gi;
      //IE
      if (agent.indexOf("trident") > 0) {
        arr.push(agent.match(regStr_ie)[0].split("/")[0]);
        arr.push(agent.match(regStr_ie)[0].split("/")[1]);
        return arr;
      }
      //Edge
      if (agent.indexOf("edge") > 0) {
        arr.push(agent.match(regStr_edge)[0].split("/")[0]);
        arr.push(agent.match(regStr_edge)[0].split("/")[1]);
        return arr;
      }
      //firefox
      if (agent.indexOf("firefox") > 0) {
        arr.push(agent.match(regStr_ff)[0].split("/")[0]);
        arr.push(agent.match(regStr_ff)[0].split("/")[1]);
        return arr;
      }
      //Opera
      if (agent.indexOf("opr") > 0) {
        arr.push(agent.match(regStr_opera)[0].split("/")[0]);
        arr.push(agent.match(regStr_opera)[0].split("/")[1]);
        return arr;
      }
      //Safari
      if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
        arr.push(agent.match(regStr_saf)[0].split("/")[0]);
        arr.push(agent.match(regStr_saf)[0].split("/")[1]);
        return arr;
      }
      //Chrome
      if (agent.indexOf("chrome") > 0) {
        arr.push(agent.match(regStr_chrome)[0].split("/")[0]);
        arr.push(agent.match(regStr_chrome)[0].split("/")[1]);
        return arr;
      } else {
        arr.push("请更换主流浏览器，例如chrome,firefox,opera,safari,IE,Edge!");
        return arr;
      }
    }
  },
  computed: {
    ...mapGetters(["title"])
  },
  watch: {
    title() {
      let highestLevel = this.$store.getters.level;
      let title = this.$store.getters.title;
      if (highestLevel === 1) {
        let obj = {};
        let iterms = [];
        obj.text = "导航";
        obj.disabled = true;
        obj.href = "/home";
        iterms.push(obj);
        this.currentIterm = iterms;
      } else if (highestLevel === 2) {
        let obj1 = {};
        let obj2 = {};
        let iterms = [];
        obj1.text = "导航";
        obj1.disabled = false;
        obj1.href = "/home";
        iterms.push(obj1);
        obj2.text = title[1];
        obj2.disabled = true;
        obj2.href = this.$route.fullPath;
        iterms.push(obj2);
        this.currentIterm = iterms;
      } else {
        let obj1 = {};
        let obj2 = {};
        let obj3 = {};
        let iterms = [];
        obj1.text = "导航";
        obj1.disabled = false;
        obj1.href = "/home";
        iterms.push(obj1);
        obj2.text = title[1];
        obj2.disabled = true;
        obj2.href = this.$route.fullPath;
        iterms.push(obj2);
        obj3.text = title[2];
        obj3.disabled = true;
        obj3.href = "";
        iterms.push(obj3);
        this.currentIterm = iterms;
      }
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>