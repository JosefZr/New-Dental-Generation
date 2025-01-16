import { progress, RANKS } from "@/lib/ProgressData";

export const calculateProgress = (createdAt) => {
    const diffrenseDate = new Date().getDate() - new Date(createdAt).getDate();
    
    const currentProgress = progress.find(stage => 
      diffrenseDate <= stage.maxDays
    ) || progress[progress.length - 1];
    
    const NextProgress = progress.find(stage => 
      diffrenseDate <= (stage.maxDays - 30)
    ) || progress[progress.length - 1];
    
    const percentage = 100 - ((currentProgress.maxDays - diffrenseDate) / 30) * 100;
  
    const currentRank = Object.values(RANKS).find(rank => 
      diffrenseDate >= rank.range[0] && diffrenseDate <= rank.range[1]
    ) || RANKS.DIAMOND;
  
    return {
      currentProgress,
      NextProgress,
      percentage,
      diffrenseDate,
      currentRank,
      daysUntilNext: currentProgress.maxDays - diffrenseDate
    };
  };