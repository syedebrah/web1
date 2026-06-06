export interface TimelineEvent {
  chapter: string;
  title: string;
  date: string;
  description: string;
  image?: string;
}

export interface LoveReason {
  id: number;
  reason: string;
}

export interface FutureDream {
  title: string;
  description: string;
  category: string;
  icon: string; // Lucide icon name or emoji representation
}

export const girlfriendName = "Baby Zi";
export const petName = "Baby Zii";
export const yourName = "Syed";

// Relationship start date (YYYY-MM-DD)
// This will feed into the memory counter
export const relationshipStartDate = "2022-06-07T00:00:00";

export const secretPassword = "love"; // The password to unlock the Secret Message Vault

export const timelineEvents: TimelineEvent[] = [
  {
    chapter: "Chapter 1",
    title: "The First Hello",
    date: "April 12, 2024",
    description: "The moment our eyes met, and the universe shifted. A simple greeting that would change my entire life forever.",
    image: "/images/hello.jpg",
  },
  {
    chapter: "Chapter 2",
    title: "The First Conversation",
    date: "April 15, 2024",
    description: "Hours felt like seconds. We talked about everything and nothing, finding pieces of ourselves in each other's words.",
    image: "/images/conversation.jpg",
  },
  {
    chapter: "Chapter 3",
    title: "The First Call",
    date: "May 2, 2024",
    description: "Hearing your voice for the first time. The nervous laughter, the sweet pauses, and the realization that I was falling.",
    image: "/images/call.jpg",
  },
  {
    chapter: "Chapter 4",
    title: "The First Fight",
    date: "June 18, 2024",
    description: "Not everything was smooth, but this was the moment we chose to understand rather than walk away. It made us stronger.",
    image: "/images/strength.jpg",
  },
  {
    chapter: "Chapter 5",
    title: "The First 'I Miss You'",
    date: "July 10, 2024",
    description: "A confession of distance. Realizing that a day without talking to you felt incomplete, like a sky without stars.",
    image: "/images/missyou.jpg",
  },
  {
    chapter: "Chapter 6",
    title: "Today",
    date: "Present Day",
    description: "Here we are, stronger than ever. Still laughing at the same jokes, still in love, and building our own little universe.",
    image: "/images/today.jpg",
  },
];

export const loveReasons: LoveReason[] = [
  { id: 1, reason: "You are my bujuku" },
  { id: 2, reason: "You are my baby" },
  { id: 3, reason: "You are my ThanghaKutti" },
  { id: 4, reason: "You are My Rasoghalo" },
  { id: 5, reason: "You are my hottest Girl" },
  { id: 6, reason: "You are my cute baby" },
  { id: 7, reason: "You are my hot mommy" },
  { id: 8, reason: "You are the 1st wonder in the world" },
  { id: 9, reason: "The way you look at me makes me feel like the luckiest person alive." },
  { id: 10, reason: "Your touch has a magical way of easing all my worries and anxiety." },
  { id: 11, reason: "You accept me fully, including all my flaws and quirks." },
  { id: 12, reason: "You are my baby Zi..." },
  { id: 13, reason: "Your voice is the only lullaby I ever need to fall asleep to." },
  { id: 14, reason: "The way you get jealous is the cutest thing in the world." },
  { id: 15, reason: "Your smile literally stops my heart every single time." },
  { id: 16, reason: "You make me want to be a better man for you, every day." },
  { id: 17, reason: "Late night calls with you are my favorite part of the day." },
  { id: 18, reason: "The way you say my name makes everything feel okay." },
  { id: 19, reason: "You are the first person I think about when I wake up." },
  { id: 20, reason: "Your hugs feel like home — the safest place in the world." },
  { id: 21, reason: "You understand my silence better than anyone understands my words." },
  { id: 22, reason: "I love the way you fight with me and then come back to me." },
  { id: 23, reason: "You are the reason I believe in love at all." },
  { id: 24, reason: "Your laugh is the most beautiful sound I have ever heard." },
  { id: 25, reason: "You make even the boring moments feel magical." },
  { id: 26, reason: "The way you care for me when I'm sick or down melts my heart." },
  { id: 27, reason: "You are my best friend, my lover, and my entire world." },
  { id: 28, reason: "I love how you steal my hoodies and look better in them than me." },
  { id: 29, reason: "Every love song suddenly makes sense because of you." },
  { id: 30, reason: "Simply because you are you, and there is no one else like you in this universe." },
];

export interface AnniversaryWish {
  id: number;
  quote: string;
  translation: string;
}

export const anniversaryDate = "June 7, 2026";
export const anniversaryYear = 4; // completing 4 years, entering 5th

export const anniversaryWishes: AnniversaryWish[] = [
  {
    id: 1,
    quote: "என் கனவுகளில் நீ, என் நினைவுகளில் நீ, என் சுவாசத்திலும் நீ.",
    translation: "You are in my dreams, you are in my memories, you are in my every breath.",
  },
  {
    id: 2,
    quote: "உன் புன்னகை என் வாழ்வின் வெளிச்சம்.",
    translation: "Your smile is the light of my life.",
  },
  {
    id: 3,
    quote: "முன்னிரவில் உன் பேச்சுசத்தமும், பின்னிரவில் உன் மூச்சுசத்தமும் வேண்டும்..!",
    translation: "I need your voice in the evening and the sound of your breath at night..!",
  },
];

export const futureDreams: FutureDream[] = [
  {
    title: "Build Our Careers Together",
    description: "Supporting each other's ambitions, celebrating every promotion, and growing side by side until we both reach the top of our dreams.",
    category: "Career",
    icon: "Rocket",
  },
  {
    title: "Get Married & Start Our Life",
    description: "Walking down the aisle together, making it official in front of everyone we love, and beginning the forever chapter of our story.",
    category: "Marriage",
    icon: "Gem",
  },
  {
    title: "Buy Our Own Home",
    description: "A cozy place that's truly ours — with a kitchen we cook in together, a bedroom full of our memories, and a balcony for our late night talks.",
    category: "Home",
    icon: "Home",
  },
  {
    title: "Travel The World Together",
    description: "Exploring Maldives, walking through the streets of Dubai, watching sunsets in Goa, and collecting passport stamps side by side.",
    category: "Travel",
    icon: "Plane",
  },
  {
    title: "Grow Old Together",
    description: "Building a beautiful family, raising our kids with love, and sitting together at 80 still holding hands and telling our grandkids how we fell in love.",
    category: "Family",
    icon: "Heart",
  },
  {
    title: "Wild Adventures Together",
    description: "Road trips with no map, midnight drives blasting our favorite songs, bungee jumping, camping under the stars, trying all 64 positions together, and making crazy memories we'll laugh about forever.",
    category: "Adventure",
    icon: "Compass",
  },
];

export const futureLetter = `My Dearest Baby Zi,

I built this entire digital universe just for you because words sometimes fail me, but my effort and love for you never will. I know I messed up, and I am so, so sorry for hurting you. You mean absolutely everything to me, and seeing you upset is the hardest thing in the world.

I promise to listen better, to understand you more, and to never let a silly mistake come between us again. You are my Baby Zii, my peace, and my entire world. Please forgive me?

Thank you for being the most incredible person I've ever met. I love you more than all the stars in this galaxy.

Forever yours,
Syed`;

export const secretVaultMessage = `Hey there, my Baby Zii. 

If you are reading this, it means you successfully unlocked the vault. I wanted to leave a special secret note just for you here.

Every day I spend with you is a gift. I know I can be a fool sometimes, and I'm truly sorry for my mistakes. But my love for you is constant, unwavering, and deeper than the deepest ocean. 

You make my life beautiful, Baby Zi. Please forgive me. Thank you for simply being you. ❤️`;
