
export interface Story {
  _id: string;
  title: string;
  author: string;
  duration: string;
  category: string;
  date: string;
  description?: string;
  imageUrl: string;
  audioUrl?: string;
  featured?: boolean;
  status?: 'published' | 'pending' | 'rejected';
  views?: number;
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
  image?: File;
  audioSrc?: File;
}
