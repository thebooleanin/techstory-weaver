import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Pencil,
  Trash2,
  Plus,
  RefreshCw,
  Calendar,
  Headphones,
  Clock,
  Eye,
  User,
  Bookmark,
  Tag,
} from 'lucide-react';
import { fetchStories, createStory, updateStory, deleteStory } from '@/services/api';
import { Story, StoryFormData } from '@/types/story';

const storyFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  author: z.string().min(2, { message: 'Author name is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  duration: z.string().min(1, { message: 'Duration is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  description: z.string().optional(),
  featured: z.boolean().optional(),
  image: z.instanceof(File).optional(),
  audioSrc: z.instanceof(File).optional(),
});

type StoryFormValues = z.infer<typeof storyFormSchema>;

const categoryOptions = [
  'Technology',
  'Innovation',
  'Startups',
  'AI',
  'Blockchain',
  'IoT',
  'Digital Transformation',
  'Cybersecurity',
  'FinTech',
  'EdTech',
  'HealthTech',
  'Sustainability',
];

const StorytellingManagement = () => {
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [deleteStoryId, setDeleteStoryId] = useState<string | null>(null);
  
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const config = localStorage.getItem('siteConfig');
    if (config) {
      setSiteConfig(JSON.parse(config));
    }
  }, []);
  
  const apiUrl = siteConfig?.apiEndpoints?.stories || 'http://localhost:5000/api/stories';
  
  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      title: '',
      author: '',
      category: '',
      duration: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      featured: false,
    },
  });
  
  const { data: stories = [], isLoading, error, refetch } = useQuery({
    queryKey: ['stories'],
    queryFn: () => fetchStories(apiUrl),
    enabled: !!apiUrl,
  });
  
  const createMutation = useMutation({
    mutationFn: (data: StoryFormData) => createStory(data, apiUrl),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Story created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create story: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: StoryFormData }) => 
      updateStory(id, data, apiUrl),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Story updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      setEditingStory(null);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update story: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteStory(id, apiUrl),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Story deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      setDeleteStoryId(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete story: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (values: StoryFormValues) => {
    const formData: StoryFormData = {
      title: values.title,
      author: values.author,
      category: values.category,
      duration: values.duration,
      date: values.date,
      description: values.description,
      featured: values.featured,
      image: values.image,
      audioSrc: values.audioSrc
    };
    
    if (editingStory) {
      updateMutation.mutate({ id: editingStory._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };
  
  useEffect(() => {
    if (editingStory) {
      form.reset({
        title: editingStory.title,
        author: editingStory.author,
        category: editingStory.category,
        duration: editingStory.duration,
        date: editingStory.date,
        description: editingStory.description || '',
        featured: editingStory.featured || false,
      });
    }
  }, [editingStory, form]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'audioSrc') => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue(field, file);
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };
  
  const handleCancelEdit = () => {
    setEditingStory(null);
    form.reset();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Storytelling Management</h2>
          <p className="text-muted-foreground">Manage 5-minute audio stories from across India.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => refetch()}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      <Tabs defaultValue="stories" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stories">All Stories</TabsTrigger>
          <TabsTrigger value="create">{editingStory ? 'Edit Story' : 'Create New Story'}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stories Library</CardTitle>
              <CardDescription>
                Manage your tech storytelling content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : error ? (
                <div className="p-8 text-center text-destructive">
                  <p>Error loading stories. Please try again.</p>
                </div>
              ) : stories.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="mb-4">No stories found.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      const createTab = document.querySelector('[data-state="inactive"][value="create"]');
                      if (createTab instanceof HTMLElement) {
                        createTab.click();
                      }
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create your first story
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stories.map((story) => (
                        <TableRow key={story._id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                              {story.featured && (
                                <Bookmark className="h-3 w-3 text-amber-500" />
                              )}
                              <span className="truncate max-w-[200px]">{story.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="truncate max-w-[100px]">
                              {story.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{story.author}</TableCell>
                          <TableCell>{story.duration}</TableCell>
                          <TableCell>{formatDate(story.date)}</TableCell>
                          <TableCell>
                            <Badge className={
                              story.status === 'published' ? 'bg-green-500' :
                              story.status === 'pending' ? 'bg-amber-500' :
                              story.status === 'rejected' ? 'bg-red-500' : 
                              'bg-slate-500'
                            }>
                              {story.status || 'published'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditingStory(story)}
                              >
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:text-destructive/90"
                                    onClick={() => setDeleteStoryId(story._id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{story.title}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setDeleteStoryId(null)}>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => deleteMutation.mutate(story._id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{editingStory ? 'Edit Story' : 'Create New Story'}</CardTitle>
              <CardDescription>
                {editingStory ? 'Update the details of an existing story.' : 'Add a new 5-minute tech story.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Story Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter story title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author</FormLabel>
                          <FormControl>
                            <Input placeholder="Author name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categoryOptions.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 5:30" {...field} />
                          </FormControl>
                          <FormDescription>Format: minutes:seconds</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Publication Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Featured Story</FormLabel>
                            <FormDescription>
                              Display this story prominently on the homepage
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a brief description of the story"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <FormLabel htmlFor="image">Story Image</FormLabel>
                      <div className="mt-2">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'image')}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Upload a cover image for the story (JPG, PNG, max 5MB)
                      </p>
                    </div>
                    
                    <div>
                      <FormLabel htmlFor="audioSrc">Audio File</FormLabel>
                      <div className="mt-2">
                        <Input
                          id="audioSrc"
                          type="file"
                          accept="audio/*"
                          onChange={(e) => handleFileChange(e, 'audioSrc')}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Upload the audio recording (MP3, max 15MB)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    {editingStory && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      type="submit"
                      disabled={createMutation.isPending || updateMutation.isPending}
                    >
                      {(createMutation.isPending || updateMutation.isPending) && (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      )}
                      {editingStory ? 'Update Story' : 'Create Story'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StorytellingManagement;
