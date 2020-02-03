<template>
<v-card hover flat>
  <v-img
    class="white--text"
    height="200px"
    src="@/static/home/人生信条.jpg"
  >
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <h2 class="headline" style="text-shadow: 0px 2px 5px #222;">人生信条</h2>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
  <v-card-title>
    <div>      
      <p class="grey--text">Cui Beiliang</p>
      <p v-for="(text,i) in texts" :key="i" >{{text}}</p>
    </div>
  </v-card-title>
</v-card>
</template>

<script>
export default {
    name: "rsxtcard",
    data(){
      return {
        texts:[
        '静坐常思已过',
        '闲谈莫论人非',
        '承担自己责任',
        '发现问题是解决不是埋怨'
        ],
        curLikes:0
      }
    }
}
</script>