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
  Atraccion,
} from '../models';
import {ParqueRepository} from '../repositories';

export class ParqueAtraccionController {
  constructor(
    @repository(ParqueRepository) protected parqueRepository: ParqueRepository,
  ) { }

  @get('/parques/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Array of Parque has many Atraccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atraccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Atraccion>,
  ): Promise<Atraccion[]> {
    return this.parqueRepository.atracciones(id).find(filter);
  }

  @post('/parques/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Parque model instance',
        content: {'application/json': {schema: getModelSchemaRef(Atraccion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Parque.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atraccion, {
            title: 'NewAtraccionInParque',
            exclude: ['id'],
            optional: ['parqueId']
          }),
        },
      },
    }) atraccion: Omit<Atraccion, 'id'>,
  ): Promise<Atraccion> {
    return this.parqueRepository.atracciones(id).create(atraccion);
  }

  @patch('/parques/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Parque.Atraccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atraccion, {partial: true}),
        },
      },
    })
    atraccion: Partial<Atraccion>,
    @param.query.object('where', getWhereSchemaFor(Atraccion)) where?: Where<Atraccion>,
  ): Promise<Count> {
    return this.parqueRepository.atracciones(id).patch(atraccion, where);
  }

  @del('/parques/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Parque.Atraccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Atraccion)) where?: Where<Atraccion>,
  ): Promise<Count> {
    return this.parqueRepository.atracciones(id).delete(where);
  }
}
