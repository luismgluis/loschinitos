<template>
  <v-card elevation="0" class="rounded-0" width="400">
    <v-img
      height="200px"
      src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
    >
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-btn v-on:click="goHome" color="white" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title class="title white--text pl-0">
          Messages
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn color="white" icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

      <v-card-title class="white--text mt-8">
        <v-avatar size="56">
          <img
            alt="user"
            src="https://randomuser.me/api/portraits/men/78.jpg"
          />
        </v-avatar>
        <p class="ml-3">
          John Doe
        </p>
      </v-card-title>
    </v-img>

    <v-card-text>
      <div class="font-weight-bold mb-2 subtitle-1">
        Today
      </div>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ml-4">
            4.5 (413)
          </div>
        </v-row>

        <div class="my-4 subtitle-1">
          $ • Italian, Cafe
        </div>

        <div>
          Small plates, salads & sandwiches - an intimate setting with 12 indoor
          seats plus patio seating.
        </div>
        <v-col class="campoedit" cols="12" sm="6">
          <v-text-field
            value="John Doe"
            label="Outlined"
            outlined
            readonly
          ></v-text-field>
        </v-col>
        <v-col class="campoedit" cols="12" sm="6">
          <v-text-field
            value="John Doe"
            label="Outlined"
            outlined
            readonly
          ></v-text-field>
        </v-col>

        <v-btn color="primary" @click="hidden = !hidden">
          {{ hidden ? "Show" : "Hide" }}
        </v-btn>
      </v-card-text>
    </v-card-text>
  </v-card>
</template>
<script>
import cliente_info_module from "../../../components/pages/cliente_info/cliente_info.js";
const cinfo = new cliente_info_module();
export default {
  name:"cliente-info",
  data: function() {
    return {
      client_info_class: cinfo,
    };
  },
  methods: {
    goHome() {
      this.$router.replace({ name: "home", params: { fromview: "cliente_info" } });
    },
  },
  props: [
    "uid"
  ],
  computed: {
    /* auto_p3: function () {return `${this.p1} - ${this.p2}`}*/
  },
  components: {
    /*"component_name":componentimport*/
  },
  watch: {
    uid(){
      console.log(this.uid);
    }
  },
  mounted() {
    console.log("cliente_info");
  },
};
</script>
<style lang="scss" scoped>
.campoedit {
  margin-bottom: -20px;
}
</style>
