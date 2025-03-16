export const getDaysDifference = (createdAt) => {
  const created = new Date(createdAt);
  const now = new Date();
  
  // Reset time portion to ensure accurate day calculation
  created.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  const diffTime = Math.abs(now - created);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getCurrentProgress = (diffDays, progress) => {
  return progress.find(stage => diffDays <= stage.maxDays) || progress[progress.length - 1];
};

export const calculatePercentage = (diffDays, currentProgress) => {
  const stageStartDays = currentProgress.progress;
  const stageDuration = 30; // Each stage lasts 30 days
  const daysInCurrentStage = diffDays - stageStartDays;
  
  const percentage = Math.min((daysInCurrentStage / stageDuration) * 100, 100);
  return Math.max(0, percentage); // Ensure percentage is not negative
};

export const getNextProgress = (progress, currentProgress) => {
  return progress.find(stage => stage.progress > currentProgress.progress) || currentProgress;
};

// Helper function to determine rank
export const getRank = (days,user) => {
    if (user.role === 'admin') return "Diamond King"; // Admins always have highest rank
    if (days <= 180) return "Silver";
    if (days <= 330) return "Gold";
    if (days <= 450) return "Platinum";
    if (days <= 540) return "Diamond";
    return "Diamond King";
};
 export const getColor = (days,user) => {
    if(user.role === "admin" || user.role === "moderator") return "rgb(185, 242, 255)"
    if (days <= 180) return "#EBEBEB";
    if (days <= 330) return "#F4EBD0";
    if (days <= 450) return "rgb(80, 200, 120)";
    if (days <= 540) return "rgb(185, 242, 255)";
    return "rgb(185, 242, 255)";
};
