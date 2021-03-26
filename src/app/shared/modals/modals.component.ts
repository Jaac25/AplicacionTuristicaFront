import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {

  constructor(
    public usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }
  login(forma: NgForm){
    const usuarioValido = this.usuarioService.login("Jorge.acevedo01@uptc.edu.co","1234C");
    if(usuarioValido){
      alert("yea bayb");
      this.usuarioService.autentificado = true;
    }
  }
}
