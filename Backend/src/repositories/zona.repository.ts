import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Zona, ZonaRelations} from '../models';

export class ZonaRepository extends DefaultCrudRepository<
  Zona,
  typeof Zona.prototype.id,
  ZonaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Zona, dataSource);
  }
}
