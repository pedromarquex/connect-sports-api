export class CreatePlaceDto {
  name: string;
  description: string;
  state: string;
  city: string;

  neighborhood: string;
  street: string;
  number_place: number
}

export class CreateSportsOnPlaceDto {
  placeId : string;
  sportId: string
}
