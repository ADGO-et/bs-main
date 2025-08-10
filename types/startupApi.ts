export type StartupStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "active"
  | "completed";

export interface creatingStartupPayload {
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
