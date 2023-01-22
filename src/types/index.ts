export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}
export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
export interface ArticleForm {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface Comment {
  id: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  body: string;
  author: Profile;
}
