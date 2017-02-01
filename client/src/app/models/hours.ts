//This defines a Hours object


export class Hours {

    title: String;
    subtitle: String;
    monO: {
        hour: Number,
        f: String
    };
    monC: {
        hour: Number,
        f: String
    };
    tueO: {
        hour: Number,
        f: String
    };
    tuesC: {
        hour: Number,
        f: String
    };
    wedO: {
        hour: Number,
        f: String
    };
    wedC: {
        hour: Number,
        f: String
    };
    thuO: {
        hour: Number,
        f: String
    };
    thuC: {
        hour: Number,
        f: String
    };
    friO: {
        hour: Number,
        f: String
    };
    friC: {
        hour: Number,
        f: String
    };
    satO: {
        hour: Number,
        f: String
    };
    satC: {
        hour: Number,
        f: String
    };
    sunO: {
        hour: Number,
        f: String
    };
    sunC: {
        hour: Number,
        f: String
    };
    created:number;


    constructor(title: String,
        subtitle: String,
        monO: {
            hour: Number,
            f: String
        },
        monC: {
            hour: Number,
            f: String
        },
        tueO: {
            hour: Number,
            f: String
        },
        tueC: {
            hour: Number,
            f: String
        },
        wedO: {
            hour: Number,
            f: String
        },
        wedC: {
            hour: Number,
            f: String
        },
        thuO: {
            hour: Number,
            f: String
        },
        thuC: {
            hour: Number,
            f: String
        },
        friO: {
            hour: Number,
            f: String
        },
        friC: {
            hour: Number,
            f: String
        },
        satO: {
            hour: Number,
            f: String
        },
        satC: {
            hour: Number,
            f: String
        },
        sunO: {
            hour: Number,
            f: String
        },
        sunC: {
            hour: Number,
            f: String
        }) {

        this.title = title;
        this.subtitle = subtitle;
        this.monO.hour = monO.hour;
        this.monC.f = monC.f;
        this.tueO.hour = tueO.hour;
        this.tuesC.f = tueC.f;

        this.wedO.hour = wedO.hour;
        this.wedC.f = wedC.f;
        this.thuO.hour = thuO.hour;
        this.thuC.f = thuC.f;
        this.friO.hour = friO.hour;
        this.friC.f = friC.f;
        this.satO.hour = satO.hour;
        this.satC.f = satC.f;
        this.sunO.hour = sunO.hour;
        this.sunC.f = sunC.f;
        this.created = Date.now();

    }






}
