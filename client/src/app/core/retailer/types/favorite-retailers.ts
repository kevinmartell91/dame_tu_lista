import { Deserializable } from "../../../shared/models/deserializable.model";

export class FavoriteReatailers implements Deserializable {

    public _id?: string;
    public storeName?: string;
    public isDeliveryService?: string;
    public isPickUpService?: string;
    public storeImgUrl?: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}