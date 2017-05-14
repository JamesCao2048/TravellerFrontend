/**
 * Created by john on 2017/5/14 0014.
 */
export class DepthOrder {
    price: number;
    vol: number;
    create_time: string;
    company_id?: string;
    sell: boolean;
    depn: number;
    constructor(json: any){
        this.price = json.price;
        this.vol = json.vol;
        this.create_time = json.create_time;
        this.company_id = json.company_id;
        this.sell = json.sell;
        this.depn = json.depn;
    }
}
