import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Venta,
  Administrador,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaAdministradorController {
  constructor(
    @repository(VentaRepository)
    public ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Venta.prototype.id,
  ): Promise<Administrador> {
    return this.ventaRepository.administrador(id);
  }
}
