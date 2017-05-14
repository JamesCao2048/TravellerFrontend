/**
 * Created by john on 2017/5/14 0014.
 */
import {Component, OnInit} from "@angular/core";
import {Broker} from "../entity/broker";
import {Commodity} from "../entity/commodity";
import {Depth} from "../entity/depth";
import {Comparator} from "clarity-angular";
import {DepthOrder} from "../entity/depthorder";

class PriceComparator implements Comparator<DepthOrder> {
    compare(a: DepthOrder, b: DepthOrder) {
        return a.price - b.price;
    }
}
class BuyVolComparator implements Comparator<DepthOrder> {
    compare(a: DepthOrder, b: DepthOrder) {
        if( a.sell && !b.sell)
            return 1;
        if( !a.sell && b.sell )
            return -1;
        if(a.vol == b.vol)
            return a.price - b.price;
        return a.vol - b.vol
    }
}
class SellVolComparator implements  Comparator<DepthOrder> {
    compare(a: DepthOrder, b: DepthOrder) {
        if( !a.sell && b.sell)
            return 1;
        if( a.sell && !b.sell )
            return -1;
        if(a.vol == b.vol)
            return a.price - b.price;
        return a.vol - b.vol
    }
}
@Component({
    templateUrl: './marketdepth.component.html',
    styleUrls:['./marketdepth.component.css']
})
export class MarketDepthComponent implements OnInit {
    brokers: Broker[];
    broker_commodity: object;
    commoditylist: Commodity[];
    depths: object;
    curBrokerId: string;
    curCommodityId: string;
    curBroker: Broker;
    curCommodity: Commodity;
    curDepth: Depth;
    private priceComparator = new PriceComparator();
    private sellComparator = new SellVolComparator();
    private buyComparator = new BuyVolComparator();

    ngOnInit() {
        this.mockInit();
    }

    mockInit() {
        this.brokers = [{"b_id": "b1", "b_name": "broker1", "b_url": "url1"},
            {"b_id": "b2", "b_name": "broker2", "b_url": "url2"},
            {"b_id": "b3", "b_name": "broker3", "b_url": "url3"},
        ]
        this.broker_commodity = {
            "b1": [{"c_id": "c1"}, {"c_id": "c2"}, {"c_id": "c3"}],
            "b2": [{"c_id": "c3"}, {"c_id": "c4"}],
            "b3": [{"c_id": "c1"}, {"c_id": "c4"}],
        }
        this.commoditylist = [{"c_id": "c1", "c_name": "gun"}, {"c_id": "c2", "c_name": "bun"},
            {"c_id": "c3", "c_name": "light"}, {"c_id": "c4", "c_name": "dark"}];
        this.depths = {
            "b1_c1": {
                "c_id": "c1", "b_id": "b1",
                "sell_orders": [{"price": "100", "vol": "100", "create_time": "2017-5-12", "sell": true, "company_id": "tencent"},
                    {"price": "200", "vol": "1000", "create_time": "2017-5-11", "sell": true, "company_id": "ali"},
                    {"price": "50", "vol": "50", "create_time": "2017-5-10", "sell": true, "company_id": "morgan"},],
                "buy_orders": [{"price": "40", "vol": "100", "create_time": "2017-5-11", "sell": false, "company_id": "paypel"},
                    {"price": "30", "vol": "200", "create_time": "2017-5-11", "sell": false, "company_id": "tencent"},
                    {"price": "20", "vol": "30", "create_time": "2017-5-10", "sell":false , "company_id": "morgan"},]
            },
            "b1_c2": {
                "c_id": "c2", "b_id": "b1",
                "sell_orders": [{"price": "130", "vol": "200", "create_time": "2017-5-12","sell": true, "company_id": "morgan"},
                    {"price": "500", "vol": "4000", "create_time": "2015-5-11", "sell": true, "company_id": "morgan"},
                    {"price": "60", "vol": "50", "create_time": "2016-5-10", "sell": true,"company_id": "baidu"},],
                "buy_orders": [{"price": "40", "vol": "100", "create_time": "2017-5-11", "sell": false, "company_id": "baidu"},
                    {"price": "20", "vol": "100", "create_time": "2016-5-11", "sell": false, "company_id": "tencent"},
                    {"price": "30", "vol": "20", "create_time": "2016-5-10","sell": false,"company_id": "ali"}]
            }
        };
        for(let broker of this.brokers){
            for(let commodity of this.commoditylist){
                if(this.depths.hasOwnProperty(broker.b_id+"_"+commodity.c_id)){
                    this.depths[broker.b_id+"_"+commodity.c_id].sell_orders.sort((e1, e2) => e2.price - e1.price);
                    this.depths[broker.b_id+"_"+commodity.c_id].buy_orders.sort((e1,e2) => e2.price - e1.price);
                    this.depths[broker.b_id+"_"+commodity.c_id].sell_orders.forEach((val,idx,array) =>
                        {
                            val['depn']=this.depths[broker.b_id+"_"+commodity.c_id].sell_orders.length-idx;
                        }
                    )
                    this.depths[broker.b_id+"_"+commodity.c_id].buy_orders.forEach((val,idx,array) =>
                        {
                            val['depn']=idx+1;
                        }
                    )
                }
            }
        }

        this.curBrokerId = this.brokers[0].b_id;
        this.curCommodityId = this.broker_commodity[this.curBrokerId][0].c_id;
        this.curBroker = this.brokers.find(e => e.b_id == this.curBrokerId);
        this.curCommodity = this.commoditylist.find(e => e.c_id == this.curCommodityId);
        this.curDepth = this.depths[this.curBrokerId+"_"+this.curCommodityId];
        console.log(this.curBroker);
        console.log(this.curCommodity);
        console.log(this.curDepth);
    }
    changeBroker(): void {
        this.curBroker = this.brokers.find(e => e.b_id == this.curBrokerId);
        this.curCommodityId = this.broker_commodity[this.curBrokerId][0].c_id;
        this.curCommodity = this.commoditylist.find(e => e.c_id == this.curCommodityId);
        this.curDepth = this.depths[this.curBrokerId+"_"+this.curCommodityId];
        console.log(this.curBroker);
        console.log(this.curCommodity);
    }
    changeCommodity(): void {
        this.curCommodity = this.commoditylist.find(e => e.c_id == this.curCommodityId);
        this.curDepth = this.depths[this.curBrokerId+"_"+this.curCommodityId];
        console.log(this.curBroker);
        console.log(this.curCommodity);
    }

}



