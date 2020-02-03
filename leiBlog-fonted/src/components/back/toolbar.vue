<template>
    <v-app-bar
        class="primary"
        height="58px"
        clipped-left
        flat
        dark
        app
    >
        <v-toolbar-title style="width: 260px">
            <span class="toolbar-title ml-3 mr-3 white--text">Lei的个人网站<span class="white--text">管理</span></span>

            <v-app-bar-nav-icon @click.native="updateDrawer"></v-app-bar-nav-icon>
        </v-toolbar-title>
        
        <v-text-field
            flat
            :solo-inverted="!$vuetify.theme.dark"
            :solo="$vuetify.theme.dark"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
        ></v-text-field>

        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-menu
                offset-y
                left
                transition="slide-y-reverse-transition"
                :close-on-content-click="false"
            >
                <template v-slot:activator="{ on }">
                    <v-btn text v-on="on">
                        <v-avatar size="40" class="avatar">
                            <img src="@/assets/avd.jpg" alt="avatar">
                        </v-avatar>
                    </v-btn>
                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-avatar>
                            <img src="@/assets/avd.jpg" alt="John">
                            </v-list-item-avatar>

                            <v-list-item-content>
                            <v-list-item-title>Admin</v-list-item-title>
                            <v-list-item-subtitle>南京工业大学信息中心</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                            <v-btn
                                icon
                                :class="fav ? 'red--text' : ''"
                                @click="fav = !fav"
                            >
                                <v-icon>mdi-heart</v-icon>
                            </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list>
                        <v-list-item>
                            <v-list-item-action>
                            <v-switch v-model="message"></v-switch>
                            </v-list-item-action>
                            <v-list-item-title>Enable messages</v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-action>
                            <v-switch v-model="hints"></v-switch>
                            </v-list-item-action>
                            <v-list-item-title>Enable hints</v-list-item-title>
                        </v-list-item>
                    </v-list>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text @click="menu = false">取消</v-btn>
                        <v-btn color="primary" text @click="menu = false">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
            <v-btn text @click.stop="updateSetting">
                <v-icon>mdi-palette</v-icon>
            </v-btn>
            <v-btn text @click="logout">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Toolbar',
    data: () => ({
        fav: true,
        menu: false,
        message: false,
        hints: true
    }),
    methods: {
        ...mapActions(['updateDrawer', 'updateSetting']),
        logout() {
            localStorage.removeItem('accessToken');
            this.$router.push({ path: '/login' });
        }
    }
}
</script>
