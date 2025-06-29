// db entity attribute
export type entity = {
  _id: string;
  score: number;
  entity_name: string;
  about: string;
  category: string;
  tags: Array<string>;
  scoreReasons: Array<string>;
  likes: number;
  dislikes: number;
  image_url: string;
};


export type contribution = {
  id: string; // this also links to it
  title: string;
  summary?: string;
  link: string;
};


export type SessionData = {
  userId?: string;
  username?: string;
  isLoggedIn: boolean;
  score?: number;
  contributions?: Array<contribution>;
}
