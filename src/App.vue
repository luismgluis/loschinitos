<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="buscando_enabled" app>
      <!-- contenido lateral-->
    </v-navigation-drawer>
     <v-app-bar
        absolute
        color="#6A76AB"
        dark
        scroll-threshold
        shrink-on-scroll
        prominent
        src="https://picsum.photos/1920/1080?random"
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-3"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>

        <v-app-bar-nav-icon
          v-if="!buscando_enabled"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-container v-if="!buscando_enabled">
          <div>
            <h5>LosChinitos</h5>
          </div>
        </v-container>

        <v-spacer v-if="!buscando_enabled"></v-spacer>

        <v-autocomplete v-if="buscando_enabled"></v-autocomplete>

        <v-btn
          icon
          @click="buscando_enabled = !buscando_enabled"
          v-if="!buscando_enabled"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <template v-if="buscando_enabled" v-on:click="buscarEnabled">
          <custom-icon   :imagesourse="require('./assets/close.svg')" />
        </template>

        <v-btn v-if="!buscando_enabled" icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab>Tab 1</v-tab>
            <v-tab>Tab 2</v-tab>
            <v-tab>Tab 3</v-tab>
            <v-tab>Tab 3</v-tab>
            <v-tab>Tab 3</v-tab>
            <v-tab>Tab 3</v-tab>
            <v-tab>Tab 3</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-3"
        class="overflow-y-auto"
        max-height="600"
      >
        <v-container  style="height: 1000px;">
          <Home />
        </v-container>
      </v-sheet>
  </v-app>
</template>

<script>
import Home from "./components/Home";
import CustomIcon from "./components/ui/CustomIcon";
import { VTextField } from "vuetify/lib";


//import {VContainer} from 'vuetify/lib'
export default {
  name: "App",
  components: {
    Home,
    CustomIcon,
  },

  data: () => ({
    //
    buscando_enabled: false,
    drawer: true,
    selection: [],
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    cargar_opciones: function() {
      let nuevo = new VTextField();
      console.log(nuevo);
    },
    images: {
      //close: require("../assets/close.svg")
    },
  }),
  methods:{
    buscarEnabled: function (e) {
      console.log(e);
      this.buscando_enabled = !this.buscando_enabled;
    }
  }
};
</script>
