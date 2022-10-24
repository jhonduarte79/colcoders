import {Entity, model, property, hasMany} from '@loopback/repository';
import {Parque} from './parque.model';

@model()
export class Ciudad extends Entity {
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

  @hasMany(() => Parque)
  parques: Parque[];

  @property({
    type: 'string',
  })
  departamentoId?: string;

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
