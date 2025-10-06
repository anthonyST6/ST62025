/**
 * Complete remaining blocks 13-16 with real-world examples
 * This completes all 96 subcomponents
 */

(function() {
    // Wait for existing database to load
    const checkDatabase = setInterval(() => {
        if (window.realWorldExamplesComplete) {
            clearInterval(checkDatabase);
            completeRemainingBlocks();
        }
    }, 100);
    
    function completeRemainingBlocks() {
        // Block 13: MARKET DOMINATION STRATEGIES
        window.realWorldExamplesComplete["13-1"] = {
            title: "Competitive Intelligence",
            examples: [
                {
                    company: "Intel",
                    year: 1968,
                    valuation: "$200B",
                    category: "Semiconductors",
                    useCase: "Competitive analysis labs. Benchmarking programs. Patent monitoring. Talent tracking. Market intelligence.",
                    keyElements: ["Analysis labs", "Benchmarking", "Patent tracking"],
                    outcome: "Decades of market leadership through intelligence"
                },
                {
                    company: "P&G",
                    year: 1837,
                    valuation: "$350B",
                    category: "Consumer Goods",
                    useCase: "Store audits. Consumer panels. Competitive testing. Innovation scouting. Market share tracking.",
                    keyElements: ["Store audits", "Consumer research", "Testing"],
                    outcome: "Category leadership through market intelligence"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "E-commerce",
                    useCase: "Price monitoring. Seller analysis. Product tracking. Review analysis. Acquisition targets.",
                    keyElements: ["Price tracking", "Seller monitoring", "Reviews"],
                    outcome: "Market domination through data intelligence"
                },
                {
                    company: "Microsoft",
                    year: 1975,
                    valuation: "$2.8T",
                    category: "Technology",
                    useCase: "Developer surveys. GitHub insights. Cloud benchmarking. Enterprise feedback. Acquisition analysis.",
                    keyElements: ["Developer insights", "Benchmarking", "M&A intel"],
                    outcome: "Strategic pivots through competitive intelligence"
                },
                {
                    company: "Walmart",
                    year: 1962,
                    valuation: "$400B",
                    category: "Retail",
                    useCase: "Competitor pricing. Store locations. Supply chain analysis. E-commerce tracking. Innovation monitoring.",
                    keyElements: ["Price intelligence", "Location analysis", "Supply chain"],
                    outcome: "Retail dominance through systematic intelligence"
                },
                {
                    company: "Netflix",
                    year: 1997,
                    valuation: "$150B",
                    category: "Streaming",
                    useCase: "Content analysis. Viewer preferences. Competitor catalogs. Production tracking. Talent monitoring.",
                    keyElements: ["Content tracking", "Viewer data", "Talent intel"],
                    outcome: "Streaming leadership through content intelligence"
                }
            ]
        };
        
        window.realWorldExamplesComplete["13-2"] = {
            title: "Market Positioning",
            examples: [
                {
                    company: "Tesla",
                    year: 2003,
                    valuation: "$800B",
                    category: "Automotive",
                    useCase: "Luxury EV positioning. Direct sales model. Software-defined vehicle. Sustainability leader. Innovation brand.",
                    keyElements: ["Luxury EV", "Direct model", "Innovation"],
                    outcome: "Created new category through positioning"
                },
                {
                    company: "Apple",
                    year: 1976,
                    valuation: "$3T",
                    category: "Technology",
                    useCase: "Premium positioning. Design excellence. Ecosystem lock-in. Privacy focus. Creative tools.",
                    keyElements: ["Premium", "Design", "Ecosystem"],
                    outcome: "Most valuable company through positioning"
                },
                {
                    company: "Lululemon",
                    year: 1998,
                    valuation: "$50B",
                    category: "Athletic Apparel",
                    useCase: "Athleisure pioneer. Community focus. Premium yoga. Lifestyle brand. Technical innovation.",
                    keyElements: ["Athleisure", "Community", "Premium"],
                    outcome: "Category creation through positioning"
                },
                {
                    company: "Whole Foods",
                    year: 1980,
                    valuation: "$13.7B Exit",
                    category: "Grocery",
                    useCase: "Organic focus. Premium grocery. Values-driven. Local sourcing. Experience retail.",
                    keyElements: ["Organic", "Premium", "Values"],
                    outcome: "Amazon acquisition through unique positioning"
                },
                {
                    company: "Patagonia",
                    year: 1973,
                    valuation: "$3B",
                    category: "Outdoor Apparel",
                    useCase: "Environmental activism. Quality focus. Repair culture. B Corp leader. Purpose-driven.",
                    keyElements: ["Activism", "Quality", "Purpose"],
                    outcome: "Cult brand through values positioning"
                },
                {
                    company: "Red Bull",
                    year: 1987,
                    valuation: "$20B",
                    category: "Energy Drinks",
                    useCase: "Extreme sports association. Content creation. Event ownership. Lifestyle brand. Premium pricing.",
                    keyElements: ["Extreme sports", "Content", "Lifestyle"],
                    outcome: "Category dominance through positioning"
                }
            ]
        };
        
        window.realWorldExamplesComplete["13-3"] = {
            title: "Category Creation",
            examples: [
                {
                    company: "Salesforce",
                    year: 1999,
                    valuation: "$200B",
                    category: "CRM",
                    useCase: "Created SaaS category. No software movement. Cloud evangelism. Dreamforce conference. Ecosystem building.",
                    keyElements: ["SaaS creation", "Cloud evangelism", "Ecosystem"],
                    outcome: "Created and dominated SaaS CRM category"
                },
                {
                    company: "Uber",
                    year: 2009,
                    valuation: "$95B",
                    category: "Ridesharing",
                    useCase: "Created ridesharing. On-demand economy. Gig work model. Global expansion. Platform marketplace.",
                    keyElements: ["Ridesharing", "On-demand", "Gig economy"],
                    outcome: "Created $100B+ ridesharing category"
                },
                {
                    company: "Airbnb",
                    year: 2008,
                    valuation: "$75B",
                    category: "Home Sharing",
                    useCase: "Created home sharing. Experience economy. Trust system. Global inventory. Community hosts.",
                    keyElements: ["Home sharing", "Experiences", "Trust"],
                    outcome: "Created alternative accommodation category"
                },
                {
                    company: "Peloton",
                    year: 2012,
                    valuation: "$8B Peak",
                    category: "Connected Fitness",
                    useCase: "Connected fitness category. Home gym reimagined. Content subscription. Community features. Instructor celebrities.",
                    keyElements: ["Connected fitness", "Content", "Community"],
                    outcome: "Created connected fitness category"
                },
                {
                    company: "Beyond Meat",
                    year: 2009,
                    valuation: "$5B Peak",
                    category: "Plant Protein",
                    useCase: "Plant-based meat category. Meat section placement. Taste parity focus. Climate messaging. Mainstream targeting.",
                    keyElements: ["Plant meat", "Meat section", "Climate"],
                    outcome: "Created mainstream plant protein category"
                },
                {
                    company: "Spotify",
                    year: 2006,
                    valuation: "$25B",
                    category: "Music Streaming",
                    useCase: "Music streaming category. Playlist culture. Algorithm discovery. Podcast platform. Creator tools.",
                    keyElements: ["Streaming", "Playlists", "Discovery"],
                    outcome: "Defined music streaming category"
                }
            ]
        };
        
        window.realWorldExamplesComplete["13-4"] = {
            title: "Expansion Strategy",
            examples: [
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "Technology",
                    useCase: "Books to everything. AWS cloud. Prime membership. Alexa ecosystem. Physical stores. Healthcare entry.",
                    keyElements: ["Category expansion", "New businesses", "Ecosystem"],
                    outcome: "From books to everything store and beyond"
                },
                {
                    company: "Disney",
                    year: 1923,
                    valuation: "$200B",
                    category: "Entertainment",
                    useCase: "Animation to parks. Media networks. Streaming service. Cruise lines. Consumer products. Experiences.",
                    keyElements: ["Parks", "Media", "Experiences"],
                    outcome: "Entertainment empire through expansion"
                },
                {
                    company: "Starbucks",
                    year: 1971,
                    valuation: "$100B",
                    category: "Coffee",
                    useCase: "Seattle to global. Food addition. Evening menu. Reserve stores. Roastery experiences. China focus.",
                    keyElements: ["Global expansion", "Menu expansion", "Experiences"],
                    outcome: "35,000 stores through systematic expansion"
                },
                {
                    company: "Netflix",
                    year: 1997,
                    valuation: "$150B",
                    category: "Entertainment",
                    useCase: "DVDs to streaming. Global expansion. Original content. Gaming entry. Merchandise. Live events.",
                    keyElements: ["Streaming pivot", "Content creation", "Global"],
                    outcome: "Global entertainment through expansion"
                },
                {
                    company: "Apple",
                    year: 1976,
                    valuation: "$3T",
                    category: "Technology",
                    useCase: "Computers to phones. Wearables. Services growth. Financial services. Health focus. Auto ambitions.",
                    keyElements: ["Device expansion", "Services", "New categories"],
                    outcome: "$3T through category expansion"
                },
                {
                    company: "Uber",
                    year: 2009,
                    valuation: "$95B",
                    category: "Transportation",
                    useCase: "Rides to delivery. Freight services. Grocery delivery. Alcohol delivery. Advertising platform. Autonomous vehicles.",
                    keyElements: ["Delivery expansion", "Freight", "Platform"],
                    outcome: "Transportation super app through expansion"
                }
            ]
        };
        
        window.realWorldExamplesComplete["13-5"] = {
            title: "Partnership Networks",
            examples: [
                {
                    company: "Microsoft",
                    year: 1975,
                    valuation: "$2.8T",
                    category: "Technology",
                    useCase: "Cloud partnerships. System integrators. ISV ecosystem. Academic alliances. OpenAI partnership. Gaming studios.",
                    keyElements: ["Cloud partners", "ISVs", "Strategic alliances"],
                    outcome: "Ecosystem dominance through partnerships"
                },
                {
                    company: "Salesforce",
                    year: 1999,
                    valuation: "$200B",
                    category: "CRM",
                    useCase: "AppExchange ecosystem. Consulting partners. ISV network. Trailblazer community. Acquisition integration.",
                    keyElements: ["AppExchange", "Consultants", "Community"],
                    outcome: "Platform success through partner network"
                },
                {
                    company: "Apple",
                    year: 1976,
                    valuation: "$3T",
                    category: "Technology",
                    useCase: "App Store developers. Carrier partnerships. Retail partners. Education channels. Enterprise partners.",
                    keyElements: ["Developers", "Carriers", "Retail"],
                    outcome: "Ecosystem lock-in through partnerships"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "E-commerce",
                    useCase: "Marketplace sellers. Delivery partners. AWS partners. Whole Foods. Healthcare partnerships. Logistics network.",
                    keyElements: ["Marketplace", "Delivery", "AWS ecosystem"],
                    outcome: "Platform dominance through partner networks"
                },
                {
                    company: "Google",
                    year: 1998,
                    valuation: "$1.7T",
                    category: "Technology",
                    useCase: "Android OEMs. Ad network. Cloud partners. YouTube creators. Play Store developers. Search distribution.",
                    keyElements: ["Android ecosystem", "Ad network", "Creators"],
                    outcome: "Multiple monopolies through partnerships"
                },
                {
                    company: "Stripe",
                    year: 2010,
                    valuation: "$95B",
                    category: "Payments",
                    useCase: "Platform partnerships. Banking partners. Developer tools. Marketplace integrations. Global payment networks.",
                    keyElements: ["Platforms", "Banks", "Developers"],
                    outcome: "Payment infrastructure through partnerships"
                }
            ]
        };
        
        window.realWorldExamplesComplete["13-6"] = {
            title: "Innovation Pipeline",
            examples: [
                {
                    company: "3M",
                    year: 1902,
                    valuation: "$100B",
                    category: "Innovation",
                    useCase: "15% time rule. 30% new product revenue. Tech platforms. Customer collaboration. Patent portfolio.",
                    keyElements: ["15% time", "New product target", "Patents"],
                    outcome: "60,000 products through innovation culture"
                },
                {
                    company: "Google",
                    year: 1998,
                    valuation: "$1.7T",
                    category: "Technology",
                    useCase: "20% time projects. X moonshots. AI research. Open source. Academic partnerships. Acquisition pipeline.",
                    keyElements: ["20% time", "Moonshots", "Research"],
                    outcome: "Innovation leadership through systematic pipeline"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "Technology",
                    useCase: "Day 1 mentality. Working backwards. Two-pizza teams. PR/FAQ process. Build vs buy. Long-term focus.",
                    keyElements: ["Day 1", "Working backwards", "Small teams"],
                    outcome: "Continuous innovation through process"
                },
                {
                    company: "Tesla",
                    year: 2003,
                    valuation: "$800B",
                    category: "Automotive",
                    useCase: "Vertical integration. Battery innovation. Manufacturing innovation. Autopilot development. Energy products.",
                    keyElements: ["Vertical integration", "Battery tech", "Manufacturing"],
                    outcome: "Industry transformation through innovation"
                },
                {
                    company: "Apple",
                    year: 1976,
                    valuation: "$3T",
                    category: "Technology",
                    useCase: "Design-led innovation. Chip development. Secret projects. University recruiting. Acquisition integration.",
                    keyElements: ["Design focus", "Chip innovation", "Secrecy"],
                    outcome: "Premium products through innovation pipeline"
                },
                {
                    company: "SpaceX",
                    year: 2002,
                    valuation: "$150B",
                    category: "Aerospace",
                    useCase: "Reusable rockets. Rapid iteration. Vertical integration. Mars mission. Starlink constellation. First principles.",
                    keyElements: ["Reusability", "Rapid iteration", "First principles"],
                    outcome: "Space industry disruption through innovation"
                }
            ]
        };
        
        // Block 14: OPERATIONAL INFRASTRUCTURE
        window.realWorldExamplesComplete["14-1"] = {
            title: "Process Optimization",
            examples: [
                {
                    company: "Toyota",
                    year: 1937,
                    valuation: "$250B",
                    category: "Automotive",
                    useCase: "Lean manufacturing. Kaizen continuous improvement. Just-in-time. Andon cord. Error-proofing.",
                    keyElements: ["Lean", "Kaizen", "JIT"],
                    outcome: "Manufacturing excellence through TPS"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "E-commerce",
                    useCase: "Fulfillment optimization. Robotics automation. Predictive stocking. One-day delivery. Last-mile innovation.",
                    keyElements: ["Fulfillment", "Automation", "Speed"],
                    outcome: "Operational excellence at scale"
                },
                {
                    company: "McDonald's",
                    year: 1940,
                    valuation: "$200B",
                    category: "Fast Food",
                    useCase: "Speedee system. Kitchen automation. Drive-thru optimization. Mobile ordering. Delivery integration.",
                    keyElements: ["Speed", "Consistency", "Automation"],
                    outcome: "40,000 locations through process excellence"
                },
                {
                    company: "FedEx",
                    year: 1971,
                    valuation: "$70B",
                    category: "Logistics",
                    useCase: "Hub and spoke model. Package tracking. Route optimization. Automated sorting. Real-time visibility.",
                    keyElements: ["Hub model", "Tracking", "Optimization"],
                    outcome: "Global logistics through process innovation"
                },
                {
                    company: "Zara",
                    year: 1975,
                    valuation: "$100B Inditex",
                    category: "Fashion",
                    useCase: "Fast fashion model. Vertical integration. 2-week design to shelf. Small batches. Data-driven design.",
                    keyElements: ["Speed", "Integration", "Data"],
                    outcome: "Fashion disruption through process speed"
                },
                {
                    company: "Southwest",
                    year: 1967,
                    valuation: "$35B",
                    category: "Airlines",
                    useCase: "Point-to-point model. 10-minute turns. Single aircraft type. No-frills service. Direct booking.",
                    keyElements: ["Efficiency", "Simplicity", "Speed"],
                    outcome: "Profitable airline through process optimization"
                }
            ]
        };
        
        window.realWorldExamplesComplete["14-2"] = {
            title: "Technology Stack",
            examples: [
                {
                    company: "Netflix",
                    year: 1997,
                    valuation: "$150B",
                    category: "Streaming",
                    useCase: "Microservices architecture. AWS infrastructure. Chaos engineering. CDN optimization. Recommendation algorithms.",
                    keyElements: ["Microservices", "Cloud", "Chaos engineering"],
                    outcome: "Global streaming through tech excellence"
                },
                {
                    company: "Uber",
                    year: 2009,
                    valuation: "$95B",
                    category: "Transportation",
                    useCase: "Real-time matching. Geospatial systems. Dynamic pricing. Driver tracking. Payment processing.",
                    keyElements: ["Real-time", "Geospatial", "Dynamic systems"],
                    outcome: "Global platform through technology stack"
                },
                {
                    company: "Airbnb",
                    year: 2008,
                    valuation: "$75B",
                    category: "Travel",
                    useCase: "Service-oriented architecture. Machine learning platform. Design system. Data infrastructure. Trust systems.",
                    keyElements: ["SOA", "ML platform", "Trust tech"],
                    outcome: "Global marketplace through tech infrastructure"
                },
                {
                    company: "Spotify",
                    year: 2006,
                    valuation: "$25B",
                    category: "Music",
                    useCase: "Squad model infrastructure. Backstage platform. Data lake. ML recommendations. Edge caching.",
                    keyElements: ["Squad infrastructure", "Data platform", "ML"],
                    outcome: "500M users through scalable tech stack"
                },
                {
                    company: "Stripe",
                    year: 2010,
                    valuation: "$95B",
                    category: "Payments",
                    useCase: "API-first architecture. Global payment rails. Fraud detection. Compliance systems. Developer tools.",
                    keyElements: ["API-first", "Global rails", "Fraud systems"],
                    outcome: "Payment infrastructure through superior tech"
                },
                {
                    company: "Shopify",
                    year: 2006,
                    valuation: "$150B",
                    category: "E-commerce",
                    useCase: "Multi-tenant platform. App ecosystem. Checkout system. Fulfillment network. POS integration.",
                    keyElements: ["Multi-tenant", "Apps", "Omnichannel"],
                    outcome: "2M merchants through platform technology"
                }
            ]
        };
        
        window.realWorldExamplesComplete["14-3"] = {
            title: "Quality Systems",
            examples: [
                {
                    company: "Boeing",
                    year: 1916,
                    valuation: "$130B",
                    category: "Aerospace",
                    useCase: "AS9100 certification. Statistical process control. Supplier quality. FAA compliance. Safety management.",
                    keyElements: ["Certification", "SPC", "Safety"],
                    outcome: "Aerospace leader through quality systems"
                },
                {
                    company: "Johnson & Johnson",
                    year: 1886,
                    valuation: "$400B",
                    category: "Healthcare",
                    useCase: "GMP compliance. Clinical quality. Pharmacovigilance. Supplier audits. Product stewardship.",
                    keyElements: ["GMP", "Clinical quality", "Stewardship"],
                    outcome: "Healthcare trust through quality excellence"
                },
                {
                    company: "Tesla",
                    year: 2003,
                    valuation: "$800B",
                    category: "Automotive",
                    useCase: "Vertical integration quality. Battery testing. Autopilot validation. OTA updates. Service quality.",
                    keyElements: ["Integration", "Testing", "OTA quality"],
                    outcome: "Premium EVs through quality innovation"
                },
                {
                    company: "Apple",
                    year: 1976,
                    valuation: "$3T",
                    category: "Technology",
                    useCase: "Design quality standards. Supplier audits. Environmental testing. Software QA. Retail experience.",
                    keyElements: ["Design standards", "Testing", "Experience"],
                    outcome: "Premium brand through quality obsession"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "E-commerce",
                    useCase: "Six Sigma programs. Defect reduction. Customer obsession. Operational excellence. Safety focus.",
                    keyElements: ["Six Sigma", "Customer focus", "Excellence"],
                    outcome: "Scale with quality through systems"
                },
                {
                    company: "Ritz-Carlton",
                    year: 1983,
                    valuation: "Marriott Brand",
                    category: "Hospitality",
                    useCase: "Gold standards. Daily lineup. Quality metrics. Guest satisfaction. Employee empowerment.",
                    keyElements: ["Standards", "Daily quality", "Empowerment"],
                    outcome: "Luxury leadership through quality systems"
                }
            ]
        };
        
        window.realWorldExamplesComplete["14-4"] = {
            title: "Automation Framework",
            examples: [
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "E-commerce",
                    useCase: "Warehouse robotics. Kiva systems. Automated packaging. Drone delivery. Cashier-less stores.",
                    keyElements: ["Robotics", "Packaging", "Autonomous"],
                    outcome: "Scale through comprehensive automation"
                },
                {
                    company: "Tesla",
                    year: 2003,
                    valuation: "$800B",
                    category: "Automotive",
                    useCase: "Gigafactory automation. Battery production. Paint shop robots. Neural network training. FSD development.",
                    keyElements: ["Factory automation", "AI training", "FSD"],
                    outcome: "Manufacturing revolution through automation"
                },
                {
                    company: "UiPath",
                    year: 2005,
                    valuation: "$35B",
                    category: "RPA",
                    useCase: "Robotic process automation. AI-powered automation. Process mining. Task mining. Citizen development.",
                    keyElements: ["RPA", "AI automation", "Process mining"],
                    outcome: "40,000 customers through automation platform"
                },
                {
                    company: "Netflix",
                    year: 1997,
                    valuation: "$150B",
                    category: "Streaming",
                    useCase: "Content delivery automation. Encoding pipeline. A/B test automation. Recommendation automation. Chaos automation.",
                    keyElements: ["CDN automation", "Testing", "Recommendations"],
                    outcome: "Global scale through automation"
                },
                {
                    company: "Stripe",
                    year: 2010,
                    valuation: "$95B",
                    category: "Payments",
                    useCase: "Payment routing automation. Fraud detection. Compliance automation. Onboarding automation. Reconciliation.",
                    keyElements: ["Routing", "Fraud", "Compliance"],
                    outcome: "Millions of transactions through automation"
                },
                {
                    company: "McDonald's",
                    year: 1940,
                    valuation: "$200B",
                    category: "Fast Food",
                    useCase: "Kitchen automation. Kiosk ordering. Mobile app. Drive-thru AI. Inventory management.",
                    keyElements: ["Kitchen", "Ordering", "AI"],
                    outcome: "Consistency at scale through automation"
                }
            ]
        };
        
        window.realWorldExamplesComplete["14-5"] = {
            title: "Vendor Management",
            examples: [
                {
                    company: "Apple",
                    year: 1976,
                    valuation: "$3T",
                    category: "Technology",
                    useCase: "Supplier responsibility. Foxconn partnership. Component sourcing. Quality audits. Environmental standards.",
                    keyElements: ["Responsibility", "Partnerships", "Standards"],
                    outcome: "Supply chain excellence through vendor management"
                },
                {
                    company: "Walmart",
                    year: 1962,
                    valuation: "$400B",
                    category: "Retail",
                    useCase: "Vendor scorecards. EDLP negotiations. Direct sourcing. Private label. Sustainability requirements.",
                    keyElements: ["Scorecards", "Negotiations", "Sustainability"],
                    outcome: "Low prices through vendor leverage"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "E-commerce",
                    useCase: "Marketplace management. FBA requirements. Vendor central. Performance metrics. Buy box algorithm.",
                    keyElements: ["Marketplace", "Performance", "Algorithm"],
                    outcome: "Marketplace dominance through vendor systems"
                },
                {
                    company: "Target",
                    year: 1902,
                    valuation: "$100B",
                    category: "Retail",
                    useCase: "Designer partnerships. Owned brands. Vendor compliance. Sustainability goals. Quality standards.",
                    keyElements: ["Partnerships", "Owned brands", "Compliance"],
                    outcome: "Differentiation through vendor strategy"
                },
                {
                    company: "Nike",
                    year: 1964,
                    valuation: "$150B",
                    category: "Athletic",
                    useCase: "Manufacturing partners. Material innovation. Labor standards. Sustainability audits. Quality control.",
                    keyElements: ["Partners", "Innovation", "Standards"],
                    outcome: "Global scale through vendor network"
                },
                {
                    company: "Starbucks",
                    year: 1971,
                    valuation: "$100B",
                    category: "Coffee",
                    useCase: "Coffee sourcing. Farmer support. Ethical sourcing. Quality standards. Direct trade.",
                    keyElements: ["Sourcing", "Ethics", "Direct trade"],
                    outcome: "Premium coffee through vendor relationships"
                }
            ]
        };
        
        window.realWorldExamplesComplete["14-6"] = {
            title: "Risk Management",
            examples: [
                {
                    company: "JPMorgan Chase",
                    year: 1799,
                    valuation: "$500B",
                    category: "Banking",
                    useCase: "Risk models. Stress testing. Compliance systems. Cybersecurity. Credit risk management.",
                    keyElements: ["Models", "Testing", "Cyber"],
                    outcome: "Financial stability through risk management"
                },
                {
                    company: "Berkshire Hathaway",
                    year: 1839,
                    valuation: "$800B",
                    category: "Conglomerate",
                    useCase: "Insurance underwriting. Investment risk. Diversification. Float management. Succession planning.",
                    keyElements: ["Underwriting", "Diversification", "Float"],
                    outcome: "60-year growth through risk excellence"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "Technology",
                    useCase: "Operational risk. AWS redundancy. Supply chain risk. Regulatory compliance. Data security.",
                    keyElements: ["Redundancy", "Supply chain", "Security"],
                    outcome: "Resilience through comprehensive risk management"
                },
                {
                    company: "Microsoft",
                    year: 1975,
                    valuation: "$2.8T",
                    category: "Technology",
                    useCase: "Cybersecurity focus. Compliance frameworks. Business continuity. Legal risk. Privacy protection.",
                    keyElements: ["Cyber", "Compliance", "Continuity"],
                    outcome: "Enterprise trust through risk management"
                },
                {
                    company: "Johnson & Johnson",
                    year: 1886,
                    valuation: "$400B",
                    category: "Healthcare",
                    useCase: "Product liability. Clinical trial risk. Regulatory compliance. Supply chain risk. Crisis management.",
                    keyElements: ["Liability", "Clinical", "Crisis"],
                    outcome: "135 years through risk management"
                },
                {
                    company: "Visa",
                    year: 1958,
                    valuation: "$500B",
                    category: "Payments",
                    useCase: "Fraud prevention. Network security. Regulatory compliance. Operational resilience. Cyber defense.",
                    keyElements: ["Fraud", "Security", "Resilience"],
                    outcome: "Global trust through risk excellence"
                }
            ]
        };
        
        // Block 15: LEADERSHIP EXPANSION
        window.realWorldExamplesComplete["15-1"] = {
            title: "Executive Development",
            examples: [
                {
                    company: "GE",
                    year: 1892,
                    valuation: "$100B",
                    category: "Conglomerate",
                    useCase: "Crotonville leadership center. CEO bootcamp. Cross-business rotation. Action learning. Executive coaching.",
                    keyElements: ["Crotonville", "Bootcamp", "Rotation"],
                    outcome: "More Fortune 500 CEOs than any company"
                },
                {
                    company: "McKinsey",
                    year: 1926,
                    valuation: "$10B Revenue",
                    category: "Consulting",
                    useCase: "Partner development. CEO counseling. Global leadership. Problem-solving training. Alumni network.",
                    keyElements: ["Partner track", "CEO exposure", "Alumni"],
                    outcome: "150+ Fortune 500 CEOs from McKinsey"
                },
                {
                    company: "P&G",
                    year: 1837,
                    valuation: "$350B",
                    category: "Consumer Goods",
                    useCase: "Build from within. Brand management. Global assignments. CEO pipeline. Leadership college.",
                    keyElements: ["Internal development", "Brand training", "Pipeline"],
                    outcome: "CEOs of major companies from P&G"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "Technology",
                    useCase: "S-Team development. Single-threaded leaders. Bar raiser program. Leadership principles. Written narratives.",
                    keyElements: ["S-Team", "Single-threaded", "Principles"],
                    outcome: "Multiple $10B+ businesses through leaders"
                },
                {
                    company: "Microsoft",
                    year: 1975,
                    valuation: "$2.8T",
                    category: "Technology",
                    useCase: "Growth mindset culture. Inclusive leadership. Cloud transformation. Executive coaching. Succession planning.",
                    keyElements: ["Growth mindset", "Inclusion", "Transformation"],
                    outcome: "Successful CEO transition and growth"
                },
                {
                    company: "Disney",
                    year: 1923,
                    valuation: "$200B",
                    category: "Entertainment",
                    useCase: "Cross-property experience. Creative leadership. Business leadership. Storytelling focus. Succession challenges.",
                    keyElements: ["Cross-property", "Creative", "Storytelling"],
                    outcome: "Entertainment leaders through Disney"
                }
            ]
        };
        
        window.realWorldExamplesComplete["15-2"] = {
            title: "Board Governance",
            examples: [
                {
                    company: "Apple",
                    year: 1976,
                    valuation: "$3T",
                    category: "Technology",
                    useCase: "Independent directors. Audit committee. Compensation committee. CEO succession. Shareholder engagement.",
                    keyElements: ["Independence", "Committees", "Succession"],
                    outcome: "Effective governance through crisis and growth"
                },
                {
                    company: "Berkshire Hathaway",
                    year: 1839,
                    valuation: "$800B",
                    category: "Conglomerate",
                    useCase: "Owner-operator model. Long-term focus. Succession planning. Annual letters. Shareholder meetings.",
                    keyElements: ["Owner-operator", "Long-term", "Communication"],
                    outcome: "60 years of outperformance"
                },
                {
                    company: "Microsoft",
                    year: 1975,
                    valuation: "$2.8T",
                    category: "Technology",
                    useCase: "CEO transition success. Board refresh. Diversity focus. Strategic oversight. Compensation alignment.",
                    keyElements: ["Transition", "Refresh", "Diversity"],
                    outcome: "Successful transformation under new CEO"
                },
                {
                    company: "Johnson & Johnson",
                    year: 1886,
                    valuation: "$400B",
                    category: "Healthcare",
                    useCase: "Credo governance. Independent oversight. Risk committee. Science committee. Regulatory committee.",
                    keyElements: ["Credo", "Independence", "Specialized committees"],
                    outcome: "135 years of sustained success"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "Technology",
                    useCase: "Founder-led transition. Long-term thinking. Day 1 mentality. Leadership principles. Shareholder letters.",
                    keyElements: ["Founder transition", "Long-term", "Principles"],
                    outcome: "Smooth CEO transition maintaining culture"
                },
                {
                    company: "Walmart",
                    year: 1962,
                    valuation: "$400B",
                    category: "Retail",
                    useCase: "Family governance. Independent directors. Technology committee. Strategic planning. CEO succession.",
                    keyElements: ["Family balance", "Independence", "Technology"],
                    outcome: "Multi-generational success"
                }
            ]
        };
        
        window.realWorldExamplesComplete["15-3"] = {
            title: "Strategic Planning",
            examples: [
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "Technology",
                    useCase: "Working backwards. 6-page narratives. PR/FAQ process. Long-term thinking. Day 1 mentality.",
                    keyElements: ["Working backwards", "Narratives", "Long-term"],
                    outcome: "Multiple business creation through planning"
                },
                {
                    company: "Google",
                    year: 1998,
                    valuation: "$1.7T",
                    category: "Technology",
                    useCase: "OKR system. 70-20-10 rule. Moonshot thinking. Alphabet structure. Long-term bets.",
                    keyElements: ["OKRs", "70-20-10", "Moonshots"],
                    outcome: "Diversification through strategic planning"
                },
                {
                    company: "Microsoft",
                    year: 1975,
                    valuation: "$2.8T",
                    category: "Technology",
                    useCase: "Cloud transformation. Mobile-first strategy. AI integration. Gaming expansion. Enterprise focus.",
                    keyElements: ["Cloud pivot", "AI focus", "Gaming"],
                    outcome: "$2.8T valuation through strategic shift"
                },
                {
                    company: "Disney",
                    year: 1923,
                    valuation: "$200B",
                    category: "Entertainment",
                    useCase: "IP strategy. Streaming pivot. Parks expansion. Acquisition strategy. Direct-to-consumer.",
                    keyElements: ["IP focus", "Streaming", "D2C"],
                    outcome: "Entertainment dominance through planning"
                },
                {
                    company: "Tesla",
                    year: 2003,
                    valuation: "$800B",
                    category: "Automotive",
                    useCase: "Master plan. Vertical integration. Energy expansion. Autonomous driving. Manufacturing innovation.",
                    keyElements: ["Master plan", "Integration", "Autonomy"],
                    outcome: "Industry disruption through strategic vision"
                },
                {
                    company: "Netflix",
                    year: 1997,
                    valuation: "$150B",
                    category: "Entertainment",
                    useCase: "Streaming pivot. Content creation. Global expansion. Technology platform. Data-driven decisions.",
                    keyElements: ["Pivot", "Content", "Global"],
                    outcome: "Entertainment transformation through strategy"
                }
            ]
        };
        
        window.realWorldExamplesComplete["15-4"] = {
            title: "Change Management",
            examples: [
                {
                    company: "Microsoft",
                    year: 1975,
                    valuation: "$2.8T",
                    category: "Technology",
                    useCase: "Growth mindset shift. Cloud transformation. Culture change. Partner embrace. Open source adoption.",
                    keyElements: ["Mindset shift", "Cloud pivot", "Culture"],
                    outcome: "Tripled value through transformation"
                },
                {
                    company: "IBM",
                    year: 1911,
                    valuation: "$150B",
                    category: "Technology",
                    useCase: "Services transformation. Cloud pivot. AI focus. Red Hat acquisition. Hybrid cloud strategy.",
                    keyElements: ["Services shift", "Cloud", "AI"],
                    outcome: "Survived multiple transformations"
                },
                {
                    company: "Adobe",
                    year: 1982,
                    valuation: "$250B",
                    category: "Software",
                    useCase: "Creative Cloud transition. Subscription model. Customer success. Digital transformation. Experience Cloud.",
                    keyElements: ["Cloud transition", "Subscription", "Digital"],
                    outcome: "10x growth through model change"
                },
                {
                    company: "Netflix",
                    year: 1997,
                    valuation: "$150B",
                    category: "Entertainment",
                    useCase: "DVD to streaming. Licensing to originals. US to global. Tech to content. Linear to on-demand.",
                    keyElements: ["Multiple pivots", "Content shift", "Global"],
                    outcome: "Industry leader through continuous change"
                },
                {
                    company: "Walmart",
                    year: 1962,
                    valuation: "$400B",
                    category: "Retail",
                    useCase: "E-commerce transformation. Store pickup. Marketplace launch. Technology investment. Jet acquisition.",
                    keyElements: ["Digital shift", "Omnichannel", "Tech investment"],
                    outcome: "Competing with Amazon through change"
                },
                {
                    company: "Ford",
                    year: 1903,
                    valuation: "$50B",
                    category: "Automotive",
                    useCase: "EV transformation. Software focus. Direct sales. Subscription services. Manufacturing pivot.",
                    keyElements: ["EV shift", "Software", "Direct model"],
                    outcome: "Auto transformation in progress"
                }
            ]
        };
        
        window.realWorldExamplesComplete["15-5"] = {
            title: "Investor Relations",
            examples: [
                {
                    company: "Apple",
                    year: 1976,
                    valuation: "$3T",
                    category: "Technology",
                    useCase: "Product launches. Earnings calls. Capital returns. Guidance approach. Retail investor focus.",
                    keyElements: ["Product events", "Capital returns", "Guidance"],
                    outcome: "First $3T company through IR excellence"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "Technology",
                    useCase: "Shareholder letters. Long-term focus. Reinvestment narrative. Free cash flow focus. Segment reporting.",
                    keyElements: ["Letters", "Long-term", "Cash flow"],
                    outcome: "Patient capital through communication"
                },
                {
                    company: "Berkshire Hathaway",
                    year: 1839,
                    valuation: "$800B",
                    category: "Conglomerate",
                    useCase: "Annual letters. Shareholder meetings. No guidance. Book value focus. Succession planning.",
                    keyElements: ["Letters", "Meetings", "No guidance"],
                    outcome: "Loyal shareholders through transparency"
                },
                {
                    company: "Tesla",
                    year: 2003,
                    valuation: "$800B",
                    category: "Automotive",
                    useCase: "Master plan communication. Production updates. Autonomy day. Battery day. AI day presentations.",
                    keyElements: ["Vision events", "Updates", "Technology days"],
                    outcome: "Retail investor army through engagement"
                },
                {
                    company: "Microsoft",
                    year: 1975,
                    valuation: "$2.8T",
                    category: "Technology",
                    useCase: "Cloud metrics. Segment reporting. Capital allocation. Dividend growth. Analyst engagement.",
                    keyElements: ["Metrics", "Segments", "Capital allocation"],
                    outcome: "Institutional confidence through clarity"
                },
                {
                    company: "Salesforce",
                    year: 1999,
                    valuation: "$200B",
                    category: "CRM",
                    useCase: "Dreamforce announcements. Earnings calls. M&A communication. Guidance updates. Stakeholder capitalism.",
                    keyElements: ["Events", "M&A", "Stakeholder focus"],
                    outcome: "Growth story through consistent IR"
                }
            ]
        };
        
        window.realWorldExamplesComplete["15-6"] = {
            title: "Succession Planning",
            examples: [
                {
                    company: "Apple",
                    year: 1976,
                    valuation: "$3T",
                    category: "Technology",
                    useCase: "Jobs to Cook transition. Internal promotion. University recruiting. Leadership development. Culture preservation.",
                    keyElements: ["Internal succession", "Development", "Culture"],
                    outcome: "10x growth post-succession"
                },
                {
                    company: "Microsoft",
                    year: 1975,
                    valuation: "$2.8T",
                    category: "Technology",
                    useCase: "Gates to Ballmer to Nadella. Internal candidates. Board process. Culture transformation. Strategic shift.",
                    keyElements: ["Internal pipeline", "Board process", "Transformation"],
                    outcome: "Successful CEO transitions"
                },
                {
                    company: "Disney",
                    year: 1923,
                    valuation: "$200B",
                    category: "Entertainment",
                    useCase: "CEO succession challenges. Internal vs external. Board involvement. Iger extensions. Chapek transition.",
                    keyElements: ["Challenges", "Board role", "Extensions"],
                    outcome: "Leadership transitions in spotlight"
                },
                {
                    company: "JPMorgan Chase",
                    year: 1799,
                    valuation: "$500B",
                    category: "Banking",
                    useCase: "Dimon succession planning. Internal bench. Operating committee. Leadership development. Board oversight.",
                    keyElements: ["Bench strength", "Committee", "Development"],
                    outcome: "Stability through succession planning"
                },
                {
                    company: "Berkshire Hathaway",
                    year: 1839,
                    valuation: "$800B",
                    category: "Conglomerate",
                    useCase: "Buffett succession. Greg Abel selection. Board involvement. Culture preservation. Investment committee.",
                    keyElements: ["Clear successor", "Culture", "Committee"],
                    outcome: "Succession clarity for investors"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "Technology",
                    useCase: "Bezos to Jassy transition. S-Team development. Internal promotion. Culture continuity. Strategic consistency.",
                    keyElements: ["S-Team", "Internal", "Continuity"],
                    outcome: "Smooth founder transition"
                }
            ]
        };
        
        // Block 16: GLOBAL EXPANSION OPPORTUNITIES
        window.realWorldExamplesComplete["16-1"] = {
            title: "International Markets",
            examples: [
                {
                    company: "McDonald's",
                    year: 1940,
                    valuation: "$200B",
                    category: "Fast Food",
                    useCase: "Local menu adaptation. Franchise model. Real estate strategy. Supply chain localization. Cultural sensitivity.",
                    keyElements: ["Localization", "Franchise", "Real estate"],
                    outcome: "40,000 locations in 100+ countries"
                },
                {
                    company: "Starbucks",
                    year: 1971,
                    valuation: "$100B",
                    category: "Coffee",
                    useCase: "China expansion. Local partnerships. Store experience. Digital integration. Reserve concept.",
                    keyElements: ["China focus", "Partnerships", "Experience"],
                    outcome: "35,000 stores globally"
                },
                {
                    company: "Netflix",
                    year: 1997,
                    valuation: "$150B",
                    category: "Streaming",
                    useCase: "190 country expansion. Local content. Subtitle/dubbing. Payment methods. Regulatory compliance.",
                    keyElements: ["Local content", "Payment options", "Compliance"],
                    outcome: "230M subscribers globally"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "E-commerce",
                    useCase: "Marketplace model. Local fulfillment. Prime adaptation. AWS regions. Acquisition strategy.",
                    keyElements: ["Marketplace", "Fulfillment", "AWS"],
                    outcome: "Global e-commerce and cloud leader"
                },
                {
                    company: "Uber",
                    year: 2009,
                    valuation: "$95B",
                    category: "Transportation",
                    useCase: "City-by-city expansion. Local regulations. Competition battles. Food delivery. Regional adaptations.",
                    keyElements: ["City focus", "Regulations", "Adaptation"],
                    outcome: "10,000+ cities in 70+ countries"
                },
                {
                    company: "Spotify",
                    year: 2006,
                    valuation: "$25B",
                    category: "Music",
                    useCase: "Licensing deals. Local content. Payment methods. Podcast localization. Pricing strategy.",
                    keyElements: ["Licensing", "Local content", "Pricing"],
                    outcome: "180+ markets globally"
                }
            ]
        };
        
        window.realWorldExamplesComplete["16-2"] = {
            title: "Localization Strategy",
            examples: [
                {
                    company: "KFC",
                    year: 1952,
                    valuation: "Yum Brands",
                    category: "Fast Food",
                    useCase: "China menu innovation. Local taste preferences. Breakfast offerings. Digital ordering. Delivery focus.",
                    keyElements: ["Menu innovation", "Local taste", "Digital"],
                    outcome: "7,000+ stores in China"
                },
                {
                    company: "IKEA",
                    year: 1943,
                    valuation: "$50B Revenue",
                    category: "Furniture",
                    useCase: "Small space solutions. Local room layouts. Assembly services. Food adaptation. Catalog localization.",
                    keyElements: ["Space solutions", "Services", "Adaptation"],
                    outcome: "445 stores in 52 countries"
                },
                {
                    company: "Coca-Cola",
                    year: 1886,
                    valuation: "$250B",
                    category: "Beverages",
                    useCase: "Local flavors. Regional brands. Distribution partnerships. Marketing localization. Packaging sizes.",
                    keyElements: ["Flavors", "Partnerships", "Marketing"],
                    outcome: "200+ countries presence"
                },
                {
                    company: "Unilever",
                    year: 1929,
                    valuation: "$150B",
                    category: "Consumer Goods",
                    useCase: "Local brands. Sachet packaging. Distribution innovation. Price points. Cultural marketing.",
                    keyElements: ["Local brands", "Packaging", "Distribution"],
                    outcome: "400 brands in 190 countries"
                },
                {
                    company: "Disney",
                    year: 1923,
                    valuation: "$200B",
                    category: "Entertainment",
                    useCase: "Local language content. Cultural adaptations. Regional characters. Park localization. Streaming content.",
                    keyElements: ["Language", "Cultural adaptation", "Local content"],
                    outcome: "Global entertainment empire"
                },
                {
                    company: "Airbnb",
                    year: 2008,
                    valuation: "$75B",
                    category: "Travel",
                    useCase: "Local experiences. Payment methods. Language support. Regulatory compliance. Host education.",
                    keyElements: ["Experiences", "Payments", "Compliance"],
                    outcome: "220+ countries and regions"
                }
            ]
        };
        
        window.realWorldExamplesComplete["16-3"] = {
            title: "Cultural Adaptation",
            examples: [
                {
                    company: "Netflix",
                    year: 1997,
                    valuation: "$150B",
                    category: "Streaming",
                    useCase: "Local originals. Cultural storytelling. Subtitle quality. Content curation. Marketing campaigns.",
                    keyElements: ["Local originals", "Storytelling", "Curation"],
                    outcome: "Global content platform"
                },
                {
                    company: "Nike",
                    year: 1964,
                    valuation: "$150B",
                    category: "Athletic",
                    useCase: "Local athletes. Cultural campaigns. Product adaptations. Size variations. Sport preferences.",
                    keyElements: ["Athletes", "Campaigns", "Products"],
                    outcome: "Global athletic brand"
                },
                {
                    company: "L'Oréal",
                    year: 1909,
                    valuation: "$200B",
                    category: "Beauty",
                    useCase: "Skin tone diversity. Hair type products. Local beauty standards. Brand portfolio. Research centers.",
                    keyElements: ["Diversity", "Standards", "Research"],
                    outcome: "Beauty leader in 150 countries"
                },
                {
                    company: "Pepsi",
                    year: 1893,
                    valuation: "$200B",
                    category: "Beverages",
                    useCase: "Local celebrity endorsements. Festival marketing. Flavor preferences. Package sizes. Distribution methods.",
                    keyElements: ["Celebrities", "Festivals", "Flavors"],
                    outcome: "Global challenger brand"
                },
                {
                    company: "Samsung",
                    year: 1938,
                    valuation: "$400B",
                    category: "Electronics",
                    useCase: "Regional features. Price segments. Marketing approach. Service networks. Local partnerships.",
                    keyElements: ["Features", "Segments", "Service"],
                    outcome: "Global electronics leader"
                },
                {
                    company: "Zara",
                    year: 1975,
                    valuation: "$100B Inditex",
                    category: "Fashion",
                    useCase: "Regional fashion. Climate adaptation. Size variations. Store locations. Trend localization.",
                    keyElements: ["Fashion", "Climate", "Trends"],
                    outcome: "96 countries presence"
                }
            ]
        };
        
        window.realWorldExamplesComplete["16-4"] = {
            title: "Regulatory Compliance",
            examples: [
                {
                    company: "Google",
                    year: 1998,
                    valuation: "$1.7T",
                    category: "Technology",
                    useCase: "GDPR compliance. Data localization. Content moderation. Tax structures. Antitrust responses.",
                    keyElements: ["GDPR", "Data laws", "Antitrust"],
                    outcome: "Global operation despite regulations"
                },
                {
                    company: "Facebook/Meta",
                    year: 2004,
                    valuation: "$900B",
                    category: "Social Media",
                    useCase: "Privacy regulations. Content laws. Data protection. Political advertising. Age verification.",
                    keyElements: ["Privacy", "Content", "Political ads"],
                    outcome: "3B users navigating global regulations"
                },
                {
                    company: "Uber",
                    year: 2009,
                    valuation: "$95B",
                    category: "Transportation",
                    useCase: "Transportation licenses. Labor laws. Insurance requirements. Safety regulations. Tax compliance.",
                    keyElements: ["Licenses", "Labor", "Safety"],
                    outcome: "Regulatory battles in 70+ countries"
                },
                {
                    company: "Airbnb",
                    year: 2008,
                    valuation: "$75B",
                    category: "Travel",
                    useCase: "Housing regulations. Tax collection. Registration requirements. Safety standards. Zoning laws.",
                    keyElements: ["Housing laws", "Taxes", "Zoning"],
                    outcome: "Regulatory adaptation globally"
                },
                {
                    company: "PayPal",
                    year: 1998,
                    valuation: "$100B",
                    category: "Payments",
                    useCase: "Financial regulations. Money transmission. KYC/AML compliance. Data protection. Cross-border rules.",
                    keyElements: ["Financial regs", "KYC/AML", "Cross-border"],
                    outcome: "200+ markets compliance"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "E-commerce",
                    useCase: "Tax compliance. Labor regulations. Antitrust scrutiny. Data protection. Product safety.",
                    keyElements: ["Taxes", "Labor", "Antitrust"],
                    outcome: "Global compliance at scale"
                }
            ]
        };
        
        window.realWorldExamplesComplete["16-5"] = {
            title: "Supply Chain",
            examples: [
                {
                    company: "Apple",
                    year: 1976,
                    valuation: "$3T",
                    category: "Technology",
                    useCase: "Global supplier network. Just-in-time manufacturing. Quality control. Logistics optimization. Risk management.",
                    keyElements: ["Suppliers", "JIT", "Quality"],
                    outcome: "Supply chain excellence globally"
                },
                {
                    company: "Walmart",
                    year: 1962,
                    valuation: "$400B",
                    category: "Retail",
                    useCase: "Cross-docking. RFID tracking. Supplier collaboration. Distribution centers. Inventory management.",
                    keyElements: ["Cross-docking", "RFID", "Distribution"],
                    outcome: "Supply chain competitive advantage"
                },
                {
                    company: "Zara",
                    year: 1975,
                    valuation: "$100B Inditex",
                    category: "Fashion",
                    useCase: "Vertical integration. Fast fashion. Air freight. Small batches. Responsive manufacturing.",
                    keyElements: ["Integration", "Speed", "Small batches"],
                    outcome: "2-week design to shelf globally"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "E-commerce",
                    useCase: "Fulfillment network. Last-mile delivery. Inventory placement. Predictive stocking. Robotics.",
                    keyElements: ["Fulfillment", "Last-mile", "Prediction"],
                    outcome: "Global logistics dominance"
                },
                {
                    company: "Toyota",
                    year: 1937,
                    valuation: "$250B",
                    category: "Automotive",
                    useCase: "Lean manufacturing. Supplier partnerships. Just-in-time. Quality circles. Continuous improvement.",
                    keyElements: ["Lean", "JIT", "Kaizen"],
                    outcome: "Global manufacturing excellence"
                },
                {
                    company: "Maersk",
                    year: 1904,
                    valuation: "$40B",
                    category: "Shipping",
                    useCase: "Container shipping. Port operations. Digital tracking. Integrated logistics. Green shipping.",
                    keyElements: ["Containers", "Ports", "Digital"],
                    outcome: "Global trade backbone"
                }
            ]
        };
        
        window.realWorldExamplesComplete["16-6"] = {
            title: "Scaling Operations",
            examples: [
                {
                    company: "Uber",
                    year: 2009,
                    valuation: "$95B",
                    category: "Transportation",
                    useCase: "Playbook expansion. City teams. Driver acquisition. Demand generation. Local operations.",
                    keyElements: ["Playbook", "City teams", "Growth"],
                    outcome: "10,000+ cities scaled rapidly"
                },
                {
                    company: "Airbnb",
                    year: 2008,
                    valuation: "$75B",
                    category: "Travel",
                    useCase: "Host acquisition. Quality standards. Trust systems. Customer support. Payment infrastructure.",
                    keyElements: ["Hosts", "Trust", "Infrastructure"],
                    outcome: "4M+ hosts globally"
                },
                {
                    company: "Amazon",
                    year: 1994,
                    valuation: "$1.7T",
                    category: "E-commerce",
                    useCase: "Two-pizza teams. Service-oriented architecture. AWS infrastructure. Marketplace scaling. Prime expansion.",
                    keyElements: ["Small teams", "SOA", "Infrastructure"],
                    outcome: "Massive scale across businesses"
                },
                {
                    company: "Netflix",
                    year: 1997,
                    valuation: "$150B",
                    category: "Streaming",
                    useCase: "CDN infrastructure. Microservices. Chaos engineering. Global rollout. Content delivery.",
                    keyElements: ["CDN", "Microservices", "Chaos"],
                    outcome: "230M subscribers globally"
                },
                {
                    company: "Stripe",
                    year: 2010,
                    valuation: "$95B",
                    category: "Payments",
                    useCase: "API scaling. Global payments. Compliance automation. Developer experience. Infrastructure abstraction.",
                    keyElements: ["API", "Automation", "Developer focus"],
                    outcome: "Millions of businesses globally"
                },
                {
                    company: "Shopify",
                    year: 2006,
                    valuation: "$150B",
                    category: "E-commerce",
                    useCase: "Multi-tenant architecture. App ecosystem. Fulfillment network. Payment processing. Global merchants.",
                    keyElements: ["Multi-tenant", "Apps", "Fulfillment"],
                    outcome: "2M+ merchants in 175 countries"
                }
            ]
        };
        
        // Final verification
        console.log('✅ Blocks 13-16 completed!');
        
        // Count total
        const totalSubcomponents = Object.keys(window.realWorldExamplesComplete).length;
        console.log(`Total subcomponents with examples: ${totalSubcomponents}/96`);
        
        // Verify all 96 are present
        const allExpected = [];
        for (let block = 1; block <= 16; block++) {
            for (let sub = 1; sub <= 6; sub++) {
                allExpected.push(`${block}-${sub}`);
            }
        }
        
        const missing = allExpected.filter(id => !window.realWorldExamplesComplete[id]);
        if (missing.length > 0) {
            console.log('Still missing:', missing);
        } else {
            console.log('🎉 SUCCESS: ALL 96 SUBCOMPONENTS NOW HAVE REAL-WORLD EXAMPLES!');
            console.log('The education tab will now display 6 real company examples for each subcomponent.');
        }
    }
})();