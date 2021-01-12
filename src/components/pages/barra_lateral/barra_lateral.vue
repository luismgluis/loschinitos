<template>
  <div>
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Luis Miguel -Fake</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <template v-for="item in items">
        <v-list-item
          :key="item.title"
          :href="item.href"
          :to="{ name: item.href }"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>
<script>
import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();

export default {
  name: "barra-lateral",
  data: function() {
    return {
      avatar: generator.generateRandomAvatar("gianni"),
      items: [
        { title: "Inicio", href: "home", icon: "mdi-home" },
        { title: "Importar/exportar", href: "importexport", icon: "mdi-folder-swap-outline" },
      ],
    };
  },
  methods: {},
  props: [
    /*"propertiename"*/
  ],
  computed: {
    /* auto_p3: function () {return `${this.p1} - ${this.p2}`}*/
  },
  components: {
    /*"component_name":componentimport*/
  },
  watch: {
    /*p4:function(newval,oldval){__hacealgo__} */
  },
  mounted() {},
};
</script>
<style></style>
