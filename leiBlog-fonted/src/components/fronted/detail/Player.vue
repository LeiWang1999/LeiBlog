<template>
  <d-player ref="player" @click="setVideoUrl(source.videolink)" :options="options"></d-player>
</template>

<script type="text/ecmascript-6">
  import dPlayer from 'vue-dplayer'
  import 'vue-dplayer/dist/vue-dplayer.css'

  export default {
    name: 'in-video',
    data () {
      return {
        player: null,
        options: {
          video: {
            url: ""
          },
        },
      }
    },
    mounted() {
      this.player = this.$refs.player.dp
            this.request
        .get("/jszl/articleDetail/" + this.$route.params.id)
        .then(res => {
          let source = res.data.info;
          this._setVideoUrl(source.videolink)
        });
    },
    methods: {
      // 设置视频播放路径
      _setVideoUrl (url) {
        this.player.switchVideo({
          url: url
        })
      }
    },
    components: {
      dPlayer
    }
  }
</script>