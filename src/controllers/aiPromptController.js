const aiPromptModel=require("../models/ai_prompt");


const addAiPrompt = async(req,res) =>{
    const data = req.body;

    console.log("current ai prompt is "+JSON.stringify(data));

    const addNewAiPrompt=new aiPromptModel({
        promptId:data.promptId,
        iconImageUrl:data.iconImageUrl,
        title:data.title,
        description:data.description,
        prompt:data.prompt,
        filter:data.filter,
       });


   try{
     await addNewAiPrompt.save();
     res.status(201).json({success:true,data:addNewAiPrompt});
   }catch(error){
    console.log(error);
    res.status(500).json({success:false,message : "Something went wrong"});
   }
}


const updateAiPrompt = async (req,res) =>{
    const data=req.body;

    const updateAiPrompt={
        updateAt:Date.now,
        promptId:data.promptId,
        iconImageUrl:data.iconImageUrl,
        title:data.title,
        description:data.description,
        prompt:data.prompt,
        filter:data.filter,
    };

    try{
        var updatePrompt=await aiPromptModel.updateOne({promptId:data.promptId},updateAiPrompt,{new:true});
        res.status(200).json({success:true,data : updatePrompt});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message : "Something went wrong "+error});
    }
}

const deleteAiPrompt = async (req,res) =>{
    const data=req.body;
    const id=data.promptId;
    try{
        const deletedPrompt=await aiPromptModel.deleteOne({promptId:data.promptId});
        res.status(202).json({success:true,data:deletedPrompt});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message : "Something went wrong"});
    }
}

const getAllAiPrompt = async (req,res) =>{
    try{
       
        //const notes = await noteModel.find({userId : req.userId});
        //const id=req.params.id;
        var requestQuery={};
        const {page, limit} = req.query;

        if(req.query.filter){
            const filter = req.query.filters.split(',');
            requestQuery={ filter: {$in: filter} };
        }
        if(req.query.search){
            requestQuery={ $text: { $search: req.query.search } };
        }

        const sortOptions = getSortOptions(req);
        const skip = (page - 1) * limit;
        const getAiPrompt = await aiPromptModel.find(requestQuery).sort(sortOptions).skip(skip).limit(limit);
        res.status(200).json({success:true,data:getAiPrompt});

    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message : "Something went wrong"});
    }
}

function getSortOptions(req){
    const sortOptions={};
    if(req.query.sortBy){
        const sortByArray = req.query.sortBy.split(',');
        var sortOrder;
        if(req.query.sortOrder){
            sortOrder=req.query.sortOrder.split(',');
        }else{
            sortOrder=[-1];
        }
        
        for(let i=0;i<sortByArray.length;i++){
            console.log("inside loop i value "+i);
            let sortOrderIndex;
            if(sortOrder.length>i){
                sortOrderIndex=i;
            }else{
                console.log("current sort order is in else part "+sortOrder.length);
                sortOrderIndex=0;
                sortOrder[0]=-1;
                console.log("current sort order at index 0 "+sortOrder[0]);
            }

            sortOptions[sortByArray[i]] = sortOrder[i] === null ? -1 : sortOrder[sortOrderIndex];
        }
    }
    return sortOptions;
}



module.exports = {
    addAiPrompt: addAiPrompt,updateAiPrompt: updateAiPrompt,deleteAiPrompt: deleteAiPrompt,getAllAiPrompt: getAllAiPrompt
}