import ChannelModel from "../models/Channel.model.js";

export const createStoreLabChannel = async (req, res) => {
  const { values } = req.body;

  try {
    console.log()
    const existingChannel = await ChannelModel.findOne({ title: values.title });

    if (existingChannel) {
        return res.status(200).json({ message: "Channel already exists" });
    }

    const newChannel = await ChannelModel.create(values);

    res.status(201).json({
        success:true,
        message: "Channel created successfully",
        data: newChannel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};