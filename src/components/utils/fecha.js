
class fecha {
    constructor() { }

    fecha_actual_texto() {
        let d = new Date;
        let m = d.getMinutes();
        let s = d.getSeconds();
        if (m < 10) {
            m = `0${m}`;
        }
        if (s < 10) {
            s = `0${s}`;
        }
        return (d.getDate() + "/" + parseInt(d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ':' + m + '.' + s)
    }
    fecha_actual_numeric() {
        return Number(new Date);
    }
    fecha_texto_de_objeto(d) {
        //let d = new Date;
        let m = d.getMinutes();
        let s = d.getSeconds();
        if (m < 10) {
            m = `0${m}`;
        }
        if (s < 10) {
            s = `0${s}`;
        }
        return (d.getDate() + "/" + parseInt(d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ':' + m + '.' + s)
    }

    /**
     * 
     * @param {String} texto fecha en string ej: 31/12/2019 14:36
     */
    fecha_objeto(texto, without_hour = false) {

        if (texto.includes(" ") && !without_hour) {
            let f1 = texto.split(" ")[0];
            let h1 = texto.split(" ")[1];
            let sec = 0
            if (h1.includes(".")) {
                sec = h1.split(".")[1];
                h1 = h1.split(".")[0];
            }
            let da = new Date(f1.split("/")[2],
                parseInt(f1.split("/")[1]) - 1,
                f1.split("/")[0], h1.split(":")[0], h1.split(":")[1], sec, 0);
            return da;
        } else {
            let f1 = texto.split(" ")[0];
           //let h1 = texto.split(" ")[1];
            let da = new Date(f1.split("/")[2],
                parseInt(f1.split("/")[1]) - 1,
                f1.split("/")[0], 0,
                0, 0, 0);
            return da;
        }


    }

    sumarDias(fecha, dias) {
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }


    /**
     * 
     * @param {Date_Object} newYear1 Fecha mas vieja
     * @param {Date_Object} newYear2 Fecha actual o mas reciente / null es fecha actual
     */
    minutos_entre_fechas(newYear1, hoyfecha2 = null, with_seconds = false) {
        if (hoyfecha2 == null) {
            hoyfecha2 = this.obtener_fecha_objeto(this.obtener_fecha_actual_texto());
        }
        let dif = (hoyfecha2 - newYear1);
        let mins = Math.round((dif / 1000) / 60)
        let seconds = (dif / 1000) % 60;
        if (with_seconds) {
            return {
                mins: mins,
                secs: seconds
            };
        } else {
            return mins;
        }
    }
    /**
     * 
     * @param {Integer} mins (Numero Entero) hace tantos minutos
     */
    minutos_to_horasdias(minutos) {
        let mins = parseInt(minutos);
        let horas = 0;
        while (mins >= 60) {
            mins -= 60;
            horas += 1;
        }
        let dias = 0;
        while (horas > 24) {
            horas -= 24;
            dias += 1;
        }
        let respuesta = "";
        if (horas > 0) {
            respuesta = `${horas}h ${mins}m`;
        } else if (mins < 60) {
            respuesta = `${mins}m`;
        }
        if (dias > 0) {
            respuesta = `${dias}d ${horas}h ${mins}m`;
        }
        return respuesta;
    }
}
//let my_genericos = new my_genericos
export default new fecha;
