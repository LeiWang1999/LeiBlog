const User = require('../db').User

module.exports = {
    getDetail: async(ctx)=>{
        await User.find({
        },(err,res)=>{
            if(err) throw err;
            console.log("Call detail success")
            ctx.body = {
                success: true,
                message: res
            }
        });
    }
}
