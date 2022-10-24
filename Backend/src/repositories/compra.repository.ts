import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Compra, CompraRelations, Visitante} from '../models';
import {VisitanteRepository} from './visitante.repository';

export class CompraRepository extends DefaultCrudRepository<
  Compra,
  typeof Compra.prototype.id,
  CompraRelations
> {

  public readonly visitante: BelongsToAccessor<Visitante, typeof Compra.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VisitanteRepository') protected visitanteRepositoryGetter: Getter<VisitanteRepository>,
  ) {
    super(Compra, dataSource);
    this.visitante = this.createBelongsToAccessorFor('visitante', visitanteRepositoryGetter,);
    this.registerInclusionResolver('visitante', this.visitante.inclusionResolver);
  }
}
