import my_genericos from "../../../components/utils/my_genericos.js";
import api from "../../../components/utils/api.js";
class clientes {
  constructor() {
    this.listado = [];
  }

  get_listado() {
    const context = this;
    return new Promise(function(resolve, reject) {
      api.clientesAll().then(function(json) {
        let division = { divider: true, inset: true };
        let arr_result = [];

        arr_result.push({ header: "Hoy" }); //cabecera
        for (const key in json) {
          if (Object.hasOwnProperty.call(json, key)) {
            const element = my_genericos.tipos.cliente(json[key], true);
            json[key] = element;
            arr_result.push(element);
            arr_result.push(Object.assign(division, {})); //copia de division
          }
        }
        context.listado = Object.values(json);
        resolve(arr_result);
      }).catch(function (res) {reject(res)});
      /*const ruta = `${my_genericos.constantes.DBHOST}/clientes`;
      my_genericos.httpGetAsync(ruta, function(res) {
        console.log(res);
        let json = {};
        try {
          json = res.clientes;
          //json = JSON.parse(res);
          //json = json.clientes;//este es el objeto padre dado por el endpoint /clientes
        } catch (error) {
          reject("json parse fail");
        }

        let division = { divider: true, inset: true };
        let arr_result = [];

        arr_result.push({ header: "Hoy" }); //cabecera
        for (const key in json) {
          if (Object.hasOwnProperty.call(json, key)) {
            const element = my_genericos.tipos.cliente(json[key], true);
            json[key] = element;
            arr_result.push(element);
            arr_result.push(Object.assign(division, {})); //copia de division
          }
        }
        context.listado = Object.values(json);
        resolve(arr_result);
      }); */
    });
  }
  filtrar_listado(text, fn) {
    const listado = this.listado;
    const listado_res = [];
    const size = my_genericos.object_count(listado);
    let conteo = 0;
    let conteop = 0;
    const division = { divider: true, inset: true };

    const cabecera = { header: `${conteo}/${size}` };
    listado_res.push(cabecera);

    for (const key in listado) {
      if (Object.hasOwnProperty.call(listado, key)) {
        const cliente = my_genericos.tipos.cliente(listado[key]);

        my_genericos.coincidencias(text, cliente.name).then(function(res) {
          console.log(res);
          conteo++;
          if (res.cantidad > 0) {
            conteop++;
            cliente.coincidencia = res;
            listado_res.push(cliente);
            listado_res.push(Object.assign(division, {}));
          }
          if (size == conteo) {
            if (conteop <= 0) {
              fn(listado);
            } else {
              cabecera.header = `${conteop}/${size}`;
              fn(listado_res);
            }
          }
        });
      }
    }
    return {};
  }
}
export default clientes;

/*class client_info {
    constructor() {

    }
}
export default client_info;*/
