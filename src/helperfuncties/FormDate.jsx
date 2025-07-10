
export function formDate(date) {
    const longOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const newDate = new Date(date);
    return newDate.toLocaleDateString('nl-NL', longOptions);

}

