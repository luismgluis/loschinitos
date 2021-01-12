<template>
  <v-card
    class="mx-auto"
    color="#26c6da"
    dark
    max-width="400"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-feather
      </v-icon>
      <span class="title font-weight-light">Actualidad</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      Las ventas de hoy han superdado un 2% las de ayer.
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            :src="avatar"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Rodolfo Admin</v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
          <v-icon class="mr-1">
            mdi-heart
          </v-icon>
          <span class="subheading mr-2">256</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
<script>
import { AvatarGenerator } from 'random-avatar-generator';

const generator = new AvatarGenerator();

export default {
  name: "carta-inicio",
  data: function() {
    return {
        avatar:generator.generateRandomAvatar('luis_miguel_grajales_loaiza')
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
  mounted() {
    /*onStart*/
  },
};
</script>
<style></style>
