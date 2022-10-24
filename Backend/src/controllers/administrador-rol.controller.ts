import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Administrador,
  Rol,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorRolController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/rol', {
    responses: {
      '200': {
        description: 'Rol belonging to Administrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async getRol(
    @param.path.string('id') id: typeof Administrador.prototype.id,
  ): Promise<Rol> {
    return this.administradorRepository.rol(id);
  }
}
