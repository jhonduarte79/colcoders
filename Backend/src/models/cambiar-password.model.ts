import {Model, model, property} from '@loopback/repository';

@model()
export class CambiarPassword extends Model {
  @property({
    type: 'string',
    required: true,
  })
  actual: string;

  @property({
    type: 'string',
    required: true,
  })
  nueva: string;

  @property({
    type: 'string',
    required: true,
  })
  revalidar: string;


  constructor(data?: Partial<CambiarPassword>) {
    super(data);
  }
}

export interface CambiarPasswordRelations {
  // describe navigational properties here
}

export type CambiarPasswordWithRelations = CambiarPassword & CambiarPasswordRelations;
