import {Commodity} from "./commodity";
import {Broker} from "./broker";
import {DepthOrder} from "./depthorder";
/**
 * Created by john on 2017/5/14 0014.
 */
export class Depth {
    c_id: string;
    b_id: string;
    sell_orders: DepthOrder[];
    buy_orders: DepthOrder[];
    constructor(json: any){
        this.c_id = json.c_id;
        this.b_id = json.b_id;
        this.sell_orders = json.sell_orders;
        this.buy_orders = json.buy_orders;
    }
}
