//types

export type ApiResponse<T> = {
  data: T;
  message: string;
};

export type PaginationResponse<T> = {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

export type User = {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  isOAuthUser: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: string;
};

export type Student = {
  user_id: string;
  dateOfBirth: String;
  gender: string;
  college: string;
  yearOfEnding: string;
  course: string;
  interests: string[];
  bio: string;
  aim: string;
  plan: string;
  profilePicture: string;
  socialLinks: String[];
};

export type Post = {
  _id: string;
  title: string;
  content: string;
  likeCount: number;
  images: string[];
  tags: Tag[];
  community: Pick<Community, "_id" | "name" | "picture">;
  createdBy: Pick<User, "_id" | "username" | "email">;
  createdAt: Date;
  isLiked: boolean; //only for auth user
};

export type Tag = { _id: string; name: string };

export type Community = {
  _id: string;
  name: string;
  description: string;
  picture?: string;
  createdBy: Pick<User, "_id" | "username" | "email">;
  subscribersCount: number;
  membersCount: number;
  postsCount: number;
  isSubscribed: boolean;
};

export type Comment = {
  _id: string;
  content: string;
  createdBy: Pick<User, "_id" | "username" | "email">;
  post: Pick<Post, "_id">;
  createdAt: Date;
  likes: string[];
  likeCount: number;
};

export type College = {
  id: number;
  universityName: string;
  collegeName: string;
  collegeType: string;
  state: string;
  district: string;
};

export enum NotificationType {
  COMMENT = "COMMENT",
  LIKE = "LIKE",
  NEW_POST = "NEW_POST",
  FOLLOW = "FOLLOW",
  FRIEND_REQUEST = "FRIEND_REQUEST",
  FRIEND_ACCEPT = "FRIEND_ACCEPT",
  OTHER = "OTHER",
}

export type Notification = {
  _id: string;
  message: string;
  type: NotificationType;
  createdAt: Date;
  read: boolean;
  userId: string;
};
