<template>
  <v-navigation-drawer v-model="dra" :mini-variant="mini" mini-variant-width="68" clipped app>
    <v-list>
      <v-list-item @click.stop="mini = !mini">
        <v-list-item-icon>
          <v-icon v-show="!mini">mdi-format-indent-decrease</v-icon>
          <v-icon v-show="mini">mdi-format-indent-increase</v-icon>
        </v-list-item-icon>
        <v-list-item-title>收起</v-list-item-title>
      </v-list-item>
      <template v-for="item in items">
        <v-list-group
          :prepend-icon="item.icon"
          v-model="item.active"
          no-action
          v-if="item.items"
          :key="item.title"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item :to="list.to" v-for="list in item.items" :key="list.title" ripple>
            <v-list-item-icon>
              <v-icon>{{list.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{list.title}}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item :to="item.to" :key="item.title" ripple v-else>
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navigation",
  data: () => ({
    mini: false,
    active: true,
    items: [
      {
        icon: "mdi-home",
        title: "首页",
        to: "/admin/home"
      },
      {
        icon: "mdi-format-align-justify",
        title: "编辑",
        active: true,
        items: [
          {
            icon: "mdi-tab",
            title: "编辑器测试",
            to: "/admin/editdemo"
          },
          {
            icon: "mdi-tab",
            title: "个人简介",
            to: "/admin/grjj"
          },
          {
            icon: "mdi-tab",
            title: "近期动态",
            to: "/admin/jqdt"
          },
          {
            icon: "mdi-tab",
            title: "出版专著",
            to: "/admin/cbzz"
          },
          {
            icon: "mdi-tab",
            title: "技术专栏",
            to: "/admin/jszl"
          },
          {
            icon: "mdi-tab",
            title: "资料下载",
            to: "/admin/zlxz"
          },
          {
            icon: "mdi-tab",
            title: "用户留言",
            to: "/admin/message"
          },
          {
            icon: "mdi-tab",
            title: "人生信条",
            to: "/admin/table"
          }
        ]
      },
      {
        icon: "mdi-tab",
        title: "选项卡",
        to: "/admin/tabs"
      }
    ]
  }),
  computed: {
    ...mapGetters(["drawer"]),
    dra: {
      get: function() {
        return this.drawer;
      },
      set: function() {
        this.updateDrawer;
      }
    }
  },
  methods: {
    ...mapActions(["updateDrawer"])
  }
};
</script>