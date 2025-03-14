
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for articles
const allArticles = [
  {
    id: '1',
    title: 'The Future of Electric Vehicles: Beyond Tesla',
    excerpt: 'Exploring the next generation of EVs and the companies leading the charge in sustainable transportation.',
    content: `
    <p>Electric vehicles (EVs) have come a long way since the early days of Tesla's Roadster. What was once a niche market has now become a global revolution, with nearly every major automaker committing to an electric future.</p>
    
    <h2>The Current Landscape</h2>
    <p>While Tesla remains the most recognizable name in the EV space, competitors are rapidly catching up. Companies like Rivian, Lucid, and traditional automakers such as Ford, Volkswagen, and General Motors are investing billions in electric vehicle development.</p>
    
    <p>The Ford F-150 Lightning represents a significant milestone - taking America's best-selling vehicle and offering a compelling electric version that appeals to traditional truck buyers. Meanwhile, luxury brands like Mercedes-Benz and BMW are releasing impressive electric options that combine opulence with sustainability.</p>
    
    <h2>Technological Advancements</h2>
    <p>Battery technology continues to improve, with solid-state batteries potentially on the horizon. These batteries promise greater energy density, faster charging, and improved safety compared to current lithium-ion technology.</p>
    
    <p>Charging infrastructure is expanding rapidly, with networks like Electrify America, ChargePoint, and Tesla's Supercharger network making long-distance EV travel increasingly practical. The Biden administration has committed to building 500,000 new charging stations across the United States.</p>
    
    <h2>The Road Ahead</h2>
    <p>As EVs become more mainstream, we can expect continued innovation in areas like autonomous driving, vehicle-to-grid technology, and sustainable manufacturing practices. The future of transportation is electric, and the competition is only getting started.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a56bbc8fbf7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    author: {
      name: 'Alex Morgan',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'Automotive Analyst'
    },
    category: 'Cars',
    readTime: '6 min',
    date: 'May 15, 2023',
    tags: ['Electric Vehicles', 'Tesla', 'Automotive Industry', 'Sustainability']
  },
  {
    id: '2',
    title: 'Mountain Biking Revolution: Smart Bikes That Track Your Ride',
    excerpt: 'How modern technology is transforming the mountain biking experience with real-time metrics and trail navigation.',
    content: `
    <p>Mountain biking has always been about connecting with nature and challenging yourself on rugged terrain. Now, technology is enhancing this experience without detracting from what makes the sport special.</p>
    
    <h2>Smart Bikes for Smart Riders</h2>
    <p>The latest generation of mountain bikes features integrated technology that can track your ride metrics, offer navigation assistance, and even adjust suspension settings on the fly based on terrain conditions.</p>
    
    <p>Companies like Specialized, Trek, and Santa Cruz are leading the way with bikes that incorporate sensors throughout the frame. These sensors can measure everything from speed and power output to jump height and suspension compression.</p>
    
    <h2>Trail Navigation Reimagined</h2>
    <p>GPS units specifically designed for mountain biking have become more sophisticated, with high-resolution displays that can be read in bright sunlight and glove-friendly interfaces. Apps like Trailforks and MTB Project now offer real-time trail conditions, including recent reports from other riders.</p>
    
    <p>Some systems even incorporate augmented reality, projecting navigation information directly into the rider's line of sight through smart glasses or helmet visors.</p>
    
    <h2>Community and Competition</h2>
    <p>Social platforms dedicated to mountain biking allow riders to share their experiences, compete on virtual leaderboards for specific trail segments, and discover new riding locations based on recommendations from the community.</p>
    
    <p>Whether you're a casual weekend rider or a dedicated enthusiast, the integration of technology into mountain biking opens up new possibilities for enjoying and improving your riding experience.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1606886993363-0d9f25400641?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    author: {
      name: 'Samantha Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      role: 'Mountain Bike Instructor'
    },
    category: 'Bikes',
    readTime: '4 min',
    date: 'June 2, 2023',
    tags: ['Mountain Biking', 'Smart Technology', 'Outdoor Sports', 'Trail Navigation']
  },
  {
    id: '3',
    title: 'AI in Your Pocket: The New Generation of Smartphone Assistants',
    excerpt: 'How the latest AI advancements are creating more helpful and intuitive smartphone assistants.',
    content: `
    <p>Smartphone assistants have evolved dramatically since Siri first appeared on the iPhone 4S in 2011. Today's AI assistants are far more capable, understanding context, performing complex tasks, and even anticipating your needs before you express them.</p>
    
    <h2>Beyond Voice Commands</h2>
    <p>Modern smartphone assistants no longer just respond to explicit voice commands. They can analyze your usage patterns, calendar entries, location data, and other contextual information to provide proactive assistance.</p>
    
    <p>Imagine your phone notifying you to leave earlier for a meeting because there's unexpected traffic, or suggesting a restaurant for lunch based on your preferences and current location - all without you having to ask.</p>
    
    <h2>Multimodal Understanding</h2>
    <p>The latest generation of AI assistants can understand and process multiple types of input simultaneously - text, voice, images, and even gestures. You can show your phone's camera to an object and ask questions about it, combining visual and verbal information seamlessly.</p>
    
    <p>This multimodal capability makes interactions more natural and intuitive, closer to how humans communicate with each other.</p>
    
    <h2>Personalization and Privacy</h2>
    <p>As AI assistants become more integrated into our daily lives, both personalization and privacy concerns grow. Major tech companies are addressing this by implementing on-device processing for sensitive data, giving users granular control over what information their assistant can access.</p>
    
    <p>The future of smartphone assistants will likely balance increasingly personalized experiences with robust privacy protections, ensuring these powerful tools enhance our lives without compromising our data security.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1585236904508-d9f6292e583c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    author: {
      name: 'Raj Patel',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      role: 'Tech Analyst'
    },
    category: 'Gadgets',
    readTime: '5 min',
    date: 'June 10, 2023',
    tags: ['Artificial Intelligence', 'Smartphones', 'Digital Assistants', 'Technology Trends']
  },
  {
    id: '4',
    title: 'The Evolution of Smart Home Technology in 2023',
    excerpt: 'From voice assistants to interconnected ecosystems, explore how smart home technology has matured this year.',
    content: `
    <p>The smart home of 2023 is a far cry from the disjointed collection of individual smart devices that characterized the market just a few years ago. Today's connected home offers seamless integration across devices, genuine convenience, and meaningful energy efficiency.</p>
    
    <h2>Matter Standard Changes Everything</h2>
    <p>The wide adoption of the Matter standard has been a game-changer for the smart home industry. This unified protocol allows devices from different manufacturers to communicate effortlessly, eliminating the fragmentation that previously frustrated consumers.</p>
    
    <p>With Matter-certified devices, setting up a new smart light bulb or thermostat is as simple as scanning a QR code, regardless of whether you use Apple HomeKit, Google Home, or Amazon Alexa as your primary ecosystem.</p>
    
    <h2>Energy Management Gets Smarter</h2>
    <p>Smart homes in 2023 don't just offer convenience - they actively help reduce energy consumption. Advanced learning thermostats can now coordinate with smart appliances, automated blinds, and local utility companies to optimize energy usage based on time-of-day pricing.</p>
    
    <p>Some systems can even integrate with home solar installations and battery storage, intelligently deciding when to use, store, or sell back energy to the grid based on current conditions and forecasts.</p>
    
    <h2>Ambient Computing</h2>
    <p>The concept of "ambient computing" - technology that fades into the background while proactively meeting your needs - is becoming reality in today's smart homes. Sensors embedded throughout the home can adjust lighting, temperature, and entertainment based on who's present and what they're doing, all without explicit commands.</p>
    
    <p>As smart home technology continues to evolve, the focus remains on creating systems that enhance our living spaces without demanding our attention - technology that serves us without requiring us to serve it.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1558002038-bb4237d2c793?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
      role: 'Smart Home Consultant'
    },
    category: 'Technology',
    readTime: '7 min',
    date: 'July 8, 2023',
    tags: ['Smart Home', 'IoT', 'Home Automation', 'Energy Efficiency']
  },
  {
    id: '5',
    title: 'Hydrogen Fuel Cells: The Future of Automotive Propulsion?',
    excerpt: 'A deep dive into hydrogen fuel cell technology and its potential to revolutionize the automotive industry.',
    content: `
    <p>While battery electric vehicles (BEVs) have dominated the conversation around sustainable transportation in recent years, hydrogen fuel cell vehicles (FCVs) offer a compelling alternative that addresses some of the limitations of battery-only approaches.</p>
    
    <h2>How Hydrogen Fuel Cells Work</h2>
    <p>Hydrogen fuel cells generate electricity through an electrochemical reaction between hydrogen and oxygen, with water vapor as the only emission. This electricity then powers electric motors, similar to those in battery electric vehicles.</p>
    
    <p>Unlike batteries, which store electrical energy, fuel cells convert the chemical energy in hydrogen to electricity on demand, more like a conventional engine using fuel - but without the harmful emissions.</p>
    
    <h2>Advantages Over Battery Electric Vehicles</h2>
    <p>Hydrogen fuel cell vehicles offer several potential advantages over their battery-powered counterparts. Refueling a hydrogen vehicle takes just 3-5 minutes, comparable to filling a conventional gas tank, whereas even the fastest EV charging still takes substantially longer.</p>
    
    <p>FCVs also typically offer greater range than most BEVs, particularly in larger vehicles like trucks and SUVs where battery weight becomes prohibitive. For applications requiring long range, heavy loads, or continuous operation, hydrogen may be more practical than batteries.</p>
    
    <h2>Challenges and Future Outlook</h2>
    <p>Despite these advantages, hydrogen faces significant challenges. The infrastructure for hydrogen production, distribution, and refueling is far less developed than the electrical grid. Most hydrogen is currently produced from natural gas, which creates carbon emissions (though carbon-capture technologies and green hydrogen produced via electrolysis using renewable energy are advancing).</p>
    
    <p>The coming decade will likely see battery and hydrogen technologies evolve in parallel, each finding their appropriate applications in a diversified approach to sustainable transportation.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1620280922543-3a1fad75ebb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    author: {
      name: 'Dr. James Chen',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      role: 'Automotive Engineer'
    },
    category: 'Cars',
    readTime: '8 min',
    date: 'July 22, 2023',
    tags: ['Hydrogen', 'Fuel Cells', 'Sustainable Transportation', 'Automotive Technology']
  },
  {
    id: '6',
    title: 'E-Bikes vs. Traditional Cycles: A Comprehensive Comparison',
    excerpt: 'Analyzing the pros and cons of e-bikes against traditional bicycles for different types of riders and journeys.',
    content: `
    <p>The bicycle, a remarkably efficient design that has remained fundamentally unchanged for over a century, is experiencing a renaissance thanks to electric assistance. E-bikes are attracting new riders and changing how we think about cycling for transportation and recreation.</p>
    
    <h2>What Exactly Is an E-Bike?</h2>
    <p>E-bikes combine human pedal power with electric motor assistance, typically activated either by pedaling (pedal-assist) or using a throttle. Most e-bikes fall into classes that limit their top speeds to 20-28 mph (32-45 km/h) and have removable batteries that can be recharged from a standard outlet.</p>
    
    <p>It's important to understand that e-bikes aren't motorcycles - they're bicycles with a boost that makes riding more accessible and extends what's possible on two wheels.</p>
    
    <h2>Expanding Cycling's Appeal</h2>
    <p>E-bikes have dramatically broadened cycling's appeal. Older riders, people with physical limitations, those living in hilly areas, or commuters who don't want to arrive at work sweaty are discovering that e-bikes make cycling a viable option.</p>
    
    <p>For many, the electric assist removes barriers to cycling - challenging terrain, physical limitations, distance, or simply convenience. Studies show that e-bike owners ride more frequently and for longer distances than those with traditional bikes.</p>
    
    <h2>Traditional Bikes: Simplicity and Connection</h2>
    <p>Traditional bicycles maintain their appeal through simplicity, lower cost, lighter weight, and the direct connection between rider effort and motion. Many cyclists value the physical challenge and achievement that comes from powering their journey entirely by their own effort.</p>
    
    <p>Maintenance for traditional bikes is generally simpler and less expensive, without the complexity of electrical systems and battery replacement costs.</p>
    
    <h2>Choosing What's Right for You</h2>
    <p>The choice between an e-bike and a traditional bicycle depends on individual circumstances, priorities, and intended use. Many households are finding that having both types serves different purposes - an e-bike for commuting or longer recreational rides, and a traditional bike for exercise or shorter trips.</p>
    
    <p>As technology improves and prices continue to drop, e-bikes will likely become an increasingly common sight on roads and trails worldwide, complementing rather than replacing traditional bicycles in our transportation ecosystem.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    author: {
      name: 'Lisa Tran',
      avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
      role: 'Cycling Enthusiast'
    },
    category: 'Bikes',
    readTime: '6 min',
    date: 'August 5, 2023',
    tags: ['E-Bikes', 'Cycling', 'Urban Mobility', 'Sustainable Transportation']
  },
  {
    id: '7',
    title: 'The Rise of Foldable Devices: Innovation or Gimmick?',
    excerpt: 'Examining the practical benefits and drawbacks of the latest generation of foldable smartphones and tablets.',
    content: `
    <p>Foldable devices represent one of the most significant form factor innovations in mobile technology since the original smartphone. After several generations of refinement, these devices are moving from novelty to practical options for consumers seeking versatility from their mobile devices.</p>
    
    <h2>Evolution of the Technology</h2>
    <p>Early foldable devices were plagued with durability issues - fragile screens, visible creases, and questionable longevity. Recent generations have made substantial improvements in these areas, with stronger ultra-thin glass, less noticeable creases, and hinge mechanisms tested for hundreds of thousands of folds.</p>
    
    <p>The technology has diversified, with some devices folding horizontally like a book, others vertically like a flip phone, and some even offering multiple folding sections for maximum screen area.</p>
    
    <h2>Practical Applications</h2>
    <p>The ability to carry a tablet-sized screen in a pocket-sized device offers genuine utility for many users. Multitasking becomes more practical with the larger display area, and consuming media is a more immersive experience.</p>
    
    <p>For professionals, the ability to review documents, edit spreadsheets, or analyze data on a larger screen while maintaining the portability of a smartphone represents a significant productivity advantage.</p>
    
    <h2>Remaining Challenges</h2>
    <p>Despite advances, foldable devices still face challenges. They remain more expensive than conventional smartphones with similar specifications. The folding mechanism, while improved, still represents a potential point of failure not present in traditional devices.</p>
    
    <p>Battery life can be compromised by the need to power larger screens while maintaining a compact form factor. And though more durable than early iterations, the screens remain more vulnerable to damage than standard smartphone displays.</p>
    
    <h2>Future Outlook</h2>
    <p>As manufacturing processes mature and economies of scale come into play, we can expect foldable devices to become more affordable and address many current limitations. The convergence of smartphones and tablets into a single device category seems increasingly likely as this technology continues to evolve.</p>
    
    <p>Whether foldable devices represent the future of mobile computing or will remain a premium niche depends largely on how effectively manufacturers can address the remaining practical challenges while convincing consumers of the tangible benefits these versatile devices offer.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    author: {
      name: 'Marcus Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      role: 'Mobile Technology Reviewer'
    },
    category: 'Gadgets',
    readTime: '5 min',
    date: 'August 18, 2023',
    tags: ['Foldable Phones', 'Smartphones', 'Mobile Technology', 'Product Design']
  },
  {
    id: '8',
    title: 'Quantum Computing Explained: What It Means for the Future',
    excerpt: 'Breaking down the complex principles of quantum computing and its potential impact on various industries.',
    content: `
    <p>Quantum computing represents a paradigm shift in how we process information, moving beyond the binary limitations of classical computing to harness the unique properties of quantum mechanics. While still in its early stages, quantum computing promises to revolutionize fields ranging from cryptography to drug discovery.</p>
    
    <h2>Beyond Bits: Qubits and Quantum Principles</h2>
    <p>Classical computers use bits that exist in one of two states: 0 or 1. Quantum computers use quantum bits, or qubits, which can exist in multiple states simultaneously thanks to a quantum property called superposition. This allows quantum computers to process vast amounts of possibilities at once.</p>
    
    <p>Another quantum property, entanglement, creates connections between qubits so that operations on one can affect others instantaneously, regardless of distance. These principles enable quantum computers to solve certain problems exponentially faster than classical computers.</p>
    
    <h2>Current State of the Technology</h2>
    <p>Quantum computing is transitioning from theoretical concept to practical reality. Companies like IBM, Google, Microsoft, and startups like Rigetti Computing and IonQ are developing increasingly powerful quantum processors, though we're still in what experts call the "noisy intermediate-scale quantum" (NISQ) era.</p>
    
    <p>Current quantum computers contain dozens to hundreds of qubits, but these systems are prone to errors due to quantum decoherence - the tendency of quantum systems to lose their quantum properties when interacting with the environment. Building fault-tolerant quantum computers remains a significant challenge.</p>
    
    <h2>Potential Applications</h2>
    <p>Despite current limitations, quantum computing holds tremendous promise across many fields. In cryptography, quantum computers could break currently unbreakable encryption, necessitating new quantum-resistant security methods. In pharmaceutical research, they could simulate molecular interactions to accelerate drug discovery.</p>
    
    <p>Other promising applications include optimization problems in logistics and finance, machine learning, materials science, and climate modeling. Any field that involves complex simulations or optimization of many variables could potentially benefit from quantum computing.</p>
    
    <h2>Timeline for Impact</h2>
    <p>While quantum computing has achieved "quantum supremacy" - solving problems beyond the capabilities of classical supercomputers - practical, widespread applications may still be 5-10 years away. The next milestone will be achieving quantum error correction to build fault-tolerant systems capable of sustained, reliable computation.</p>
    
    <p>The journey to quantum computing's full potential will likely be evolutionary rather than revolutionary, with specific applications emerging as the technology matures rather than an immediate disruption across all computing domains.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    author: {
      name: 'Dr. Sophia Kim',
      avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
      role: 'Quantum Physics Researcher'
    },
    category: 'Technology',
    readTime: '9 min',
    date: 'September 3, 2023',
    tags: ['Quantum Computing', 'Technology', 'Computer Science', 'Future Tech']
  },
  {
    id: '9',
    title: 'Sustainable Urban Transport: Beyond Electric Cars',
    excerpt: 'How cities are reimagining urban mobility through innovative transportation solutions beyond just electric vehicles.',
    content: `
    <p>While electric cars represent an important step toward sustainable transportation, truly transforming urban mobility requires a more comprehensive approach. Cities worldwide are implementing diverse solutions that collectively create more efficient, equitable, and environmentally friendly transportation systems.</p>
    
    <h2>Micromobility Revolution</h2>
    <p>Electric scooters, e-bikes, and other micromobility options have exploded in popularity, providing flexible, emissions-free transportation for short urban trips. When properly integrated with public transit systems, these options can solve the "last mile" problem that often drives car dependency.</p>
    
    <p>Cities are responding by building protected bike lanes, dedicated scooter parking areas, and developing regulations that balance accessibility with pedestrian safety. Some municipalities are even subsidizing e-bike purchases to encourage adoption.</p>
    
    <h2>Reimagining Public Transit</h2>
    <p>Public transportation remains the backbone of efficient urban mobility. Forward-thinking cities are electrifying bus fleets, implementing bus rapid transit (BRT) systems with dedicated lanes, and using data to optimize routes and schedules.</p>
    
    <p>On-demand microtransit - smaller vehicles that operate on flexible routes based on real-time demand - is bridging the gap between fixed-route transit and personalized service, particularly in lower-density areas where traditional bus service is less efficient.</p>
    
    <h2>Urban Planning for Reduced Travel</h2>
    <p>The "15-minute city" concept, where daily necessities are accessible within a 15-minute walk or bike ride, is gaining traction as an urban planning goal. This approach reduces the need for transportation altogether by bringing destinations closer to residents.</p>
    
    <p>Mixed-use developments, reformed zoning laws that allow commercial activities in residential areas, and pedestrianized zones all contribute to cities where sustainable transportation choices become not just possible but preferred.</p>
    
    <h2>MaaS: Mobility as a Service</h2>
    <p>Integrated digital platforms that allow users to plan, book, and pay for multiple types of mobility services are removing friction from multimodal journeys. These Mobility as a Service (MaaS) applications make it easier to combine public transit, shared mobility, and micromobility into seamless door-to-door trips.</p>
    
    <p>By making sustainable mobility options collectively more convenient than private car ownership, MaaS platforms can accelerate the shift away from the personal automobile as the default mode of urban transportation.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    author: {
      name: 'Thomas Rivera',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      role: 'Urban Mobility Planner'
    },
    category: 'Cars',
    readTime: '7 min',
    date: 'September 20, 2023',
    tags: ['Urban Planning', 'Sustainable Transportation', 'Micromobility', 'Public Transit']
  }
];

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate data loading
    setTimeout(() => {
      const selectedArticle = allArticles.find(article => article.id === id);
      setArticle(selectedArticle || null);
      
      if (selectedArticle) {
        // Get related articles from same category, excluding current article
        const related = allArticles
          .filter(a => a.category === selectedArticle.category && a.id !== id)
          .slice(0, 3);
        setRelatedArticles(related);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">Sorry, the article you're looking for doesn't exist or has been removed.</p>
        <Link to="/articles">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/articles" className="hover:text-foreground transition-colors">Articles</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{article.title}</span>
            </div>
            
            {/* Article Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="inline-block mb-4 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {article.category}
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-tight md:leading-tight mb-6">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                    <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{article.author.name}</div>
                    <div className="text-muted-foreground text-xs">{article.author.role}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} read</span>
                </div>
              </div>
            </motion.div>
            
            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-10 rounded-xl overflow-hidden aspect-video"
            >
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-lg dark:prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Tags */}
            <div className="mb-10">
              <h3 className="text-sm font-medium mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag: string) => (
                  <span 
                    key={tag}
                    className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Share */}
            <div className="flex items-center justify-between mb-16">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share Article
              </Button>
              
              <Link to="/articles">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Articles
                </Button>
              </Link>
            </div>
            
            <Separator className="mb-16" />
            
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle, index) => (
                    <Link 
                      key={relatedArticle.id} 
                      to={`/articles/${relatedArticle.id}`}
                      className="group block"
                    >
                      <div className="rounded-lg overflow-hidden mb-4 aspect-video">
                        <img 
                          src={relatedArticle.imageUrl} 
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
