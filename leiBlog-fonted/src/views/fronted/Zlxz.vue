<template>
  <v-container data-title="软件" grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 md8>
        <div class="search-option">
          <v-text-field label="请输入软件名称搜索" v-model="keywords" @keyup.enter="search" solo></v-text-field>
          <v-btn style="margin-left: 20px" @click="search" depressed>搜索</v-btn>
        </div>
        <v-list class="software-list">
          <li class="software-item" :key="index" v-for="(file, index) in files">
            <div class="software-header">
              <div class="software-info">
                <span>
                  <label>下载次数：</label>
                  <strong>{{ file.downloadtime }}</strong>
                </span>
              </div>
              <div class="software-download">
                  <v-btn :href="file.downloadlink" @click="updateCount(index)" style="right: 0;" depressed>下载</v-btn>
              </div>
            </div>
            <div class="software-content">
              <span>
                <label>软件名称：</label>
                <strong>{{ file.name }}</strong>
              </span>
              <p :class="file.expand ? '' : 'intro'">
                <label>介绍：</label>
                {{ file.gist }}
              </p>
              <div
                @click="
                    files[index].expand = !files[index].expand
                  "
                class="expand-pointer"
              >
                <v-icon v-if="!file.expand">mdi-chevron-down</v-icon>
                <v-icon v-if="file.expand">mdi-chevron-up</v-icon>
              </div>
            </div>
          </li>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Zlxz",
  data() {
    return {
      keywords: "",
      files: [],
      currentPage: 1
    };
  },
  mounted() {
    this.fetchData();
    this.files.forEach(element => {
        element.expand = false;
    });
  },
  methods: {
    fetchData() {
      this.request({
        method: "POST",
        url: "/zlxz/fileList"
      })
        .then(res => {
          this.files = res.data.message;
        })
        .catch(err => window.console.log(err));
    },
    search() {},
    updateCount(index) {
      let obj = this.files[index];
      window.console.log(obj);
      if (obj.downloadtime) {
        obj.downloadtime = obj.downloadtime + 1;
      } else {
        obj["downloadtime"] = 1;
      }
      this.request.post("zlxz/updateFile", { fileInfo: obj });
    }
  }
};
</script>

<style scoped lang="scss">
label {
  color: #4d5256 !important;
  font-weight: 500;
}

.search-option {
  margin-bottom: -15px;
  display: flex;
  align-items: baseline;

  button {
    margin-right: 0;
  }
}

img {
  vertical-align: middle;
}

.list {
  list-style: none;
  padding-left: 0;
}

.list li {
  list-style: none;
  font-size: 14px;
  margin-top: 12px;
  color: #666;
  font-weight: 500;
}

.list a {
  color: #666;
  font-weight: 500;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  text-decoration: none;
}

.list a:hover {
  color: #000000;
  text-decoration: underline;
}

.play-count {
  float: right;
}

.software-item {
  display: flex;
  flex-direction: column;
  border-radius: 4px !important;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 15px;

  .software-header {
    display: flex;
    padding: 5px 0 5px;
    align-items: center;
    justify-content: space-between;

    .software-info {
      display: flex;

      span {
        margin-right: 10px;
        font-size: 14px;
        color: #666;
        font-weight: 500;
      }
    }

    .software-download {
      .v-btn {
        min-height: 20px;
      }

      a {
        text-decoration: none;
      }
    }
  }

  .software-content {
    color: #666;
    font-weight: 500;
    padding: 0 5px 5px 0;

    p {
      margin-top: 10px;
      margin-bottom: 0;
      color: #666;
      font-weight: 500;
    }

    div {
      text-align: center;
    }

    .intro {
      color: #666;
      font-weight: 500;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }
}

.expand-pointer {
  text-align: center;
  cursor: pointer;
}
</style>

<style lang="scss">
.search-option {
  .v-input__control {
    min-height: 36px !important;
  }
}

.hot-software {
  .v-card__text {
    margin-top: -10px;
  }
}

@media all and (min-width: 700px) {
  .hot-software {
    position: sticky;
    top: 72px;
  }
}
</style>
