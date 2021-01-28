<template>
  <v-container fill-height class="m-0 p-0">
    <v-card
      class="overflow-y-auto elevation-0 m-0"
      :height="pantalla.size.y - 150"
    >
      <v-container fluid >
        <v-radio-group v-model="radio_options_model">
          <v-radio
            v-for="n in radio"
            :key="n.key"
            :label="`${n.name}`"
            :value="n.key"
          ></v-radio>
        </v-radio-group>

        <v-col
          v-if="radio_options_model == 'rango'"
          class="calendar"
          cols="12"
          sm="6"
          md="4"
        >
          <v-date-picker
            v-model="fecha"
            :first-day-of-week="1"
            locale="es"
            full-width
            range
          ></v-date-picker>
          <v-text-field
            v-model="fecha_visual"
            label="Rango fechas"
            prepend-icon="mdi-calendar"
            readonly
          ></v-text-field>
        </v-col>

        <v-card :height="pantalla.size.y - 200">
          <v-toolbar dense elevation="0">
            <v-toolbar-title>Listado de ventas</v-toolbar-title>
            <!-- <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>-->
          </v-toolbar>
          <v-card
            class="overflow-y-auto elevation-0"
            :height="pantalla.size.y - 240"
          >
            <v-list two-line class="listado">
              <!-- v-model="selected" -->
              <v-list-item-group
                active-class="cyan--text"
                multiple
              >
                <template v-for="(item, index) in items">
                  <v-list-item :key="item.uid">
                    <template v-slot:default="{ active }">
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.buyer.name"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          class="text--primary">{{item.produtids.length}} Producto {{  }}, Total: ${{item.pricetotal}}</v-list-item-subtitle>

                        <v-list-item-subtitle>
                          Desde : {{item.device}}
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text
                          v-text="item.hacex"
                        ></v-list-item-action-text>

                        <v-icon v-if="!active" color="grey lighten-1">
                          mdi-checkbox-blank-outline
                        </v-icon>

                        <v-icon v-else color="yellow darken-3">
                          mdi-checkbox-intermediate
                        </v-icon>
                      </v-list-item-action>
                    </template>
                  </v-list-item>

                  <v-divider
                    v-if="index < items.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-card>
      </v-container>
    </v-card>
    <v-btn
      color="pink"
      class="botonplus"
      dark
      absolute
      right
      fab
      v-on:click="nuevaTransaccion"
    >
      <v-icon>mdi-point-of-sale</v-icon>
    </v-btn>
  </v-container>
</template>
<script>
import ventas from "../../../components/pages/ventas/ventas_module.js";

const ventasmodule = new ventas();
export default {
  name: "ventas-com",
  data: function () {
    return {
      ventas: ventasmodule,
      items: [],
      busqueda_value: "",
      busqueda_counter_check: 0,
      fecha: new Date().toISOString().substr(0, 10),
      rango_fechas_enabled: false,
      radio: [
        { key: "hoy", name: "Hoy" },
        { key: "rango", name: "Rango de fechas" },
      ],
      radio_options_model: "hoy",
      pantalla: {
        size: {
          x: window.innerWidth,
          y: window.innerHeight,
        },
      },
    };
  },
  methods: {
    get_rango(){
      const context = this;
      ventasmodule.get_listado().then(function (res) {
        context.items = res;
      })
    },
    formatDate(date) {
      if (!date) return null;
      console.log(date);
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    nuevaTransaccion(){
      alert("Vamos a crear una nueva transaccion-- en desarrollo")
    }
  },
  props: [
    /*"propertiename"*/
  ],
  computed: {
    fecha_visual() {
      let fecha = this.fecha;
      console.log(this.fecha);
      if (!Array.isArray(fecha)) {
        return fecha;
      } else {
        return `${this.formatDate(fecha[0])} - ${this.formatDate(fecha[1])}`;
      }
    },
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
      ventasmodule.filtrar_listado(n, function (res) {
        if (ccc == context.busqueda_counter_check) {
          context.items = res;
        }
      });
    },
    /*p4:function(newval,oldval){__hacealgo__} */
  },
  mounted() {
    this.$emit("OnLoadPage", { name: "ventas", data: {} });
    this.get_rango();
  },
};
</script>
<style lang="scss" scoped>
.busqueda {
  margin-bottom: -20px;
  padding-bottom: 0px;
}
.abajo {
  z-index: 2;
  position: fixed;
  bottom: 0px;
  height: 50px !important;
}
.abajo .titulo {
  padding: 10px 20px !important;
}
.listado {
  padding-bottom: 50px;
}
.botonplus {
  bottom: 20px;
  position: absolute;
}
</style>
