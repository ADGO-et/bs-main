// import { StaticImageData } from "next/image";

export interface creatingTalentPayload {
    firstName: string;
    lastName: string;
    profession: string;
    addressLine: string;
    category: string;
    description: string;
    email?: string;
    phone?: string;
    location?: string;
    skills?: string[];
    experience?: {
      title?: string;
      company?: string;
      startDate?: string;
      endDate?: string;
      description?: string
    }[];
    education?:{
      degree?: string;
      institution: string;
      startDate?: string;
      endDate?: string;
    }[]
    educationalFiles?: string[];
    profilePic?: string;
    period?: 'fullTime' | 'partTime';
    videoLink?: string;
    isAvailable?: boolean;
}


export interface SingleTalent {
    _id: string;
    firstName: string;
    lastName: string;
    profession: string;
    phone: string;
    email: string;
    location: string;
    addressLine: string;
    category: string;
    description: string;
    skills: string[];
    experience: {
      title: string;
      company: string;
      startDate: string;
      endDate: string;
      description: string;
      _id: string;
    }[];
    education: {
      degree: string;
      institution: string;
      startDate: string;
      endDate: string;
      _id: string;
    }[];
    educationalFiles: string[];
    profilePic: string;
    period: 'fullTime' | 'partTime';
    videoLink: string;
    isAvailable: boolean;
    status: string;
    feedback: string | null;
    createdAt: string;
    updatedAt: string;
}


export interface SingleTalentResponse {
  status: string;
  message: string;
  data: SingleTalent;
}

export interface TalentResponse {
  status: string;
  message: string;
  data: {
    talents: SingleTalent[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}