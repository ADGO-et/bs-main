export interface Feedback {
  _id?: string;
  fullName: string;
  email: string;
  contactNumber: string;
  rating: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface FeedbackResponse {
  status: string;
  message: string;
  data: Feedback;
}
