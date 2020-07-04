import { Deserializable } from 'src/app/shared/models/deserializable.model';

export class TrackingOrder implements Deserializable {

    driver_name: string;
    company: string;
    trackingNumber: string;
    orderStatus: [[string, Date]] = [["generated_by_buyer",new Date()]];
    estimatedDelivery: string;

    deserialize(input: any) {

        Object.assign(this, input);

        return this;
    }
}