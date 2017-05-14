import {User} from "../user/user";
import {Commodity} from "./commodity";
import {Broker} from "./broker";
/**
 * Created by john on 2017/5/14 0014.
 */
export class UserOrder {
    user: User;
    commodity: Commodity;
    broker: Broker;
    uo_price: number;
    uo_type: string;
    uo_vol: number;
    uo_status: string;
    uo_date: string;
    uo_limit_value?: number;
    uo_stop_value?: number;
    uo_fixed: boolean;
    constructor (json: any) {
        this.user = json.user;
        this.commodity = json.commodity ;
        this.broker = json.broker
        this.uo_price =  json.uo_price
        this.uo_type = json.uo_type
        this.uo_vol = json.uo_vol
        this.uo_status = json.uo_status
        this.uo_date = json.uo_date
        this.uo_limit_value = json.uo_limit_value;
        this.uo_stop_value = json.uo_stop_value
        this.uo_fixed = json.uo_fixed;
    }
}

