import my_genericos from "../../../components/utils/my_genericos.js";
import api from "../../../components/utils/api.js";
class cliente_info_module {
  constructor() {}
  getClienteInfo(uid = "", fn = null) {
    if (uid == "") {
      return;
    }
    api.clienteOnce(uid).then(function(datos) {
      const cliente = my_genericos.tipos.cliente(datos);
      console.log(cliente);

      fn(cliente);
    });
  }
  getClienteInfoDetails(uid, fn) {
    if (uid == "") {
      return;
    }
    api.clienteOnceDetails(uid).then(function(datos) {
      console.log(datos);
      let fechamayor = 0;
      datos.stats = [];
      for (const key in datos.transacciones) {
        if (Object.hasOwnProperty.call(datos.transacciones, key)) {
          const element = datos.transacciones[key];
          element.fecha_obj = my_genericos.fecha.fecha_unix_to_object(
            element.date
          );
          if (element.date > fechamayor) {
            fechamayor = element.date;
          }
          element.fecha = my_genericos.fecha.fecha_unix_to_string(element.date);
          let texto = ``;
          let arrprods = element.produtids;
          for (const keyp in arrprods) {
            if (Object.hasOwnProperty.call(arrprods, keyp)) {
              const idprod = arrprods[keyp];
              const prod = my_genericos.tipos.producto(datos.productos[idprod]);
              if (typeof prod !== "undefined") {
                texto += `${prod.name} ${prod.price} \n`;
              }
            }
          }
          element.texto = texto;
        }
      }
      datos.transacciones = Object.values(datos.transacciones);
      for (const key in datos.transaccionesporip) {
        if (Object.hasOwnProperty.call(datos.transaccionesporip, key)) {
          const element = datos.transaccionesporip[key];
          element.texto = `Compro ${my_genericos.object_count(
            element.produtids
          )} productos el ${my_genericos.fecha.fecha_unix_to_string(
            element.date
          )}`;
        }
      }

      //cosas para la grafica
      let grafica_data = {};
      let contador = 0;
      let fechamayor_obj = my_genericos.fecha.fecha_unix_to_object(fechamayor);
      for (let diamenos = 0; diamenos <= 15; diamenos++) {
        let fecha_diamenos = my_genericos.fecha.sumarDias(
          fechamayor_obj,
          diamenos * -1
        );
        console.log(fecha_diamenos.getDate(), fecha_diamenos.getMonth() + 1);
        let keyf = my_genericos.fecha.obtener_fecha_texto_de_objeto(
          fecha_diamenos
        );
        keyf = keyf.split(" ")[0];
        contador++;
        grafica_data[keyf] = {
          key: contador,
          fecha: fecha_diamenos,
          name: `${fecha_diamenos.getDate()}`,
          valor: 0,
        };
      }
      for (const keyt in datos.transacciones) {
        if (Object.hasOwnProperty.call(datos.transacciones, keyt)) {
          const ele = datos.transacciones[keyt];
          let f = my_genericos.fecha.fecha_unix_to_object(ele.date);
          let keyk = my_genericos.fecha
            .obtener_fecha_texto_de_objeto(f)
            .split(" ")[0];
          if (Object.hasOwnProperty.call(grafica_data, keyk)) {
            grafica_data[keyk].valor += parseInt(ele.pricetotal);
          }
        }
      }
      datos.stats = my_genericos.object_orderby_desc(Object.values(grafica_data),"key");
      fn(datos);
    });
  }

  actualizarCliente(data) {
    return new Promise(function(resolve, reject) {
      try {
        api.clienteUpdate(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject("error");
      }
    });
  }
  subirCliente(data) {
    return new Promise(function(resolve, reject) {
      try {
        api.clienteCrear(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject("error");
      }
    });
  }
}
export default cliente_info_module;

/*class client_info {
    constructor() {
        
    }
}
export default client_info;*/
