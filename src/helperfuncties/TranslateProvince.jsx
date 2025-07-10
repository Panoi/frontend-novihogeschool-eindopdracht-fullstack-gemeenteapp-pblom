export function translateProvince(province) {
    const translateProvince = {
        GRONINGEN: "Groningen",
        DRENTHE: "Drenthe",
        OVERIJSSEL: "Overijssel",
        FLEVOLAND: "Flevoland",
        FRIESLAND: "Friesland",
        GELDERLAND: "Gelderland",
        LIMBURG: "Limburg",
        NOORD_BRABANT: "Noord-Brabant",
        NOORD_HOLLAND: "Noord-Holland",
        ZUID_HOLLAND: "Zuid-Holland",
        UTRECHT: "Utrecht",
        ZEELAND: "Zeeland"
    };

    return translateProvince[province];
}
