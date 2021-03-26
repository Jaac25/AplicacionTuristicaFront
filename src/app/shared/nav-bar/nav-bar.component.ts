import { Component, OnInit} from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  correoLogin: string;
  passwordLogin: string;

  nombresRegister: string;
  apellidosRegister: string;
  documentoRegister: string;
  telefonoRegister: string;
  ciudadRegister: string;
  correoRegister: string;
  passwordRegister: string;

  logueado: boolean = false;
  constructor(
    public usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }
  abrirVentanaLogin(){
    document.getElementById('ventanaLogin').style.display="block";
    document.getElementById('ventanaRegister').style.display="none";
  }
  abrirVentanaRegistrar(){
    document.getElementById('ventanaRegister').style.display="block";
    document.getElementById('ventanaLogin').style.display="none";
  }
  botonCancelarIR(){
    document.getElementById('ventanaLogin').style.display="none";
    document.getElementById('ventanaRegister').style.display="none";
  }
  async login(){
    const usuarioValido = await this.usuarioService.login(this.correoLogin, this.passwordLogin);  
    if(usuarioValido){
      alert("Usuario autenticado");
      this.borrarRegister();
      this.logueado = true;
    }else{
      alert("Algo salió mal");
    }
  }
  verificarRegistro(){
    if(this.nombresRegister == '' || this.apellidosRegister == '' || this.documentoRegister == '' 
    || this.telefonoRegister == '' || this.ciudadRegister == '' || this.correoRegister == '' 
    || this.passwordRegister == '' || this.nombresRegister == undefined || this.apellidosRegister == undefined 
    || this.documentoRegister == undefined || this.telefonoRegister == undefined || this.ciudadRegister == undefined 
    || this.correoRegister == undefined || this.passwordRegister == undefined){
      alert('Ingrese todos los datos, por favor');
    }else{
      this.register();
    }
  }
  async register(){
    const usuarioValido = await this.usuarioService.register(this.nombresRegister, this.apellidosRegister, 
      this.documentoRegister, this.telefonoRegister, this.ciudadRegister, this.correoRegister, this.passwordRegister);  
    if(usuarioValido){
      alert("Usuario Registrado");
      this.borrarRegister();
      this.logueado = true;
    }else{
      alert("No se registró");
    }
  }
  borrarRegister(){
    document.getElementById('botonLyRR').style.display='none';
    document.getElementById('botonLyRL').style.display='none';
    document.getElementById('botonCerrar').style.display='inline';
    this.botonCancelarIR();
  }
}
