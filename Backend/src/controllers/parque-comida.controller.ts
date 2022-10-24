import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Parque,
  Comida,
} from '../models';
import {ParqueRepository} from '../repositories';

export class ParqueComidaController {
  constructor(
    @repository(ParqueRepository) protected parqueRepository: ParqueRepository,
  ) { }

  @get('/parques/{id}/comidas', {
    responses: {
      '200': {
        description: 'Array of Parque has many Comida',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comida)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Comida>,
  ): Promise<Comida[]> {
    return this.parqueRepository.comidas(id).find(filter);
  }

  @post('/parques/{id}/comidas', {
    responses: {
      '200': {
        description: 'Parque model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comida)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Parque.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comida, {
            title: 'NewComidaInParque',
            exclude: ['id'],
            optional: ['parqueId']
          }),
        },
      },
    }) comida: Omit<Comida, 'id'>,
  ): Promise<Comida> {
    return this.parqueRepository.comidas(id).create(comida);
  }

  @patch('/parques/{id}/comidas', {
    responses: {
      '200': {
        description: 'Parque.Comida PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comida, {partial: true}),
        },
      },
    })
    comida: Partial<Comida>,
    @param.query.object('where', getWhereSchemaFor(Comida)) where?: Where<Comida>,
  ): Promise<Count> {
    return this.parqueRepository.comidas(id).patch(comida, where);
  }

  @del('/parques/{id}/comidas', {
    responses: {
      '200': {
        description: 'Parque.Comida DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Comida)) where?: Where<Comida>,
  ): Promise<Count> {
    return this.parqueRepository.comidas(id).delete(where);
  }
}
