import my_genericos from "./my_genericos.js";

class Api {
  constructor() {
    this.host = my_genericos.constantes.DBHOST;
  }
  async clientesAll() {
    const context = this;
    return new Promise(function(resolve, reject) {
      try {
        //--
        const ruta = `${context.host}/clientes`;
        my_genericos.httpGetAsync(ruta, function(res) {
          try {
            if (typeof res.clientes !== "undefined") {
              resolve(res.clientes);
            } else {
              reject("json parse fail");
            }
          } catch (error) {
            reject("json parse fail");
          }
        });
        //--
      } catch (error) {
        reject("error");
      }
    });
  }
  clienteOnce(uid) {
    const context = this;
    return new Promise(function(resolve, reject) {
      try {
        //--
        const ruta = `${context.host}/cliente/${uid}`;
        my_genericos.httpGetAsync(ruta, function(result) {
          try {
            let datos = {};
            if (Array.isArray(result.clientes)) {
              datos = result.clientes[0];
            } else {
              datos = result.clientes;
            }
            const cliente = my_genericos.tipos.cliente(datos, true);
            //console.log(cliente);
            resolve(cliente);
          } catch (error) {
            reject("json parse fail");
          }
        });
        //--
      } catch (error) {
        reject("error");
      }
    });
  }
  clienteOnceDetails(uid) {
    const context = this;
    return new Promise(function(resolve, reject) {
      try {
        //--
        const ruta = `${context.host}/clientedetails/${uid}`;
        my_genericos.httpGetAsync(ruta, function(result) {
          try {
            if (Object.hasOwnProperty.call(result, "cliente")) {
              if (Object.hasOwnProperty.call(result, "productos")) {
                if (Object.hasOwnProperty.call(result, "transacciones")) {
                  const nprod = {};
                  for (const key in result.productos) {
                    if (Object.hasOwnProperty.call(result.productos, key)) {
                      const element = result.productos[key];
                      if (typeof element.uid !== "undefined") {
                        nprod[element.uid] = element;
                      }
                    }
                  }
                  result.productos = nprod; //convertimos productos en object para mejor manipulacion
                  for (const key in result.transacciones) {
                    if (Object.hasOwnProperty.call(result.transacciones, key)) {
                      const element = result.transacciones[key];
                      let costototal = 0;
                      for (const key in element.produtids) {
                        if (
                          Object.hasOwnProperty.call(element.produtids, key)
                        ) {
                          const pid = element.produtids[key];
                          costototal += parseInt(result.productos[pid].price);
                        }
                      }
                      element.pricetotal = costototal;
                    }
                  }

                  resolve(result);
                  return;
                }
              }
            }
            resolve(null);
          } catch (error) {
            reject(null);
          }
        });
        //--
      } catch (error) {
        reject("error");
      }
    });
  }
  clienteCrear(data) {
    const context = this;
    return new Promise(function(resolve, reject) {
      try {
        const cliente = my_genericos.tipos.cliente(data);
        cliente.avatar = ""; //esto cuando subamos imagenes mientras solo avatars
        my_genericos
          .httpPost(`${context.host}/cliente`, cliente)
          .then(function(res) {
            resolve(res);
          });
      } catch (error) {
        reject("error");
      }
    });
  }
  clienteUpdate(data) {
    const context = this;
    return new Promise(function(resolve, reject) {
      try {
        const cliente = my_genericos.tipos.cliente(data);
        cliente.avatar = ""; //esto cuando subamos imagenes mientras solo avatars
        my_genericos
          .httpPost(`${context.host}/cliente/${cliente.id}`, cliente)
          .then(function(ob) {
            try {
              if (typeof ob.result !== "undefined") {
                if (ob.result == "ok") {
                  resolve(true);
                }
              }
            } catch (error) {
              resolve(false);
            }
          });
      } catch (error) {
        reject("error");
      }
    });
  }
  /**
   *
   * @param {Date} inicio Fecha de inicio - limite inferior
   * @param {Date} final Fecha final - limite superior
   */
  transaccionesRango(inicio, final) {
    let context = this;
    inicio = 1611118800; //mientras para pruebas//my_genericos.fecha.fecha_to_unix(inicio);
    final = my_genericos.fecha.fecha_to_unix(final);
    return new Promise(function(resolve, reject) {
      try {
        my_genericos
          .httpGet(`${context.host}/transaccionesrange/${inicio}-${final}`)
          .then(function(res) {
            if (typeof res.transacciones !== "undefined") {
              const t = res.transacciones;
              for (const key in t) {
                if (Object.hasOwnProperty.call(t, key)) {
                  const element = t[key];
                  const nprod = {};
                  for (const keyp in element.products.productos) {
                    if (Object.hasOwnProperty.call(element.products.productos, keyp)) {
                      const elementp = element.products.productos[keyp];
                      nprod[elementp.uid] = elementp;
                    }
                  }
                  let costototal = 0;
                  for (const key in element.produtids) {
                    if (Object.hasOwnProperty.call(element.produtids, key)) {
                      const pid = element.produtids[key];
                      if(typeof nprod[pid] !== 'undefined'){
                          costototal += parseInt(nprod[pid].price);
                      }
                      
                    }
                  }
                  element.pricetotal = costototal;
                  element.fecha = my_genericos.fecha.fecha_unix_to_string(element.date);
                  let f = my_genericos.fecha.minutos_entre_fechas(my_genericos.fecha.fecha_unix_to_object(element.date));
                  element.hacex = my_genericos.fecha.minutos_to_horasdias(f);
                }
              }

              resolve(res.transacciones);
            } else {
              resolve(null);
            }
          });
      } catch (error) {
        reject("error");
      }
    });
  }
}
export default new Api();
