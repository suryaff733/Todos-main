import Todo from "../models/TodoModel.js";

export const createTodo = async (req, res) => {
  try {
    console.log("req.user:", req.user);  

    const { title ,details} = req.body;

    const newTodo = new Todo({
      title,
      details:details,
      userId: req.user.id  
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error: error.message });
  }
};


export const getTodos= async (req,res)=>{
 try{
  const details=await Todo.find({userId:req.user.id})
  res.status(200).json(details)
 }catch(error){
  res.status(500).json({message:"ERROR"})
 }
}


export const updateTodos=async (req,res)=>{
  try{
    const {id}=req.params;
    const updates=await Todo.findOneAndUpdate(
      {_id:id,userId:req.user.id},
      req.body,
      {new:true}
    );
    res.status(200).json({message:"Successfully updated"})

  }catch(error){
    res.status(500).json({message:"ERROR"})

  }
}

export const deletTods=async (req,res)=>{
  try{
    const {id}=req.params;

    const delets=await Todo.findByIdAndDelete(
      {_id:id,
        userId:req.user.id
      },
    );
    if(!delets){
      res.status(404).json({message:"No founded"})
    }
    res.status(200).json({message:"Successfully Deleted"})
  }catch(error){
    res.status(500).json({message:"ERROR"})
  }
}

