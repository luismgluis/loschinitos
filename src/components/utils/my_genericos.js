class my_genericos {
    constructor() { }
    httpGetAsync(theUrl, callback) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }
    httpPost(theUrl, datas, fn_back) {
        let context = this;
        let formData = new FormData();
        formData.append("json", context.base64_encode(datas));

        let xmlHttp = new XMLHttpRequest();


        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                fn_back(xmlHttp.response);
            }

        }

        xmlHttp.open("POST", theUrl, true); // true for asynchronous 
        xmlHttp.setRequestHeader("Content-type", "application/json")
        xmlHttp.setRequestHeader("Accept", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        xmlHttp.send(formData);
    }

    exportExcel(filename, datas, fn_back) {
        let url = "/src/libraries/libs/php/downfiles/convertjsontoexcel.php";
        let datos = {
            filename: filename,
            datas: datas
        };
        this.httpPost(url, JSON.stringify(datos), function (res) {
            //console.log(res);
            fn_back(res);
        })
    }

    object_isEmpty(obj) {
        if (obj == null) return false;
        for (let prop in obj) {
            if (Object.hasOwnProperty.call(obj, prop)) {
                return false;
            }
        }

        return true;
    }
    object_count(obj) {
        let conteo = 0;
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                //const element = obj[key];
                conteo++
            }
        }
        return conteo;
    }
    object_remove_item(obj = {}, key_remove = "") {
        if (obj == null) return false;
        let new_object = {};

        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                if (!(key == key_remove)) {
                    new_object[key] = element;
                }
            }
        }
        return new_object;
    }
    coincidencias(busca_esto, en_esto) {

        return new Promise(resolve => {

            let texto_ingresado = busca_esto.toLowerCase();

            function sub_rayar(texto) {
                texto = texto.toLowerCase();
                let my = {
                    cantidad: 0,
                    texto: ""
                }
                if (texto.includes(texto_ingresado) && texto_ingresado.length > 2) {
                    my.cantidad = texto_ingresado.length + 1;
                    my.texto = texto.replace(texto_ingresado, `<strong>${texto_ingresado}</strong>`)
                } else {
                    let paractual = {
                        ultima: "",
                        penultima: "",
                        total: ""
                    };
                    let lospares_queestan = {}; //lumi
                    for (let index = 0; index < texto_ingresado.length; index++) {
                        let caracter = texto_ingresado.charAt(index);
                        let newtotal = paractual.total + caracter;
                        if (texto.includes(newtotal)) {
                            paractual.total = newtotal;
                        } else {
                            if (paractual.total !== "" && paractual.total.length >= 2 && texto.includes(paractual.total)) {
                                lospares_queestan[paractual.total] = true;
                                paractual.total = caracter;
                            } else {
                                paractual.total = "";
                            }
                        }
                        if (index == texto_ingresado.length - 1) { //si estamos en el ultimo
                            if (texto.includes(paractual.total) && paractual.total.length >= 2) {
                                lospares_queestan[paractual.total] = true;
                            }
                        }
                    }
                    my.texto = texto;
                    let myobj_remplazar = {}
                    for (const key in lospares_queestan) {

                        if (Object.hasOwnProperty.call(lospares_queestan, key)) {
                            //const element = lospares_queestan[key];
                            if (texto.includes(key)) {
                                my.cantidad += key.length;
                                myobj_remplazar[key] = `<strong>${key}</strong>`;
                            }

                        }
                    }
                    //let mapObj = { cat: "dog", dog: "goat", goat: "cat" };
                    if (my.cantidad > 1) {
                        let re = new RegExp(Object.keys(myobj_remplazar).join("|"), "gi");
                        my.texto = my.texto.replace(re, function (matched) {
                            return myobj_remplazar[matched];
                        });
                    }

                    /*if (texto.includes(key)) {
                        my.cantidad += key.length;
                        my.texto = my.texto.replace(key, `<strong>${key}</strong>`)
                    } */
                }
                return my;
            }
            resolve(sub_rayar(en_esto));
        })


    }

    copiarAlPortapapeles(text) {
        // Crea un campo de texto "oculto"
        var aux = document.createElement("input");
        aux.style.display = "none";
        // Asigna el contenido del elemento especificado al valor del campo
        aux.setAttribute("value", text);
        // Añade el campo a la página
        document.body.appendChild(aux);
        // Selecciona el contenido del campo
        aux.select();
        // Copia el texto seleccionado
        document.execCommand("copy");
        // Elimina el campo de la página
        //document.body.removeChild(aux);
        aux.remove();
    }


    alphaVal(string) {
        string = string.replace(" ", "");
        if (string.length > 15) {
            string = string.substring(0, 15)
        }
        var out_str = "",
            len = string.length;
        let numeros_len = "";
        for (let pos = 0; pos < len; pos++) {
            const letra = string.toLowerCase().charAt(pos);
            if (!isNaN(letra)) {//es num
                numeros_len = `${numeros_len}${letra}`;
            } else {
                /*if(numeros_len !== ""){
                    out += parseInt(numeros_len);
                    numeros_len = "";
                } */
                out_str += "" + (letra.charCodeAt(0) - 97 + 1);
            }
            //out += (string.toLowerCase().charCodeAt(0) - 64) * Math.pow(26, len - pos - 1);
        }

        out_str = parseInt(out_str)
        if (out_str < 0) {
            out_str *= -1;
        }

        let out_n = 0;
        if (numeros_len !== "") {
            out_n = parseInt(numeros_len);
            numeros_len = "";
        }

        out_str = `${out_str}0000${out_n}`

        let inicial = string.toLowerCase().charAt(0).charCodeAt(0) - 97 + 1

        let result = `${inicial}.99`
        let resto = (parseFloat(`0.000000000000${out_str}`) * -1)
        result = parseFloat(result) + resto;

        console.log(`${result}`);
        return out_str;
    }

    exportToCsv(filename, rows) {
        let processRow = function (row) {
            let finalVal = '';
            for (let j = 0; j < row.length; j++) {
                let innerValue = (row[j] === null || typeof row[j] == 'undefined') ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                }
                let result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        let csvFile = '';
        for (let i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        let blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            let link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                let url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                setTimeout(() => {
                    document.body.removeChild(link);
                }, 100);
            }
        }
        /*exportToCsv('export.csv', [
            ['name','description'],	
            ['david','123'],
            ['jona','""'],
            ['a','b'],
            
            ]) */
    }

    obtener_fecha_actual_texto() {
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
    obtener_fecha_actual_numeric() {
        return Number(new Date);
    }

    obtener_fecha_texto_de_objeto(d) {
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

    longpress(dom, fn = null) {
        let timer = null;
        let accionar = false;

        function uno() {
            //e.preventDefault();
            //console.log(e);
            //console.log("down")
            timer = setTimeout(() => {
                accionar = true;
                //e.preventDefault();
                fn(true);
            }, 600);
        }

        function dos(e, prevent = true) {
            if (prevent) {
                //e.preventDefault();
            }
            //
            //console.log(e);
            //console.log("up");
            clearTimeout(timer);
            if (!accionar) {
                accionar = true;
                fn(null);
            }
            //accionar = false;
        }
        dom.addEventListener("mousedown", uno)
        dom.addEventListener("mouseup", function (e) {
            dos(e);
            setTimeout(() => {
                accionar = false;
            }, 100);
        })

        dom.addEventListener("touchstart", uno, {
            passive: false
        })
        dom.addEventListener("touchend", function (e) {
            dos(e)
            setTimeout(() => {
                accionar = false;
            }, 100);
        }, {
            passive: false
        })
        dom.addEventListener("touchcancel", function (e) {
            dos(e)
            setTimeout(() => {
                accionar = false;
            }, 100);
        })
        dom.addEventListener("touchmove", function (e) {
            accionar = true;
            dos(e, false);
        }, {
            passive: false
        })
    }

    nombrePropio(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    file_get_type(file_name = "") {
        let video_ext = ["mp4", "webm", "mov", "mkv", "3gpp", "wmv", "flv"]
        let img_ext = ["jpg", "jpeg", "png", "svg", "bmp", "gif", "tiff"]
        let ext = "";
        if (file_name.includes(".")) {
            let arr_points = file_name.split(".");
            let last_ext = "";
            for (const key in arr_points) {
                if (Object.hasOwnProperty.call(arr_points, key)) {
                    const element = arr_points[key];
                    if (element !== "") {
                        last_ext = element;
                    }
                }
            }

            ext = last_ext;
        }
        if (video_ext.includes(ext.toLowerCase()) || video_ext.includes("video/" + ext.toLowerCase())) {
            return "video"
        } else if (img_ext.includes(ext.toLowerCase())) {
            return "img"
        }
        return "none"
    }
    blobToBase64(blob, callback) {
        var reader = new FileReader();
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            callback(base64);
        };
        reader.readAsDataURL(blob);
    }
    base64ToBlob(b64Data, contentType = '', sliceSize = 512) {

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
    base64_encode(mstring) {
        //let encodedString = btoa(string);
        return btoa(mstring);
        //console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"
        // Decode the String
        //let decodedString = atob(encodedString);
    }
    base64_decode(mstring) {
        return atob(mstring);
    }

}
export default new my_genericos;