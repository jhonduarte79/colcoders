import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Visitante, VisitanteRelations} from '../models';

export class VisitanteRepository extends DefaultCrudRepository<
  Visitante,
  typeof Visitante.prototype.id,
  VisitanteRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Visitante, dataSource);
  }
}
