const logger      = (req,res)=>{
    console.log(`${req.protocol}://${req.get('host')}
    ${req.originalUrl}`);
};

module.exports =logger;