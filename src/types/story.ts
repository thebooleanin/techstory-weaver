
export interface Story {
  _id: string;
  title: string;
  author: string;
  duration: string;
  category: string;
  tags?: string[];
  date: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  audioUrl?: string;
  audioSrc?: string;
  featured?: boolean;
  status?: 'published' | 'pending' | 'rejected';
  views?: number;
  isLive?: boolean;
  listeners?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Form data interface for creating/updating stories
export interface StoryFormData {
  title: string;
  author: string;
  duration: string;
  category: string;
  date: string;
  description?: string;
  featured?: boolean;
  image?: File | null;
  audioSrc?: File | null;
}
