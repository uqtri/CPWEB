export type Contest = {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  slug?: string;
  participants?: any[];
};

export type CreateContestData = {
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  slug?: string;
  // isPublic: boolean;
};

export type UpdateContestData = {
  title?: string;
  startTime?: Date;
  endTime?: string;
  description?: string;
  slug?: string;
  // isPublic?: boolean;
};
