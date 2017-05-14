/**
 * Created by john on 2017/5/14 0014.
 */
import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Broker} from "../entity/broker";

@Component({
    templateUrl: './order.component.html',
})
export class OrderComponent  implements OnInit{
    employeeAddressForm = new FormGroup({
        broker: new FormControl('', Validators.required),
        commodity: new FormControl('', Validators.required)
    });
    brokers: Broker[];
    years: number[];
    months: string[];
    order_types: string[];
    broker_commodity: object;
    curBrokerId: string;

    mockInit(){
        this.years=[2014,2015,2016,2017];
        this.brokers = [{"b_id": "b1", "b_name": "broker1", "b_url": "url1"},
            {"b_id": "b2", "b_name": "broker2", "b_url": "url2"},
            {"b_id": "b3", "b_name": "broker3", "b_url": "url3"},
        ]
        this.broker_commodity = {
            "b1": [{"c_id": "c1"}, {"c_id": "c2"}, {"c_id": "c3"}],
            "b2": [{"c_id": "c3"}, {"c_id": "c4"}],
            "b3": [{"c_id": "c1"}, {"c_id": "c4"}],
        }
        this.months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'];
        this.order_types=['Market Order', 'Limit Order', 'Stop Order'];
        this.curBrokerId=this.brokers[0].b_id;
    }
    ngOnInit(){
        this.mockInit();
    }

    onSubmit(){
        console.log(this.employeeAddressForm.controls.broker.value);
        console.log(this.employeeAddressForm.controls.commodity.value);
    }
}
