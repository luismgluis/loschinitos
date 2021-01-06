<template>
  <v-card elevation="0" :height="pantalla.size.y">
    <v-navigation-drawer
      v-model="barraLateral.visible"
      app
    >
      <!-- contenido de la barra lateral -->
      <component :is="barraLateral.contenido"></component>
    </v-navigation-drawer>

    <v-toolbar color="cyan" dark flat>
      <v-app-bar-nav-icon v-on:click="toggleBarraLateral"></v-app-bar-nav-icon>
      <v-toolbar-title>Los chinitos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs v-model="tab" centered slider-color="yellow">
          <v-tab
            v-for="i in tabs"
            :key="i.key"
            :href="`#tab-${i.key}`"
            @change="card_selected(i.key)"
          >
            <!-- Item {{ i }}-->
            {{ i.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab" @change="card_selected(null)">
      <v-tab-item
        v-for="item in tabs"
        :key="item.key"
        :value="`tab-${item.key}`"
      >
        <v-card flat :height="pantalla.size.y - 104">
          <!--<v-card-text v-text="item.name"></v-card-text> <component v-bind:is="item.content" :key="field.id"></component>-->
          <component
            @updatingPantalla="updatingPantallaActual"
            :is="item.content"
            :key="item.name"
          ></component>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import clientesVue from "../../src/components/pages/clientes/clientes.vue";
import inicio from "../../src/components/pages/inicio/inicio.vue";

export default {
  name: "Home",
  data: () => ({
    titulo: "hola",
    tab: null,
    tabs: {
      inicio: { key: "inicio", name: "Inicio", content: inicio },
      clientes: { key: "clientes", name: "Clientes", content: clientesVue },
    },
    barraLateral:{
      visible:false,
      contenido:null
    },
    pantalla: {
      size: {
        x: window.innerWidth,
        y: window.innerHeight,
      },
    },
  }),
  methods: {
    updatingPantallaActual: function(obj) {
      this.$emit("updatingPantalla", obj);
    },
    toggleBarraLateral(){
      this.barraLateral.visible = !this.barraLateral.visible;
    }
  },
};
</script>
