
export  interface order {
    _id: string;
    order_num: string;
    order_package_color: string;
    total_price: number;
    order_status : [];
    buyer_id: string;
    buyer_name: string;
    buyer_address: {
        street: string;
        number: string;
        district: string;
        country: string;
    };
    buyer_phone: string;


}