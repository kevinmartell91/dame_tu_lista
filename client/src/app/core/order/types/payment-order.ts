import { Deserializable } from 'src/app/shared/models/deserializable.model';

export class PaymentOrder implements Deserializable {

    transaction_id: string;
    amount: number;
    method: string;
    //TODO type methods

    deserialize(input: any) { 

        Object.assign(this, input);
        return this;
    }
}