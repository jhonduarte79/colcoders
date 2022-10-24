import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Rol} from '../models';
import {RolRepository} from './rol.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly rol: BelongsToAccessor<Rol, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Administrador, dataSource);
    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter,);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
  }
}
