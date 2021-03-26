import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string = null;
  autentificado = false; //GUARD
  constructor(
    private http : HttpClient
  ) {}
  login(correo: string,password: string){
    const data = {correo,password};
    return new Promise(resolve => {
      this.http.post(`${URL}/usuario/entrar`, data)
      .subscribe((res: any) => {
        if(res.ok){
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });
  };
  register(nombres: string, apellidos: string, documento:string, telefono: string, ciudad: string,correo: string, password: string){
    const data = {nombres, apellidos, documento, telefono, ciudad,correo,password};
    return new Promise(resolve => {
      this.http.post(`${URL}/usuario/crear`, data)
      .subscribe((res: any) => {
        if(res.ok){
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });
  }
}
