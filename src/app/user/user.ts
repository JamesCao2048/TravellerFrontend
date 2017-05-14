/**
 * Created by john on 2017/4/10 0010.
 */
export class User {
  u_name: string;
  u_password?: string;
  u_mail?: string;
    u_role: number;
    u_hash: number;
    u_job: string;
    u_age: number;
    u_gender: number;
    id?: string;
    constructor (json: any) {
        this.u_name = json.u_name;
        this.u_password = json.password;
        this.u_mail = json.u_mail;
        this.u_role =  json.u_role;
        this.u_hash = json.u_hash;
        this.id = json.id;
        this.u_job = json.u_job;
        this.u_age = json.u_age;
        this.u_gender = json.u_gender;
    }
}
