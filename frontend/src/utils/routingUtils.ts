export const getCommonSearchParamFromURL = (urlLocationSearchParams: Location['search']): string => {
    const commonSearchKeys = ['clients'];
    const urlSearchParam = new URLSearchParams(urlLocationSearchParams);
    let arrayCommonParam = [];
    for (let [key, values] of urlSearchParam.entries()) {
        if (commonSearchKeys.includes(key)) {
            arrayCommonParam.push(`${key}=${values}`)
        }
    }
    if (arrayCommonParam.length === 0) {
        return ''
    } else {
        return `?${arrayCommonParam.join('&')}`
    }
};

