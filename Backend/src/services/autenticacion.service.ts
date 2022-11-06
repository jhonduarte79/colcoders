import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { keys } from '../configuracion/keys';
import { Administrador, Credenciales } from '../models';
import { AdministradorRepository } from '../repositories';
const generador=require("generate-password");
const cryptoJS=require("crypto-js");
const JWT=require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(@repository(AdministradorRepository)
  public repositorioAdministrador: AdministradorRepository
  ) {}

  /*
   * Add service methods here
   */
  GenerarPassword(){
    let password= generador.generate({
      lenght: 8,
      Numbers: true
    });
    return password;
  }
  EncriptarPassword(password:string){
    let passwordE=cryptoJS.MD5(password);
    return passwordE;
  }
  IdentificarAdministrador(credenciales:Credenciales){
    try {
      let a = this.repositorioAdministrador.findOne({
        where: {email:credenciales.usuario, password:credenciales.password}
      });
      if(a){
        return a;
      }
      return false;
    } catch  {
      return false;
    }
  }
  GenerarToken(administrador:Administrador){
    let token = JWT.sign({
      data:{
        id: administrador.id,
        email: administrador.email,
        nombre: administrador.nombres + " "+ administrador.apellidos
      }
    }, keys.claveJWT
    )
    return token;
  }
  ValidarToken(token:string){
    try {
      let datos = JWT.verify(token, keys.claveJWT);
      return datos;
    } catch  {
      return false;
    }
  }
}
