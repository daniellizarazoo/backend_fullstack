const info = (...params) => {console.log('...params :>> ', ...params);}

const error = (...params) => {console.log('...params :>> ', ...params);}

module.exports = {info,error}