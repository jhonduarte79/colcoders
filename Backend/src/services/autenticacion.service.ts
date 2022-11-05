import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generador=require("generate-password");
const cryptoJS=require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

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
}
