
import { Story, StoryFormData } from '@/types/story';

// Base URL from environment or fallback
const API_BASE_URL = 'http://13.232.139.240:5000/api';

// Fetch all stories
export const fetchStories = async (customUrl?: string): Promise<Story[]> => {
  try {
    const url = customUrl || `${API_BASE_URL}/stories`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stories: ${response.status}`);
    }
    
    const data = await response.json();
    return data.stories || data; // Handle different API response formats
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
};

// Fetch a single story by ID
export const fetchStoryById = async (id: string, customUrl?: string): Promise<Story | null> => {
  try {
    const baseUrl = customUrl || API_BASE_URL;
    const url = `${baseUrl}/stories/${id}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch story: ${response.status}`);
    }
    
    const data = await response.json();
    return data.story || data;
  } catch (error) {
    console.error(`Error fetching story with id ${id}:`, error);
    return null;
  }
};

// Create a new story with FormData (handles files)
export const createStory = async (storyData: StoryFormData, customUrl?: string): Promise<Story | null> => {
  try {
    const url = customUrl || `${API_BASE_URL}/stories`;
    
    // Create FormData object for file uploads
    const formData = new FormData();
    
    // Add all fields to FormData
    Object.entries(storyData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'image' || key === 'audioSrc') {
          // These are already File objects, just add them to FormData
          if (value) formData.append(key, value as File);
        } else if (key === 'featured') {
          // Convert boolean to string
          formData.append(key, String(value));
        } else {
          // Add other fields as strings
          formData.append(key, value as string);
        }
      }
    });
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header, it's set automatically with proper boundary for FormData
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create story: ${response.status}`);
    }
    
    const data = await response.json();
    return data.story || data;
  } catch (error) {
    console.error('Error creating story:', error);
    return null;
  }
};

// Update an existing story
export const updateStory = async (
  id: string, 
  storyData: StoryFormData, 
  customUrl?: string
): Promise<Story | null> => {
  try {
    const baseUrl = customUrl || API_BASE_URL;
    const url = `${baseUrl}/stories/${id}`;
    
    // Create FormData object for file uploads
    const formData = new FormData();
    
    // Add all fields to FormData
    Object.entries(storyData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'image' || key === 'audioSrc') {
          // These are already File objects, just add them to FormData
          if (value) formData.append(key, value as File);
        } else if (key === 'featured') {
          // Convert boolean to string
          formData.append(key, String(value));
        } else {
          // Add other fields as strings
          formData.append(key, value as string);
        }
      }
    });
    
    const response = await fetch(url, {
      method: 'PUT',
      body: formData,
      // Don't set Content-Type header, it's set automatically with proper boundary for FormData
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update story: ${response.status}`);
    }
    
    const data = await response.json();
    return data.story || data;
  } catch (error) {
    console.error(`Error updating story with id ${id}:`, error);
    return null;
  }
};

// Delete a story
export const deleteStory = async (id: string, customUrl?: string): Promise<boolean> => {
  try {
    const baseUrl = customUrl || API_BASE_URL;
    const url = `${baseUrl}/stories/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete story: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting story with id ${id}:`, error);
    return false;
  }
};
