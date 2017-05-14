/**
 * Created by john on 2017/5/14 0014.
 */
export class Broker {
    b_id: string;
    b_name: string;
    b_url:string;
    constructor(json: any){
        this.b_id = json.b_id;
        this.b_name = json.b_name;
        this.b_url = json.b_url;
    }
}
