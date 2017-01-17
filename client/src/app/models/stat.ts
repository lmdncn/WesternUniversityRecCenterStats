//This defines a Tab object


export class Stat {
    _id: string;
    loc: string;
    count: number;
    date: Date;
  

    constructor(_id:string, loc: string, count:number, date:Date) {
        this.loc = loc;
        this.count = count;
        this._id = _id;
        this.date = date;
    }


    



}
