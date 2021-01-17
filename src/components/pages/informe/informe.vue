<template>
  <v-container>
    <v-col class="busqueda" cols="12" sm="6" md="4">
      <v-text-field
        v-model="busqueda_value"
        label="Busqueda"
        placeholder="Fulanito"
        filled
        rounded
        dense
        clearable
      ></v-text-field>
    </v-col>
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item v-else :key="item.title">
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-container>
</template>
<script>
import clientes from "../../../components/pages/clientes/clientes.js";

const clientesmodule = new clientes();
export default {
  name: "clientes-com",
  data: function() {
    return {
      clientes: clientesmodule,
      items: clientesmodule.get_listado(),
      busqueda_value: "",
      busqueda_counter_check: 0,
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
    busqueda_value(n, o) {
      const context = this;
      console.log(o);
      if (n == null || n == "") {
        return;
      }
      this.busqueda_counter_check++;
      let ccc = this.busqueda_counter_check; //hacemos esto para controlar la asycronizacion
      clientesmodule.filtrar_listado(n, function(res) {
        if (ccc == context.busqueda_counter_check) {
          context.items = res;
        }
      });
    },
    /*p4:function(newval,oldval){__hacealgo__} */
  },
};
</script>
<style lang="scss" scoped>
.busqueda {
  margin-bottom: -20px;
  padding-bottom: 0px;
}
</style>
