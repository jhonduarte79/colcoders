import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Parque, ParqueRelations} from '../models';

export class ParqueRepository extends DefaultCrudRepository<
  Parque,
  typeof Parque.prototype.id,
  ParqueRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Parque, dataSource);
  }
}
