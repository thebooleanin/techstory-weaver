
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
  Plus, Pencil, Trash2, CheckCircle, 
  FileImage, FileAudio, FileVideo, X, Search, Tag, Eye, EyeOff
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

// Mock data for blog posts
const mockBlogPosts = [
  {
    id: '1',
    title: 'The Future of Electric Vehicles: Beyond Tesla',
    excerpt: 'Exploring the next generation of EVs and the companies leading the charge in sustainable transportation.',
    category: 'Cars',
    status: 'published',
    date: '2023-05-15',
    tags: ['electric-vehicles', 'sustainability', 'tesla']
  },
  {
    id: '2',
    title: 'Mountain Biking Revolution: Smart Bikes That Track Your Ride',
    excerpt: 'How modern technology is transforming the mountain biking experience with real-time metrics and trail navigation.',
    category: 'Bikes',
    status: 'published',
    date: '2023-06-02',
    tags: ['mountain-biking', 'smart-tech', 'fitness']
  },
  {
    id: '3',
    title: 'AI in Your Pocket: The New Generation of Smartphone Assistants',
    excerpt: 'How the latest AI advancements are creating more helpful and intuitive smartphone assistants.',
    category: 'Gadgets',
    status: 'draft',
    date: '2023-06-10',
    tags: ['artificial-intelligence', 'smartphones', 'digital-assistants']
  }
];

// Available categories
const categories = ['Cars', 'Bikes', 'Gadgets', 'Technology'];

const BlogManagement = () => {
  const [blogs, setBlogs] = useState(mockBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [isNewBlogDialogOpen, setIsNewBlogDialogOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
    tags: [] as string[]
  });
  const [tagInput, setTagInput] = useState('');
  const { toast } = useToast();

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateBlog = () => {
    // Validate form
    if (!newBlog.title || !newBlog.excerpt || !newBlog.content || !newBlog.category) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const blogToAdd = {
      ...newBlog,
      id: (blogs.length + 1).toString(),
      date: new Date().toISOString().split('T')[0]
    };

    setBlogs([blogToAdd, ...blogs]);
    setIsNewBlogDialogOpen(false);
    setNewBlog({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      status: 'draft',
      metaTitle: '',
      metaDescription: '',
      tags: []
    });

    toast({
      title: "Blog created",
      description: "Your blog post has been created successfully"
    });
  };

  const handleUpdateBlog = () => {
    if (!editingBlog) return;

    setBlogs(blogs.map(blog => 
      blog.id === editingBlog.id ? editingBlog : blog
    ));
    
    setEditingBlog(null);
    
    toast({
      title: "Blog updated",
      description: "Your blog post has been updated successfully"
    });
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
    
    toast({
      title: "Blog deleted",
      description: "Your blog post has been deleted successfully"
    });
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    if (editingBlog) {
      const newTags = [...editingBlog.tags, tagInput.trim()];
      setEditingBlog({...editingBlog, tags: newTags});
    } else {
      const newTags = [...newBlog.tags, tagInput.trim()];
      setNewBlog({...newBlog, tags: newTags});
    }
    
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    if (editingBlog) {
      const newTags = editingBlog.tags.filter((t: string) => t !== tag);
      setEditingBlog({...editingBlog, tags: newTags});
    } else {
      const newTags = newBlog.tags.filter(t => t !== tag);
      setNewBlog({...newBlog, tags: newTags});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Dialog open={isNewBlogDialogOpen} onOpenChange={setIsNewBlogDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
              <DialogDescription>
                Fill in the details for your new blog post. Required fields are marked with an asterisk (*).
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 gap-6 py-4">
              {/* Basic Info Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input 
                    id="title" 
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                    placeholder="Enter a compelling title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea 
                    id="excerpt" 
                    value={newBlog.excerpt}
                    onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})}
                    placeholder="Write a short summary (150-200 characters)"
                    className="h-20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea 
                    id="content" 
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                    placeholder="Write your blog content here"
                    className="h-40"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={newBlog.category}
                      onValueChange={(value) => setNewBlog({...newBlog, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newBlog.status}
                      onValueChange={(value) => setNewBlog({...newBlog, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Media Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Media</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Featured Image</Label>
                    <div className="border-2 border-dashed rounded-md p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                      <FileImage className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">Upload Image</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Audio</Label>
                    <div className="border-2 border-dashed rounded-md p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                      <FileAudio className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">Upload Audio</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Video</Label>
                    <div className="border-2 border-dashed rounded-md p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                      <FileVideo className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">Upload Video</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tags Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tags</h3>
                
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                  </div>
                  <Button variant="outline" onClick={handleAddTag}>
                    <Tag className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {newBlog.tags.map(tag => (
                    <div key={tag} className="bg-muted text-muted-foreground text-xs rounded-full px-3 py-1 flex items-center">
                      {tag}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-4 w-4 ml-1 p-0" 
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* SEO Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">SEO</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input 
                    id="metaTitle" 
                    value={newBlog.metaTitle}
                    onChange={(e) => setNewBlog({...newBlog, metaTitle: e.target.value})}
                    placeholder="SEO optimized title (55-60 characters)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea 
                    id="metaDescription" 
                    value={newBlog.metaDescription}
                    onChange={(e) => setNewBlog({...newBlog, metaDescription: e.target.value})}
                    placeholder="SEO optimized description (150-160 characters)"
                    className="h-20"
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsNewBlogDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateBlog}>Create Post</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search blogs..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{blog.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{blog.excerpt}</div>
                  </TableCell>
                  <TableCell>{blog.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {blog.status === 'published' ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                          <span>Published</span>
                        </>
                      ) : blog.status === 'draft' ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2"></div>
                          <span>Draft</span>
                        </>
                      ) : (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-gray-500 mr-2"></div>
                          <span>Archived</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{blog.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          blog.status === 'published'
                            ? setBlogs(blogs.map(b => b.id === blog.id ? {...b, status: 'draft'} : b))
                            : setBlogs(blogs.map(b => b.id === blog.id ? {...b, status: 'published'} : b));
                        }}
                        title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                      >
                        {blog.status === 'published' ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <Dialog open={!!editingBlog && editingBlog.id === blog.id} onOpenChange={(open) => !open && setEditingBlog(null)}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingBlog(blog)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Blog Post</DialogTitle>
                            <DialogDescription>
                              Make changes to your blog post.
                            </DialogDescription>
                          </DialogHeader>
                          
                          {editingBlog && (
                            <div className="grid grid-cols-1 gap-6 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-title">Title</Label>
                                <Input 
                                  id="edit-title" 
                                  value={editingBlog.title}
                                  onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="edit-excerpt">Excerpt</Label>
                                <Textarea 
                                  id="edit-excerpt" 
                                  value={editingBlog.excerpt}
                                  onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                                  className="h-20"
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-category">Category</Label>
                                  <Select
                                    value={editingBlog.category}
                                    onValueChange={(value) => setEditingBlog({...editingBlog, category: value})}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {categories.map(category => (
                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="edit-status">Status</Label>
                                  <Select
                                    value={editingBlog.status}
                                    onValueChange={(value) => setEditingBlog({...editingBlog, status: value})}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="draft">Draft</SelectItem>
                                      <SelectItem value="published">Published</SelectItem>
                                      <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="edit-tags">Tags</Label>
                                <div className="flex gap-2">
                                  <Input 
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="Add a tag"
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddTag();
                                      }
                                    }}
                                  />
                                  <Button variant="outline" onClick={handleAddTag}>Add</Button>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {editingBlog.tags.map((tag: string) => (
                                    <div key={tag} className="bg-muted text-muted-foreground text-xs rounded-full px-3 py-1 flex items-center">
                                      {tag}
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-4 w-4 ml-1 p-0" 
                                        onClick={() => handleRemoveTag(tag)}
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingBlog(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateBlog}>
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this blog post? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteBlog(blog.id)} className="bg-destructive text-destructive-foreground">
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
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <p>No blog posts found</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setSearchTerm('');
                      }}
                    >
                      Clear filters
                    </Button>
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

export default BlogManagement;
