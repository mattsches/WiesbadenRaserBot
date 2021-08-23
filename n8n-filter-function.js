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
    "B54": { // 1. Ring
        "Siegfriedring": {
            "+": null,
            "-": null,
        },
        "Berliner Straße": {
            "+": null,
            "-": null,
        },
        "Mainzer Straße": {
            "+": "1. Ring (Richtung Stadion) bei Mainzer Straße",
            "-": "1. Ring (Richtung Hbf) bei Mainzer Straße",
        },
        "Biebricher Allee": {
            "+": "1. Ring (Richtung Hbf) bei Biebricher Allee",
            "-": "1. Ring (Richtung Schiersteiner Straße) bei Biebricher Allee",
        },
        "Schiersteiner Straße": {
            "+": "1. Ring (Richtung Hbf) bei Schiersteiner Straße",
            "-": "1. Ring (Richtung Ringkirche) bei Schiersteiner Straße",
        },
        "Rheinstraße": {
            "+": "1. Ring (Richtung Hbf) bei Rheinstraße",
            "-": "1. Ring (Richtung Sedanplatz) bei Rheinstraße",
        },
        "Sedanplatz": {
            "+": "1. Ring (Richtung Ringkirche) bei Sedanplatz",
            "-": "1. Ring (Richtung Dürerplatz) bei Sedanplatz",
        },
        "Dürerplatz": {
            "+": "Aarstraße (Richtung ↘)",
            "-": "Aarstraße (Richtung ↖)",
        },
        "Einmündung zur B417/Fischzucht": {
            "+": null,
            "-": null,
        },
    },
    "B417": { //Dürerstraße, Unter den Eichen
        "Dürerplatz": {
            "+": "Albrecht-Dürer-Straße (Richtung ⬇) bei 1. Ring",
            "-": "Albrecht-Dürer-Straße (Richtung ⬆) bei 1. Ring",
        },
        "Nordfriedhof": {
            "+": "Unter den Eichen (Richtung ⬇) bei Platter Straße",
            "-": "Unter den Eichen (Richtung ⬆) bei Platter Straße",
        },
    },
    "B263": { // Mainzer Straße
        "Gustav-Stresemann-Ring": {
            "+": "Mainzer Straße (Richtung ⬆) bei 1. Ring",
            "-": "Mainzer Straße (Richtung ⬇) bei 1. Ring",
        },
        "Siegfriedring": {
            "+": "Mainzer Straße (Richtung ⬆) bei 2. Ring",
            "-": "Mainzer Straße (Richtung ⬇) bei 2. Ring",
        },
    },
    "Kurt-Schumacher-Ring Konrad Adenauer-Ring": { // 2. Ring
        "Biebricher Allee": {
            "+": "2. Ring (Richtung ⬅) bei Biebricher Allee",
            "-": "2. Ring (Richtung ➡) bei Biebricher Allee",
        },
        "Schirsteiner Straße": {
            "+": "2. Ring (Richtung ⬅) bei Schiersteiner Straße",
            "-": "2. Ring (Richtung ➡) bei Schiersteiner Straße",
        },
        "Dotzheimer Straße": {
            "+": "2. Ring (Richtung ⬅) bei Dotzheimer Straße",
            "-": "2. Ring (Richtung ➡) bei Dotzheimer Straße",
        },
        "Klarenthaler Straße": {
            "+": "2. Ring (Richtung ⬅) bei Klarenthaler Straße",
            "-": "2. Ring (Richtung ➡) bei Klarenthaler Straße",
        },
        "Dürerplatz": {
            "+": "2. Ring (Richtung ⬅) bei Dürerplatz",
            "-": "2. Ring (Richtung ➡) bei Dürerplatz",
        },
    },
    "Schiersteiner Straße": {
        "Kaiser-Friedrich-Ring": {
            "+": "Schiersteiner Straße (Richtung ⬇) bei 1. Ring",
            "-": "Schiersteiner Straße (Richtung ⬆) bei 1. Ring"
        },
        "Konrad-Adenauer-Ring": {
            "+": "Schiersteiner Straße (Richtung ⬇) bei 2. Ring",
            "-": "Schiersteiner Straße (Richtung ⬆) bei 2. Ring"
        },
        "Anschluss Schiersteiner Straße": {
            "+": null,
            "-": null
        },
    },
    "K643": { // Biebricher Allee
        "Kaiser-Friedrich-Ring": {
            "+": "Biebricher Allee (Richtung ⬆) bei 1. Ring",
            "-": "Biebricher Allee (Richtung ⬇) bei 1. Ring"
        },
        "Konrad-Adenauer-Ring": {
            "+": "Biebricher Allee (Richtung ⬆) bei 2. Ring",
            "-": "Biebricher Allee (Richtung ⬇) bei 2. Ring"
        },
    },
    "K647": { // // Sonnenberger Straße, Coulinstraße, Emser Straße, Lahnstraße
        "In der Dietenmühle": {
            "+": "Sonnenberger Straße (Richtung ⬅) in Sonnenberg",
            "-": "Sonnenberger Straße (Richtung ➡) in Sonnenberg"
        },
        "Sonnenberger Straße": {
            "+": "Sonnenberger Straße (Richtung ⬅)",
            "-": "Sonnenberger Straße (Richtung ➡)"
        },
        "Wilhelmstraße": {
            "+": "Sonnenberger Straße (Richtung ⬅) bei Wilhelmstraße",
            "-": "Sonnenberger Straße (Richtung ➡) bei Wilhelmstraße"
        },
        "Schwalbacher Straße": {
            "+": "Coulinstraße (Richtung ⬅) bei Schwalbacher Straße",
            "-": "Coulinstraße (Richtung ➡) bei Schwalbacher Straße"
        },
        "Dürerplatz": {
            "+": "Emser Straße (Richtung ⬅)",
            "-": "Emser Straße (Richtung ➡)"
        },
        "Klarenthaler Straße": {
            "+": "Lahnstraße (Richtung ⬅)",
            "-": "Lahnstraße (Richtung ➡)"
        },
    },
    "L3037": { // Klarenthaler, Rheinstraße, Frankfurter, Berliner
        "Lahnstraße": {
            "+": "Klarenthaler Straße (Richtung ➡) bei Lahnstraße",
            "-": "Klarenthaler Straße (Richtung ⬅) bei Lahnstraße"
        },
        "Kurt-Schumacher-Ring": {
            "+": "Klarenthaler Straße (Richtung ➡) bei 2. Ring",
            "-": "Klarenthaler Straße (Richtung ⬅) bei 2. Ring"
        },
        "Kaiser-Friedrich-Ring": {
            "+": "Klarenthaler Straße (Richtung ➡) bei 1. Ring",
            "-": "Rheinstraße (Richtung ⬅) bei 1. Ring"
        },
        "Oranienstraße": {
            "+": "Rheinstraße (Richtung ➡) bei Oranienstraße",
            "-": "Rheinstraße (Richtung ⬅) bei Oranienstraße"
        },
        "Friedrich-Ebert-Allee": {
            "+": "Rheinstraße (Richtung ➡) bei Friedrich-Ebert-Allee",
            "-": "Rheinstraße (Richtung ⬅) bei Friedrich-Ebert-Allee"
        },
        "Frankfurter Straße": {
            "+": "Frankfurter Straße (Richtung ➡)",
            "-": "Frankfurter Straße (Richtung ⬅)"
        },
        "New-York-Straße": {
            "+": null,
            "-": "Berliner Straße (Richtung ⬅) bei New-York-Straße"
        },
        "Siegfriedring": {
            "+": null,
            "-": null
        },
    }
}

function isValid(roadWay, flowItem) {
    if (flowItem.CF[0].SU <= SPEED_LIMIT) {
        return false;
    }
    if (flowItem.CF[0].CN <= CONFIDENCE_LIMIT) {
        return false;
    }
    if (!Object.keys(rules).includes(roadWay.DE)) {
        console.log('Unknown/excluded road ' + roadWay.DE);
        return false;
    }
    if (!Object.keys(rules[roadWay.DE]).includes(flowItem.TMC.DE)) {
        console.log('Unknown/excluded intersection ' + roadWay.DE + '/' + flowItem.TMC.DE);
        return false;
    }
    if (rules[roadWay.DE][flowItem.TMC.DE][flowItem.TMC.QD] == null) {
        console.log('Excluded ' + roadWay.DE + '/' + flowItem.TMC.DE + ' in direction ' + flowItem.TMC.QD);
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
                tmc_id: flowItem.TMC.PC,
                time: timeOutput.toLocaleString('de-DE', dateTimeOptions),
                description: rules[roadWay.DE][flowItem.TMC.DE][flowItem.TMC.QD]
            }
        });
    }
}

return data;
