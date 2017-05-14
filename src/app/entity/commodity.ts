/**
 * Created by john on 2017/5/14 0014.
 */
export class Commodity {
    c_id: string;
    c_name: string;
    constructor(json: any){
        this.c_id = json.c_id;
        this.c_name = json.c_name;
    }
}
