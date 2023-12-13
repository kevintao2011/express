import user from "../../models/user";

class User{
    async addToCart(){
        await user.findOne(
            {uid:req.body.tokeninfo.uid}
        ).updateOne({$push:{cart:doc._id}})
    }
}
export default User