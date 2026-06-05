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

export const girlfriendName = "Swathy";
export const petName = "Baby Zii";
export const yourName = "Syed";

// Relationship start date (YYYY-MM-DD)
// This will feed into the memory counter
export const relationshipStartDate = "2024-04-12T18:30:00";

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
  { id: 13, reason: "Your passion and dedication to the things you love are beautiful." },
  { id: 14, reason: "You make me believe in soulmates and happy endings." },
  { id: 15, reason: "You are the very first person I want to share good news with." },
  { id: 16, reason: "The silly faces you make when you are trying to tease me." },
  { id: 17, reason: "You make me feel safe, protected, and deeply cherished." },
  { id: 18, reason: "Your gentle heart and the soft way you speak when I'm down." },
  { id: 19, reason: "You are my best friend, my partner in crime, and my soulmate." },
  { id: 20, reason: "Simply because you are you, and there is no one else like you in this universe." }
];

export const futureDreams: FutureDream[] = [
  {
    title: "Places We Will Visit",
    description: "Strolling through the streets of Paris, watching the Northern Lights in Iceland, and getting lost in Kyoto's cherry blossoms.",
    category: "Travel",
    icon: "Plane",
  },
  {
    title: "Future Adventures",
    description: "Hot air ballooning at sunrise, road tripping with no destination, and diving into the crystal clear ocean together.",
    category: "Adventure",
    icon: "Compass",
  },
  {
    title: "Goals Together",
    description: "Building a life where we wake up next to each other every day, supporting each other's careers, and celebrating every small win.",
    category: "Life",
    icon: "HeartHandshake",
  },
  {
    title: "Dream House",
    description: "A cozy home with a massive bookshelf, a warm fireplace, a garden full of roses, and a big window overlooking a beautiful view.",
    category: "Home",
    icon: "Home",
  },
  {
    title: "Things To Learn Together",
    description: "Taking cooking classes, learning a new language, trying salsa dancing, and understanding how to build a lifetime of happiness.",
    category: "Learning",
    icon: "GraduationCap",
  },
];

export const futureLetter = `My Dearest Swathy,

I built this entire digital universe just for you because words sometimes fail me, but my effort and love for you never will. I know I messed up, and I am so, so sorry for hurting you. You mean absolutely everything to me, and seeing you upset is the hardest thing in the world.

I promise to listen better, to understand you more, and to never let a silly mistake come between us again. You are my Baby Zii, my peace, and my entire world. Please forgive me?

Thank you for being the most incredible person I've ever met. I love you more than all the stars in this galaxy.

Forever yours,
Syed`;

export const secretVaultMessage = `Hey there, my Baby Zii. 

If you are reading this, it means you successfully unlocked the vault. I wanted to leave a special secret note just for you here.

Every day I spend with you is a gift. I know I can be a fool sometimes, and I'm truly sorry for my mistakes. But my love for you is constant, unwavering, and deeper than the deepest ocean. 

You make my life beautiful, Swathy. Please forgive me. Thank you for simply being you. ❤️`;
