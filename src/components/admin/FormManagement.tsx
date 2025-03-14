
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Eye, Check, X, AlertCircle } from 'lucide-react';

// Mock data for article submissions
const mockArticleSubmissions = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    title: 'The Future of AI in Web Development',
    summary: 'A deep dive into how artificial intelligence is transforming the way we build websites and web applications.',
    status: 'pending',
    date: '2023-07-15T08:30:00Z'
  },
  {
    id: 2,
    name: 'Emily Johnson',
    email: 'emily.j@techblog.com',
    title: 'Optimizing React Performance: Best Practices',
    summary: 'A comprehensive guide to improving your React application performance with practical techniques and code examples.',
    status: 'approved',
    date: '2023-07-10T14:45:00Z'
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'mchen@devworld.net',
    title: 'Blockchain for Web Developers',
    summary: 'Understanding blockchain technology from a web developer\'s perspective and how to integrate it into web applications.',
    status: 'rejected',
    date: '2023-07-05T11:20:00Z'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.w@codingexperts.com',
    title: 'CSS Grid vs Flexbox: When to Use Each',
    summary: 'A comparison of CSS Grid and Flexbox with practical examples of when one layout system is preferable over the other.',
    status: 'pending',
    date: '2023-07-02T09:15:00Z'
  }
];

// Mock data for storyteller submissions
const mockStorytellerSubmissions = [
  {
    id: 1,
    name: 'David Lopez',
    email: 'david.lopez@storytech.io',
    experience: '5 years of experience in tech podcasting and storytelling about startups and innovation.',
    proposal: 'A series on tech founders and their journey from idea to successful startup.',
    status: 'pending',
    date: '2023-07-14T10:20:00Z'
  },
  {
    id: 2,
    name: 'Alexandra Kim',
    email: 'alex.kim@digitalnarratives.com',
    experience: 'Former tech journalist with 7 years of experience covering Silicon Valley.',
    proposal: 'Stories about the ethical dilemmas faced by tech companies and how they resolved them.',
    status: 'approved',
    date: '2023-07-08T16:30:00Z'
  },
  {
    id: 3,
    name: 'Robert Taylor',
    email: 'rtaylor@techmediagroup.com',
    experience: 'YouTube tech reviewer with 250K subscribers, specializing in explaining complex tech concepts.',
    proposal: 'Video storytelling format explaining emerging technologies like quantum computing and brain-computer interfaces.',
    status: 'rejected',
    date: '2023-07-06T13:45:00Z'
  }
];

const FormManagement = () => {
  const [articleSubmissions, setArticleSubmissions] = useState(mockArticleSubmissions);
  const [storytellerSubmissions, setStorytellerSubmissions] = useState(mockStorytellerSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleStatusChange = (submissionType: 'article' | 'storyteller', id: number, newStatus: 'approved' | 'rejected') => {
    if (submissionType === 'article') {
      setArticleSubmissions(
        articleSubmissions.map(submission => 
          submission.id === id ? { ...submission, status: newStatus } : submission
        )
      );
    } else {
      setStorytellerSubmissions(
        storytellerSubmissions.map(submission => 
          submission.id === id ? { ...submission, status: newStatus } : submission
        )
      );
    }
    setResponseDialogOpen(false);
    setFeedbackText('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>;
    }
  };

  const handleViewSubmission = (submission: any) => {
    setSelectedSubmission(submission);
    setViewDialogOpen(true);
  };

  const handleOpenResponseDialog = (submission: any) => {
    setSelectedSubmission(submission);
    setResponseDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Form Submissions</CardTitle>
          <CardDescription>
            Manage requests and submissions from users through the website's forms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="articles">
            <TabsList className="mb-4">
              <TabsTrigger value="articles">Article Submissions</TabsTrigger>
              <TabsTrigger value="storytellers">Guest Storyteller Requests</TabsTrigger>
            </TabsList>
            
            {/* Article Submissions Tab */}
            <TabsContent value="articles" className="space-y-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">Name</th>
                        <th className="py-3 px-4 text-left font-medium">Article Title</th>
                        <th className="py-3 px-4 text-left font-medium">Date</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articleSubmissions.map((submission) => (
                        <tr key={submission.id} className="border-b hover:bg-muted/20">
                          <td className="py-3 px-4">{submission.name}</td>
                          <td className="py-3 px-4">{submission.title}</td>
                          <td className="py-3 px-4">{formatDate(submission.date)}</td>
                          <td className="py-3 px-4">{getStatusBadge(submission.status)}</td>
                          <td className="py-3 px-4 space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleViewSubmission(submission)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            {submission.status === 'pending' && (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleOpenResponseDialog(submission)}
                                  className="h-8 w-8 p-0 text-green-500 hover:text-green-600"
                                >
                                  <Check className="h-4 w-4" />
                                  <span className="sr-only">Approve</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleOpenResponseDialog(submission)}
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Reject</span>
                                </Button>
                              </>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                window.location.href = `mailto:${submission.email}`;
                              }}
                            >
                              <Mail className="h-4 w-4" />
                              <span className="sr-only">Email</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            {/* Storyteller Submissions Tab */}
            <TabsContent value="storytellers" className="space-y-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">Name</th>
                        <th className="py-3 px-4 text-left font-medium">Proposal</th>
                        <th className="py-3 px-4 text-left font-medium">Date</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {storytellerSubmissions.map((submission) => (
                        <tr key={submission.id} className="border-b hover:bg-muted/20">
                          <td className="py-3 px-4">{submission.name}</td>
                          <td className="py-3 px-4">
                            {submission.proposal.length > 50 
                              ? `${submission.proposal.substring(0, 50)}...` 
                              : submission.proposal}
                          </td>
                          <td className="py-3 px-4">{formatDate(submission.date)}</td>
                          <td className="py-3 px-4">{getStatusBadge(submission.status)}</td>
                          <td className="py-3 px-4 space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleViewSubmission(submission)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            {submission.status === 'pending' && (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleOpenResponseDialog(submission)}
                                  className="h-8 w-8 p-0 text-green-500 hover:text-green-600"
                                >
                                  <Check className="h-4 w-4" />
                                  <span className="sr-only">Approve</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleOpenResponseDialog(submission)}
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Reject</span>
                                </Button>
                              </>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                window.location.href = `mailto:${submission.email}`;
                              }}
                            >
                              <Mail className="h-4 w-4" />
                              <span className="sr-only">Email</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Submission Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <div className="font-medium">Name:</div>
                <div>{selectedSubmission.name}</div>
                
                <div className="font-medium">Email:</div>
                <div>{selectedSubmission.email}</div>
                
                {selectedSubmission.title && (
                  <>
                    <div className="font-medium">Title:</div>
                    <div>{selectedSubmission.title}</div>
                  </>
                )}
                
                {selectedSubmission.summary && (
                  <>
                    <div className="font-medium">Summary:</div>
                    <div>{selectedSubmission.summary}</div>
                  </>
                )}
                
                {selectedSubmission.experience && (
                  <>
                    <div className="font-medium">Experience:</div>
                    <div>{selectedSubmission.experience}</div>
                  </>
                )}
                
                {selectedSubmission.proposal && (
                  <>
                    <div className="font-medium">Proposal:</div>
                    <div>{selectedSubmission.proposal}</div>
                  </>
                )}
                
                <div className="font-medium">Status:</div>
                <div>{getStatusBadge(selectedSubmission.status)}</div>
                
                <div className="font-medium">Date:</div>
                <div>{formatDate(selectedSubmission.date)}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setViewDialogOpen(false)}
            >
              Close
            </Button>
            {selectedSubmission && selectedSubmission.status === 'pending' && (
              <Button onClick={() => {
                setViewDialogOpen(false);
                handleOpenResponseDialog(selectedSubmission);
              }}>
                Respond
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Response Dialog */}
      <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Respond to Submission</DialogTitle>
            <DialogDescription>
              {selectedSubmission && `From: ${selectedSubmission.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="response">Feedback</Label>
              <Textarea
                id="response"
                placeholder="Enter your feedback or response..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="mt-1 h-32"
              />
            </div>
          </div>
          <DialogFooter className="space-x-2">
            <Button variant="outline" onClick={() => setResponseDialogOpen(false)}>
              Cancel
            </Button>
            {selectedSubmission && (
              <>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    const submissionType = selectedSubmission.title ? 'article' : 'storyteller';
                    handleStatusChange(submissionType, selectedSubmission.id, 'rejected');
                  }}
                  className="flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Reject
                </Button>
                <Button 
                  className="flex items-center gap-1"
                  onClick={() => {
                    const submissionType = selectedSubmission.title ? 'article' : 'storyteller';
                    handleStatusChange(submissionType, selectedSubmission.id, 'approved');
                  }}
                >
                  <Check className="h-4 w-4" />
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormManagement;
