import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  Newspaper, Clock, Calendar, ChevronRight, Share2, 
  Bookmark, ArrowRight, ArrowLeft, Facebook, Twitter,
  Film, Flag, Code, Car
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
}

// Dummy articles data
const dummyArticles: Article[] = [
  {
    _id: "1",
    title: "Tech Giants Announce Revolutionary AI Partnership",
    excerpt: "Major technology companies join forces to establish new standards for artificial intelligence development.",
    content: "<p>In a surprising move that has sent ripples through Silicon Valley, five of the world's largest technology companies announced yesterday that they would be forming an unprecedented alliance focused on artificial intelligence research and development.</p><p>The coalition, which includes industry leaders from both the United States and Asia, aims to establish new ethical standards for AI while accelerating breakthroughs in machine learning, natural language processing, and computer vision.</p><p>\"This is about ensuring that artificial intelligence develops in a way that benefits humanity as a whole,\" said the CEO of one participating company during the joint press conference. \"By pooling our resources and expertise, we can make greater strides while implementing safeguards that might be overlooked in a more competitive environment.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3",
    category: "Technology",
    readTime: "4 min read",
    date: "2023-10-17T14:23:00Z",
    author: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "Technology Correspondent"
    },
    tags: ["AI", "Technology", "Silicon Valley"]
  },
  {
    _id: "2",
    title: "Global Climate Summit Reaches Historic Agreement",
    excerpt: "After tense negotiations, world leaders have committed to ambitious new carbon reduction targets.",
    content: "<p>Following two weeks of intense negotiations, the Global Climate Summit concluded yesterday with 196 countries signing what experts are calling the most significant environmental accord since the Paris Agreement.</p><p>The new treaty, named the Stockholm Protocol, commits signatories to reducing carbon emissions by 60% before 2040 and establishes a $100 billion annual fund to assist developing nations in transitioning to renewable energy sources.</p><p>\"This is a watershed moment in our fight against climate change,\" said the UN Secretary-General. \"For the first time, we have concrete commitments with robust verification mechanisms and meaningful consequences for non-compliance.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-4.0.3",
    category: "Environment",
    readTime: "5 min read",
    date: "2023-10-16T09:15:00Z",
    author: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      role: "Environmental Reporter"
    },
    tags: ["Climate Change", "Global Politics", "Environment"]
  },
  {
    _id: "3",
    title: "Market Analysis: Economic Indicators Point to Surprising Q4 Growth",
    excerpt: "Despite earlier predictions of a slowdown, key economic metrics suggest robust expansion ahead.",
    content: "<p>Contrary to widespread expectations of an economic cooldown, the latest batch of economic indicators released this week point to accelerating growth for the final quarter of the year.</p><p>The Composite Leading Indicator (CLI), which aggregates data from multiple economic sectors, rose by 0.8% in September, marking its strongest monthly gain since early 2021. Meanwhile, retail sales increased by 1.2% month-over-month, significantly outpacing the projected 0.4% rise.</p><p>\"The data suggests remarkable resilience in consumer spending despite persistent inflation,\" noted Dr. Eleanor Simmons, chief economist at Capital Research. \"This, combined with improvements in manufacturing output and a tight labor market, indicates that the economy is on much firmer footing than many analysts believed.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3",
    category: "Business",
    readTime: "6 min read",
    date: "2023-10-16T11:30:00Z",
    author: {
      name: "Robert Williamson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Financial Analyst"
    },
    tags: ["Economy", "Markets", "Finance"]
  },
  {
    _id: "4",
    title: "Revolutionary Cancer Treatment Shows Promising Results in Clinical Trials",
    excerpt: "New immunotherapy approach demonstrates unprecedented efficacy against advanced-stage pancreatic cancer.",
    content: "<p>A groundbreaking cancer therapy developed by researchers at the National Medical Research Center has shown remarkable results in treating one of the most aggressive forms of cancer.</p><p>The phase II clinical trial, involving 120 patients with stage IV pancreatic cancer, reported a 47% objective response rate—more than triple the effectiveness of current standard treatments. Even more encouragingly, 23% of participants experienced complete remission, an outcome previously almost unheard of for advanced pancreatic cancer.</p><p>\"These results represent a potential paradigm shift in how we approach pancreatic cancer treatment,\" said Dr. James Harrington, the study's principal investigator. \"The dual-targeting immunotherapy essentially reconfigures the patient's immune system to recognize and attack cancer cells that have previously been adept at evading immune detection.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3",
    category: "Health",
    readTime: "7 min read",
    date: "2023-10-15T16:45:00Z",
    author: {
      name: "Dr. Lisa Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      role: "Medical Science Correspondent"
    },
    tags: ["Medicine", "Cancer Research", "Healthcare"]
  },
  {
    _id: "5",
    title: "Landmark Supreme Court Ruling Redefines Digital Privacy Standards",
    excerpt: "In a 7-2 decision, the Court established new guidelines for government access to personal data.",
    content: "<p>In what legal experts are calling the most significant privacy ruling of the digital age, the Supreme Court yesterday established sweeping new protections for personal data stored by third-party services.</p><p>The case, United States v. Carpenter, centered on whether law enforcement agencies need a warrant to access location data, browsing histories, and other digital footprints held by technology companies. Writing for the majority, the Chief Justice declared that the \"third-party doctrine\" established in the analog era does not automatically extend to the vast quantities of sensitive information generated by modern digital services.</p><p>\"This ruling recognizes that smartphones and cloud services have fundamentally changed what privacy means in the 21st century,\" said constitutional scholar Professor Caroline Wu. \"It effectively establishes a new framework where the mere act of using essential digital services doesn't forfeit one's reasonable expectation of privacy.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3",
    category: "Law",
    readTime: "8 min read",
    date: "2023-10-15T13:20:00Z",
    author: {
      name: "Thomas Blackwell",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      role: "Legal Affairs Editor"
    },
    tags: ["Supreme Court", "Privacy", "Digital Rights"]
  },
  {
    _id: "6",
    title: "Archaeologists Uncover 'Lost City' in Remote Amazon Region",
    excerpt: "Sophisticated urban center challenges previous understanding of pre-Columbian civilizations.",
    content: "<p>An international team of archaeologists has announced the discovery of an extensive urban complex in a previously unexplored region of the Amazon rainforest, fundamentally altering our understanding of pre-Columbian civilization in South America.</p><p>The settlement, estimated to have been home to at least 40,000 people at its peak around 800 CE, features sophisticated hydraulic systems, large ceremonial structures, and geometric earthworks spanning over 30 square kilometers.</p><p>\"What's remarkable about this discovery is not just its scale, but its urban planning,\" said Dr. Maria Gonzalez, the expedition's lead archaeologist. \"The hydraulic engineering alone—with canals, reservoirs, and flood control systems—demonstrates a level of technological sophistication that rivals ancient Mesopotamian cities.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?ixlib=rb-4.0.3",
    category: "Archaeology",
    readTime: "5 min read",
    date: "2023-10-14T10:05:00Z",
    author: {
      name: "Dr. Francisco Silva",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      role: "Science Correspondent"
    },
    tags: ["Archaeology", "History", "Amazon"]
  },
  {
    _id: "7",
    title: "Major Breakthrough in Quantum Computing Announced",
    excerpt: "Scientists achieve quantum supremacy with new 1,000-qubit processor.",
    content: "<p>Researchers at the Quantum Computing Institute have achieved what many considered impossible this decade: a stable quantum computer with 1,000 qubits that maintained coherence long enough to solve complex problems beyond the capabilities of classical supercomputers.</p><p>The new system, named Quantum Matrix 1000, successfully factored a 2048-bit RSA key in just under 17 minutes—a task that would take the world's most powerful classical supercomputer approximately 300 trillion years to complete.</p><p>\"This definitively establishes quantum supremacy in a practical, rather than theoretical, application,\" said Dr. Robert Yang, director of the institute. \"We've crossed a threshold where quantum computers can now solve real-world problems that are effectively impossible for classical systems.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3",
    category: "Technology",
    readTime: "6 min read",
    date: "2023-10-14T08:30:00Z",
    author: {
      name: "Dr. Sophia Werner",
      avatar: "https://randomuser.me/api/portraits/women/54.jpg",
      role: "Quantum Physics Specialist"
    },
    tags: ["Quantum Computing", "Technology", "Physics"]
  },
  {
    _id: "8",
    title: "Global Education Report Highlights Widening Digital Divide",
    excerpt: "UNESCO study reveals concerning disparities in educational technology access post-pandemic.",
    content: "<p>A comprehensive UNESCO report released today has documented alarming inequalities in educational technology access, with potentially far-reaching consequences for global development goals.</p><p>The study, which analyzed data from 196 countries, found that while high-income nations saw educational technology integration accelerate during the pandemic, nearly 470 million students in low-income countries remain without basic internet access for learning—a 6% increase from pre-pandemic levels.</p><p>\"The digital revolution in education is creating a two-track system of educational opportunity,\" warned UNESCO Director-General Audrey Azoulay. \"Without decisive intervention, we risk a generation of students being left permanently behind.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3",
    category: "Education",
    readTime: "4 min read",
    date: "2023-10-13T15:15:00Z",
    author: {
      name: "Emma Okonjo",
      avatar: "https://randomuser.me/api/portraits/women/76.jpg",
      role: "Education Policy Analyst"
    },
    tags: ["Education", "Digital Divide", "UNESCO"]
  },
  {
    _id: "9",
    title: "Space Tourism Company Announces First Lunar Orbit Package",
    excerpt: "Private space venture unveils plans for civilian lunar trips beginning 2026.",
    content: "<p>In a development that would have seemed like science fiction just a decade ago, Celestial Journeys has unveiled plans to take private citizens on trips around the Moon starting in 2026.</p><p>The company's \"Lunar Voyager\" program will utilize its next-generation spacecraft to carry up to six passengers on a six-day journey, including a close lunar orbit with spectacular views of both the Moon's surface and Earth from space.</p><p>\"This represents the dawn of a new era in human space exploration,\" said Celestial Journeys founder and CEO Alexandra Martinez. \"For the first time in history, experiencing cislunar space will not be limited to government astronauts but open to anyone with the desire and means to go.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3",
    category: "Space",
    readTime: "5 min read",
    date: "2023-10-13T09:40:00Z",
    author: {
      name: "Jonathan Kim",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      role: "Aerospace Correspondent"
    },
    tags: ["Space", "Tourism", "Technology"]
  },
  {
    _id: "10",
    title: "Renowned Artist's Lost Masterpiece Discovered in Attic",
    excerpt: "Painting valued at over $25 million was hidden in plain sight for decades.",
    content: "<p>An art authentication committee has confirmed that a painting discovered in the attic of a French countryside home is indeed the long-lost masterpiece \"Woman by the Window\" by impressionist painter Claude Monet, missing since 1939.</p><p>The artwork, last documented in a private collection in Paris before World War II, apparently changed hands several times during the war before ending up with a family who had no idea of its significance or value.</p><p>\"The family simply thought it was a pleasant landscape by an unknown artist,\" explained Michel Dubois of the Louvre Authentication Department. \"It had been hanging in their attic stairwell for at least 50 years. The current owner inherited the house from his grandmother and decided to have some old paintings appraised during a renovation.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?ixlib=rb-4.0.3",
    category: "Art",
    readTime: "4 min read",
    date: "2023-10-12T14:55:00Z",
    author: {
      name: "Isabella Rossi",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      role: "Arts & Culture Editor"
    },
    tags: ["Art", "History", "Discovery"]
  },
  {
    _id: "11",
    title: "Study Finds Surprising Link Between Gut Bacteria and Brain Function",
    excerpt: "Research reveals intestinal microbiome may influence cognitive abilities and mental health.",
    content: "<p>A groundbreaking study published in the journal Nature Neuroscience has established compelling evidence of a direct connection between specific gut bacteria and brain function, potentially revolutionizing our approach to cognitive and mental health disorders.</p><p>The research, conducted across seven international universities, found that certain bacterial strains produce compounds that can cross the blood-brain barrier and influence neural activity in regions associated with memory, focus, and emotional regulation.</p><p>\"We've suspected a gut-brain connection for years, but this study provides the most concrete evidence yet of specific metabolic pathways,\" explained Dr. Hiroshi Tanaka, the study's lead author. \"What's particularly exciting is that these bacterial populations can be modified through dietary interventions, suggesting new therapeutic approaches for conditions ranging from ADHD to depression.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1559757175-7cb056fba93d?ixlib=rb-4.0.3",
    category: "Health",
    readTime: "7 min read",
    date: "2023-10-12T11:25:00Z",
    author: {
      name: "Dr. Marcus Reid",
      avatar: "https://randomuser.me/api/portraits/men/81.jpg",
      role: "Health Science Reporter"
    },
    tags: ["Medical Research", "Neuroscience", "Health"]
  },
  {
    _id: "12",
    title: "Global Shipping Disrupted by Major Cyber Attack",
    excerpt: "Ransomware incident has paralyzed operations at world's largest shipping container company.",
    content: "<p>A sophisticated ransomware attack has crippled the operations of Maritime Global Logistics, the world's largest shipping container company, bringing international trade to a partial standstill and threatening global supply chains.</p><p>The attack, which began late Tuesday night, has disabled the company's central booking system, container tracking capabilities, and automated port management systems. As of this morning, 73 major ports across 36 countries have reported significant operational disruptions.</p><p>\"This is potentially the most disruptive cyber attack on global trade we've ever seen,\" said Cybersecurity expert Rebecca Torres. \"With nearly 20% of the world's shipping containers handled by MGL, the ripple effects will impact everything from consumer electronics to food supplies if the situation isn't resolved quickly.\"</p>",
    imageUrl: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3",
    category: "Cybersecurity",
    readTime: "5 min read",
    date: "2023-10-11T16:10:00Z",
    author: {
      name: "Alan Mehta",
      avatar: "https://randomuser.me/api/portraits/men/19.jpg",
      role: "Technology & Security Correspondent"
    },
    tags: ["Cybersecurity", "Global Trade", "Technology"]
  },
  {
    _id: "13",
    title: "Bollywood Megastar Announces Retirement After 40-Year Career",
    excerpt: "Iconic actor reveals plans to step away from the silver screen following upcoming film release.",
    content: "<p>One of Bollywood's most enduring and beloved stars shocked fans and industry insiders alike yesterday by announcing his retirement from acting after an illustrious four-decade career that transformed Indian cinema.</p><p>The 67-year-old actor, who has appeared in over 100 films and won numerous national awards, revealed his decision at a press conference following the completion of filming on what will now be his final project, \"The Last Scene.\"</p><p>\"After 40 years of living other people's lives on screen, I feel it's time to fully live my own,\" the emotional star told reporters. \"Cinema has given me everything—fame, fortune, and most importantly, the love of millions. But there comes a moment when one must step away, and for me, that time has arrived.\"</p><p>Industry colleagues expressed both surprise and understanding, with many acknowledging the actor's unparalleled contribution to Indian cinema. The actor's final film, directed by an acclaimed filmmaker, is scheduled for release later this year and is already being described as a fitting capstone to an extraordinary career.</p>",
    imageUrl: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3",
    category: "Bollywood",
    readTime: "5 min read",
    date: "2023-10-11T08:15:00Z",
    author: {
      name: "Priya Sharma",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      role: "Entertainment Editor"
    },
    tags: ["Bollywood", "Cinema", "Entertainment"]
  },
  {
    _id: "14",
    title: "Hollywood Studio Unveils Revolutionary Virtual Production Technology",
    excerpt: "New filmmaking approach combines real-time rendering with traditional production methods.",
    content: "<p>A major Hollywood studio has revealed a groundbreaking virtual production system that industry experts say could fundamentally transform how films are made in the coming decade.</p><p>The technology, developed over five years at a reported cost of $200 million, allows filmmakers to shoot actors against reactive digital backgrounds that render in real-time, eliminating the need for traditional green screens and post-production compositing for many sequences.</p><p>\"This represents perhaps the most significant shift in production methodology since the transition from film to digital,\" said the studio's head of technology innovation. \"Directors can now see their complete scenes, including complex visual effects elements, directly through the camera viewfinder while shooting.\"</p><p>The system, which combines high-resolution LED walls, motion capture technology, and custom game-engine modifications, has already been used on the studio's upcoming sci-fi blockbuster. The technology dramatically reduces post-production time and costs while giving actors the ability to respond to virtual environments they can actually see during filming.</p>",
    imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3",
    category: "Hollywood",
    readTime: "6 min read",
    date: "2023-10-10T16:40:00Z",
    author: {
      name: "David Anderson",
      avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      role: "Technology in Film Correspondent"
    },
    tags: ["Hollywood", "Technology", "Filmmaking"]
  },
  {
    _id: "15",
    title: "Key Legislation on Data Privacy Passes with Bipartisan Support",
    excerpt: "Comprehensive bill establishes new frameworks for personal data protection across digital platforms.",
    content: "<p>In a rare display of cross-party cooperation, Congress yesterday passed the Digital Rights and Privacy Act (DRPA), the most extensive data protection legislation in the nation's history.</p><p>The bill, which passed with a comfortable majority in both chambers, establishes new legal frameworks governing how companies can collect, store, and monetize personal data, while creating a new enforcement division within the Federal Trade Commission.</p><p>\"This legislation recognizes that personal data is personal property,\" said the bill's co-sponsor. \"For too long, Americans' private information has been treated as a free resource to be harvested without meaningful consent or compensation.\"</p><p>Key provisions of the act include mandatory plain-language privacy policies, the right for consumers to request complete deletion of their data, strict limits on data sharing with third parties, and potential fines of up to 4% of global revenue for serious violations.</p><p>Technology industry representatives expressed mixed reactions, with some larger platforms welcoming the regulatory clarity while smaller companies voiced concerns about compliance costs. The legislation will take effect in 18 months, giving companies time to adapt their practices to the new requirements.</p>",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3",
    category: "Politics",
    readTime: "7 min read",
    date: "2023-10-10T14:20:00Z",
    author: {
      name: "Jennifer Wilson",
      avatar: "https://randomuser.me/api/portraits/women/62.jpg",
      role: "Political Correspondent"
    },
    tags: ["Politics", "Data Privacy", "Legislation"]
  },
  {
    _id: "16",
    title: "Revolutionary New Electric Car Achieves 1,000-Mile Range on Single Charge",
    excerpt: "Startup's prototype vehicle shatters previous records with breakthrough battery technology.",
    content: "<p>A California-based automotive startup unveiled a prototype electric vehicle yesterday that achieved over 1,000 miles of driving range on a single charge during certified testing, more than doubling the capacity of the current market leaders.</p><p>The vehicle, named \"Horizon,\" utilizes a proprietary solid-state battery technology that represents what many industry analysts are calling the holy grail of electric vehicle development. Unlike conventional lithium-ion batteries, the new cells offer significantly higher energy density while reducing charging time to just 15 minutes for an 80% charge.</p><p>\"This isn't an incremental improvement—it's a generational leap forward,\" said the company's founder and CEO during the demonstration event. \"Range anxiety has consistently been cited as the primary barrier to widespread EV adoption. With this technology, that concern becomes obsolete.\"</p><p>Beyond the revolutionary range, the prototype features a sleek, aerodynamic design that achieves a drag coefficient of just 0.15, the lowest of any production vehicle. The company plans to begin limited production within 18 months, with an initial price point of approximately $85,000 before gradually introducing more affordable models as manufacturing scales up.</p>",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba13938c3?ixlib=rb-4.0.3",
    category: "Car and Bike",
    readTime: "6 min read",
    date: "2023-10-09T15:10:00Z",
    author: {
      name: "Michael Zhang",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
      role: "Automotive Technology Reporter"
    },
    tags: ["Electric Vehicles", "Technology", "Automotive"]
  },
  {
    _id: "17",
    title: "Next-Generation Processing Chip Shatters Performance Benchmarks",
    excerpt: "New semiconductor design achieves unprecedented speeds while reducing power consumption.",
    content: "<p>A leading semiconductor manufacturer has unveiled its next-generation processing architecture, achieving performance metrics that experts are calling \"revolutionary\" across standard industry benchmarks.</p><p>The new chip, built on an innovative 2-nanometer process, delivers up to 80% better performance than its predecessor while consuming 50% less power—specifications that dramatically exceed industry projections for this technology generation.</p><p>\"We've essentially managed to extend Moore's Law for at least another cycle,\" noted the company's chief technology officer, referring to the observation that transistor density approximately doubles every two years. \"By reimagining the transistor structure at the atomic level, we've overcome what many considered insurmountable physical limitations.\"</p><p>The breakthrough was made possible by a novel manufacturing technique that allows for more precise atomic-level placement of materials, resulting in significantly reduced electron leakage and thermal output. Initial production is scheduled to begin in the fourth quarter, with the first consumer devices incorporating the technology expected to reach markets by mid-next year.</p>",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3",
    category: "Tech",
    readTime: "5 min read",
    date: "2023-10-09T11:35:00Z",
    author: {
      name: "Sarah Wang",
      avatar: "https://randomuser.me/api/portraits/women/92.jpg",
      role: "Semiconductor Industry Analyst"
    },
    tags: ["Technology", "Semiconductors", "Computing"]
  },
  {
    _id: "18",
    title: "Bollywood Film Sets New Box Office Record in International Markets",
    excerpt: "Epic historical drama becomes highest-grossing Indian film of all time in overseas territories.",
    content: "<p>The historical epic \"Dynasty,\" directed by one of India's most acclaimed filmmakers, has shattered box office records for Indian cinema in international markets, grossing over $75 million outside of South Asia in just two weeks of release.</p><p>The film, a sweeping historical drama set in medieval India, has found particular success in markets not traditionally strong for Indian cinema, including North America, where it debuted at number three on the weekend box office charts, and China, where it has already become the highest-grossing Indian film ever released.</p><p>\"What we're seeing is the globalization of Indian storytelling,\" said film industry analyst Rajiv Menon. \"The combination of universal themes, spectacular visuals rendered with world-class technical expertise, and strategic international marketing has created a watershed moment for Bollywood's global commercial potential.\"</p><p>Featuring two of India's biggest stars and produced on a budget of approximately $40 million—the largest ever for an Indian production—the film has received critical acclaim for its storytelling, performances, and visual presentation. Major Hollywood studios are reportedly now in talks with the director about potential international co-productions.</p>",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3",
    category: "Bollywood",
    readTime: "5 min read",
    date: "2023-10-08T17:50:00Z",
    author: {
      name: "Arjun Patel",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg",
      role: "Global Cinema Correspondent"
    },
    tags: ["Bollywood", "Box Office", "International Cinema"]
  },
  {
    _id: "19",
    title: "Major Motorcycle Manufacturer Unveils Self-Balancing Technology",
    excerpt: "Revolutionary system promises to reduce accidents and make riding more accessible.",
    content: "<p>One of the world's largest motorcycle manufacturers has revealed a groundbreaking gyroscopic stabilization system that prevents bikes from tipping over, even when completely stationary without a kickstand.</p><p>The technology, which will be available on select models starting next year, uses a series of sophisticated gyroscopes and accelerometers to detect minute changes in the motorcycle's orientation, automatically making corrective adjustments to maintain balance in real-time.</p><p>\"This represents perhaps the most significant safety innovation in motorcycling since the helmet,\" said the company's head of research and development. \"Our testing indicates this system could prevent up to 70% of single-vehicle motorcycle accidents, which typically result from loss of balance or traction.\"</p><p>Beyond the safety implications, the technology is expected to make motorcycling accessible to a broader range of riders, including those with physical limitations that might otherwise prevent them from managing a traditional motorcycle's weight and balance requirements. The system can be toggled on and off, allowing experienced riders to maintain complete manual control when desired.</p>",
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3",
    category: "Car and Bike",
    readTime: "4 min read",
    date: "2023-10-08T13:25:00Z",
    author: {
      name: "Thomas Reynolds",
      avatar: "https://randomuser.me/api/portraits/men/61.jpg",
      role: "Motorcycle Technology Specialist"
    },
    tags: ["Motorcycles", "Technology", "Innovation"]
  },
  {
    _id: "20",
    title: "Hollywood Studio Secures Record-Breaking Streaming Deal",
    excerpt: "Multi-billion dollar agreement marks major shift in content distribution strategy.",
    content: "<p>In what industry analysts are calling a seismic shift in Hollywood's business model, one of the \"Big Five\" studios has signed a unprecedented streaming agreement worth $8.5 billion over five years with a major digital platform.</p><p>The deal—the largest of its kind—gives the streaming service exclusive rights to the studio's entire theatrical slate after movies complete their theatrical runs, replacing the traditional cable and network television windows that have been standard for decades.</p><p>\"This effectively signals the end of the old distribution paradigm,\" noted media analyst Richard Simmons. \"The traditional progression from theaters to home video to premium cable to broadcast is being compressed into essentially two windows: theatrical and streaming.\"</p><p>The agreement, which takes effect in January, includes the studio's existing library of over 3,
