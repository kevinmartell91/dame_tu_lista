import { Deserializable } from 'src/app/shared/models/deserializable.model';

export class AddressOrder implements Deserializable {
  public streetName?: string;
  public streetNumber?: string;
  public apartmentNumber?: string;
  public district?: string;
  public city?: string;
  public department?: string;
  public country?: string;
  public reference?: string;
  public details?: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
