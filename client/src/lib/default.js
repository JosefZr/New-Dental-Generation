export const signUpFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    type: "text",
    componentType: "input",
  },
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your user email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const signInFormControls = [
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your user email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const initialSignInFormData = {
  userEmail: "",
  password: "",
};

export const initialSignUpFormData = {
  userName: "",
  userEmail: "",
  password: "",
};

export const languageOptions = [
  { id: "english", label: "English" },
  { id: "spanish", label: "Spanish" },
  { id: "french", label: "French" },
  { id: "german", label: "German" },
  { id: "chinese", label: "Chinese" },
  { id: "japanese", label: "Japanese" },
  { id: "korean", label: "Korean" },
  { id: "portuguese", label: "Portuguese" },
  { id: "arabic", label: "Arabic" },
  { id: "russian", label: "Russian" },
];

export const courseLevelOptions = [
  { id: "0", label: "Silver Pawn" },
  { id: "30", label: "Silver Rock" },
  { id: "60", label: "Silver Knight" },
  { id: "90", label: "Silver Bishop" },
  { id: "120", label: "Silver Queen" },
  { id: "150", label: "Silver King" },
  { id: "180", label: "Gold Rock" },
  { id: "210", label: "Gold Knight" },
  { id: "240", label: "Gold Bishop" },
  { id: "270", label: "Gold Queen" },
  { id: "300", label: "Gold King" },
  { id: "330", label: "Emerald Knight" },
  { id: "360", label: "Emerald Bishop" },
  { id: "390", label: "Emerald Queen" },
  { id: "420", label: "Emerald King" },
  { id: "450", label: "Diamond Bishop" },
  { id: "480", label: "Diamond Queen" },
  { id: "510", label: "DiamondKing" },

];

export const courseCategories = [
  { id: "web-development", label: "Web Development" },
  { id: "backend-development", label: "Backend Development" },
  { id: "data-science", label: "Data Science" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "artificial-intelligence", label: "Artificial Intelligence" },
  { id: "cloud-computing", label: "Cloud Computing" },
  { id: "cyber-security", label: "Cyber Security" },
  { id: "mobile-development", label: "Mobile Development" },
  { id: "game-development", label: "Game Development" },
  { id: "software-engineering", label: "Software Engineering" },
];

export const courseLandingPageFormControls = [
  {
    name: "title",
    label: "Title",
    componentType: "input",
    type: "text",
    placeholder: "Enter course title",
  },
  {
    name: "level",
    label: "Level",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseLevelOptions,
  },
  {
    name: "primaryLanguage",
    label: "Primary Language",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: languageOptions,
  },
  {
    name: "subtitle",
    label: "Subtitle",
    componentType: "input",
    type: "text",
    placeholder: "Enter course subtitle",
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course description",
  },
  {
    name: "welcomeMessage",
    label: "Welcome Message",
    componentType: "textarea",
    placeholder: "Welcome message for students",
  },
];

export const courseLandingInitialFormData = {
  title: "",
  level: "",
  primaryLanguage: "",
  subtitle: "",
  description: "",
  welcomeMessage: "",
  image: "",
};

export const courseCurriculumInitialFormData = [
  {
    title: "",
    videoUrl: "",
    freePreview: false,
  },
];

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const filterOptions = {
  category: courseCategories,
  level: courseLevelOptions,
  primaryLanguage: languageOptions,
};