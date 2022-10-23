import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Atraccion, AtraccionRelations} from '../models';

export class AtraccionRepository extends DefaultCrudRepository<
  Atraccion,
  typeof Atraccion.prototype.id,
  AtraccionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Atraccion, dataSource);
  }
}
