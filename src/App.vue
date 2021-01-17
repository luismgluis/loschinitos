<template>
  <v-app id="inspire" class="overflow-y-hidden">
    <v-navigation-drawer v-model="pantallas.barra.visible" app>
      <!-- contenido de la barra lateral -->
      <component :is="pantallas.barra.content"></component>
    </v-navigation-drawer>
    <v-toolbar color="cyan" dark flat v-if="toolbarEnabled">
      <v-app-bar-nav-icon v-on:click="toggleBarraLateral"></v-app-bar-nav-icon>
      <v-toolbar-title>Los chinitos</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-card
      elevation="0"
      class="contenedor overflow-y-hidden rounded-0"
      :height="contenedorAltura"
    >
      <v-fade-transition mode="out-in">
        <keep-alive max="5">
          <router-view
            @OnLoadPage="OnLoadPage"
            :key="$route.fullPath"
          ></router-view>
        </keep-alive>
      </v-fade-transition>
    </v-card>
  </v-app>
</template>
<!-- <component
        v-if="!pantalla2enabled"
        @updatingPantalla="updatingPantallaActual"
        :is="pantallas.home"
      ></component>-->
<script>
import Home from "./components/Home";
import client_info from "./components/pages/cliente_info/cliente_info.vue";
import barra_lateral from "./components/pages/barra_lateral/barra_lateral.vue";
import Globals from "./components/utils/globals.js";
//import {VContainer} from 'vuetify/lib'
export default {
  name: "App",
  components: {
    //CustomIcon,
  },
  data: () => ({
    items: [
      {
        href: "home",
        router: true,
        title: "Home",
        icon: "home",
      },
      {
        href: "examples",
        router: true,
        title: "Example",
        icon: "extension",
      },
      {
        href: "about",
        router: true,
        title: "About",
        icon: "domain",
      },
    ],
    pantallas: {
      home: Home,
      secundaria: client_info,
      barra: {
        content: barra_lateral,
        visible: false,
      },
    },
    pantalla2enabled: false,
    images: {
      background: "./assets/mockup.jpg",
      //close: require("../assets/close.svg")
    },
    toolbarEnabled: true,
    pantalla: {
      size: {
        x: window.innerWidth,
        y: window.innerHeight,
      },
    },
    contenedorAltura: window.innerHeight,
  }),
  methods: {
    toggleBarraLateral() {
      this.pantallas.barra.visible = !this.pantallas.barra.visible;
    },
    OnLoadPage(data = {}) {
      this.toolbarVisibilidad(data.name);
    },
    toolbarVisibilidad(pantallaAtual = "") {
      const context = this;
      if (pantallaAtual == "cliente_info") {
        this.toolbarEnabled = false;
      } else {
        this.toolbarEnabled = true;
      }
      context.contenedorAltura =
        context.pantalla.size.y - (context.toolbarEnabled ? 56 : 0);
    },
    updatingPantallaActual(nuevapantalla = {}) {
      console.log(nuevapantalla);
      if (nuevapantalla.name == "Home") {
        this.pantallas.home = Home;
        //this.pantalla2enabled = false;
      } else {
        this.pantallas.home = nuevapantalla.content;
        //this.pantalla2enabled = true;
      }
    },
    buscarEnabled: function (e) {
      console.log(e);
      this.buscando_enabled = !this.buscando_enabled;
    },
    cargar_opciones: function () {},
    tabs_content: function (card_id) {
      card_id = card_id.toUpperCase();
      if (card_id == "CLIENTES") {
        //return new clientesVue();
      }
    },
    card_selected: function (card_id) {
      if (!card_id) {
        card_id = this.tab.split("-")[1];
      }
      console.log(card_id);
    },
  },
  computed: {
    /* auto_p3: function () {return `${this.p1} - ${this.p2}`}*/
  },
  mounted() {
    const context = this;
    console.log("start_app");
    window.addEventListener("resize", function () {
      console.log(window.innerHeight);
      context.pantalla.size.x = window.innerWidth;
      context.pantalla.size.y = window.innerHeight;
      context.contenedorAltura =
        context.pantalla.size.y - (context.toolbarEnabled ? 56 : 0);
    });
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
      this.toolbarVisibilidad(to.name);
      let globals = new Globals(this.$globals);
      globals.setActualpage(to.name);
    },
  },
};
</script>
<style lang="scss" scoped>
.contenedor {
  padding-bottom: 50px;
}
</style>
