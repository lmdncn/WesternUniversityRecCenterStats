var tweetText = "bball test 5 test 66".toUpperCase();

//Index Set Up
var BBALLi = -1;
var VBALLi = -1;
var BDMTi = -1;
var FUTSi = -1;

// Set Reasonable maxs here
var BBmax = 100;
var WRmax = 300;
var VBmax = 100;
var BDMTmax = 50;
var FUTSmax = 50;

// Text Vars
var BDMTtext;
var FUTStext;
var FUTStext;
var BDMTtext;

function main() {
    console.log("Tweet:", tweetText);
    setIndexs();
    if (!hasData()) {
        return;
    }
    sliceTweet();
}


function sliceTweet() {
    var fullText = tweetText;

    var firstNumi = -1;

    var inRange = false;

    var numPos;


    while (!inRange) {
        firstNumi++;
        var firstNumi = 0;
        while (!isNum(fullText[firstNumi])) {
            firstNumi++;
            if (firstNumi == fullText.length) {
                console.log("No Numbers Contained In Tweet!");
                break;
            }
        }



        //Make sure in range
        if (Math.abs(firstNumi - BBALLi) < 15 || Math.abs(firstNumi < VBALLi) < 15 || Math.abs(firstNumi < BDMTi) < 15 || Math.abs(firstNumi < FUTSi) < 15) {
            //In range
            console.log("Number In Range");
            inRange = true;
        } else {
            console.log("Not in range, next num");
        }
    }

    if (firstNumi < BBALLi || firstNumi < VBALLi || firstNumi < BDMTi || firstNumi < FUTSi) {
        //Number Before
        numPos = "before";
    } else {
        //Number after
        numPos = "after";
    }

    console.log("Index of first number in range: ", firstNumi);
    console.log("Number is", numPos);


    
    if (numPos == "before") {

        var t1 = takeNum(fullText.slice(0, BBALLi));
        var t2 = takeNum(fullText.slice(0, VBALLi));
        var t3 = takeNum(fullText.slice(0, BDMTi));
        var t4 = takeNum(fullText.slice(0, FUTSi));

        switch (Math.min(t1, t2, t3, t4)) {
            case t1:
                {
                    //BBall first
                }
            case t2:
                {
                    //VBAll first
                }
            case t3:
                {
                    //
                }
            case t4:
                {

                }
        }

    }

    if (numPos == "after") {

    }



}










//Is ther an index that is not -1?  Return Bool
function hasData() {
    if (BBALLi == -1 && VBALLi == -1 && BDMTi == -1 && FUTSi == -1) {
        console.log("******* NO DATA TWEET ************************************");
        return false;
    }
    return true;
}

// Get indexes of each sport
function setIndexs() {
    var fullText = tweetText;

    BBALLi = fullText.indexOf("BBALL");
    if (BBALLi == -1) {
        BBALLi = fullText.indexOf("BASKETBALL");
    }
    VBALLi = fullText.indexOf("VBALL");
    if (VBALLi == -1) {
        VBALLi = fullText.indexOf("VOLLEYBALL");
    }
    BDMTi = fullText.indexOf("BDMT");
    if (BDMTi == -1) {
        BDMTi = fullText.indexOf("BADMINTON");
    }
    if (BDMTi == -1) {
        BDMTi = fullText.indexOf("BADM");
    }
    FUTSi = fullText.indexOf("FUTS");
    if (FUTSi == -1) {
        FUTSi = fullText.indexOf("FUTSAL");
    }
    console.log("BBALL Index:", BBALLi, " VBALL Index:", VBALLi, " BDMT Index:", BDMTi, " FUTS Index:", FUTSi);
};

//Take the numbers out of a string
function takeNum(str) {
    var num = str.replace(/[^0-9]/g, '');
    return num;
};

//If there a number in the string
function isNum(str) {
    if (str.match(/[^0-9]/g)) {

        //console.log(str,"is NOT num")
        return false;
    }
    //console.log(str,"is num")
    return true;
};

//Returns the index of the next index from the number
function nextIndex(cur, opt1 = 9999, opt2 = 9999, opt3 = 9999) {

    if (opt1 < cur) {
        opt1 = 9999;
    }
    if (opt2 < cur) {
        opt2 = 9999;
    }
    if (opt3 < cur) {
        if (opt1 == 9999 && opt2 == 9999) {
            return null; //No Next Index
        }
        opt3 = 9999;
    }

    if (opt1 < opt2) {
        if (opt1 < opt3) {
            return opt1;
        } else {
            return opt3;
        }
    } else {
        if (opt2 < opt3) {
            return opt2;
        } else {
            return opt3;
        }
    }

};


main();