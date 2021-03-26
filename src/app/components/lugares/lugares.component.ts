import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { LugarService } from 'src/app/services/lugar.service.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements OnInit {
  constructor(
    public lugarService: LugarService,
  ) {
    //this.todosLugares();
  }
  /*
  lugar = {
    clicksLugarCrear: Number,
    nombreLugarCrear: String,
    descripcionLugarCrear: String,
    costoLugarCrear: String,
    ciudadLugarCrear: String,
    longitudLugarCrear: String,
    latitudLugarCrear: String,
  }*/
  datosLugares: any;

  nombreLugarCrear: string;
  descripcionLugarCrear: string;
  costoLugarCrear: number;
  ciudadLugarCrear: string;
  longitudLugarCrear: string;
  latitudLugarCrear: string;

  valLatitud: String;
  valLongitud: String;

  mapa1: Mapboxgl.Map;
  mapa2: Mapboxgl.Map;
  longitud : number;
  latitud : number;

  ngOnInit(): void {
    this.todosLugares();

    Mapboxgl.accessToken = environment.mapboxkey;
    this.mapa1 = new Mapboxgl.Map({
      container: 'mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-72.943686,5.693171], // starting position
      zoom: 17 // starting zoom
    });
    this.createMarker1(-72.943686,5.693171);
    Mapboxgl.accessToken = environment.mapboxkey;
    this.mapa2 = new Mapboxgl.Map({
      container: 'mapboxAdd', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-72.943686,5.693171], // starting position
      zoom: 17 // starting zoom
    });
    this.createMarker2(-72.943686,5.693171);
  }
  createMarker1(lng: number, lat: number): void {
    const marker = new Mapboxgl.Marker({
      draggable: true
    })
    .setLngLat([lng, lat])
    .addTo(this.mapa1)

    marker.on('drag', () => {
      this.longitud = marker.getLngLat().lng;
      this.latitud = marker.getLngLat().lat;
      console.log('Long: '+this.longitud+' Lat: '+this.latitud)
    })
  }
  createMarker2(lng: number, lat: number): void {
    const marker = new Mapboxgl.Marker({
      draggable: true
    })
    .setLngLat([lng, lat])
    .addTo(this.mapa2)

    marker.on('drag', () => {
      this.longitud = marker.getLngLat().lng;
      this.latitud = marker.getLngLat().lat;
      console.log('Long: '+this.longitud+' Lat: '+this.latitud)
    })
  }

  crearLugar(){
    document.getElementById('windowAgregarLugar').style.display = 'block';
  }
  cerrarWindowAddLugar(){
    document.getElementById('windowAgregarLugar').style.display = 'none';
    document.getElementById('windowVerLugar').style.display = 'none';
  }
  verificarGuardarLugar(){
    
    if(this.nombreLugarCrear == undefined || this.nombreLugarCrear=="" || this.descripcionLugarCrear == undefined 
      || this.descripcionLugarCrear =="" || this.costoLugarCrear == undefined || this.costoLugarCrear == null 
      || this.ciudadLugarCrear == undefined || this.ciudadLugarCrear==null || this.ciudadLugarCrear == ""){
        alert('Ingresa todos los valores correctamente, por favor');
    } else if(this.latitudLugarCrear == undefined || this.longitudLugarCrear == undefined || this.longitudLugarCrear == ""
    || this.latitudLugarCrear == ""){
      alert("Mueve el marcador del mapa para elegir la longitud y la latitud y luego pulsa marcador");
    }else{
      this.guardarLugar()
    }
  }
  async guardarLugar(){
    //alert(this.nombreLugarCrear+"--"+this.descripcionLugarCrear+"--"+this.costoLugarCrear+"--"+this.ciudadLugarCrear+"--"+this.longitudLugarCrear+"--"+this.latitudLugarCrear)
    const lugarValido = await this.lugarService.crearLugar(this.nombreLugarCrear, this.descripcionLugarCrear, 
      this.costoLugarCrear, this.ciudadLugarCrear, this.longitudLugarCrear, this.latitudLugarCrear);  
    if(lugarValido){
      alert("Lugar guardado");
    }else{
      alert("No se guardó");
    }
  }
  actualizarMarcador(){
    this.latitudLugarCrear = this.latitud+"";
    this.longitudLugarCrear = this.longitud+"";
  }
   async todosLugares(){
    //console.log("asdasd"+this.lugarService.getLugares().toPromise);
    console.log("LLego"+ await this.lugarService.getLugares());
    this.datosLugares =  await this.lugarService.getLugares().toPromise();
    //console.log("asdas"+this.datosLugares)
  }
  verLugar(){
    document.getElementById('windowVerLugar').style.display = 'block';
  }
}

