
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, 
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { 
  Pencil, Trash2, CheckCircle, X, Search, Eye, Star, RefreshCw, FileAudio, Music
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

// Mock data for stories
const mockStories = [
  {
    id: '1',
    title: 'From Startup to Success: My Journey',
    author: 'Alex Johnson',
    category: 'Entrepreneurship',
    date: '2023-06-15',
    duration: '5:24',
    status: 'published',
    featured: true,
    views: 1256,
    audioFile: 'story_1.mp3'
  },
  {
    id: '2',
    title: 'Building My First Electric Car',
    author: 'Sarah Chen',
    category: 'Technology',
    date: '2023-06-22',
    duration: '4:48',
    status: 'published',
    featured: false,
    views: 843,
    audioFile: 'story_2.mp3'
  },
  {
    id: '3',
    title: 'Creating Sustainable Technology Solutions',
    author: 'Michael Brown',
    category: 'Sustainability',
    date: '2023-06-28',
    duration: '6:12',
    status: 'pending',
    featured: false,
    views: 0,
    audioFile: 'story_3.mp3'
  },
  {
    id: '4',
    title: 'The Future of AI in Healthcare',
    author: 'Dr. Emily Lee',
    category: 'Healthcare',
    date: '2023-07-05',
    duration: '5:50',
    status: 'pending',
    featured: false,
    views: 0,
    audioFile: 'story_4.mp3'
  },
  {
    id: '5',
    title: 'Digital Transformation in Rural India',
    author: 'Rajesh Kumar',
    category: 'Technology',
    date: '2023-08-15',
    duration: '7:10',
    status: 'published',
    featured: true,
    views: 2450,
    audioFile: 'story_5.mp3'
  },
  {
    id: '6',
    title: 'Building Green Tech Solutions in Bangalore',
    author: 'Priya Sharma',
    category: 'Sustainability',
    date: '2023-09-01',
    duration: '4:35',
    status: 'published',
    featured: false,
    views: 1872,
    audioFile: 'story_6.mp3'
  }
];

// Categories with Indian context
const categories = [
  'Technology', 'Entrepreneurship', 'Sustainability', 
  'Healthcare', 'Education', 'Lifestyle', 'Indian Startups',
  'Digital India', 'Innovation', 'Rural Development'
];

const StorytellingManagement = () => {
  const [stories, setStories] = useState(mockStories);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingStory, setEditingStory] = useState<any>(null);
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  // Filter stories based on search term and filters
  const filteredStories = stories.filter(story => {
    const matchesSearch = 
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter ? story.category === categoryFilter : true;
    const matchesStatus = statusFilter ? story.status === statusFilter : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleUpdateStory = () => {
    if (!editingStory) return;

    setStories(stories.map(story => 
      story.id === editingStory.id ? editingStory : story
    ));
    
    setEditingStory(null);
    
    toast({
      title: "Story updated",
      description: "The story has been updated successfully"
    });
  };

  const handleDeleteStory = (id: string) => {
    setStories(stories.filter(story => story.id !== id));
    
    toast({
      title: "Story deleted",
      description: "The story has been deleted successfully"
    });
  };

  const handleApproveStory = (id: string) => {
    setStories(stories.map(story => 
      story.id === id ? { ...story, status: 'published' } : story
    ));
    
    toast({
      title: "Story approved",
      description: "The story has been approved and published"
    });
  };

  const handleRejectStory = (id: string) => {
    setStories(stories.map(story => 
      story.id === id ? { ...story, status: 'rejected' } : story
    ));
    
    toast({
      title: "Story rejected",
      description: "The story has been rejected"
    });
  };

  const handleToggleFeatured = (id: string) => {
    setStories(stories.map(story => {
      if (story.id === id) {
        return { ...story, featured: !story.featured };
      }
      return story;
    }));
    
    const story = stories.find(s => s.id === id);
    toast({
      title: story?.featured ? "Removed from featured" : "Added to featured",
      description: story?.featured 
        ? "The story has been removed from featured stories" 
        : "The story has been added to featured stories"
    });
  };

  // Play/pause audio preview
  const toggleAudioPreview = (id: string) => {
    if (isPlaying === id) {
      setIsPlaying(null);
    } else {
      setIsPlaying(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Storytelling Management</h2>
        <Button variant="default">
          <FileAudio className="h-4 w-4 mr-2" />
          Add New Story
        </Button>
      </div>
      
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
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchTerm('');
            setCategoryFilter('');
            setStatusFilter('');
          }}
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
            {filteredStories.length > 0 ? (
              filteredStories.map((story) => (
                <TableRow key={story.id}>
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
                  <TableCell>{story.views.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title={isPlaying === story.id ? "Pause" : "Play Preview"}
                      onClick={() => toggleAudioPreview(story.id)}
                    >
                      <Music className={`h-4 w-4 ${isPlaying === story.id ? 'text-primary' : ''}`} />
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
                            onClick={() => handleApproveStory(story.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Reject Story"
                            onClick={() => handleRejectStory(story.id)}
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        </>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        title={story.featured ? "Remove from Featured" : "Add to Featured"}
                        onClick={() => handleToggleFeatured(story.id)}
                      >
                        <Star className={`h-4 w-4 ${story.featured ? "text-amber-500 fill-amber-500" : ""}`} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        title="View Story"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Edit Story"
                            onClick={() => setEditingStory(story)}
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
                                  onChange={(e) => setEditingStory({...editingStory, title: e.target.value})}
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-story-author">Author</Label>
                                  <Input 
                                    id="edit-story-author" 
                                    value={editingStory.author}
                                    onChange={(e) => setEditingStory({...editingStory, author: e.target.value})}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-story-category">Category</Label>
                                  <Select
                                    value={editingStory.category}
                                    onValueChange={(value) => setEditingStory({...editingStory, category: value})}
                                  >
                                    <SelectTrigger id="edit-story-category">
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {categories.map(category => (
                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-story-status">Status</Label>
                                  <Select
                                    value={editingStory.status}
                                    onValueChange={(value) => setEditingStory({...editingStory, status: value})}
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
                                      checked={editingStory.featured}
                                      onCheckedChange={(checked) => 
                                        setEditingStory({...editingStory, featured: !!checked})
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
                              
                              <div className="space-y-2">
                                <Label>Media Content</Label>
                                <div className="border rounded-md p-4 bg-muted/30">
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Current audio file: {editingStory.audioFile}
                                  </p>
                                  <audio 
                                    controls 
                                    src={`/audio/${editingStory.audioFile}`}
                                    className="w-full mb-3"
                                  />
                                  <Button variant="outline" size="sm">
                                    Replace Audio
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="edit-story-description">Description</Label>
                                <Textarea 
                                  id="edit-story-description" 
                                  placeholder="Story description or transcript"
                                  className="h-32"
                                />
                              </div>
                            </div>
                          )}
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingStory(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateStory}>
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="Delete Story"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Story</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this story? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteStory(story.id)} className="bg-destructive text-destructive-foreground">
                              Delete
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
                    {(searchTerm || categoryFilter || statusFilter) && (
                      <Button 
                        variant="link" 
                        onClick={() => {
                          setSearchTerm('');
                          setCategoryFilter('');
                          setStatusFilter('');
                        }}
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
    </div>
  );
};

export default StorytellingManagement;
