import log4js from 'log4js'

log4js.configure({
  appenders: {
      console: {type:"console"},
      warnLog: {type:"file",filename:'warn.log'},
      errorLog: {type:"file",filename:'error.log'}
  },
  categories:{
    default:{ appenders:['console'],level:'debug'},
    log1:{ appenders:['warnLog','console'],level:'warn'},
    log2:{ appenders:['errorLog','console'],level:'error'}
  }
});
export const logger = log4js.getLogger()