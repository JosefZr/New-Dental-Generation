import Message from "../models/Message.js";
import User from "../models/User.js";

export const saveMessage = async (
  sender,
  recipient,
  content,
  contentStatus
) => {
  const message = new Message({
    sender,
    recipient,
    content,
    status: contentStatus,
  });
  await message.save();

  const populatedMessage = await Message.findById(message._id)
    .populate("sender")
    .populate("recipient");

  return populatedMessage;
};

export const getMessages = async (userId1, userId2, page = 1) => {
  console.log(page);
  const skip = (page - 1) * 30;

  const messages = await Message.find({
    $or: [
      { sender: userId1, recipient: userId2 },
      { sender: userId2, recipient: userId1 },
    ],
  })
    .sort({ timestamp: -1 })
    .populate("sender")
    .populate("recipient")
    .skip(skip)
    .limit(30);

  return messages.reverse();
};

export const getMissedMessages = async (userId) => {
  return await Message.find({ recipient: userId, status: "sent" });
};

// Get all chats
export const getChats = async (userId) => {
  const chats = await Message.aggregate([
    {
      $match: {
        $or: [{ sender: userId }, { recipient: userId }],
      },
    },
    {
      $group: {
        _id: {
          $cond: [{ $eq: ["$sender", userId] }, "$recipient", "$sender"],
        },
        lastMessage: { $last: "$$ROOT" }, // Get the last message directly
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "recipientInfo",
      },
    },
    {
      $unwind: "$recipientInfo", // Unwind the array to get individual objects
    },
    {
      $addFields: {
        recipient: "$recipientInfo",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          recipient: "$recipient",
          lastMessage: "$lastMessage", // Include last message
        },
      },
    },
  ]);

  return chats;
};
