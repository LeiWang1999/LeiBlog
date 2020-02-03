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
        path: "technical",
        name: "technical",
        component: () => import("../views/fronted/Technical.vue")
      },
      {
        path: "life",
        name: "life",
        component: () => import("../views/fronted/Life.vue")
      },
      {
        path: "technicaldetail/:id",
        name: "technicaldetail",
        component: () => import("@/views/fronted/TechnicalDetail.vue"),
      },      {
        path: "lifedetail/:id",
        name: "lifedetail",
        component: () => import("@/views/fronted/LifeDetail.vue"),
      },
      {
        path: "material",
        name: "material",
        component: () => import("../views/fronted/Material.vue")
      },
      {

        path: "about",
        name: "about",
        component: () => import("../views/fronted/About.vue")
      },
      {
        path: "comment",
        name: "comment-fonted",
        component: () => import("../views/fronted/Comment.vue")
      },
      {
        path: "search/:keywords",
        name: "search",
        component: () => import("../views/fronted/SearchPage.vue")
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
        component: () => import("@/views/back/Home"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "homeedit",
        name: "homeedit",
        component: () => import("@/views/back/HomeEdit"),
        meta: {
          title: "Home-Edit"
        }
      },
      {
        path: "technical",
        name: "technicallist",
        component: () => import("@/views/back/Technical"),
        meta: {
          title: "Technical"
        }
      },
      {
        path: "technicaledit",
        name: "technicaledit",
        component: () => import("@/views/back/TechnicalEdit"),
        meta: {
          title: "Technical-New"
        }
      },
      {
        path: "technicaledit/:id",
        name: "technicalupdate",
        component: () => import("@/views/back/TechnicalEdit"),
        meta: {
          title: "Technical-Edit"
        }
      },
      {
        path: "life",
        name: "lifelist",
        component: () => import("@/views/back/Life"),
        meta: {
          title: "Life"
        }
      },
      {
        path: "lifeedit",
        name: "lifeedit",
        component: () => import("@/views/back/LifeEdit"),
        meta: {
          title: "Life-New"
        }
      },
      {
        path: "lifeedit/:id",
        name: "lifeupdate",
        component: () => import("@/views/back/LifeEdit"),
        meta: {
          title: "Life-Edit"
        }
      },
      {
        path: "material",
        name: "materiallist",
        component: () => import("@/views/back/Material"),
        meta: {
          title: "Material"
        }
      },
      {
        path: "materialedit",
        name: "materialedit",
        component: () => import("@/views/back/MaterialEdit"),
        meta: {
          title: "Material-New"
        }
      },
      {
        path: "materialedit/:id",
        name: "materialupdate",
        component: () => import("@/views/back/MaterialEdit"),
        meta: {
          title: "Material-Edit"
        }
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/views/back/About"),
        meta: {
          title: "About"
        }
      },
      {
        path: "comment",
        name: "comment",
        component: () => import("@/views/back/Comment"),
        meta: {
          title: "Comment"
        }
      },
      {
        path: "record",
        name: "record",
        component: () => import("@/views/back/Record"),
        meta: {
          title: "备案信息"
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
  } else if (to.path.indexOf("admin") === -1) {
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
