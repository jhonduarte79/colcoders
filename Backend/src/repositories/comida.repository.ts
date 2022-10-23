import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Comida, ComidaRelations} from '../models';

export class ComidaRepository extends DefaultCrudRepository<
  Comida,
  typeof Comida.prototype.id,
  ComidaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Comida, dataSource);
  }
}
