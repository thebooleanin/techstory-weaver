
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Pencil, Trash2, CheckCircle, X, Search, Eye, Star, RefreshCw, FileAudio, Music,
  Loader2, Upload, AlertCircle,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Story } from '@/types/story';
import { fetchStories, createStory, updateStory, deleteStory } from '@/services/api';

// Categories with Indian context
const categories = [
  'Technology', 'Entrepreneurship', 'Sustainability',
  'Healthcare', 'Education', 'Lifestyle', 'Indian Startups',
  'Digital India', 'Innovation', 'Rural Development',
];

const StorytellingManagement = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [isCreatingStory, setIsCreatingStory] = useState(false);
  const [newStory, setNewStory] = useState<Partial<Story>>({
    title: '',
    author: '',
    category: 'Technology',
    duration: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    featured: false,
    status: 'pending',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState('http://localhost:5000/api/stories');
  
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioFileRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);
  const newAudioFileRef = useRef<HTMLInputElement>(null);
  const newImageFileRef = useRef<HTMLInputElement>(null);

  // Load stories on component mount
  useEffect(() => {
    const loadStories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Try to get API URL from site config
        const siteConfig = localStorage.getItem('siteConfig');
        if (siteConfig) {
          const config = JSON.parse(siteConfig);
          if (config?.apiEndpoints?.stories) {
            setApiUrl(config.apiEndpoints.stories);
          }
        }
        
        const fetchedStories = await fetchStories(apiUrl);
        setStories(fetchedStories);
      } catch (err) {
        setError('Failed to load stories. Please check your API endpoint configuration.');
        console.error('Error loading stories:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStories();
  }, [apiUrl]);

  // Filter stories based on search term and filters
  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase());

    // Handle "all" for category filter
    const matchesCategory =
      categoryFilter === 'all' ? true : story.category === categoryFilter;

    // Handle "all" for status filter
    const matchesStatus =
      statusFilter === 'all' ? true : story.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleUpdateStory = async () => {
    if (!editingStory) return;

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      
      // Add text fields to FormData
      Object.entries(editingStory).forEach(([key, value]) => {
        if (key !== '_id' && value !== undefined && key !== 'imageUrl' && key !== 'audioUrl') {
          formData.append(key, value.toString());
        }
      });
      
      // Add file fields if present
      if (imageFileRef.current?.files?.[0]) {
        formData.append('image', imageFileRef.current.files[0]);
      }
      
      if (audioFileRef.current?.files?.[0]) {
        formData.append('audioSrc', audioFileRef.current.files[0]);
      }
      
      const updatedStory = await updateStory(editingStory._id, formData, apiUrl);
      
      if (updatedStory) {
        setStories(stories.map((story) =>
          story._id === updatedStory._id ? updatedStory : story
        ));
        
        toast({
          title: 'Story updated',
          description: 'The story has been updated successfully',
        });
        
        setEditingStory(null);
      } else {
        toast({
          title: 'Update failed',
          description: 'Failed to update the story. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Error updating story:', err);
      toast({
        title: 'Update failed',
        description: 'An error occurred while updating the story.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStory = async (id: string) => {
    try {
      setIsLoading(true);
      const success = await deleteStory(id, apiUrl);
      
      if (success) {
        setStories(stories.filter((story) => story._id !== id));
        
        toast({
          title: 'Story deleted',
          description: 'The story has been deleted successfully',
        });
      } else {
        toast({
          title: 'Deletion failed',
          description: 'Failed to delete the story. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Error deleting story:', err);
      toast({
        title: 'Deletion failed',
        description: 'An error occurred while deleting the story.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateStory = async () => {
    try {
      setIsLoading(true);
      
      // Validate required fields
      if (!newStory.title || !newStory.author || !newStory.category) {
        toast({
          title: 'Missing required fields',
          description: 'Please fill in all required fields.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
      
      const formData = new FormData();
      
      // Add text fields to FormData
      Object.entries(newStory).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      
      // Add file fields if present (required for creating a new story)
      if (newImageFileRef.current?.files?.[0]) {
        formData.append('image', newImageFileRef.current.files[0]);
      } else {
        toast({
          title: 'Image required',
          description: 'Please select an image for the story.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
      
      if (newAudioFileRef.current?.files?.[0]) {
        formData.append('audioSrc', newAudioFileRef.current.files[0]);
      } else {
        toast({
          title: 'Audio required',
          description: 'Please select an audio file for the story.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
      
      const createdStory = await createStory(formData, apiUrl);
      
      if (createdStory) {
        setStories([...stories, createdStory]);
        
        toast({
          title: 'Story created',
          description: 'The story has been created successfully',
        });
        
        // Reset form and close modal
        setNewStory({
          title: '',
          author: '',
          category: 'Technology',
          duration: '',
          date: new Date().toISOString().split('T')[0],
          description: '',
          featured: false,
          status: 'pending',
        });
        setIsCreatingStory(false);
        
        if (newImageFileRef.current) newImageFileRef.current.value = '';
        if (newAudioFileRef.current) newAudioFileRef.current.value = '';
      } else {
        toast({
          title: 'Creation failed',
          description: 'Failed to create the story. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Error creating story:', err);
      toast({
        title: 'Creation failed',
        description: 'An error occurred while creating the story.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveStory = async (id: string) => {
    try {
      setIsLoading(true);
      const storyToUpdate = stories.find(story => story._id === id);
      
      if (!storyToUpdate) {
        toast({
          title: 'Story not found',
          description: 'Unable to find the story to approve.',
          variant: 'destructive',
        });
        return;
      }
      
      const updatedStory = await updateStory(id, { status: 'published' }, apiUrl);
      
      if (updatedStory) {
        setStories(stories.map((story) =>
          story._id === id ? { ...story, status: 'published' } : story
        ));
        
        toast({
          title: 'Story approved',
          description: 'The story has been approved and published',
        });
      } else {
        toast({
          title: 'Approval failed',
          description: 'Failed to approve the story. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Error approving story:', err);
      toast({
        title: 'Approval failed',
        description: 'An error occurred while approving the story.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectStory = async (id: string) => {
    try {
      setIsLoading(true);
      const storyToUpdate = stories.find(story => story._id === id);
      
      if (!storyToUpdate) {
        toast({
          title: 'Story not found',
          description: 'Unable to find the story to reject.',
          variant: 'destructive',
        });
        return;
      }
      
      const updatedStory = await updateStory(id, { status: 'rejected' }, apiUrl);
      
      if (updatedStory) {
        setStories(stories.map((story) =>
          story._id === id ? { ...story, status: 'rejected' } : story
        ));
        
        toast({
          title: 'Story rejected',
          description: 'The story has been rejected',
        });
      } else {
        toast({
          title: 'Rejection failed',
          description: 'Failed to reject the story. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Error rejecting story:', err);
      toast({
        title: 'Rejection failed',
        description: 'An error occurred while rejecting the story.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      setIsLoading(true);
      const storyToUpdate = stories.find(story => story._id === id);
      
      if (!storyToUpdate) {
        toast({
          title: 'Story not found',
          description: 'Unable to find the story to update.',
          variant: 'destructive',
        });
        return;
      }
      
      const updatedFeaturedStatus = !storyToUpdate.featured;
      
      const updatedStory = await updateStory(id, { featured: updatedFeaturedStatus }, apiUrl);
      
      if (updatedStory) {
        setStories(stories.map((story) =>
          story._id === id ? { ...story, featured: updatedFeaturedStatus } : story
        ));
        
        toast({
          title: updatedFeaturedStatus ? 'Added to featured' : 'Removed from featured',
          description: updatedFeaturedStatus
            ? 'The story has been added to featured stories'
            : 'The story has been removed from featured stories',
        });
      } else {
        toast({
          title: 'Update failed',
          description: 'Failed to update the story. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Error updating featured status:', err);
      toast({
        title: 'Update failed',
        description: 'An error occurred while updating the story.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Play/pause audio preview
  const toggleAudioPreview = (id: string) => {
    if (isPlaying === id) {
      setIsPlaying(null);
    } else {
      setIsPlaying(id);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Storytelling Management</h2>
        <Button 
          variant="default"
          onClick={() => setIsCreatingStory(true)}
          disabled={isLoading}
        >
          <FileAudio className="h-4 w-4 mr-2" />
          Add New Story
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stories..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={resetFilters}
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Audio</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && stories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin mb-2" />
                    <p>Loading stories...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredStories.length > 0 ? (
              filteredStories.map((story) => (
                <TableRow key={story._id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-medium">{story.title}</div>
                        <div className="text-xs text-muted-foreground">{story.date}</div>
                      </div>
                      {story.featured && (
                        <div className="bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-500 text-xs rounded-full px-2 py-0.5 flex items-center">
                          <Star className="h-3 w-3 mr-1" fill="currentColor" />
                          Featured
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{story.author}</TableCell>
                  <TableCell>{story.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {story.status === 'published' ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                          <span>Published</span>
                        </>
                      ) : story.status === 'pending' ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2"></div>
                          <span>Pending</span>
                        </>
                      ) : (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                          <span>Rejected</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{story.duration}</TableCell>
                  <TableCell>{story.views ? story.views.toLocaleString() : '0'}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      title={isPlaying === story._id ? 'Pause' : 'Play Preview'}
                      onClick={() => toggleAudioPreview(story._id)}
                      disabled={!story.audioUrl}
                    >
                      <Music className={`h-4 w-4 ${isPlaying === story._id ? 'text-primary' : ''}`} />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {story.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Approve Story"
                            onClick={() => handleApproveStory(story._id)}
                            disabled={isLoading}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Reject Story"
                            onClick={() => handleRejectStory(story._id)}
                            disabled={isLoading}
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        </>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        title={story.featured ? 'Remove from Featured' : 'Add to Featured'}
                        onClick={() => handleToggleFeatured(story._id)}
                        disabled={isLoading}
                      >
                        <Star className={`h-4 w-4 ${story.featured ? 'text-amber-500 fill-amber-500' : ''}`} />
                      </Button>

                      <Button variant="ghost" size="icon" title="View Story">
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Edit Story"
                            onClick={() => setEditingStory(story)}
                            disabled={isLoading}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Story</DialogTitle>
                            <DialogDescription>
                              Make changes to the storytelling content.
                            </DialogDescription>
                          </DialogHeader>

                          {editingStory && (
                            <div className="grid grid-cols-1 gap-6 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-story-title">Title</Label>
                                <Input
                                  id="edit-story-title"
                                  value={editingStory.title}
                                  onChange={(e) =>
                                    setEditingStory({ ...editingStory, title: e.target.value })
                                  }
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-story-author">Author</Label>
                                  <Input
                                    id="edit-story-author"
                                    value={editingStory.author}
                                    onChange={(e) =>
                                      setEditingStory({ ...editingStory, author: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-story-category">Category</Label>
                                  <Select
                                    value={editingStory.category}
                                    onValueChange={(value) =>
                                      setEditingStory({ ...editingStory, category: value })
                                    }
                                  >
                                    <SelectTrigger id="edit-story-category">
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                          {category}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-story-status">Status</Label>
                                  <Select
                                    value={editingStory.status || 'pending'}
                                    onValueChange={(value: 'published' | 'pending' | 'rejected') =>
                                      setEditingStory({ ...editingStory, status: value })
                                    }
                                  >
                                    <SelectTrigger id="edit-story-status">
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="published">Published</SelectItem>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-story-featured">Featured Story</Label>
                                  <div className="flex items-center h-10 space-x-2">
                                    <Checkbox
                                      id="edit-story-featured"
                                      checked={editingStory.featured || false}
                                      onCheckedChange={(checked) =>
                                        setEditingStory({ ...editingStory, featured: !!checked })
                                      }
                                    />
                                    <label
                                      htmlFor="edit-story-featured"
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      Feature this story on the homepage
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-story-date">Date</Label>
                                  <Input
                                    id="edit-story-date"
                                    type="date"
                                    value={editingStory.date ? editingStory.date.split('T')[0] : ''}
                                    onChange={(e) =>
                                      setEditingStory({ ...editingStory, date: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-story-duration">Duration (e.g., 5:30)</Label>
                                  <Input
                                    id="edit-story-duration"
                                    value={editingStory.duration}
                                    onChange={(e) =>
                                      setEditingStory({ ...editingStory, duration: e.target.value })
                                    }
                                    placeholder="5:30"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Image</Label>
                                <div className="border rounded-md p-4 bg-muted/30">
                                  {editingStory.imageUrl && (
                                    <div className="mb-3">
                                      <img 
                                        src={editingStory.imageUrl} 
                                        alt={editingStory.title}
                                        className="h-32 object-cover rounded-md mx-auto"
                                      />
                                    </div>
                                  )}
                                  <Input
                                    type="file"
                                    ref={imageFileRef}
                                    accept="image/*"
                                    className="mb-3"
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    Upload a new image to replace the current one.
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Audio Content</Label>
                                <div className="border rounded-md p-4 bg-muted/30">
                                  {editingStory.audioUrl && (
                                    <audio
                                      controls
                                      src={editingStory.audioUrl}
                                      className="w-full mb-3"
                                    />
                                  )}
                                  <Input
                                    type="file"
                                    ref={audioFileRef}
                                    accept="audio/*"
                                    className="mb-3"
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    Upload a new audio file to replace the current one.
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="edit-story-description">Description</Label>
                                <Textarea
                                  id="edit-story-description"
                                  placeholder="Story description or transcript"
                                  className="h-32"
                                  value={editingStory.description || ''}
                                  onChange={(e) =>
                                    setEditingStory({ ...editingStory, description: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                          )}

                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingStory(null)} disabled={isLoading}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateStory} disabled={isLoading}>
                              {isLoading ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                'Save Changes'
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" title="Delete Story" disabled={isLoading}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Story</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this story? This action cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteStory(story._id)}
                              className="bg-destructive text-destructive-foreground"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Deleting...
                                </>
                              ) : (
                                'Delete'
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <p>No stories found</p>
                    {(searchTerm || categoryFilter !== 'all' || statusFilter !== 'all') && (
                      <Button
                        variant="link"
                        onClick={resetFilters}
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create Story Dialog */}
      <Dialog open={isCreatingStory} onOpenChange={setIsCreatingStory}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Story</DialogTitle>
            <DialogDescription>
              Create a new storytelling entry. Audio files and images are required.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-story-title">Title*</Label>
              <Input
                id="new-story-title"
                value={newStory.title}
                onChange={(e) =>
                  setNewStory({ ...newStory, title: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-story-author">Author*</Label>
                <Input
                  id="new-story-author"
                  value={newStory.author}
                  onChange={(e) =>
                    setNewStory({ ...newStory, author: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-story-category">Category*</Label>
                <Select
                  value={newStory.category}
                  onValueChange={(value) =>
                    setNewStory({ ...newStory, category: value })
                  }
                >
                  <SelectTrigger id="new-story-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-story-date">Date*</Label>
                <Input
                  id="new-story-date"
                  type="date"
                  value={newStory.date}
                  onChange={(e) =>
                    setNewStory({ ...newStory, date: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-story-duration">Duration* (e.g., 5:30)</Label>
                <Input
                  id="new-story-duration"
                  value={newStory.duration}
                  onChange={(e) =>
                    setNewStory({ ...newStory, duration: e.target.value })
                  }
                  placeholder="5:30"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-story-description">Description</Label>
              <Textarea
                id="new-story-description"
                placeholder="Story description or transcript"
                className="h-32"
                value={newStory.description}
                onChange={(e) =>
                  setNewStory({ ...newStory, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-story-featured">Featured Story</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="new-story-featured"
                  checked={newStory.featured}
                  onCheckedChange={(checked) =>
                    setNewStory({ ...newStory, featured: !!checked })
                  }
                />
                <label
                  htmlFor="new-story-featured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Feature this story on the homepage
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Image Upload* (Required)</Label>
              <div className="border rounded-md p-4 bg-muted/30">
                <Input
                  type="file"
                  ref={newImageFileRef}
                  accept="image/*"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Upload an image for the story. Recommended size: 800x600px.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Audio Upload* (Required)</Label>
              <div className="border rounded-md p-4 bg-muted/30">
                <Input
                  type="file"
                  ref={newAudioFileRef}
                  accept="audio/*"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Upload an audio file for the story. Supported formats: MP3, WAV, OGG.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreatingStory(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateStory}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Story'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StorytellingManagement;
