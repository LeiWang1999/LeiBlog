<template>
  <d-player ref="player" :options="options"></d-player>
</template>

<script type="text/ecmascript-6">
  import dPlayer from 'vue-dplayer'
  import 'vue-dplayer/dist/vue-dplayer.css'

  export default {
    name: 'in-video',
    props: {
      source: {
        type: Object,
      }
    },
    data () {
      return {
        player: null,
        options: {
          video: {
            url: ''
          },
        }
      }
    },
    mounted() {
      this.player = this.$refs.player.dp
      window.console.log(this.source.videolink)
      this._setVideoUrl(this.source.videolink)
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