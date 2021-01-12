<template>
  <v-card class="rounded-0" elevation="0" :height="pantalla.size.y - 105">
    <v-bottom-navigation
      class="abajo elevation-0"
      :input-value="bbb.uno"
      v-model="bbb.dos"
      grow
      color="cyan"
    >
      <v-btn
        text
        v-for="item in tabs"
        :key="item.key"
        v-on:click="card_selected(item.key)"
      >
        <span color="grey text--lighten-2 ">{{ item.name }}</span>
        <v-icon v-if="tab == item.key" color="cyan">{{ item.icon }}</v-icon>
        <v-icon v-if="tab !== item.key" color="grey lighten-2">{{
          item.icon
        }}</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <!-- <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        Recents
        <v-icon>mdi-phone</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Favorites
        <v-icon>mdi-heart</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Nearby
        <v-icon>mdi-account-box</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs v-model="tab" background-color="cyan" dark>
      <v-tab
        v-for="item in tabs"
        :key="item.key"
        @change="card_selected(item.key)"
      >
        {{ item.name }}
      </v-tab>
    </v-tabs>-->

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabs" :key="item.key" :value="item.key">
        <v-card
          :height="pantalla.size.y - 105"
          class="bla overflow-y-auto"
        >
          <!--<v-card-text>{{ item.content }}</v-card-text> 
          -->
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
import ventas from "../../src/components/pages/ventas/ventas.vue";
import informe from "../../src/components/pages/informe/informe.vue";
import importexport from "../../src/components/pages/import_export/import_export.vue";
import barra_lateralVue from "./pages/barra_lateral/barra_lateral.vue";

export default {
  name: "Home",
  data: () => ({
    bbb: { uno: null, dos: null },
    titulo: "hola",
    tab: "inicio",
    tabs: {
      inicio: {
        key: "inicio",
        name: "Inicio",
        content: inicio,
        icon: "mdi-home",
      },
      clientes: {
        key: "clientes",
        name: "Clientes",
        content: clientesVue,
        icon: "mdi-account-multiple",
      },
      ventas: {
        key: "ventas",
        name: "Ventas",
        content: ventas,
        icon: "mdi-wallet-giftcard",
      },
    },
    othertabs: {
      informe: { key: "informe", name: "Informe", content: informe },
      importexport: {
        key: "importexport",
        name: "Import/Export",
        content: importexport,
      },
    },
    barraLateral: {
      visible: false,
      contenido: barra_lateralVue,
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
    toggleBarraLateral() {
      this.barraLateral.visible = !this.barraLateral.visible;
    },
    card_selected: function(card_id) {
      if (!card_id) {
        card_id = this.tab.split("-")[1];
      }
      console.log(card_id);
      this.tab = card_id;
    },
  },
};
</script>
<style lang="scss" scoped>
.abajo {
  z-index: 2;
  position: absolute;
  bottom: 0px;
  height: 50px !important;
}
.abajo .titulo {
  padding: 10px 20px !important;
}
</style>
