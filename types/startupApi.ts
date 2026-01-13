import { User } from "./authApi";
export type StartupStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "active"
  | "completed";

export interface Startup {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  description: string;
  companyName: string;
  bankName: string;
  bankAccountHolderName: string;
  bankAccountNumber: number;
  swiftCode: string;
  status: StartupStatus;
  backersCount: number;
  fundingGoal: number;
  currentFunding: number;
  fundingProgress: number;
  creatorId: string;
  howLong: number;
  isExpired: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  postExpiryDate: string;
  image: string;
}

export interface creatingStartupPayload {
  _id?: string;
  creatorId: string;
  firstName: string;
  lastName: string;
  description: string;
  phoneNumber: string;
  email: string;
  companyName: string;
  bankName: string;
  bankAccountHolderName: string;
  bankAccountNumber: number;
  fundingGoal: number;
  swiftCode: string;
  status: StartupStatus | "pending";
  countryOfResidence: string;
  linkedIn: string;
  category: string;
  campaignDuration: number;
  videoLink: string;
  howLong: number;
}

export interface creatingStartupWithBsTeamPayload {
  _id?: string;
  creatorId: string;
  firstName: string;
  lastName: string;
  description: string;
  phoneNumber: string;
  email: string;
  companyName: string;
  bankName: string;
  bankAccountHolderName: string;
  bankAccountNumber: number;
  fundingGoal: number;
  swiftCode: string;
  status: StartupStatus | "pending";
  document: string;
  companyRegistration: string;
  category: string;
  howLong: number;
}

export interface StartupApproval {
  postExpiryDate: string;
}

export interface StartupComment {
  _id: string;
  author: User;
  startup: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface StartupCommentResponse {
  status: string;
  message: string;
  data: StartupComment;
}

export interface StartupCommentsListResponse {
  status: string;
  message: string;
  data: StartupComment[];
}

export interface StartupLikeResponse {
  status: string;
  message: string;
  data: {
    message: string;
  };
}

export interface StartupFund {
  amount: number;
  description: string;
  commission_rate: number;
}