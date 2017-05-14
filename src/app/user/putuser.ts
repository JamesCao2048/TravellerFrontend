/**
 * Created by john on 2017/4/19 0019.
 */
export class PutUser {
    u_name: string;
    u_password?: string;
    u_mail?: string;
    u_role: number;
    u_hash: number;
    constructor (json: any) {
        this.u_name = json.u_name;
        this.u_password = json.password;
        this.u_mail = json.u_mail;
        this.u_role =  json.u_role;
        this.u_hash = json.u_hash;
    }
}
