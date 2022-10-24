import {Entity, model, property, hasMany} from '@loopback/repository';
import {Zona} from './zona.model';
import {Atraccion} from './atraccion.model';
import {Plan} from './plan.model';
import {Comida} from './comida.model';

@model()
export class Parque extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  codigo: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'number',
    required: true,
  })
  capacidad: number;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
  })
  ciudadId?: string;

  @hasMany(() => Zona)
  zonas: Zona[];

  @hasMany(() => Atraccion)
  atracciones: Atraccion[];

  @hasMany(() => Plan)
  planes: Plan[];

  @hasMany(() => Comida)
  comidas: Comida[];

  constructor(data?: Partial<Parque>) {
    super(data);
  }
}

export interface ParqueRelations {
  // describe navigational properties here
}

export type ParqueWithRelations = Parque & ParqueRelations;
