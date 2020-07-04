import { Deserializable } from 'src/app/shared/models/deserializable.model';

export class AddressOrder implements Deserializable {

    streetName: string;
    streetnumber: string;
    district: string;
    city: string;
    department: string;
    country: string;
    reference: string;
    details: string;

    deserialize(input: any) {

        Object.assign(this, input);
        return this;
    }
}