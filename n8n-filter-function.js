const SPEED_LIMIT = 55;
const CONFIDENCE_LIMIT = 0.7;
const dateTimeOptions = {
    timeZone: "Europe/Berlin",
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric"
}

const rules = {
    "D01+50414": { // B54 Berliner Straße, 1. Ring, Aarstraße
        24314: null,
        37120: null,
        24315: "1. Ring zwischen Berliner Straße und Mainzer Straße",
        37121: "1. Ring zwischen Mainzer Straße und Biebricher Allee",
        24316: "1. Ring zwischen Biebricher Allee und Schiersteiner Straße",
        36710: "1. Ring zwischen Schiersteiner Straße und Ringkirche",
        37122: "1. Ring zwischen Ringkirche und Sedanplatz",
        37123: "Seerobenstraße zwischen Sedanplatz und Dürerplatz",
        36347: null,
    },
    "D01-50414": { // B54 Aarstraße, 1. Ring, Berliner Straße
        24314: null,
        37120: "1. Ring zwischen Mainzer Straße und Berliner Straße",
        24315: "1. Ring zwischen Biebricher Allee und Mainzer Straße",
        37121: "1. Ring zwischen Schiersteiner Straße und Biebricher Allee",
        24316: "1. Ring zwischen Ringkirche und Schiersteiner Straße",
        36710: "1. Ring zwischen Sedanplatz und Ringkirche",
        37122: "Seerobenstraße zwischen Dürerplatz und Sedanplatz",
        37123: null,
        36347: null,
    },
    "D01+50529": { // B417 stadtauswärts
        37381: null,
        37036: "Unter den Eichen/Schützenstraße/Dürer-Straße Richtung Nordfriedhof",
        26094: null
    },
    "D01-50529": { // B417 stadteinwärts
        37381: null,
        37036: null,
        26094: "Unter den Eichen/Schützenstraße/Dürer-Straße Richtung Dürerplatz"
    },
    "D01+37364": { // B263 Mainzer Straße stadtauswärts
        37365: null,
        37366: "Mainzer Straße zwischen 1. Ring und 2. Ring",
        37367: null
    },
    "D01-37364": { // B263 Mainzer Straße stadteinwärts
        37365: "Mainzer Straße zwischen 2. Ring und 1. Ring",
        37366: "Mainzer Straße zwischen A66 und 2. Ring",
        37367: null
    },
    "D01+36353": { // 2. Ring Dürerplatz -> Biebricher Allee
        36354: "2. Ring zwischen Dürerplatz und Waterloostraße",
        36355: "2. Ring zwischen Waterloostraße und Klarenthaler Straße",
        36356: "2. Ring zwischen Klarenthaler Straße und Dotzheimer Straße",
        36357: "2. Ring zwischen Dotzheimer Straße und Schiersteiner Straße",
        36358: "2. Ring zwischen Schiersteiner Straße und Biebricher Allee",
    },
    "D01-36353": { // 2. Ring Biebricher Allee -> Dürerplatz
        36354: "2. Ring zwischen Klarenthaler Straße und Dürerplatz",
        36355: "2. Ring zwischen Dotzheimer Straße und Klarenthaler Straße",
        36356: "2. Ring zwischen Schiersteiner Straße und Dotzheimer Straße",
        36357: "2. Ring zwischen Biebricher Allee und Schiersteiner Straße",
        36358: null,
    },
    "D01+36343": { // Schiersteiner Straße stadteinwärts
        36344: null,
        36345: "Schiersteiner Straße zwischen Waldstraße und 2. Ring",
        36346: "Schiersteiner Straße zwischen 2. Ring und 1. Ring",
    },
    "D01-36343": { // Schiersteiner Straße stadtauswärts
        36344: "Schiersteiner Straße zwischen 2. Ring und Waldstraße",
        36345: "Schiersteiner Straße zwischen 1. Ring und 2. Ring",
        36346: null,
    },
    "D01+36317": { // Biebricher Allee stadtauswärts
        36318: null,
        36319: "Biebricher Allee zwischen 1. Ring und 2. Ring",
        36320: "Biebricher Allee zwischen 2. Ring und A66",
    },
    "D01-36317": { // Biebricher Allee stadteinwärts
        36318: "Biebricher Allee zwischen 2. Ring und 1. Ring",
        36319: "Biebricher Allee zwischen A66 und 2. Ring",
        36320: "Biebricher Allee zwischen Äppelallee und A66",
    },
    "D01+36323": { //"K647" West -> Ost
        36324: null,
        36325: "Lahnstraße zwischen Dürerplatz und Klarenthaler Straße",
        36326: "Emser Straße zwischen Dürerplatz und Schwalbacher Straße",
        36327: "Webergasse/Coulinstraße zwischen Schwalbacher Straße und Wilhelmstraße",
        36328: "Wilhelmstraße zwischen Staatstheater und Kureck",
        36329: "Sonnenberger Straße zwischen Wilhelmstraße und In der Dietenmühle",
        36330: "Danziger Straße zwischen In der Dietenmühle und Sonnenberg",
    },
    "D01-36323": { //"K647" Ost -> West
        36324: "Lahnstraße zwischen Dürerplatz und Klarenthaler Straße",
        36325: "Emser Straße zwischen Schwalbacher Straße und Dürerplatz",
        36326: "Webergasse/Coulinstraße zwischen Wilhelmstraße und Schwalbacher Straße",
        36327: "Wilhelmstraße zwischen Kureck und Staatstheater",
        36328: "Sonnenberger Straße zwischen In der Dietenmühle und Wilhelmstraße",
        36329: "Danziger Straße zwischen Sonnenberg und In der Dietenmühle",
        36330: null,
    },
    "D01-37369": { //"L3037" Ost -> West
        37373: "Klarenthaler Straße zwischen 2. Ring und Lahnstraße",
        37374: "Klarenthaler Straße zwischen Ringkirche und 2. Ring",
        37375: "Rheinstraße zwischen Oranienstraße und Ringkirche",
        37376: "Rheinstraße zwischen Friedrich-Ebert-Allee und Oranienstraße",
        37377: "Rheinstraße zwischen Frankfurter Straße und Friedrich-Ebert-Allee",
        37378: "Frankfurter Straße zwischen Stadion und Rheinstraße",
        37379: null,
        37380: null,
    },
    "D01+37369": { //"L3037" West -> Ost
        37373: null,
        37374: "Klarenthaler Straße zwischen Lahnstraße und 2. Ring",
        37375: "Klarenthaler Straße zwischen 2. Ring und Ringkirche",
        37376: "Rheinstraße zwischen Ringkirche und Oranienstraße",
        37377: "Rheinstraße zwischen Oranienstraße und Friedrich-Ebert-Allee",
        37378: "Rheinstraße zwischen Friedrich-Ebert-Allee und Frankfurter Straße",
        37379: "Frankfurter Straße zwischen Rheinstraße und Stadion",
        37380: null,
    },
}

function isValid(roadWay, flowItem) {
    if (!Object.keys(flowItem.CF[0]).includes("SU")) {
        return false;
    }
    if (flowItem.CF[0].SU <= SPEED_LIMIT) {
        return false;
    }
    if (flowItem.CF[0].CN <= CONFIDENCE_LIMIT) {
        return false;
    }
    if (!Object.keys(rules).includes(roadWay.LI)) {
        console.log('Unknown/excluded road ' + roadWay.LI);
        return false;
    }
    if (rules[roadWay.LI][flowItem.TMC.PC] === undefined || rules[roadWay.LI][flowItem.TMC.PC] === null) {
        console.log('Unknown/excluded segment ' + roadWay.LI + '/' + flowItem.TMC.PC);
        return false;
    }
    return true;
}

let data = [];
for (let roadWay of items[0].json.RWS[0].RW) {
    for (let flowItem of roadWay.FIS[0].FI) {
        if (!isValid(roadWay, flowItem)) {
            continue;
        }
        let timeOutput = new Date(Date.parse(roadWay.PBT));
        data.push({
            json: {
                name: flowItem.TMC.DE,
                speed: flowItem.CF[0].SU,
                parent_name: roadWay.DE,
                road_id: roadWay.LI,
                tmc_id: flowItem.TMC.PC,
                time: timeOutput.toLocaleString('de-DE', dateTimeOptions),
                description: rules[roadWay.LI][flowItem.TMC.PC]
            }
        });
    }
}

return data;
