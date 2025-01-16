import { 
  LiaChessPawnSolid, 
  LiaChessRookSolid, 
  LiaChessKnightSolid, 
  LiaChessBishopSolid, 
  LiaChessQueenSolid, 
  LiaChessKingSolid 
} from "react-icons/lia";
export const progress = [
  {
    name: "Pawn",
    progress: 0,
    logo: LiaChessPawnSolid, // Store the component itself
    maxDays: 30
  },
  {
    name: "Rook",
    progress: 30,
    logo: LiaChessRookSolid,
    maxDays: 60
  },
  {
    name: "Knight",
    progress: 60,
    logo: LiaChessKnightSolid,
    maxDays: 90
  },
  {
    name: "Bishop",
    progress: 90,
    logo: LiaChessBishopSolid,
    maxDays: 120
  },
  {
    name: "Queen",
    progress: 120,
    logo: LiaChessQueenSolid,
    maxDays: 150
  },
  {
    name: "King",
    progress: 150,
    logo: LiaChessKingSolid,
    maxDays: 180
  },
  {
    name: "Rook",
    progress: 180,
    logo: LiaChessRookSolid,
    maxDays: 210
  },
  {
    name: "Knight",
    progress: 210,
    logo: LiaChessKnightSolid,
    maxDays: 240
  },
  {
    name: "Bishop",
    progress: 240,
    logo: LiaChessBishopSolid,
    maxDays: 270
  },
  {
    name: "Queen",
    progress: 270,
    logo: LiaChessQueenSolid,
    maxDays: 300
  },
  {
    name: "King",
    progress: 300,
    logo: LiaChessKingSolid,
    maxDays: 330
  },
  {
    name: "Knight",
    progress: 330,
    logo: LiaChessKnightSolid,
    maxDays: 360
  },
  {
    name: "Bishop",
    progress: 360,
    logo: LiaChessBishopSolid,
    maxDays: 390
  },
  {
    name: "Queen",
    progress: 390,
    logo: LiaChessQueenSolid,
    maxDays: 420
  },
  {
    name: "King",
    progress: 420,
    logo: LiaChessKingSolid,
    maxDays: 450
  },
  {
    name: "Bishop",
    progress: 450,
    logo: LiaChessBishopSolid,
    maxDays: 480
  },
  {
    name: "Queen",
    progress: 480,
    logo: LiaChessQueenSolid,
    maxDays: 510
  },
  {
    name: "King",
    progress: 510,
    logo: LiaChessKingSolid,
    maxDays: 540
  },
];

export const RANKS = {
  SILVER: { max: 180, name: "Silver" },
  GOLD: { max: 330, name: "Gold" },
  PLATINUM: { max: 450, name: "Emerald" },
  DIAMOND: { max: 540, name: "Diamond" },
  DIAMOND_KING: { max: Infinity, name: "Diamond King" }
};

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

export const getCurrentProgress = (diffDays) => {
  return progress.find(stage => 
      diffDays <= stage.maxDays
  ) ||  progress[ progress.length - 1];
};

export const getNextProgress = (currentProgress) => {
  const nextIndex = progress.findIndex(stage => stage.progress === currentProgress.progress) + 1;
  return nextIndex < progress.length ? progress[nextIndex] : currentProgress;
};

export const calculateStagePercentage = (diffDays, currentProgress) => {
  const stageStartDays = currentProgress.progress;
  const stageDuration = 30; // Each stage is 30 days
  const daysInCurrentStage = diffDays - stageStartDays;
  
  const percentage = Math.min((daysInCurrentStage / stageDuration) * 100, 100);
  return Math.max(0, percentage); // Ensure percentage is not negative
};

export const getRank = (days) => {
  const rank = Object.values(RANKS).find(rank => days <= rank.max);
  return rank.name;
};

export const getDaysRemaining = (diffDays, currentProgress) => {
  return Math.max(0, currentProgress.maxDays - diffDays);
};

export const getProgressColor = (days) => {
  if (days <= RANKS.SILVER.max) return "text-my-white-gray";
  if (days <= RANKS.GOLD.max) return "text-my-gold";
  if (days <= RANKS.PLATINUM.max) return "rgb(80, 200, 120)";
  return "rgb(185, 242, 255)";
};

