import { StartupStatus } from "./startupApi";

export interface creatingHiwotPayload {
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
  budget: number;
  teamMembers: string[];
  projectType: string;
  projectManager: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface HiwotFund {
  _id?: string;
  creatorId: string;
  firstName: string;
  lastName: string;
  description: string;
  phoneNumber: string;
  email: string;
  bankName: string;
  bankAccountHolderName: string;
  bankAccountNumber: number;
  fundingGoal: number;
  swiftCode: string;
  status: StartupStatus | "pending";
  countryOfResidence: string;
  campaignDuration: number;
  videoLink: string;
  howLong: number;
  identification: string;
  medicalCertificate: string;
}
