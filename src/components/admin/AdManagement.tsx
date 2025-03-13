
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
  Calendar as CalendarIcon, Pencil, Trash2, 
  FileImage, Link as LinkIcon, Plus, Eye
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

// Mock data for ads
const mockAds = [
  {
    id: '1',
    name: 'Summer Sale Promotion',
    description: 'Special discounts on all electric bikes',
    placement: 'Home Page',
    type: 'Image',
    url: 'https://example.com/bike-sale',
    status: 'active',
    startDate: '2023-06-01',
    endDate: '2023-07-15',
    impressions: 12450,
    clicks: 348
  },
  {
    id: '2',
    name: 'New Tech Blog Announcement',
    description: 'Introducing our new technology blog section',
    placement: 'Articles Page Sidebar',
    type: 'Image',
    url: 'https://example.com/tech-blog',
    status: 'scheduled',
    startDate: '2023-08-01',
    endDate: '2023-09-01',
    impressions: 0,
    clicks: 0
  },
  {
    id: '3',
    name: 'Podcast Sponsorship',
    description: 'Listen to our sponsored tech podcast',
    placement: 'Storytelling Section Footer',
    type: 'Link',
    url: 'https://example.com/podcast',
    status: 'inactive',
    startDate: '2023-05-01',
    endDate: '2023-05-31',
    impressions: 8756,
    clicks: 213
  }
];

// Placement options
const placementOptions = [
  'Home Page',
  'Articles Page Sidebar',
  'Storytelling Section Footer'
];

const AdManagement = () => {
  const [ads, setAds] = useState(mockAds);
  const [editingAd, setEditingAd] = useState<any>(null);
  const [isNewAdDialogOpen, setIsNewAdDialogOpen] = useState(false);
  const [newAd, setNewAd] = useState({
    name: '',
    description: '',
    placement: '',
    type: 'Image',
    url: '',
    status: 'inactive',
    startDate: '',
    endDate: '',
    impressions: 0,
    clicks: 0
  });
  const { toast } = useToast();

  const handleCreateAd = () => {
    // Validate form
    if (!newAd.name || !newAd.placement || !newAd.url || !newAd.startDate || !newAd.endDate) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const adToAdd = {
      ...newAd,
      id: (ads.length + 1).toString()
    };

    setAds([adToAdd, ...ads]);
    setIsNewAdDialogOpen(false);
    setNewAd({
      name: '',
      description: '',
      placement: '',
      type: 'Image',
      url: '',
      status: 'inactive',
      startDate: '',
      endDate: '',
      impressions: 0,
      clicks: 0
    });

    toast({
      title: "Ad created",
      description: "Your ad has been created successfully"
    });
  };

  const handleUpdateAd = () => {
    if (!editingAd) return;

    setAds(ads.map(ad => 
      ad.id === editingAd.id ? editingAd : ad
    ));
    
    setEditingAd(null);
    
    toast({
      title: "Ad updated",
      description: "Your ad has been updated successfully"
    });
  };

  const handleDeleteAd = (id: string) => {
    setAds(ads.filter(ad => ad.id !== id));
    
    toast({
      title: "Ad deleted",
      description: "Your ad has been deleted successfully"
    });
  };

  const handleToggleAdStatus = (id: string) => {
    setAds(ads.map(ad => {
      if (ad.id === id) {
        const newStatus = ad.status === 'active' ? 'inactive' : 'active';
        return { ...ad, status: newStatus };
      }
      return ad;
    }));

    toast({
      title: "Status updated",
      description: "Ad status has been updated successfully"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ad Management</h2>
        <Dialog open={isNewAdDialogOpen} onOpenChange={setIsNewAdDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Ad
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Ad</DialogTitle>
              <DialogDescription>
                Fill in the details for your new ad. Required fields are marked with an asterisk (*).
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="ad-name">Ad Name *</Label>
                <Input 
                  id="ad-name" 
                  value={newAd.name}
                  onChange={(e) => setNewAd({...newAd, name: e.target.value})}
                  placeholder="Enter ad name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ad-description">Description</Label>
                <Textarea 
                  id="ad-description" 
                  value={newAd.description}
                  onChange={(e) => setNewAd({...newAd, description: e.target.value})}
                  placeholder="Enter ad description"
                  className="h-20"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ad-placement">Placement *</Label>
                  <Select
                    value={newAd.placement}
                    onValueChange={(value) => setNewAd({...newAd, placement: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select placement" />
                    </SelectTrigger>
                    <SelectContent>
                      {placementOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ad-type">Ad Type *</Label>
                  <Select
                    value={newAd.type}
                    onValueChange={(value) => setNewAd({...newAd, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Image">Image</SelectItem>
                      <SelectItem value="Link">Link Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ad-url">Target URL *</Label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="ad-url" 
                      value={newAd.url}
                      onChange={(e) => setNewAd({...newAd, url: e.target.value})}
                      placeholder="https://example.com"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              {newAd.type === 'Image' && (
                <div className="space-y-2">
                  <Label>Ad Image *</Label>
                  <div className="border-2 border-dashed rounded-md p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <FileImage className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">Upload Image</p>
                    <p className="text-xs text-muted-foreground mt-1">Recommended size: 1200×628px</p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ad-start-date">Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newAd.startDate ? (
                          format(new Date(newAd.startDate), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newAd.startDate ? new Date(newAd.startDate) : undefined}
                        onSelect={(date) => date && setNewAd({...newAd, startDate: date.toISOString().split('T')[0]})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ad-end-date">End Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newAd.endDate ? (
                          format(new Date(newAd.endDate), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newAd.endDate ? new Date(newAd.endDate) : undefined}
                        onSelect={(date) => date && setNewAd({...newAd, endDate: date.toISOString().split('T')[0]})}
                        initialFocus
                        disabled={(date) => {
                          if (!newAd.startDate) return false;
                          return date < new Date(newAd.startDate);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsNewAdDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateAd}>Create Ad</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Ad Name</TableHead>
              <TableHead>Placement</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ads.length > 0 ? (
              ads.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{ad.name}</div>
                    <div className="text-sm text-muted-foreground">{ad.type} Ad</div>
                  </TableCell>
                  <TableCell>{ad.placement}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>From: {ad.startDate}</div>
                      <div>To: {ad.endDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {ad.status === 'active' ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                          <span>Active</span>
                        </>
                      ) : ad.status === 'scheduled' ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-blue-500 mr-2"></div>
                          <span>Scheduled</span>
                        </>
                      ) : (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-gray-500 mr-2"></div>
                          <span>Inactive</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Impressions: {ad.impressions.toLocaleString()}</div>
                      <div>Clicks: {ad.clicks.toLocaleString()}</div>
                      {ad.impressions > 0 && (
                        <div>CTR: {((ad.clicks / ad.impressions) * 100).toFixed(2)}%</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleAdStatus(ad.id)}
                        title={ad.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      <Dialog open={!!editingAd && editingAd.id === ad.id} onOpenChange={(open) => !open && setEditingAd(null)}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingAd(ad)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Ad</DialogTitle>
                            <DialogDescription>
                              Make changes to your ad.
                            </DialogDescription>
                          </DialogHeader>
                          
                          {editingAd && (
                            <div className="grid grid-cols-1 gap-6 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-ad-name">Ad Name</Label>
                                <Input 
                                  id="edit-ad-name" 
                                  value={editingAd.name}
                                  onChange={(e) => setEditingAd({...editingAd, name: e.target.value})}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="edit-ad-description">Description</Label>
                                <Textarea 
                                  id="edit-ad-description" 
                                  value={editingAd.description}
                                  onChange={(e) => setEditingAd({...editingAd, description: e.target.value})}
                                  className="h-20"
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-ad-placement">Placement</Label>
                                  <Select
                                    value={editingAd.placement}
                                    onValueChange={(value) => setEditingAd({...editingAd, placement: value})}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {placementOptions.map(option => (
                                        <SelectItem key={option} value={option}>{option}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="edit-ad-status">Status</Label>
                                  <Select
                                    value={editingAd.status}
                                    onValueChange={(value) => setEditingAd({...editingAd, status: value})}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">Active</SelectItem>
                                      <SelectItem value="inactive">Inactive</SelectItem>
                                      <SelectItem value="scheduled">Scheduled</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="edit-ad-url">Target URL</Label>
                                <Input 
                                  id="edit-ad-url" 
                                  value={editingAd.url}
                                  onChange={(e) => setEditingAd({...editingAd, url: e.target.value})}
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-ad-start-date">Start Date</Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {editingAd.startDate ? (
                                          format(new Date(editingAd.startDate), "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={editingAd.startDate ? new Date(editingAd.startDate) : undefined}
                                        onSelect={(date) => date && setEditingAd({...editingAd, startDate: date.toISOString().split('T')[0]})}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="edit-ad-end-date">End Date</Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {editingAd.endDate ? (
                                          format(new Date(editingAd.endDate), "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={editingAd.endDate ? new Date(editingAd.endDate) : undefined}
                                        onSelect={(date) => date && setEditingAd({...editingAd, endDate: date.toISOString().split('T')[0]})}
                                        initialFocus
                                        disabled={(date) => {
                                          if (!editingAd.startDate) return false;
                                          return date < new Date(editingAd.startDate);
                                        }}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingAd(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateAd}>
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
                            <AlertDialogTitle>Delete Ad</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this ad? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteAd(ad.id)} className="bg-destructive text-destructive-foreground">
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
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <p>No ads found</p>
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

export default AdManagement;
