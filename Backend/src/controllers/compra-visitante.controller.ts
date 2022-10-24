import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Compra,
  Visitante,
} from '../models';
import {CompraRepository} from '../repositories';

export class CompraVisitanteController {
  constructor(
    @repository(CompraRepository)
    public compraRepository: CompraRepository,
  ) { }

  @get('/compras/{id}/visitante', {
    responses: {
      '200': {
        description: 'Visitante belonging to Compra',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visitante)},
          },
        },
      },
    },
  })
  async getVisitante(
    @param.path.string('id') id: typeof Compra.prototype.id,
  ): Promise<Visitante> {
    return this.compraRepository.visitante(id);
  }
}
