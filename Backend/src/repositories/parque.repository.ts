import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Parque, ParqueRelations, Zona, Atraccion, Plan, Comida} from '../models';
import {ZonaRepository} from './zona.repository';
import {AtraccionRepository} from './atraccion.repository';
import {PlanRepository} from './plan.repository';
import {ComidaRepository} from './comida.repository';

export class ParqueRepository extends DefaultCrudRepository<
  Parque,
  typeof Parque.prototype.id,
  ParqueRelations
> {

  public readonly zonas: HasManyRepositoryFactory<Zona, typeof Parque.prototype.id>;

  public readonly atracciones: HasManyRepositoryFactory<Atraccion, typeof Parque.prototype.id>;

  public readonly planes: HasManyRepositoryFactory<Plan, typeof Parque.prototype.id>;

  public readonly comidas: HasManyRepositoryFactory<Comida, typeof Parque.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('ComidaRepository') protected comidaRepositoryGetter: Getter<ComidaRepository>,
  ) {
    super(Parque, dataSource);
    this.comidas = this.createHasManyRepositoryFactoryFor('comidas', comidaRepositoryGetter,);
    this.registerInclusionResolver('comidas', this.comidas.inclusionResolver);
    this.planes = this.createHasManyRepositoryFactoryFor('planes', planRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
    this.atracciones = this.createHasManyRepositoryFactoryFor('atracciones', atraccionRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
    this.zonas = this.createHasManyRepositoryFactoryFor('zonas', zonaRepositoryGetter,);
    this.registerInclusionResolver('zonas', this.zonas.inclusionResolver);
  }
}
