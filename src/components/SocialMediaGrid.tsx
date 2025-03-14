
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, Filter, MessageCircle, Heart, Share2 } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface SocialPost {
  id: string;
  type: 'instagram' | 'youtube' | 'twitter';
  imageUrl: string;
  videoUrl?: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  caption: string;
  likes: number;
  comments: number;
  date: string;
}

// Mock data for social media posts
const socialPosts: SocialPost[] = [
  {
    id: '1',
    type: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    author: {
      name: 'Classic Cars',
      handle: 'classiccars',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    caption: 'Throwback to this beautiful vintage Mustang at our last car show. What a masterpiece! #ClassicCars #Mustang #CarShow',
    likes: 1452,
    comments: 48,
    date: '2 days ago'
  },
  {
    id: '2',
    type: 'youtube',
    imageUrl: 'https://images.unsplash.com/photo-1534093607318-f025413f49cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    author: {
      name: 'Mountain Trails',
      handle: 'mountaintrails',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    caption: 'Testing the new Trek Fuel EX 9.8 on some epic mountain trails! Full review coming soon. #MountainBiking #BikeReview #Trek',
    likes: 3287,
    comments: 156,
    date: '1 week ago'
  },
  {
    id: '3',
    type: 'twitter',
    imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    author: {
      name: 'Tech Insider',
      handle: 'techinsider',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    caption: "Just got my hands on the latest smartphone with AI capabilities. The future is here, and it's both exciting and a little scary! Thread 🧵 #TechNews #AI #NewGadgets",
    likes: 952,
    comments: 87,
    date: '3 days ago'
  },
  {
    id: '4',
    type: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1559037693-f731bd6991a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    author: {
      name: 'Smart Home Guide',
      handle: 'smarthomeguide',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
    },
    caption: 'My living room setup is complete! Voice-controlled lighting, automated blinds, and smart thermostat all working in perfect harmony. #SmartHome #HomeAutomation #IoT',
    likes: 2105,
    comments: 93,
    date: '5 days ago'
  },
  {
    id: '5',
    type: 'youtube',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    author: {
      name: 'EV Daily',
      handle: 'evdaily',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg'
    },
    caption: "We took the new hydrogen fuel cell vehicle for a test drive and here's our honest review. Range, refueling, and driving experience - we cover it all! #HydrogenCars #FuelCell #GreenTransport",
    likes: 1823,
    comments: 142,
    date: '2 weeks ago'
  },
  {
    id: '6',
    type: 'twitter',
    imageUrl: 'https://images.unsplash.com/photo-1560440021-33f9b867899d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    author: {
      name: 'Cycle Community',
      handle: 'cyclecommunity',
      avatar: 'https://randomuser.me/api/portraits/women/62.jpg'
    },
    caption: "E-bikes have revolutionized my commute! 10 miles each way used to feel impossible, now it's the highlight of my day. Anyone else switched to an e-bike for commuting? #EBikes #BikeCommuting #SustainableTransport",
    likes: 765,
    comments: 43,
    date: '1 day ago'
  },
  {
    id: '7',
    type: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1533310266094-8898a03807dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    author: {
      name: 'Mobile Tech',
      handle: 'mobiletech',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    caption: 'The fold is barely visible in real-world use! This new foldable phone has completely changed my mind about the technology. #FoldablePhones #TechReview #Innovation',
    likes: 1203,
    comments: 67,
    date: '4 days ago'
  },
  {
    id: '8',
    type: 'youtube',
    imageUrl: 'https://images.unsplash.com/photo-1582102678480-0c3ce9233066?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    author: {
      name: 'Quantum Computing',
      handle: 'quantumcomputing',
      avatar: 'https://randomuser.me/api/portraits/women/72.jpg'
    },
    caption: 'Explaining quantum computing in 5 minutes! No physics degree required 😄 #QuantumComputing #Science #Technology',
    likes: 4521,
    comments: 231,
    date: '3 weeks ago'
  },
  {
    id: '9',
    type: 'twitter',
    imageUrl: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
    author: {
      name: 'Urban Transport',
      handle: 'urbantransport',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
    },
    caption: 'Just explored a "15-minute city" neighborhood in Barcelona. Everything you need within a short walk or bike ride. This is the future of sustainable urban planning! #UrbanPlanning #15MinuteCity #SustainableCities',
    likes: 1865,
    comments: 103,
    date: '6 days ago'
  }
];

const SocialMediaGrid = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  
  const filteredPosts = activeTab === 'all'
    ? socialPosts
    : socialPosts.filter(post => post.type === activeTab);
  
  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  const getTypeName = (type: string) => {
    switch (type) {
      case 'instagram':
        return 'Instagram';
      case 'youtube':
        return 'YouTube';
      case 'twitter':
        return 'Twitter';
      default:
        return '';
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center gap-1">
              <Instagram className="h-4 w-4" />
              Instagram
            </TabsTrigger>
            <TabsTrigger value="youtube" className="flex items-center gap-1">
              <Youtube className="h-4 w-4" />
              YouTube
            </TabsTrigger>
            <TabsTrigger value="twitter" className="flex items-center gap-1">
              <Twitter className="h-4 w-4" />
              Twitter
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <SocialMediaCard 
                key={post.id} 
                post={post} 
                index={index} 
                onSelect={() => setSelectedPost(post)} 
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="instagram" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <SocialMediaCard 
                key={post.id} 
                post={post} 
                index={index} 
                onSelect={() => setSelectedPost(post)} 
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="youtube" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <SocialMediaCard 
                key={post.id} 
                post={post} 
                index={index} 
                onSelect={() => setSelectedPost(post)} 
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="twitter" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <SocialMediaCard 
                key={post.id} 
                post={post} 
                index={index} 
                onSelect={() => setSelectedPost(post)} 
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Post Detail Dialog */}
      {selectedPost && (
        <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
            <div className="relative">
              {selectedPost.type === 'youtube' && selectedPost.videoUrl ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={selectedPost.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img 
                  src={selectedPost.imageUrl} 
                  alt={selectedPost.caption} 
                  className="w-full object-cover aspect-square sm:aspect-video"
                />
              )}
              
              <div className="absolute top-3 left-3 bg-black/60 text-white rounded-full p-1.5">
                {getSocialIcon(selectedPost.type)}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{selectedPost.author.name}</p>
                  <p className="text-sm text-muted-foreground">@{selectedPost.author.handle}</p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                  {selectedPost.date}
                </div>
              </div>
              
              <p className="text-sm mb-6">{selectedPost.caption}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Heart className="h-4 w-4" />
                    <span>{selectedPost.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <MessageCircle className="h-4 w-4" />
                    <span>{selectedPost.comments.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

interface SocialMediaCardProps {
  post: SocialPost;
  index: number;
  onSelect: () => void;
}

const SocialMediaCard = ({ post, index, onSelect }: SocialMediaCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-lg overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <DialogTrigger asChild onClick={onSelect}>
        <div className="cursor-pointer">
          <div className="relative aspect-square">
            <img 
              src={post.imageUrl} 
              alt={post.caption} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-black/60 text-white rounded-full p-1.5">
              {post.type === 'instagram' && <Instagram className="h-4 w-4" />}
              {post.type === 'youtube' && <Youtube className="h-4 w-4" />}
              {post.type === 'twitter' && <Twitter className="h-4 w-4" />}
            </div>
            {post.type === 'youtube' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-black/60 p-3 opacity-80 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-sm">
                <p className="font-medium leading-tight">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">@{post.author.handle}</p>
              </div>
              <div className="ml-auto text-xs text-muted-foreground">
                {post.date}
              </div>
            </div>
            
            <p className="text-sm mb-3 line-clamp-2">{post.caption}</p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5" />
                  <span>{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>{post.comments.toLocaleString()}</span>
                </div>
              </div>
              
              <span className="text-xs font-medium">{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</span>
            </div>
          </div>
        </div>
      </DialogTrigger>
    </motion.div>
  );
};

export default SocialMediaGrid;
