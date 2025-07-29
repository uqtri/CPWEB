export type Conversation = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  participants: any[];
  lastMessage?: any;
  isGroup: boolean;
  isCommunity: boolean;
  image?: string; // URL to the conversation's avatar image
};
export type CreateConversationData = {
  name: string;
  participants: number[];
  isPublic?: boolean;
};

export type UpdateConversationData = {
  name?: string;
  participants?: number[];
};
