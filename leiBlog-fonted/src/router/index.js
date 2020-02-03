import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Index from "@/components/fronted/Index.vue";
import Login from "@/views/back/Login.vue";
import Layout from "@/components/back/Layout.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "home",
    component: Index,
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../views/fronted/Home.vue")
      },
      {
        path: "jqdt",
        name: "jqdt",
        component: () => import("../views/fronted/Jqdt.vue")
      },
      {
        path: "jqdtDetail/:id",
        name: "jqdtdetail",
        component: () => import("../views/fronted/JqdtDetail.vue")
      },
      {
        path: "cbzz",
        name: "cbzz",
        component: () => import("../views/fronted/Cbzz.vue")
      },
      {
        path: "jszl",
        name: "jszl",
        component: () => import("../views/fronted/Jszl.vue")
      },
      {
        path: "jszlDetail/:id",
        name: "jszldetail",
        component: () => import("../views/fronted/JszlDetail.vue")
      },
      {
        path: "zlxz",
        name: "zlxz",
        component: () => import("../views/fronted/Zlxz.vue")
      },
      {
        path: "yhlt",
        name: "yhlt",
        component: () => import("../views/fronted/Yhlt.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/admin",
    redirect: "/admin/home",
    component: Layout,
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/back/home"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "tabs",
        name: "Tabs",
        component: () => import("@/views/back/tabs"),
        meta: {
          title: "选项卡"
        }
      },
      {
        path: "editdemo",
        name: "EditDemo",
        component: () => import("@/views/back/EditDemo"),
        meta: {
          title: "编辑测试"
        }
      },
      {
        path: "jqdt",
        name: "jqdtlist",
        component: () => import("@/views/back/jqdt"),
        meta: {
          title: "近期动态"
        }
      },
      {
        path: "jqdtedit",
        name: "jqdtedit",
        component: () => import("@/views/back/jqdtEdit"),
        meta: {
          title: "近期动态-新增"
        }
      },
      {
        path: "jqdtedit/:id",
        name: "jqdtupdate",
        component: () => import("@/views/back/jqdtEdit"),
        meta: {
          title: "近期动态-编辑"
        }
      },
      {
        path: "grjj",
        name: "grjjadmin",
        component: () => import("@/views/back/grjj"),
        meta: {
          title: "个人简介"
        }
      },
      {
        path: "cbzz",
        name: "cbzzlist",
        component: () => import("@/views/back/cbzz"),
        meta: {
          title: "出版专著"
        }
      },
      {
        path: "cbzzedit",
        name: "cbzzedit",
        component: () => import("@/views/back/cbzzEdit"),
        meta: {
          title: "出版专著-新增"
        }
      },
      {
        path: "cbzzedit/:id",
        name: "cbzzupdate",
        component: () => import("@/views/back/cbzzEdit"),
        meta: {
          title: "出版专著-编辑"
        }
      },
      {
        path: "jszl",
        name: "jszllist",
        component: () => import("@/views/back/jszl"),
        meta: {
          title: "技术专栏"
        }
      },
      {
        path: "jszledit",
        name: "jszledit",
        component: () => import("@/views/back/jszlEdit"),
        meta: {
          title: "技术专栏-新增"
        }
      },
      {
        path: "jszledit/:id",
        name: "jszlupdate",
        component: () => import("@/views/back/jszlEdit"),
        meta: {
          title: "技术专栏-编辑"
        }
      },
      {
        path: "zlxz",
        name: "zlxzlist",
        component: () => import("@/views/back/zlxz"),
        meta: {
          title: "资料下载"
        }
      },
      {
        path: "zlxzedit",
        name: "zlxzedit",
        component: () => import("@/views/back/zlxzEdit"),
        meta: {
          title: "资料下载-新增"
        }
      },
      {
        path: "zlxzedit/:id",
        name: "zlxzupdate",
        component: () => import("@/views/back/zlxzEdit"),
        meta: {
          title: "资料下载-编辑"
        }
      },
      {
        path: "message",
        name: "message",
        component: () => import("@/views/back/yhly"),
        meta: {
          title: "用户留言"
        }
      }
    ]
  },
  {
    path: "/admin",
    component: Layout,
    redirect: "/table",
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/back/table"),
        meta: {
          title: "表格"
        }
      }
    ]
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name == "Login") {
    if (localStorage.getItem("accessToken")) {
      next(from.path);
    } else {
      next();
    }
  }else if(to.path.indexOf("admin") === -1){
    next();
  } else {
      if (localStorage.getItem("accessToken")) {
      store.commit("setTabs", {
        name: to.meta.title,
        href: to.path
      });
      next();
    } else {
      next({
        path: "/login"
      });
    }
  }
});

export default router;
