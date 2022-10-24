import {Entity, model, property} from '@loopback/repository';

@model()
export class Comida extends Entity {
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
  imagen: string;

  @property({
    type: 'string',
  })
  parqueId?: string;

  constructor(data?: Partial<Comida>) {
    super(data);
  }
}

export interface ComidaRelations {
  // describe navigational properties here
}

export type ComidaWithRelations = Comida & ComidaRelations;
