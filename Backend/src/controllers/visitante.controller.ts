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
} from '@loopback/rest';
import { keys } from '../configuracion/keys';
import {CambiarPassword, Credenciales, Visitante} from '../models';
import {VisitanteRepository} from '../repositories';
import { AutenticacionService } from '../services';
const fetch = require("node-fetch");

export class VisitanteController {
  constructor(
    @repository(VisitanteRepository)
    public visitanteRepository : VisitanteRepository,
    @service(AutenticacionService)
    public servicioAutenticacion:AutenticacionService
  ) {}

  @post('/visitantes')
  @response(200, {
    description: 'Visitante model instance',
    content: {'application/json': {schema: getModelSchemaRef(Visitante)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitante, {
            title: 'NewVisitante',
            exclude: ['id'],
          }),
        },
      },
    })
    visitante: Omit<Visitante, 'id'>,
  ): Promise<Visitante> {
    let clave = this.servicioAutenticacion.GenerarPassword();
    let claveCifrada = this.servicioAutenticacion.EncriptarPassword(clave);
    visitante.password = claveCifrada;

    let v = await this.visitanteRepository.create(visitante);
   
    //notificacion al usuario 
    let destino = v.email;
    let asunto = "Registro en Adventure Park";
    let mensaje = `Hola ${v.nombre}, su usuario es: ${v.email} y su contraseña es: ${clave}`
    
    fetch(`${keys.urlNotificaciones}/email?correo_destino=${destino}&asunto=${asunto}&contenido=${mensaje}`).then((data:any)=>{
      console.log(data);
    });
    return v;
  }

  @get('/visitantes/count')
  @response(200, {
    description: 'Visitante model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Visitante) where?: Where<Visitante>,
  ): Promise<Count> {
    return this.visitanteRepository.count(where);
  }

  @get('/visitantes')
  @response(200, {
    description: 'Array of Visitante model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Visitante, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Visitante) filter?: Filter<Visitante>,
  ): Promise<Visitante[]> {
    return this.visitanteRepository.find(filter);
  }

  @patch('/visitantes')
  @response(200, {
    description: 'Visitante PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitante, {partial: true}),
        },
      },
    })
    visitante: Visitante,
    @param.where(Visitante) where?: Where<Visitante>,
  ): Promise<Count> {
    return this.visitanteRepository.updateAll(visitante, where);
  }

  @get('/visitantes/{id}')
  @response(200, {
    description: 'Visitante model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Visitante, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Visitante, {exclude: 'where'}) filter?: FilterExcludingWhere<Visitante>
  ): Promise<Visitante> {
    return this.visitanteRepository.findById(id, filter);
  }

  @patch('/visitantes/{id}')
  @response(204, {
    description: 'Visitante PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitante, {partial: true}),
        },
      },
    })
    visitante: Visitante,
  ): Promise<void> {
    await this.visitanteRepository.updateById(id, visitante);
  }

  @put('/visitantes/{id}')
  @response(204, {
    description: 'Visitante PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() visitante: Visitante,
  ): Promise<void> {
    await this.visitanteRepository.replaceById(id, visitante);
  }

  @del('/visitantes/{id}')
  @response(204, {
    description: 'Visitante DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.visitanteRepository.deleteById(id);
  }

  @post('/Login')
  @response(200, {
    description: 'identificar visitante'
  })
  async identicar(
    @requestBody() credenciales:Credenciales
  ):Promise<Visitante | null>{
    credenciales.password = this.servicioAutenticacion.EncriptarPassword(credenciales.password);
    let personaEncontrada = await this.visitanteRepository.findOne({
      where:{
        email: credenciales.usuario,
        password: credenciales.password
      }
    });
    return personaEncontrada;
  }

  @post('/recuperacionPassword')
  @response(200, {
    description: "recuperacion de contraseña visitante"
  })
  async recuperacionPassword(
    @requestBody() correo: string
  ): Promise<Boolean>{
    let a = await this.visitanteRepository.findOne({
      where: {
        email: correo 
      }
    });
    if (a) {
      let clave = this.servicioAutenticacion.GenerarPassword();
      let claveCifrada = this.servicioAutenticacion.EncriptarPassword(clave);
      a.password = claveCifrada;
      await this.visitanteRepository.updateById(a.id, a);

    let destino = a.email;
    let asunto = "Recuperacion de contraseña de adventure park";
    let mensaje = `Hola ${a.nombre}, su nueva contraseña de ingreso es: ${clave}`;
    
    fetch(`${keys.urlNotificaciones}/email?correo_destino=${destino}&asunto=${asunto}&contenido=${mensaje}`).then((data:any)=>{
      console.log(data);
    });
    return true;
    } else {
      return false;
    }
  }

  @post('/cambiarPassword')
  @response(200, {
    description: "asignar contraseña a visitantes"
  })
  async cambiar(
    @requestBody() cambiar: CambiarPassword
  ):Promise<Boolean>{
    let passCifrado = this.servicioAutenticacion.EncriptarPassword(cambiar.actual);
    let a = await this.visitanteRepository.findOne({
      where: {
        password: passCifrado
      }
    });
    if(a){
      if(cambiar.nueva == cambiar.revalidar){
        a.password = this.servicioAutenticacion.EncriptarPassword(cambiar.revalidar);
        await this.visitanteRepository.updateById(a.id, a);

    let destino = a.email;
    let asunto = "Cambio de contraseña de adventure park";
    let mensaje = `Hola ${a.nombre}, usted cambio su contraseña de ingreso, ahora es: ${cambiar.revalidar}`;
    
    fetch(`${keys.urlNotificaciones}/email?correo_destino=${destino}&asunto=${asunto}&contenido=${mensaje}`).then((data:any)=>{
      console.log(data);
    });

        return true;
      }
      return false;
    }
    return false;
  }
}
