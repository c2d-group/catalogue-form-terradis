function capitalizeString(string){
    let str = string.toLowerCase();
    return `${str.split('')[0].toUpperCase()}${str.substring(1)}`;
}

module.exports = {
    capitalizeString: capitalizeString
}