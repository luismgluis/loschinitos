import my_genericos from "../../../components/utils/my_genericos.js";
import api from "../../../components/utils/api.js";
class ventas {
  constructor() {
    console.log(my_genericos.fecha.obtener_fecha_actual_numeric());
    this.listado = [
      {
        action: "1 hr",
        headline: "$15.000",
        subtitle: `07/01/2021 16:45`,
        title: "Gomitas",
      },
      {
        action: "2 hr",
        headline: "$20.000",
        subtitle: `07/01/2021 16:45`,
        title: "Egg",
      },
      {
        action: "10 hr",
        headline: "$20.000",
        subtitle: `07/01/2021 16:45`,
        title: "Macaroni and cheese spiralss",
      },
      {
        action: "12 hr",
        headline: "$25.000",
        subtitle: `07/01/2021 16:45`,
        title: "CocaCola sixpack",
      },
      {
        action: "19 hr",
        headline: "$30.000",
        subtitle: `07/01/2021 16:45`,
        title: "Oil",
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        title: "Britta Holt22",
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        title: "Britta Holt222",
      },
    ];
  }
  get_listado() {
    const context = this;
    console.log("get listado");
    
    return new Promise(function(resolve, reject) {
      try {
        let actual = my_genericos.fecha.obtener_fecha_actual_texto();
        let actual_obj = my_genericos.fecha.fecha_objeto(actual, false);
        let actualUnix = my_genericos.fecha.fecha_unix_to_object(actual_obj);
        api.transaccionesRango(actualUnix, actualUnix).then(function(res) {
          console.log(res);
          if (res !== null) {
            context.listado = res;
            resolve(res);
          }
        });
      } catch (error) {
        reject("error");
      }
    });
  }
}
export default ventas;

/*class client_info {
    constructor() {

    }
}
export default client_info;*/
