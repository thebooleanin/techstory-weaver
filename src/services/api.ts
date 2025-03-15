
import { Story } from '@/types/story';

// Base URL from environment or fallback
const API_BASE_URL = 'http://localhost:5000/api';

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
export const createStory = async (storyData: FormData, customUrl?: string): Promise<Story | null> => {
  try {
    const url = customUrl || `${API_BASE_URL}/stories`;
    const response = await fetch(url, {
      method: 'POST',
      body: storyData, // FormData for file uploads
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
  storyData: FormData | Record<string, any>, 
  customUrl?: string
): Promise<Story | null> => {
  try {
    const baseUrl = customUrl || API_BASE_URL;
    const url = `${baseUrl}/stories/${id}`;
    
    const isFormData = storyData instanceof FormData;
    
    const response = await fetch(url, {
      method: 'PUT',
      body: isFormData ? storyData : JSON.stringify(storyData),
      headers: isFormData ? {} : {
        'Content-Type': 'application/json',
      },
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
