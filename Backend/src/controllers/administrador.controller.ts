import { authenticate } from '@loopback/authentication';
import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { keys } from '../configuracion/keys';
import {Administrador, Credenciales, Rol} from '../models';
import {AdministradorRepository} from '../repositories';
import { AutenticacionService } from '../services';
const fetch = require("node-fetch");

export class AdministradorController {
 constructor(
    @repository(AdministradorRepository)
    public administradorRepository : AdministradorRepository,
    @service(AutenticacionService)
    public servicioAutenticacion:AutenticacionService
  ) {}

  @authenticate("financiero")
  @post('/administradores')
  @response(200, {
    description: 'Administrador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {
            title: 'NewAdministrador',
            exclude: ['id'],
          }),
        },
      },
    })
    administrador: Omit<Administrador, 'id'>,
  ): Promise<Administrador> {
    
    let clave = this.servicioAutenticacion.GenerarPassword();
    let claveCifrada = this.servicioAutenticacion.EncriptarPassword(clave);
    administrador.password = claveCifrada;

    let a = await this.administradorRepository.create(administrador);
   
    //notificacion al usuario 
    let destino = a.email;
    let asunto = "Registro en Adventure Park";
    let mensaje = `Hola, ${a.nombres}, su usuario es: ${a.email} y su contraseña es: ${clave}`
    
    fetch(`${keys.urlNotificaciones}/email?correo_destino=${destino}&asunto=${asunto}&contenido=${mensaje}`).then((data:any)=>{
      console.log(data);
    });
    return a;
  }

  @get('/administradores/count')
  @response(200, {
    description: 'Administrador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Administrador) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.administradorRepository.count(where);
  }

  @get('/administradores')
  @response(200, {
    description: 'Array of Administrador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Administrador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Administrador) filter?: Filter<Administrador>,
  ): Promise<Administrador[]> {
    return this.administradorRepository.find(filter);
  }

  @patch('/administradores')
  @response(200, {
    description: 'Administrador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Administrador,
    @param.where(Administrador) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.administradorRepository.updateAll(administrador, where);
  }

  @get('/administradores/{id}')
  @response(200, {
    description: 'Administrador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Administrador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Administrador, {exclude: 'where'}) filter?: FilterExcludingWhere<Administrador>
  ): Promise<Administrador> {
    return this.administradorRepository.findById(id, filter);
  }

  @patch('/administradores/{id}')
  @response(204, {
    description: 'Administrador PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Administrador,
  ): Promise<void> {
    await this.administradorRepository.updateById(id, administrador);
  }

  @put('/administradores/{id}')
  @response(204, {
    description: 'Administrador PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() administrador: Administrador,
  ): Promise<void> {
    await this.administradorRepository.replaceById(id, administrador);
  }

  @del('/administradores/{id}')
  @response(204, {
    description: 'Administrador DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.administradorRepository.deleteById(id);
  }

  @post('/Login')
  @response(200, {
    description: 'identificar administradores'
  })
  async identicar(
    @requestBody() credenciales:Credenciales
  ):Promise<Administrador | null>{
    credenciales.password = this.servicioAutenticacion.EncriptarPassword(credenciales.password);
    let personaEncontrada = await this.administradorRepository.findOne({
      where:{
        email: credenciales.usuario,
        password: credenciales.password
      }
    });
    return personaEncontrada;
  }

  @post('/LoginT')
  @response(200, {
    description: "identificacion de administrador por token"
  })
  async identificarToken(
    @requestBody() credenciales:Credenciales
  ){
    credenciales.password = this.servicioAutenticacion.EncriptarPassword(credenciales.password);
    let a = await  this.servicioAutenticacion.IdentificarAdministrador(credenciales);
    if(a){
      let token = this.servicioAutenticacion.GenerarToken(a);
      return {
        informacion:{
          nombre: a.nombres+" "+a.apellidos,
          id: a.id,
          cargo: a.cargo,
          rol: a.rolId
        },
        tk: token
      }
    }else{
      throw new HttpErrors[401]("Datos no son correctos");
    }
  }
}
