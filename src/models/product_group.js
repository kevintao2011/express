import { ObjectId } from 'mongodb';
import { Schema, model} from 'mongoose';
import websiteInfo from './website_info.js';
import { wrapResponse } from '../utils/serverFunction/basicfunction.js';

class ProdGroup{
    ProductGroupSchema = new Schema({ //schema
        group_name:String,
        visible:{type:Boolean,default:true},
        ancestors:{type:[ObjectId],ref:"product_groups" ,default:[]},
        parents:{type:[ObjectId],ref:"product_groups" ,default:[]},
        //properties:{type:[ObjectId]}
    });
    
    ProductGroup = model("product_groups", this.ProductGroupSchema);  //Creating a model


    IterateTree(
        ParentNode,ArrOfNodes,nameOfChildField,nameOfParentField,nameOfRefField,
        keyMap=keyMap,
        root=true
    ){
        //${ArrOfNodes.map(node=>{return`${node}\n`})}
        console.log(`
got parent node : ${ParentNode} with KV MAP 
${Object.keys(keyMap).map(key=>{
    return `${key}->${keyMap[key]}\n`
})}
have 
origianl child field name : ${nameOfChildField}
origianl Parent Field name : ${nameOfParentField}

        `)
        //create a map for faster lookup
        var NodeMap = {}
        if(root){
            ArrOfNodes.forEach(node=>{
                NodeMap[node[nameOfRefField]]=node
            })
        }else{
            NodeMap=ArrOfNodes
        }
        //create a map for faster lookup
    
        if(ParentNode[nameOfChildField].length<1){// end-node (edning condition)
            //tidy end-node to be target shape
            console.log("end-node childfield",nameOfChildField,ParentNode[nameOfChildField])
            const newNode = {}
            console.log("end node:" , ParentNode)
            Object.keys(keyMap).forEach(key=>{
                console.log(`NewNode[${keyMap[key]}]=end node[${key}]`)
                newNode[keyMap[key]]=ParentNode[key]
                
            })
            
            console.log("update end Node:" , newNode)
            return newNode
        }else{// not end-node
            const newNode = {}
                console.log("middle node:" , ParentNode)
                Object.keys(keyMap).forEach(key=>{
                console.log(`NewNode[${keyMap[key]}]=middlenode[${key}]`)
                if(key==nameOfChildField){
                    newNode[keyMap[key]]=ParentNode[nameOfChildField].map(childNode=>{
                        console.log(`childNode to be iterate ${childNode}`)
                        return (this.IterateTree(NodeMap[childNode],NodeMap,nameOfChildField,nameOfParentField,nameOfRefField,keyMap,false))
                    })
                }else{
                    newNode[keyMap[key]]=ParentNode[key]
                }
                
            })
            
            return newNode
        }
        
    }
    async generateTreeArrayForRsByDB(){
        //0. populate all parent and ancestors
        //1. filter get all root
        //2. for each root get acentor in recusion
        //if need add new node then
        
        return await this.ProductGroup.find({parents:[]}).then(async docs=>{//.populate(["parents","ancestors"])
            const Parents = docs
            return await this.ProductGroup.find().then(async allGroups=>{//.populate(["parents","ancestors"])
                /* Group Map Structure
                groupMap=
                    {
                        oid:{
                            label:group.group_name,
                            value:group._id,
                            visible:group.visible,
                            children:group.ancestors
                            parents:group.parents
                        }
                        oid:{
                            label:group.group_name,
                            value:group._id,
                            visible:group.visible,
                            children:group.ancestors
                            parents:group.parents
                        }
                        .
                        .
                        .
                    }
                */
                const newTree = Parents.map(parent=>{
                    return this.IterateTree(
                        parent,
                        allGroups,
                        "ancestors",
                        "parents",
                        "_id",
                        {
                            ancestors:"children",
                            _id:"value",
                            group_name:"label",
                            visible:"visible",
                            parents:"parents"
                        }
                    )
                })
                
                
                return await websiteInfo.updateOne({id:"product_group_tree"},{$set:{content:newTree}}).then(result=>{
                    if(result.acknowledged){
                        return true
                    }else{
                        return false
                    }
                })
            })
        }) 
    }
    async ModifyProductGroup(){
        
    }

    async AddProductGroup(newGroup){
        
        return await this.ProductGroup.create(newGroup).then(async doc=>{
            if(doc){
                // await this.ProductGroup.find($or[{_id:{$in:doc.ancestors}},{_id:{$in:doc.ancestors}}],{}).then(a=>{
                // })
                return await this.ProductGroup.updateMany({_id:{$in:doc.ancestors}},{$push:{parents:doc._id}}).
                updateMany({_id:{$in:doc.parents}},{$push:{ancestors:doc._id}})
                .then(result=>{
                    if(result.acknowledged){
                        
                        return wrapResponse(true,`added ${doc.group_name} to ${result.modifiedCount} documents`)
                        
                    }
                }).catch(err=>{
                    return wrapResponse(false,err.name)
                })
            }else{
                return wrapResponse(false,`Failed to create docs`)
            }
        })
    }
    async DeleteProductGroup(groupoid){
        return await this.ProductGroup.updateMany({parents:{$in:groupoid}},{$pull:{parents:groupoid}})
        .updateMany({ancestors:{$in:groupoid}},{$pull:{ancestors:groupoid}}).deleteOne({_id:groupoid}).
        then(result=>{
            if(result){
                return wrapResponse(true,`deleted group`)
            }else{
                return wrapResponse(false,'No response')
            }
        }).catch(err=>{
            return wrapResponse(false,err.name)
        })
    }

    async getProductGroups(){
        return this.ProductGroup.find({}).then(docs=>{
            if(docs.length>0){
                return wrapResponse(true,docs)
            }else{
                return wrapResponse(false,"No Product Group")
            }
        }).catch(err=>{
            return wrapResponse(false,err.name)
        })
    }


}
export default ProdGroup
