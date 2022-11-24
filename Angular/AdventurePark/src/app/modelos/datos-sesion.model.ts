import { DatosUserModel } from "./datos-user.model";

export class DatosSesionModel {
    tk?: string;
    /* nombre?: DatosUserModel;
    id?: DatosUserModel;
    cargo?: DatosUserModel;
    rol?: DatosUserModel; */
    info?: DatosUserModel;
    isLoggedIn:boolean = false;
    
}