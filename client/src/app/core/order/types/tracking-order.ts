import { Deserializable } from 'src/app/shared/models/deserializable.model';

export class TrackingOrder implements Deserializable {

    constructor([string, date]:[string, Date]){
        this.orderStatus = [[string, date]];
    }

    driver_name: string;
    company: string;
    trackingNumber: string;
    orderStatus: [[string, Date]];
    estimatedDelivery: string;

    deserialize(input: any) {

        Object.assign(this, input);

        return this;
    }
}