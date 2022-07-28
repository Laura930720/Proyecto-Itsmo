var map = L.map('map').setView([17.309874, -94.614558],9);
L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: 'Map Data © OpenStreetMap contributors'
}).addTo(map);




//AQUI CAMBIAS LOS ESTILOS DE LAS CAPAS, LAGRO, ANCHO 
////SIMBOLOGÍA PUNTOS
 var icono_Central = new L.Icon({
     iconSize: [27, 27], //tamaño del ícono
     iconAnchor: [13, 27], //ancho del ícono
     iconUrl: 'imagenes/centralElectrica.png'
 });

 var icono_Aeropuerto = new L.Icon({
     iconSize: [27, 27], //tamaño del ícono
     iconAnchor: [13, 27], //ancho del ícono
     iconUrl: 'imagenes/aeropuerto.png'
 });
var icono_subestacionE = new L.Icon({
     iconSize: [15, 15], //tamaño del ícono
     iconAnchor: [15, 15], //ancho del ícono
     iconUrl: 'imagenes/puntoRojo.png'
 });

 var icono_ExtracPetrol = new L.Icon({
     iconSize: [27, 27], //tamaño del ícono
     iconAnchor: [27, 27], //ancho del ícono
     iconUrl: 'imagenes/ExtracccionPetrol.png'
 });

 var icono_GeneradorCFE = new L.Icon({
     iconSize: [35, 35], //tamaño del ícono
     iconAnchor: [35, 35], //ancho del ícono
     iconUrl: 'imagenes/generadorElectrico.png'
 });

 var icono_EnergiaRenovable = new L.Icon({
     iconSize: [35, 35], //tamaño del ícono
     iconAnchor: [35, 35], //ancho del ícono
     iconUrl: 'imagenes/EnergiaRenovable.png'
 });



 ////SIMBOLOGIA LINEAS

 var color_ferreo = {
    color: 'brown',
    weight: 2.5,
    opacity: 1.0,
    dashArray: '4,12,20,12',
    lineJoin: 'miter',
    lineCap: 'square'
};


 var color_telefono = {
    color: 'purple',
    weight: 1.5,
    opacity: 1.0,
    dashArray: '5,5',
    lineJoin: 'miter',
    lineCap: 'square'
};


////SIMBOLOGÍA POLIGONOS
var color_parqueInd = {
   weight: 2, // grosor de línea
   color: '#3AF802', // color de línea
   opacity: 1.0, // tansparencia de línea
   fillColor: '#3AF802', // color de relleno
   fillOpacity: 0.4 // transparencia de relleno
 };

 var color_Estados = {
   weight: 2, // grosor de línea
   color: '#760300', // color de línea
   opacity: 1.0, // tansparencia de línea
   fillColor: '#760300', // color de relleno
   fillOpacity: 0.02 // transparencia de relleno
 };

 var color_Municipios = {
   weight: 2, // grosor de línea
   color: '#FB8A00', // color de línea
   opacity: 1.0, // tansparencia de línea
   fillColor: '#FB8A00', // color de relleno
   fillOpacity: 0.02 // transparencia de relleno
 };

 // AQUÍ AGREGAS TUS CAPAS JS 


var customOptions =
            {
            'maxWidth': '200',
            'className' : 'custom'
            }
///CAPAS DE PUNTOS NECESITAN UN ICONO (IMAGEN PNG), YO PUSE UN MERCADITO HAHA PERO CAMBIALO POR OTRO QUE TENGA QUE VER CON INTERSECCIONES
   var subestElectrica = L.geoJson(subElectrica, {
        onEachFeature : function(feature, layer){
                var popupContent = ('<b>Nombre de Subestación: </b>'+ feature.properties.nom_estab+
                                    '</br><b>Personal: </b>'+ feature.properties.per_ocu) ;
                layer.bindPopup(popupContent,customOptions)

        },
          pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {icon: icono_subestacionE});
          }
     });

   var extraccionPetrolera = L.geoJson(extracPetrol, {
        onEachFeature : function(feature, layer){
                var popupContent = ('<b>Nombre: </b>'+ feature.properties.nom_estab+
                                    '</br><b>Personal: </b>'+ feature.properties.per_ocu) ;
                layer.bindPopup(popupContent,customOptions)

        },
          pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {icon: icono_ExtracPetrol});
          }
     });

//CLUSTER DE PUNTOS PARA CENTRAL ELÉCTRICA
    var centrales = L.markerClusterGroup();
    
    const geojsonGroup = L.geoJSON(centralcita, {
        onEachFeature : function(feature, layer){
            var popupContent = ('<b>Central Eléctrica:</b>'+ feature.properties.nombre+
                                '</br><b>Ciudad:</b>'+ feature.properties.Ciudad +
                                '</br><b>Propietario:</b>'+ feature.properties.Propietari +
                                '</br><b>Operador:</b>'+ feature.properties.Operador +
                                '</br><b>Tipo:</b>'+ feature.properties.FuentePrim) ;
            layer.bindPopup(popupContent,customOptions)

        },
        pointToLayer: function (feature, latlng) {
            return new L.marker(latlng, { 
                     icon: icono_Central
         }); 
                }, 
               
            });
    centrales.addLayer(geojsonGroup);


//TERMINA CLUSTER DE PUNTOS PARA CENTROS CULTURALES Y DEPORTIVOS

//CLUSTER DE PUNTOS PARA AEROPUERTOS
    var aeropuertos = L.markerClusterGroup();
    const geojsonGroupAereo = L.geoJSON(Aeropuerto, {
        onEachFeature : function(feature, layer){
            var popupContent = ('<b>Nombre aeródromo:</b>'+ feature.properties.nom_aerop+
                                '</br><b>Tipo:</b>'+ feature.properties.tipo +
                                '</br><b>Tamaño de pista:</b>'+ feature.properties.tam_pista) ;
            layer.bindPopup(popupContent,customOptions)

        },
        pointToLayer: function (feature, latlng) {
            return new L.marker(latlng, { 
                     icon: icono_Aeropuerto
         }); 
                }, 
               
            });
    aeropuertos.addLayer(geojsonGroupAereo);


//TERMINA CLUSTER DE PUNTOS PARA AEROPUERTOS

//CLUSTER DE PUNTOS PARA GENERADORES CFE
    var generadoresElec = L.markerClusterGroup();
    const geojsonGroupGenerCFE = L.geoJSON(generadoresCFE, {
        onEachFeature : function(feature, layer){
            var popupContent = ('<b>Generador CFE: </b>'+ feature.properties.NOMBRE+
                                '</br><b>Tipo: </b>'+ feature.properties.PROCESO) ;
            layer.bindPopup(popupContent,customOptions)

        },
        pointToLayer: function (feature, latlng) {
            return new L.marker(latlng, { 
                     icon: icono_GeneradorCFE
         }); 
                }, 
               
            });
    generadoresElec.addLayer(geojsonGroupGenerCFE);


//TERMINA CLUSTER DE PUNTOS PARA GENERADORES CFE

//CLUSTER DE PUNTOS PARA ENERGÍA RENOVABLE
    var centralElecRen = L.markerClusterGroup();
    const geojsonGroupEnerRenov = L.geoJSON(energiaRenovable, {
        onEachFeature : function(feature, layer){
            var popupContent = ('<b>Central de Energía Renovable: </b>'+ feature.properties.Instalacio+
                                '</br><b>Propietario: </b>'+ feature.properties.Propietari+
                                '</br><b>Operador: </b>'+ feature.properties.Operador+
                                '</br><b>Tipo: </b>'+ feature.properties.FuentePrim) ;
            layer.bindPopup(popupContent,customOptions)

        },
        pointToLayer: function (feature, latlng) {
            return new L.marker(latlng, { 
                     icon: icono_EnergiaRenovable
            }); 
        }, 
               
    });
    centralElecRen.addLayer(geojsonGroupEnerRenov);


//TERMINA CLUSTER DE PUNTOS PARA ENERGÍA RENOVABLE

 ////PRUEBA DE MAPA DE CALOR
L.heatLayer(manufacturas,{
            radius: 20,
            blur: 15, 
            maxZoom: 17,
        }).addTo(map);

//// FIN DE MAPA DE CALOR

//CLUSTER DE PUNTOS PARA INDUSTRIAS MANUFACTURERAS
    var industriaManufac = L.markerClusterGroup();
    const geojsonGroupManufac = L.geoJSON(manufacturas, {
        onEachFeature : function(feature, layer){
            
            var tipoManufac = (feature.properties.codigo_act);
            var tipoIndustria = '';

            if (tipoManufac == 311110 || tipoManufac == 311211 || tipoManufac == 311212 ||
                         tipoManufac == 311213 || tipoManufac == 311214 || tipoManufac == 311221 ||
                         tipoManufac == 311222 || tipoManufac == 311230 || tipoManufac == 311311 || 
                         tipoManufac == 311319 || tipoManufac == 311340 || tipoManufac == 311350 || 
                         tipoManufac == 311411 || tipoManufac == 311412 || tipoManufac == 311421 || 
                         tipoManufac == 311422 || tipoManufac == 311423 || tipoManufac == 311511 || 
                         tipoManufac == 311512 || tipoManufac == 311513 || tipoManufac == 311520 || 
                         tipoManufac == 311611 || tipoManufac == 311612 || tipoManufac == 311613 || 
                         tipoManufac == 311614 || tipoManufac == 311710 || tipoManufac == 311811 || 
                         tipoManufac == 311812 || tipoManufac == 311813 || tipoManufac == 311820 || 
                         tipoManufac == 311830 || tipoManufac == 311910 || tipoManufac == 311921 || 
                         tipoManufac == 311922 || tipoManufac == 311923 || tipoManufac == 311924 || 
                         tipoManufac == 311930 || tipoManufac == 311940 || tipoManufac == 311991 || 
                         tipoManufac == 311992 || tipoManufac == 311993 || tipoManufac == 311999) {
                         tipoIndustria = "Industria Alimentaria";
              } else if (tipoManufac == 312111|| tipoManufac == 312112|| tipoManufac == 312113||
                         tipoManufac == 312120|| tipoManufac == 312131|| tipoManufac == 312132||
                         tipoManufac == 312139|| tipoManufac == 312141|| tipoManufac == 312142||
                         tipoManufac == 312143|| tipoManufac == 312149|| tipoManufac == 312210|| 
                         tipoManufac == 312222) {
                tipoIndustria = "Industria de las bebidas y del tabaco";
              } else if (tipoManufac == 313111 || tipoManufac ==313112 || tipoManufac ==313113 || 
                        tipoManufac ==313210 || tipoManufac ==313220 || tipoManufac ==313230 ||
                        tipoManufac ==313240 || tipoManufac ==313310 || tipoManufac ==313320) {
                tipoIndustria = "Fabricación de insumos textiles y acabado de textiles";
              } else if (tipoManufac == 314110 || tipoManufac == 314120 || tipoManufac == 314911 || 
                         tipoManufac == 314912 || tipoManufac == 314991 || tipoManufac == 314992 || 
                         tipoManufac == 314999) {
                tipoIndustria = "Fabricación de productos textiles, excepto prendas de vestir";
              } else if (tipoManufac == 315110 || tipoManufac == 315191 || tipoManufac == 315192 || 
                         tipoManufac == 315221 || tipoManufac == 315222 || tipoManufac == 315223 || 
                         tipoManufac == 315224 || tipoManufac == 315225 || tipoManufac == 315229 || 
                         tipoManufac == 315991 || tipoManufac == 315999) {
                tipoIndustria = "Fabricación de prendas de vestir";////////////////////////////////
              }   else if (tipoManufac == 316110 || tipoManufac == 316211 || tipoManufac == 316212 || 
                           tipoManufac == 316213 || tipoManufac == 316214 || tipoManufac == 316219 || 
                           tipoManufac == 316991 || tipoManufac == 316999) {
                tipoIndustria = "Curtido y acabado de cuero y piel ";
              }   else if (tipoManufac == 321111 || tipoManufac == 321112 || tipoManufac == 321113 || 
                           tipoManufac == 321210 || tipoManufac == 321910 || tipoManufac == 321920 || 
                           tipoManufac == 321991 || tipoManufac == 321992 || tipoManufac == 321993 || 
                           tipoManufac == 321999) {
                tipoIndustria = "Industria de la madera";
              }   else if (tipoManufac == 322110 || tipoManufac == 322122 || tipoManufac == 322131 || 
                           tipoManufac == 322210 || tipoManufac == 322220 || tipoManufac == 322230 || 
                           tipoManufac == 322299) {
                tipoIndustria = "Industria del papel";
              }   else if (tipoManufac == 323111 || tipoManufac == 323119 || tipoManufac == 323120) {
                tipoIndustria = "Impresión e industrias conexas";
              }   else if (tipoManufac == 324110 || tipoManufac == 324120 || tipoManufac == 324191) {
                tipoIndustria = "Fabricación de productos derivados del petroleo y el carbón";
              }   else if (tipoManufac == 325110 || tipoManufac == 325120 || tipoManufac == 325130 || 
                           tipoManufac == 325180 || tipoManufac == 325190 || tipoManufac == 325211 || 
                           tipoManufac == 325212 || tipoManufac == 325310 || tipoManufac == 325320 || 
                           tipoManufac == 325411 || tipoManufac == 325412 || tipoManufac == 325510 || 
                           tipoManufac == 325520 || tipoManufac == 325610 || tipoManufac == 325620 || 
                           tipoManufac == 325920 || tipoManufac == 325993 || tipoManufac == 325999) {
                tipoIndustria = "Industria química";
              }   else if (tipoManufac == 326110 || tipoManufac == 326120 || tipoManufac == 326130 || 
                           tipoManufac == 326140 || tipoManufac == 326160 || tipoManufac == 326191 || 
                           tipoManufac == 326192 || tipoManufac == 326193 || tipoManufac == 326194 || 
                           tipoManufac == 326198 || tipoManufac == 326199 || tipoManufac == 326211 || 
                           tipoManufac == 326212 || tipoManufac == 326220 || tipoManufac == 326290) {
                tipoIndustria = "Industria del plástico y del hule";
              }   else if (tipoManufac == 327111 || tipoManufac == 327121 || tipoManufac == 327122 || 
                           tipoManufac == 327123 || tipoManufac == 327211 || tipoManufac == 327213 || 
                           tipoManufac == 327214 || tipoManufac == 327215 || tipoManufac == 327219 || 
                           tipoManufac == 327310 || tipoManufac == 327320 || tipoManufac == 327330 || 
                           tipoManufac == 327391 || tipoManufac == 327399 || tipoManufac == 327410 || 
                           tipoManufac == 327420 || tipoManufac == 327910 || tipoManufac == 327991 || 
                           tipoManufac == 327999) {
                tipoIndustria = "Fabricación de productos a base de minerales no metálicos";
              }   else if (tipoManufac == 331111 || tipoManufac == 331112 || tipoManufac == 331210 || 
                           tipoManufac == 331220 || tipoManufac == 331310 || tipoManufac == 331420 || 
                           tipoManufac == 331510 || tipoManufac == 331520) {
                tipoIndustria = "Industrias metálicas básicas";
              }   else if (tipoManufac == 332110 || tipoManufac == 332211 || tipoManufac == 332212 || 
                           tipoManufac == 332310 || tipoManufac == 332320 || tipoManufac == 332420 || 
                           tipoManufac == 332430 || tipoManufac == 332510 || tipoManufac == 332610 || 
                           tipoManufac == 332710 || tipoManufac == 332720 || tipoManufac == 332810 || 
                           tipoManufac == 332910 || tipoManufac == 332999) {
                tipoIndustria = "Fabricación de productos metálicos";
              }   else if (tipoManufac == 333111 || tipoManufac == 333120 || tipoManufac == 333130 || 
                           tipoManufac == 333243 || tipoManufac == 333244 || tipoManufac == 333246 || 
                           tipoManufac == 333249 || tipoManufac == 333319 || tipoManufac == 333411 || 
                           tipoManufac == 333412 || tipoManufac == 333610 || tipoManufac == 333910 || 
                           tipoManufac == 333920 || tipoManufac == 333991 || tipoManufac == 333999) {
                tipoIndustria = "Fabricación de maquinaria y equipo";
              }   else if (tipoManufac == 334220 || tipoManufac == 334290 || tipoManufac == 334310 || 
                           tipoManufac == 334410 || tipoManufac == 334519) {
                tipoIndustria = "Fabricación de equipo de computación, comunicación, medición y de otros equipos, componentes y accesorios electrónicos";
              }   else if (tipoManufac == 335110 || tipoManufac == 335120 || tipoManufac == 335220 || 
                           tipoManufac == 335311 || tipoManufac == 335312 || tipoManufac == 335910 || 
                           tipoManufac == 335920 || tipoManufac == 335930 || tipoManufac == 335999) {
                tipoIndustria = "Fabricación de accesorios, aparatos eléctricos y equipo de generación de energía eléctrica";
              }   else if (tipoManufac == 336120 || tipoManufac == 336210 || tipoManufac == 336310 || 
                           tipoManufac == 336320 || tipoManufac == 336350 || tipoManufac == 336360 || 
                           tipoManufac == 336370 || tipoManufac == 336390 || tipoManufac == 336510 || 
                           tipoManufac == 336610 || tipoManufac == 336991 || tipoManufac == 336992 || 
                           tipoManufac == 336999) {
                tipoIndustria = "Fabricación de equipo de transporte";
              }   else if (tipoManufac == 337110 || tipoManufac == 337120 || tipoManufac == 337210 || 
                           tipoManufac == 337910 || tipoManufac == 337920) {
                tipoIndustria = "Fabricación de muebles, colchones y persianas";
              }   else if (tipoManufac == 339111 || tipoManufac == 339112 || tipoManufac == 339113 || 
                           tipoManufac == 339912 || tipoManufac == 339913 || tipoManufac == 339914 || 
                           tipoManufac == 339920 || tipoManufac == 339930 || tipoManufac == 339940 || 
                           tipoManufac == 339950 || tipoManufac == 339991 || tipoManufac == 339992 || 
                           tipoManufac == 339993 || tipoManufac == 339994 || tipoManufac == 339995 || 
                           tipoManufac == 339999) {
                tipoIndustria = "Otras industrias manufactureras";
              }     else {
                tipoIndustria = "Industria Y";
              } 

            var popupContent = ('<b>Tipo de industria: </b><b><font color="red">'+tipoIndustria+'</font></b>'+
                                '</br><b>Actividad: </b>'+ feature.properties.nombre_act+
                                '</br><b>Nombre establecimiento: </b>'+ feature.properties.nom_estab+
                                '</br><b>Personal ocupado: </b>'+ feature.properties.per_ocu) ;
            layer.bindPopup(popupContent,customOptions)

        },
        pointToLayer: function (feature, latlng) {
            var tipoManufac = (feature.properties.codigo_act);
            var earthquakeSymbol = '';

             if (tipoManufac == 311110 || tipoManufac == 311211 || tipoManufac == 311212 ||
                         tipoManufac == 311213 || tipoManufac == 311214 || tipoManufac == 311221 ||
                         tipoManufac == 311222 || tipoManufac == 311230 || tipoManufac == 311311 || 
                         tipoManufac == 311319 || tipoManufac == 311340 || tipoManufac == 311350 || 
                         tipoManufac == 311411 || tipoManufac == 311412 || tipoManufac == 311421 || 
                         tipoManufac == 311422 || tipoManufac == 311423 || tipoManufac == 311511 || 
                         tipoManufac == 311512 || tipoManufac == 311513 || tipoManufac == 311520 || 
                         tipoManufac == 311611 || tipoManufac == 311612 || tipoManufac == 311613 || 
                         tipoManufac == 311614 || tipoManufac == 311710 || tipoManufac == 311811 || 
                         tipoManufac == 311812 || tipoManufac == 311813 || tipoManufac == 311820 || 
                         tipoManufac == 311830 || tipoManufac == 311910 || tipoManufac == 311921 || 
                         tipoManufac == 311922 || tipoManufac == 311923 || tipoManufac == 311924 || 
                         tipoManufac == 311930 || tipoManufac == 311940 || tipoManufac == 311991 || 
                         tipoManufac == 311992 || tipoManufac == 311993 || tipoManufac == 311999) {
                        earthquakeSymbol = 'imagenes/IndustriaAlimentaria.png';
              } else if (  tipoManufac == 312111|| tipoManufac == 312112|| tipoManufac == 312113||
                           tipoManufac == 312120|| tipoManufac == 312131|| tipoManufac == 312132||
                           tipoManufac == 312139|| tipoManufac == 312141|| tipoManufac == 312142||
                           tipoManufac == 312143|| tipoManufac == 312149|| tipoManufac == 312210|| 
                           tipoManufac == 312222) {
                earthquakeSymbol = 'imagenes/BebidasTabaco.png';
              } else if (tipoManufac == 313111 || tipoManufac ==313112 || tipoManufac ==313113 || 
                        tipoManufac ==313210 || tipoManufac ==313220 || tipoManufac ==313230 ||
                        tipoManufac ==313240 || tipoManufac ==313310 || tipoManufac ==313320) {
                earthquakeSymbol = "imagenes/Textiles.png";
              } else if (tipoManufac == 314110 || tipoManufac == 314120 || tipoManufac == 314911 || 
                         tipoManufac == 314912 || tipoManufac == 314991 || tipoManufac == 314992 || 
                         tipoManufac == 314999) {
                earthquakeSymbol = "imagenes/Telas.png";
              } else if (tipoManufac == 315110 || tipoManufac == 315191 || tipoManufac == 315192 || 
                         tipoManufac == 315221 || tipoManufac == 315222 || tipoManufac == 315223 || 
                         tipoManufac == 315224 || tipoManufac == 315225 || tipoManufac == 315229 || 
                         tipoManufac == 315991 || tipoManufac == 315999) {
                earthquakeSymbol = "imagenes/Ropa.png"; //////////////////////////////////////////////////////////
              }  else if (tipoManufac == 316110 || tipoManufac == 316211 || tipoManufac == 316212 || 
                           tipoManufac == 316213 || tipoManufac == 316214 || tipoManufac == 316219 || 
                           tipoManufac == 316991 || tipoManufac == 316999) {
                earthquakeSymbol = "imagenes/CueroPiel.png";
              }   else if (tipoManufac == 321111 || tipoManufac == 321112 || tipoManufac == 321113 || 
                           tipoManufac == 321210 || tipoManufac == 321910 || tipoManufac == 321920 || 
                           tipoManufac == 321991 || tipoManufac == 321992 || tipoManufac == 321993 || 
                           tipoManufac == 321999) {
                earthquakeSymbol = "imagenes/Madera.png";
              }   else if (tipoManufac == 322110 || tipoManufac == 322122 || tipoManufac == 322131 || 
                           tipoManufac == 322210 || tipoManufac == 322220 || tipoManufac == 322230 || 
                           tipoManufac == 322299) {
                earthquakeSymbol = "imagenes/Papel.png";
              }   else if (tipoManufac == 323111 || tipoManufac == 323119 || tipoManufac == 323120) {
                earthquakeSymbol = "imagenes/Impresion.png";
              }   else if (tipoManufac == 324110 || tipoManufac == 324120 || tipoManufac == 324191) {
                earthquakeSymbol = "imagenes/PetroleoCarbon.png";
              }   else if (tipoManufac == 325110 || tipoManufac == 325120 || tipoManufac == 325130 || 
                           tipoManufac == 325180 || tipoManufac == 325190 || tipoManufac == 325211 || 
                           tipoManufac == 325212 || tipoManufac == 325310 || tipoManufac == 325320 || 
                           tipoManufac == 325411 || tipoManufac == 325412 || tipoManufac == 325510 || 
                           tipoManufac == 325520 || tipoManufac == 325610 || tipoManufac == 325620 || 
                           tipoManufac == 325920 || tipoManufac == 325993 || tipoManufac == 325999) {
                earthquakeSymbol = "imagenes/IndustriaQuimica.png";
              }   else if (tipoManufac == 326110 || tipoManufac == 326120 || tipoManufac == 326130 || 
                           tipoManufac == 326140 || tipoManufac == 326160 || tipoManufac == 326191 || 
                           tipoManufac == 326192 || tipoManufac == 326193 || tipoManufac == 326194 || 
                           tipoManufac == 326198 || tipoManufac == 326199 || tipoManufac == 326211 || 
                           tipoManufac == 326212 || tipoManufac == 326220 || tipoManufac == 326290) {
                earthquakeSymbol = "imagenes/PlasticoHule.png";
              }   else if (tipoManufac == 327111 || tipoManufac == 327121 || tipoManufac == 327122 || 
                           tipoManufac == 327123 || tipoManufac == 327211 || tipoManufac == 327213 || 
                           tipoManufac == 327214 || tipoManufac == 327215 || tipoManufac == 327219 || 
                           tipoManufac == 327310 || tipoManufac == 327320 || tipoManufac == 327330 || 
                           tipoManufac == 327391 || tipoManufac == 327399 || tipoManufac == 327410 || 
                           tipoManufac == 327420 || tipoManufac == 327910 || tipoManufac == 327991 || 
                           tipoManufac == 327999) {
                earthquakeSymbol = "imagenes/NoMetalicos.png";
              }   else if (tipoManufac == 331111 || tipoManufac == 331112 || tipoManufac == 331210 || 
                           tipoManufac == 331220 || tipoManufac == 331310 || tipoManufac == 331420 || 
                           tipoManufac == 331510 || tipoManufac == 331520) {
                earthquakeSymbol = "imagenes/MetalicoBasico.png";
              }   else if (tipoManufac == 332110 || tipoManufac == 332211 || tipoManufac == 332212 || 
                           tipoManufac == 332310 || tipoManufac == 332320 || tipoManufac == 332420 || 
                           tipoManufac == 332430 || tipoManufac == 332510 || tipoManufac == 332610 || 
                           tipoManufac == 332710 || tipoManufac == 332720 || tipoManufac == 332810 || 
                           tipoManufac == 332910 || tipoManufac == 332999) {
                earthquakeSymbol = "imagenes/ProductosMetalicos.png";
              }   else if (tipoManufac == 333111 || tipoManufac == 333120 || tipoManufac == 333130 || 
                           tipoManufac == 333243 || tipoManufac == 333244 || tipoManufac == 333246 || 
                           tipoManufac == 333249 || tipoManufac == 333319 || tipoManufac == 333411 || 
                           tipoManufac == 333412 || tipoManufac == 333610 || tipoManufac == 333910 || 
                           tipoManufac == 333920 || tipoManufac == 333991 || tipoManufac == 333999) {
                earthquakeSymbol = "imagenes/Maquinaria.png";
              }   else if (tipoManufac == 334220 || tipoManufac == 334290 || tipoManufac == 334310 || 
                           tipoManufac == 334410 || tipoManufac == 334519) {
                earthquakeSymbol = "imagenes/FabricaComputo.png";
              }   else if (tipoManufac == 335110 || tipoManufac == 335120 || tipoManufac == 335220 || 
                           tipoManufac == 335311 || tipoManufac == 335312 || tipoManufac == 335910 || 
                           tipoManufac == 335920 || tipoManufac == 335930 || tipoManufac == 335999) {
                earthquakeSymbol = "imagenes/EquipoElectrico.png";
              }   else if (tipoManufac == 336120 || tipoManufac == 336210 || tipoManufac == 336310 || 
                           tipoManufac == 336320 || tipoManufac == 336350 || tipoManufac == 336360 || 
                           tipoManufac == 336370 || tipoManufac == 336390 || tipoManufac == 336510 || 
                           tipoManufac == 336610 || tipoManufac == 336991 || tipoManufac == 336992 || 
                           tipoManufac == 336999) {
                earthquakeSymbol = "imagenes/EquipoTransporte.png";
              }   else if (tipoManufac == 337110 || tipoManufac == 337120 || tipoManufac == 337210 || 
                           tipoManufac == 337910 || tipoManufac == 337920) {
                earthquakeSymbol = "imagenes/Muebles.png";
              }   else if (tipoManufac == 339111 || tipoManufac == 339112 || tipoManufac == 339113 || 
                           tipoManufac == 339912 || tipoManufac == 339913 || tipoManufac == 339914 || 
                           tipoManufac == 339920 || tipoManufac == 339930 || tipoManufac == 339940 || 
                           tipoManufac == 339950 || tipoManufac == 339991 || tipoManufac == 339992 || 
                           tipoManufac == 339993 || tipoManufac == 339994 || tipoManufac == 339995 || 
                           tipoManufac == 339999) {
                earthquakeSymbol = "imagenes/ManufacOtros.png";
              }      else {
                earthquakeSymbol = 'imagenes/centroCult.png';
              } 

            var mapIcon = L.icon({
            iconUrl: earthquakeSymbol,
            iconSize: [30, 30]
            });

            return L.marker(latlng, {
                icon: mapIcon
            });

        }, 
               
    });
    industriaManufac.addLayer(geojsonGroupManufac);


//TERMINA CLUSTER DE PUNTOS PARA INDUSTRIAS MANUFACTURERAS



//CLUSTER QUE CAMBIA SIMBOLOS POR CATEGORÍA
 /*   var centralElecRen = L.markerClusterGroup();
    const geojsonGroupEnerRenov = L.geoJSON(energiaRenovable, {
        onEachFeature : function(feature, layer){
            var popupContent = ('<b>Nombre: </b>'+ feature.properties.Instalacio+
                                '</br><b>Propietario: </b>'+ feature.properties.Propietari+
                                '</br><b>Operador: </b>'+ feature.properties.Operador+
                                '</br><b>Tipo: </b>'+ feature.properties.FuentePrim) ;
            layer.bindPopup(popupContent,customOptions)

        },
        pointToLayer: function (feature, latlng) {
            var magnitude = (feature.properties.FuentePrim);
            var earthquakeSymbol = '';

            if (!magnitude) {
                earthquakeSymbol = 'https://esri.github.io/esri-leaflet/img/earthquake-icon.png';
              } else if (magnitude == "Hidroeléctrica") {
                earthquakeSymbol = 'https://esri.github.io/esri-leaflet/img/yellow-triangle.png';
              } else if (magnitude == "Eólica") {
                earthquakeSymbol = 'https://esri.github.io/esri-leaflet/img/orange-triangle.png';
              } else if (magnitude == "Biomasa") {
                earthquakeSymbol = 'https://esri.github.io/esri-leaflet/img/red-triangle.png';
              }

            var mapIcon = L.icon({
            iconUrl: earthquakeSymbol,
            iconSize: [20, 20]
            });

            return L.marker(latlng, {
                icon: mapIcon
            });

        }, 
               
    });
    centralElecRen.addLayer(geojsonGroupEnerRenov);
*/

//TERMINA CLUSTER QUE CAMBIA SIMBOLOS POR CATEGORÍA



//CAPA DE LÍNEAS
    var lineaFerrea = L.geoJson(ferrocarril,{
       style: color_ferreo
     });

    var lineaTelefono = L.geoJson(telefono,{
       style: color_telefono
     });


//CAPA DE POLÍGONOS
    ///////CAPA DE PARQUES INDUSTRIALES//////
    function popup_ParqueInd(feature, layer) { 
        if (feature.properties && feature.properties.Name) 
        { 
        layer.bindPopup('<p><b>PODEBIS:</b>'+feature.properties.Name+'</p'); 
        } 
    }

    var parquesIndustriales = L.geoJson(Parque_ind,{
      style: color_parqueInd,onEachFeature: popup_ParqueInd
    }).addTo(map);

    /////////CAPA DE ESTADOS//////////
    var PoligonoEdos = L.geoJson(Estados,{
      style: color_Estados
    });

    /////////CAPA DE MUNICIPIOS//////////
    function popup_Muni(feature, layer) { 
        if (feature.properties && feature.properties.NOMGEO) 
        { 
        layer.bindPopup('<p><b>Municipio:</b>'+feature.properties.NOMGEO+'</p'); 
        } 
    }

    var PoligonoMun = L.geoJson(Muni,{
      style: color_Municipios,onEachFeature: popup_Muni
    });




    

//AQUÍ PUEDES AGREGAR MÁS MAPAS BASE (AHORITA SOLO HAY DOS)
var osmBase = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors'
});




//ESTE ES EL CONTROL QUE PRENDE Y APAGA CAPAS

//CONTROL PARA CAPAS BASE
var baseMaps = {
    "OSM": osmBase
};

//CONTROL PARA TUS CAPAS
var overlayMaps = {
    "Parques Industriales": parquesIndustriales,
    "Estados": PoligonoEdos,
    "Municipios": PoligonoMun,
    "Centrales Eléctricas": centrales,
    "Subestación Eléctrica": subestElectrica, 
    "Aeródromos": aeropuertos, 
    "Línea Ferrea": lineaFerrea,
    "Línea Telefonica": lineaTelefono,
    "Extracción de petroleo y gas": extraccionPetrolera,
    "Generadores CFE": generadoresElec,
    "Centrales eléctricas energía renovable": centralElecRen,
    "Manufacturas": industriaManufac,
    }

///ESTE ES EL RECTANGULITO DONDE APARECERÁN TODAS LAS CAPAS (NO CAMBIA, AQUÍ NO SE HACE NADA YA)
L.control.layers(baseMaps, overlayMaps,{
    position: 'topright', // 'topleft', 'bottomleft', 'bottomright'
    collapsed: false // true
}).addTo(map);