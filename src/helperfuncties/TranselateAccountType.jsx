export function translateAccountType(accountType) {
    const translateAccountType = {
        RESIDENT: "Inwoner",
        MUNICIPALITY: "Gemeente",
        ADMIN: "Beheerder",
    };

    return translateAccountType[accountType];

}