<template>
    <v-layout row wrap>
        <v-flex xs12>
            <Sparkline />
        </v-flex>
    </v-layout>    
</template>
<script>
import Sparkline from '@/components/back/Sparkline'

export default {
    name: 'home',
    components: {
        Sparkline
    }
}
</script>
