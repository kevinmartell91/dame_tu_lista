import { Deserializable } from "../../../shared/models/deserializable.model";

export class FavoriteReatailers implements Deserializable {

    _id?: string;
    storeName?: string;
    isDeliveryService?: string;
    isPickUpService?: string;
    storeImgUrl?: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}