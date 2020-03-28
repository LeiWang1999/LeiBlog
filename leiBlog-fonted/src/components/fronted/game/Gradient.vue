<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center row wrap>
      <v-flex xs12 md6>
        <vue-p5 @preload="preload" @draw="draw" @mouseclicked="mouseclicked" @setup="setup"></vue-p5>
      </v-flex>
      <v-flex xs12 md6>
        <span class="display-1">参数列表</span>
        <br />
        <span class="subtitle-1">learning_rate =</span>
        {{learning_rate}}
        |
        <v-btn color="purple" outlined @click="learning_rate = learning_rate*2">++</v-btn>|
        <v-btn color="red" outlined @click="learning_rate = learning_rate/2">--</v-btn>
        <br />
        <span class="subtitle-2">B =</span>
        {{b}}
        <br />
        <span class="subtitle-2">W =</span>
        {{w}}
        <br />
        <br />

        <span class="display-1">梯度下降H5</span>
        <br />
        <p class="text-justify">
          梯度下降、Regulation：
          <a href="https://www.bilibili.com/video/BV1JE411g7XF?t=1840&p=3">视频地址</a>
        </p>
        <p class="text-justify">
          本动画Github地址：
          <a
            href="https://github.com/NjtechPrinceling/DLHungYiLee/tree/master/gradientdecent-game"
          >点击前往</a>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import VueP5 from "vue-p5";
export default {
  data() {
    return {
      b: 0,
      w: 1,
      dotPool: [],
      learning_rate: 0.05
    };
  },
  components: {
    VueP5
  },
  methods: {
    preload() {},
    setup(sketch) {
      sketch.createCanvas(600, 400);
    },
    mouseclicked(sketch) {
      const x = sketch.map(sketch.mouseX, 0, sketch.width, 0, 1);
      const y = sketch.map(sketch.mouseY, 0, sketch.height, 1, 0);
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        const point = sketch.createVector(x, y);
        this.dotPool.push(point);
      }
    },
    Loss_GradientDescent() {
      for (var i = 0; i < this.dotPool.length; i++) {
        var x = this.dotPool[i].x;
        var y = this.dotPool[i].y;
        var guess = this.w * x + this.b;
        var error = y - guess;
        this.w = this.w + error * x * this.learning_rate;
        this.b = this.b + error * this.learning_rate;
      }
    },
    draw(sketch) {
      sketch.background(50);
      for (var i = 0; i < this.dotPool.length; i++) {
        var x = sketch.map(this.dotPool[i].x, 0, 1, 0, sketch.width);
        var y = sketch.map(this.dotPool[i].y, 0, 1, sketch.height, 0);
        sketch.fill(255);
        sketch.stroke(255);
        sketch.ellipse(x, y, 8, 8);
      }
      if (this.dotPool.length > 1) {
        this.Loss_GradientDescent();
        this.drawLine(sketch);
      }
    },
    drawLine(sketch) {
      // 两点确定一条直线
      var x1 = 0;
      var y1 = this.w * x1 + this.b;
      var x2 = 1;
      var y2 = this.w * x2 + this.b;

      x1 = sketch.map(x1, 0, 1, 0, sketch.width);
      y1 = sketch.map(y1, 0, 1, sketch.height, 0);
      x2 = sketch.map(x2, 0, 1, 0, sketch.width);
      y2 = sketch.map(y2, 0, 1, sketch.height, 0);

      sketch.stroke(255);
      sketch.strokeWeight(2);
      sketch.line(x1, y1, x2, y2);
    },
    computeY(b, w, x) {
      return b + w * x;
    }
  }
};
</script>

<style scoped>
</style>