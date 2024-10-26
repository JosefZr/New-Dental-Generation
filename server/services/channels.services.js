//================================ THIS SERVICES USED ONLY BY THE ADMIN OR ITS MODERATORS =================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import Channel from "../models/Channel.model.js";

class ChannelService {
  // Create a new channel
  async createChannel(data) {
    const { title, description, type, locked = false } = data;
    const newChannel = new Channel({ title, description, type, locked });
    return await newChannel.save();
  }

  // Update channel name and description
  async updateChannel(channelId, data) {
    const { title, description } = data;
    return await Channel.findByIdAndUpdate(
      channelId,
      { title, description },
      { new: true }
    );
  }

  // Lock or unlock a channel
  async lockChannel(channelId, lockStatus) {
    return await Channel.findByIdAndUpdate(
      channelId,
      { locked: lockStatus },
      { new: true }
    );
  }

  // Delete a channel
  async deleteChannel(channelId) {
    return await Channel.findByIdAndDelete(channelId);
  }

  // Get a single channel by ID
  async getChannelById(channelId) {
    return await Channel.findById(channelId);
  }

  // Get all channels
  async getAllChannels() {
    return await Channel.find({});
  }
}

export default new ChannelService();
