const conversationModel = require("../models/conversationModel.js");
const messageModel = require("../models/messageModel.js");


const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { Id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new messageModel({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    
    await Promise.all(conversation.save(), newMessage.save())

    res.status(201).json({ newMessage });
  } catch (error) {
    console.log("Error while sending message");
    res
      .status(500)
      .json({ Error: "Internal server error", error: error.message });
  }
};

const getMessage = async (req,res)=>{
    try {
        const {id:userToChatId} = req.params
        const senderId = req.user._id;
        const conversation = await conversationModel.findOne({
            participants:{$all:[senderId, userToChatId]}
        }).populate('messages');
        if(!conversation){
            return res.status(200).json({message:""})
        }

        res.status(200).json(conversation.messages)

    } catch (error) {
        res.status(500).json({error:"Internal server error", Error:error.message})
    }
}

module.exports = {
  sendMessage,
  getMessage
};
