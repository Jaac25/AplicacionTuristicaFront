import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LugarService {
  constructor(
    private http : HttpClient
  ) {}
  //Agregar lugar
  crearLugar(nombre: string,descripcion: string,costo: Number,ciudad: string,longitud: string,latitud: string){
    const data = {nombre,descripcion,costo,ciudad,longitud, latitud};
    return new Promise(resolve => {
      this.http.post(`${URL}/lugar/crear`,data)
      .subscribe((res: any) => {
        console.log(res);
        if(res.ok){
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });
  };
  ver(nombre: string){
    const data = {nombre};
    return new Promise(resolve => {
      this.http.post(`${URL}/lugar/ver`, data)
      .subscribe((res: any) => {
        if(res.ok){
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });
  }
 public getLugares() {
    /*const data = {};
    return new Promise(resolve => {
      this.http.get(`${URL}/lugar/todos`,data)
      .subscribe((lugares: any) => {
        console.log(lugares);
        if(lugares.ok){
          resolve(lugares);
        }
      });
    });*/
    return this.http.get(`${URL}/lugar/todos`)
  }
}
