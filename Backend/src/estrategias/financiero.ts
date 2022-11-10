import { AuthenticationStrategy } from "@loopback/authentication";
import { Request, RedirectRoute, HttpErrors, RestHttpErrors } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import parseBearerToken from "parse-bearer-token";
import { service } from "@loopback/core";
import { AutenticacionService } from "../services";


export class Financiero implements AuthenticationStrategy{
    name: string = "financiero";

    constructor(
        @service(AutenticacionService)
        public servicioAutenticacion: AutenticacionService
    ){}
    async authenticate(request: Request): Promise<UserProfile | undefined> {
        let token = parseBearerToken(request);
        if (token) {
            let datos = this.servicioAutenticacion.ValidarToken(token);
            if (datos) {
               if (datos.data.rol == "636839bc792d6e2418c2fc1d") {
                let perfil: UserProfile = Object.assign({
                    nombre: datos.data.nombre
                });
                return perfil;

               } else {
                throw new HttpErrors[401]("tiene token valido pero acceso denegado");
                
               }
            } else {
                throw new HttpErrors[401]("tiene un token invalido");
            }
        } else {
            throw new HttpErrors[401]("no se genero token");
        }
    }

}