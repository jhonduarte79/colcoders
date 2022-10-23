import {Entity, model, property} from '@loopback/repository';

@model()
export class Atraccion extends Entity {
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
    type: 'number',
    required: true,
  })
  estatura: number;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;


  constructor(data?: Partial<Atraccion>) {
    super(data);
  }
}

export interface AtraccionRelations {
  // describe navigational properties here
}

export type AtraccionWithRelations = Atraccion & AtraccionRelations;
