import { Deserializable } from '../../../shared/models/deserializable.model';

export class Address implements Deserializable {
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
