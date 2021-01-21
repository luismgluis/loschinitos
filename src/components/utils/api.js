import my_genericos from "./my_genericos.js";

class Api {
  constructor() {
    this.host = my_genericos.constantes.DBHOST;
  }
  clientesAll() {
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
            if (Array.isArray(result.cliente)) {
              datos = result.cliente[0];
            } else {
              datos = result.cliente;
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
                      if(typeof element.uid !== 'undefined'){
                          nprod[element.uid] = element;
                      }
                    }
                  }
                  result.productos = nprod;//convertimos productos en object para mejor manipulacion
                  for (const key in result.transacciones) {
                    if (Object.hasOwnProperty.call(result.transacciones, key)) {
                      const element = result.transacciones[key];
                      let costototal = 0;
                      for (const key in element.produtids) {
                        if (Object.hasOwnProperty.call(element.produtids, key)) {
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
              if(typeof ob.result !== 'undefined'){
                  if(ob.result == "ok"){
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
}
export default new Api();
