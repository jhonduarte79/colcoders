import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Venta, VentaRelations, Administrador} from '../models';
import {AdministradorRepository} from './administrador.repository';

export class VentaRepository extends DefaultCrudRepository<
  Venta,
  typeof Venta.prototype.id,
  VentaRelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof Venta.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Venta, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
