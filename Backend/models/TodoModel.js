import mongoose, { Types } from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, 
    details:{type:String},  // title required string
    completed: { type: Boolean, default: false }, // default false
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true,unique:true }
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
