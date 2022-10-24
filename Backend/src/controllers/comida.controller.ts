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
import {Comida} from '../models';
import {ComidaRepository} from '../repositories';

export class ComidaController {
  constructor(
    @repository(ComidaRepository)
    public comidaRepository : ComidaRepository,
  ) {}

  @post('/comidas')
  @response(200, {
    description: 'Comida model instance',
    content: {'application/json': {schema: getModelSchemaRef(Comida)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comida, {
            title: 'NewComida',
            exclude: ['id'],
          }),
        },
      },
    })
    comida: Omit<Comida, 'id'>,
  ): Promise<Comida> {
    return this.comidaRepository.create(comida);
  }

  @get('/comidas/count')
  @response(200, {
    description: 'Comida model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Comida) where?: Where<Comida>,
  ): Promise<Count> {
    return this.comidaRepository.count(where);
  }

  @get('/comidas')
  @response(200, {
    description: 'Array of Comida model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Comida, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Comida) filter?: Filter<Comida>,
  ): Promise<Comida[]> {
    return this.comidaRepository.find(filter);
  }

  @patch('/comidas')
  @response(200, {
    description: 'Comida PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comida, {partial: true}),
        },
      },
    })
    comida: Comida,
    @param.where(Comida) where?: Where<Comida>,
  ): Promise<Count> {
    return this.comidaRepository.updateAll(comida, where);
  }

  @get('/comidas/{id}')
  @response(200, {
    description: 'Comida model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Comida, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Comida, {exclude: 'where'}) filter?: FilterExcludingWhere<Comida>
  ): Promise<Comida> {
    return this.comidaRepository.findById(id, filter);
  }

  @patch('/comidas/{id}')
  @response(204, {
    description: 'Comida PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comida, {partial: true}),
        },
      },
    })
    comida: Comida,
  ): Promise<void> {
    await this.comidaRepository.updateById(id, comida);
  }

  @put('/comidas/{id}')
  @response(204, {
    description: 'Comida PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() comida: Comida,
  ): Promise<void> {
    await this.comidaRepository.replaceById(id, comida);
  }

  @del('/comidas/{id}')
  @response(204, {
    description: 'Comida DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.comidaRepository.deleteById(id);
  }
}
