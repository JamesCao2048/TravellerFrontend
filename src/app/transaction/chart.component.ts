/**
 * Created by john on 2017/5/14 0014.
 */
/**
 * Created by john on 2017/5/14 0014.
 */
import {Component, OnInit} from "@angular/core";
import {Broker} from "../entity/broker";
import {Commodity} from "../entity/commodity";

@Component({
    templateUrl: './chart.component.html',
    selector: 'chart-component'
})
export class ChartComponent implements OnInit {
    brokers: Broker[];
    years: number[];
    broker_commodity: object;
    commoditylist: Commodity[];
    transactions: object;
    curBrokerId: string;
    curCommodityId: string;
    curYear: number;

    public lineChartData:Array<any>;
    public lineChartLabels:Array<any>;
    public lineChartOptions:any = {
        responsive: true
    };
    public lineChartColors:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    public randomize():void {
        let _lineChartData:Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }


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
        this.commoditylist = [{"c_id": "c1", "c_name": "gun"}, {"c_id": "c2", "c_name": "bun"},
            {"c_id": "c3", "c_name": "light"}, {"c_id": "c4", "c_name": "dark"}];
        this.transactions = { "b1_c1":[65, 59, 80, 81, 56, 55, 40, 22, 33, 44, 12, 14],
            "b1_c2":[28, 48, 40, 19, 86, 27, 90,77,13,23,41,56],
            "b1_c3":[18, 48, 77, 9, 100, 27, 40, 19, 23, 41, 32, 23]
        }

        this.lineChartData = [
            {data: this.transactions["b1_c1"], label: 'b1_c1'},
            {data: this.transactions["b1_c2"], label: 'b1_c2'},
            {data: this.transactions["b1_c3"], label: 'b1_c3'}
        ];
        this.lineChartLabels=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'];
        this.curBrokerId=this.brokers[0].b_id;
        this.curCommodityId = this.broker_commodity[this.curBrokerId][0].c_id;
        this.curYear=this.years[0];
    }
    ngOnInit(){
        this.mockInit();
    }
    changeBroker(){

    }
    changeCommodity(){

    }
    changeYear(){

    }
}
