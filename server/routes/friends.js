import express from "express";
const router = express.Router();
import User from "../models/User.js"
import FriendRequest from "../models/Friends.js"

import mongoose from "mongoose";

router.post("/get", async (req, res) => {
    const { senderId, receiverId } = req.body;

    if (!senderId) {
        return res.status(400).json({ error: "Sender ID is required" });
    }
    if (!receiverId) {
        return res.status(400).json({ error: "Receiver ID is required" });
    }

    try {
        // Convert senderId and receiverId to ObjectId
        const senderObjectId = new mongoose.Types.ObjectId(senderId);
        const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

        const friendRequest = await FriendRequest.findOne({
            sender: senderObjectId,
            receiver: receiverObjectId,
        });

        if (!friendRequest) {
            return res.status(404).json({ message: "No friend request found" });
        }

        return res.status(200).json({
            message: "Friend request found",
            data: friendRequest,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error fetching friend request",
            error: error.message,
            success: false,
        });
    }
});
router.post("/getAllReceived",async(req, res)=>{
  const {userId}=req.body;
  if(!userId){
    return res.status(400).json({error:"User ID is required"});
  }
  try{
  // Find pending received requests
  const friendRequest = await FriendRequest.find({
    receiver: new mongoose.Types.ObjectId(userId),
    status: "pending"
  })
  .populate("receiver")
  .populate("sender");

     // Find all accepted requests where user is either sender OR receiver
     const friends = await FriendRequest.find({
      $or: [
        { receiver: new mongoose.Types.ObjectId(userId), status: "accepted" },
        { sender: new mongoose.Types.ObjectId(userId), status: "accepted" }
      ]
    })
    .populate("receiver")
    .populate("sender");

    return res.status(200).json({
      message:"Friend requests received",
      data:{friendRequest,friends},
      success:true
    })

  }catch(error){
    console.log(error);
    return res.status(500).json({
      message:"Error fetching friend requests",
      error:error.message,
      success:false
    })
  }
})

router.post("/getAllPendings", async(req, res) => {
  const {userId} = req.body;
  if(!userId) {
    return res.status(400).json({error: "User ID is required"});
  }
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    
    // Find pending sent requests
    const friendRequest = await FriendRequest.find({
      sender: userObjectId,
      status: "pending"
    })
    .populate("sender")
    .populate("receiver");

    // Find all accepted requests where user is either sender OR receiver
    const friends = await FriendRequest.find({
      $or: [
        { receiver: userObjectId, status: "accepted" },
        { sender: userObjectId, status: "accepted" }
      ]
    })
    .populate("sender")
    .populate("receiver");
    
    return res.status(200).json({
      message: "Friend requests found",
      data: { friendRequest, friends },
      success: true,
    });

  } catch(error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching friend requests",
      error: error.message,
      success: false,
    });
  }
});
router.post("/set", async (req, res) => {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
      return res.status(400).json({ success: false, message: "Missing sender or receiver ID." });
    }
  
    try {
      // Check if sender and receiver exist
      const [sender, receiver] = await Promise.all([
        User.findById(senderId),
        User.findById(receiverId),
      ]);
  
      if (!sender || !receiver) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      // Check if a friend request already exists
      const existingRequest = await FriendRequest.findOne({
        sender: senderId,
        receiver: receiverId,
        status: "pending",
      });
  
      if (existingRequest) {
        return res.status(400).json({ success: false, message: "Friend request already sent." });
      }
  
      // Create friend request
      const friendRequest = new FriendRequest({ sender: senderId, receiver: receiverId });
      await friendRequest.save();
  
      res.status(201).json({ success: true, message: "Friend request sent.", data: friendRequest });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
});
    
router.delete("/deletePendings", async (req, res) => {
  const { senderId, receiverId } = req.query; // Use req.query instead of req.body
  if (!senderId) {
    return res.status(400).json({ success: false, message: "Missing sender ID." });
  } else if (!receiverId) {
    return res.status(400).json({ success: false, message: "Missing receiver ID." });
  }
  try {
    const request = await FriendRequest.findOneAndDelete({ sender: senderId, receiver: receiverId });
    if (!request) {
      return res.status(404).json({ success: false, message: "Friend request not found" });
    }
    // Get pending requests and friends for the receiver
    const [friendRequest, friends] = await Promise.all([
      // Find pending requests where user is the receiver
      FriendRequest.find({
        receiver: new mongoose.Types.ObjectId(receiverId),
        status: "pending"
      })
      .populate("receiver")
      .populate("sender"),
      
      // Find accepted requests where user is either sender or receiver
      FriendRequest.find({
        $or: [
          { receiver: new mongoose.Types.ObjectId(receiverId), status: "accepted" },
          { sender: new mongoose.Types.ObjectId(receiverId), status: "accepted" }
        ]
      })
      .populate("receiver")
      .populate("sender")
    ]);

    // Populate the accepted request as well
    const populatedRequest = await FriendRequest.findById(request._id)
      .populate("receiver")
      .populate("sender");

    return res.status(200).json({
      message: "Friend request accepted successfully",
      data: {
        acceptedRequest: populatedRequest,
        friendRequest,
        friends
      },
      success: true
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

router.delete("/deleteReceivedRequests",async(req, res)=>{
  const { senderId, receiverId } = req.query; // Use req.query instead of req.body
  if (!receiverId) {
    return res.status(400).json({ success: false, message: "Missing receiver ID."});
  }
  if(!senderId){
    return res.status(400).json({ success: false, message: "Missing sender ID."})
  }
  try {
    const friendRequest = await FriendRequest.findOneAndDelete({ sender: senderId, receiver: receiverId})

    if (!friendRequest) {
      return res.status(404).json({ success: false, message: "Friend request not found"})
    }
    res.status(200).json({
      success: true,
      message: "Friend request deleted successfully",
      data: friendRequest,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})
router.delete("/deleteFriend",async(req, res)=>{
  const { id,senderId, receiverId } = req.query;
  if (!id) {
    return res.status(400).json({ success: false, message: "Missing friend ID."})
  }
  if(!senderId){
    return res.status(400).json({ success: false, message: "Missing sender ID."})
  }
  if(!receiverId){
    return res.status(400).json({ success: false, message: "Missing receiver ID."})
  }
  try {
    const friend = await FriendRequest.findOneAndDelete({ _id: id });
    if (!friend) {
      return res.status(404).json({ success: false, message: "Friend not found"})
    }
    // Fetch updated lists of friend requests and friends for the receiver
    // const [pendingRequests, acceptedFriends] = await Promise.all([
    //   // Find pending friend requests for the receiver
    //   FriendRequest.find({
    //     receiver: new mongoose.Types.ObjectId(receiverId),
    //     status: "pending",
    //   })
    //     .populate("receiver")
    //     .populate("sender"),

    //   // Find accepted friend requests for the receiver
    //   FriendRequest.find({
    //     $or: [
    //       { receiver: new mongoose.Types.ObjectId(receiverId), status: "accepted" },
    //       { sender: new mongoose.Types.ObjectId(receiverId), status: "accepted" },
    //     ],
    //   })
    //     .populate("receiver")
    //     .populate("sender"),
    // ]);

    // Return response
    return res.status(200).json({
      success: true,
      message: "Friend request deleted successfully.",
      data: friend,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }

})
router.post("/accept", async(req, res) => {
  const { senderId, receiverId } = req.body;
  
  if (!senderId || !receiverId) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required IDs" 
    });
  }

  try {
    // Find and update the friend request
    const request = await FriendRequest.findOne({ 
      sender: senderId, 
      receiver: receiverId
    });
    
    if (!request) {
      return res.status(400).json({ 
        success: false, 
        message: "Friend request not found" 
      });
    }
    
    request.status = "accepted";
    await request.save();

    // Get pending requests and friends for the receiver
    const [friendRequest, friends] = await Promise.all([
      // Find pending requests where user is the receiver
      FriendRequest.find({
        receiver: new mongoose.Types.ObjectId(receiverId),
        status: "pending"
      })
      .populate("receiver")
      .populate("sender"),
      
      // Find accepted requests where user is either sender or receiver
      FriendRequest.find({
        $or: [
          { receiver: new mongoose.Types.ObjectId(receiverId), status: "accepted" },
          { sender: new mongoose.Types.ObjectId(receiverId), status: "accepted" }
        ]
      })
      .populate("receiver")
      .populate("sender")
    ]);

    // Populate the accepted request as well
    const populatedRequest = await FriendRequest.findById(request._id)
      .populate("receiver")
      .populate("sender");

    return res.status(200).json({
      message: "Friend request accepted successfully",
      data: {
        acceptedRequest: populatedRequest,
        friendRequest,
        friends
      },
      success: true
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});
export default router;