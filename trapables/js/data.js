/* ============================================================
   TRAPABLES — Product & Strain Data
   Update CURRENT_MENU to refresh what's available.
   All prices in USD. available:true = in stock now.
============================================================ */

const T = {

  /* ---- Contact ----------------------------------------- */
  phone:    '3473516973',
  phoneDisplay: '(347) 351-6973',
  cashapp:  '$Biggermoneyy1',
  venmo:    '@Trapables',
  zelle:    '347-351-6973',
  instagram:'https://www.instagram.com/trapables_/',
  email:    'trapables@nyctailblazers.com',

  /* ---- Strains ----------------------------------------- */
  // tier: value | mid | top | aaa | trapables
  // type: indica | sativa | hybrid
  // vibe: wind-down | level-up | balance | feel-better | turn-up | top-shelf
  strains: [
    /* --- VALUE TIER ($15–$20 / 8th) ------------------- */
    {
      slug:'blue-zashimi', name:'Blue Zashimi', tier:'value', available:true,
      type:'hybrid', vibe:['wind-down','balance'],
      thc:'22–26%', cbd:'<1%',
      effects:['Relaxed','Happy','Sleepy','Euphoric'],
      terpenes:['Myrcene','Limonene','Ocimene'],
      flavors:['Blueberry','Berry','Sweet'],
      desc:'A chilled-out hybrid with blueberry sweetness and a smooth, body-relaxing effect.',
      prices:{ eighth:20, quarter:30, half:50, oz:80, qp:250 }
    },
    {
      slug:'gsc40', name:'GSC40', tier:'value', available:true,
      type:'hybrid', vibe:['balance','feel-better'],
      thc:'23–28%', cbd:'<1%',
      effects:['Happy','Relaxed','Euphoric','Creative'],
      terpenes:['Caryophyllene','Limonene','Humulene'],
      flavors:['Sweet','Mint','Earthy'],
      desc:'Girl Scout Cookies cut — full-body relaxation with a sweet, minty finish.',
      prices:{ eighth:20, quarter:30, half:50, oz:80, qp:250 }
    },
    {
      slug:'cherry-runtz', name:'Cherry Runtz', tier:'value', available:false,
      type:'hybrid', vibe:['turn-up','balance'],
      thc:'20–25%', cbd:'<1%',
      effects:['Euphoric','Giggly','Relaxed','Happy'],
      terpenes:['Limonene','Linalool','Myrcene'],
      flavors:['Cherry','Sweet','Fruity'],
      desc:'Bright cherry sweetness with a balanced head-and-body buzz. Fan favorite.',
      prices:{ eighth:20, quarter:35, half:60, oz:100, qp:250 }
    },
    {
      slug:'lcg', name:'LCG', tier:'value', available:false,
      type:'hybrid', vibe:['balance','feel-better'],
      thc:'24–29%', cbd:'<1%',
      effects:['Relaxed','Happy','Euphoric','Uplifted'],
      terpenes:['Terpinolene','Caryophyllene','Myrcene'],
      flavors:['Lemon','Cherry','Gelato','Sweet'],
      desc:'Lemon Cherry Gelato — one of our most popular cuts. Creamy citrus with a dreamy high.',
      prices:{ eighth:20, quarter:35, half:60, oz:100, qp:null }
    },
    {
      slug:'cherry-acai', name:'Cherry Acai', tier:'value', available:false,
      type:'indica', vibe:['wind-down','feel-better'],
      thc:'21–25%', cbd:'<1%',
      effects:['Relaxed','Sleepy','Happy','Body-high'],
      terpenes:['Myrcene','Linalool','Bisabolol'],
      flavors:['Cherry','Berry','Acai','Sweet'],
      desc:'Deep indica vibes with a berry-forward taste profile. Perfect for unwinding.',
      prices:{ eighth:20, quarter:30, half:50, oz:80, qp:250 }
    },
    {
      slug:'mean-green', name:'Mean Green', tier:'value', available:false,
      type:'sativa', vibe:['level-up','balance'],
      thc:'20–24%', cbd:'<1%',
      effects:['Energetic','Focused','Happy','Creative'],
      terpenes:['Limonene','Pinene','Terpinolene'],
      flavors:['Herbal','Pine','Earthy'],
      desc:'Classic sativa energy. Clean, green, and focused — perfect for daytime.',
      prices:{ eighth:20, quarter:35, half:60, oz:100, qp:300 }
    },
    {
      slug:'blueberry-pie', name:'Blueberry Pie', tier:'value', available:false,
      type:'indica', vibe:['wind-down','feel-better'],
      thc:'18–22%', cbd:'<1%',
      effects:['Relaxed','Happy','Sleepy','Hungry'],
      terpenes:['Myrcene','Linalool','Caryophyllene'],
      flavors:['Blueberry','Sweet','Pie crust','Vanilla'],
      desc:'Dessert-tier indica. Smells and tastes exactly like fresh blueberry pie.',
      prices:{ eighth:15, quarter:25, half:40, oz:75, qp:250 }
    },
    {
      slug:'98-gumbo', name:'98 Gumbo', tier:'value', available:false,
      type:'indica', vibe:['wind-down','feel-better'],
      thc:'22–27%', cbd:'<1%',
      effects:['Relaxed','Sleepy','Hungry','Euphoric'],
      terpenes:['Myrcene','Caryophyllene','Linalool'],
      flavors:['Garlic','Earthy','Herbal','Spicy'],
      desc:'Heavy OG genetics. Gassy, earthy, and deeply relaxing. A classic.',
      prices:{ eighth:15, quarter:25, half:40, oz:75, qp:250 }
    },
    {
      slug:'lemon-zinger', name:'Lemon Zinger', tier:'value', available:false,
      type:'sativa', vibe:['level-up','turn-up'],
      thc:'19–23%', cbd:'<1%',
      effects:['Uplifted','Energetic','Happy','Creative'],
      terpenes:['Limonene','Terpinolene','Pinene'],
      flavors:['Lemon','Citrus','Zesty','Sweet'],
      desc:'Bright lemon fuel that wakes you up and keeps the vibes high.',
      prices:{ eighth:15, quarter:25, half:40, oz:75, qp:null }
    },
    {
      slug:'sherb-cake', name:'Sherb Cake', tier:'value', available:false,
      type:'hybrid', vibe:['wind-down','balance'],
      thc:'20–24%', cbd:'<1%',
      effects:['Relaxed','Happy','Euphoric','Creative'],
      terpenes:['Caryophyllene','Limonene','Myrcene'],
      flavors:['Sherbet','Sweet','Creamy'],
      desc:'Sherbet × Wedding Cake. Sweet, creamy, and incredibly smooth smoke.',
      prices:{ eighth:10, quarter:20, half:40, oz:60, qp:null }
    },

    /* --- MID TIER ($25 / 8th) ------------------------- */
    {
      slug:'blasted-cherries', name:'Blasted Cherries', tier:'mid', available:true,
      type:'hybrid', vibe:['turn-up','balance'],
      thc:'24–28%', cbd:'<1%',
      effects:['Euphoric','Happy','Giggly','Relaxed'],
      terpenes:['Limonene','Myrcene','Linalool'],
      flavors:['Cherry','Berry','Sweet','Tropical'],
      desc:'Blasted with flavor. Cherry-forward hybrid that hits smooth and euphoric.',
      prices:{ eighth:25, quarter:40, half:60, oz:100, qp:350 }
    },
    {
      slug:'lemon-sangria', name:'Lemon Sangria', tier:'mid', available:true,
      type:'hybrid', vibe:['turn-up','level-up'],
      thc:'23–27%', cbd:'<1%',
      effects:['Uplifted','Happy','Euphoric','Relaxed'],
      terpenes:['Limonene','Linalool','Ocimene'],
      flavors:['Lemon','Citrus','Sweet','Fruit punch'],
      desc:'Sip on this one slow. Fruity, uplifting, and smooth like a summer drink.',
      prices:{ eighth:25, quarter:40, half:60, oz:100, qp:350 }
    },
    {
      slug:'raspberry-sorbet', name:'Raspberry Sorbet', tier:'mid', available:true,
      type:'hybrid', vibe:['balance','wind-down'],
      thc:'22–26%', cbd:'<1%',
      effects:['Happy','Relaxed','Euphoric','Calm'],
      terpenes:['Myrcene','Limonene','Terpinolene'],
      flavors:['Raspberry','Berry','Sweet','Sorbet'],
      desc:'Dessert hybrid that melts stress away with sweet raspberry vibes.',
      prices:{ eighth:25, quarter:40, half:60, oz:100, qp:350 }
    },
    {
      slug:'blue-taffy', name:'Blue Taffy', tier:'mid', available:true,
      type:'hybrid', vibe:['turn-up','balance'],
      thc:'23–27%', cbd:'<1%',
      effects:['Euphoric','Giggly','Happy','Creative'],
      terpenes:['Limonene','Caryophyllene','Linalool'],
      flavors:['Blue candy','Sweet','Berry','Taffy'],
      desc:'Stretchy candy sweetness with an uplifting social buzz. Perfect for the turn-up.',
      prices:{ eighth:25, quarter:40, half:60, oz:100, qp:350 }
    },
    {
      slug:'nerdz', name:'Nerdz', tier:'mid', available:false,
      type:'hybrid', vibe:['turn-up','level-up'],
      thc:'24–29%', cbd:'<1%',
      effects:['Euphoric','Happy','Creative','Talkative'],
      terpenes:['Limonene','Myrcene','Ocimene'],
      flavors:['Candy','Grape','Sweet','Fruity'],
      desc:'Hits like a bag of Nerds — sweet, colorful, and all the right vibes.',
      prices:{ eighth:25, quarter:40, half:70, oz:125, qp:null }
    },
    {
      slug:'chrome-candy', name:'Chrome Candy', tier:'mid', available:false,
      type:'hybrid', vibe:['balance','feel-better'],
      thc:'22–26%', cbd:'<1%',
      effects:['Relaxed','Happy','Euphoric','Body-high'],
      terpenes:['Caryophyllene','Myrcene','Limonene'],
      flavors:['Sweet','Candy','Earthy','Floral'],
      desc:'Smooth and polished. Chrome Candy delivers a balanced mind-body stone.',
      prices:{ eighth:25, quarter:40, half:70, oz:125, qp:null }
    },
    {
      slug:'blue-sluurpie', name:'Blue Sluurpie', tier:'mid', available:false,
      type:'hybrid', vibe:['turn-up','balance'],
      thc:'23–28%', cbd:'<1%',
      effects:['Euphoric','Giggly','Happy','Relaxed'],
      terpenes:['Limonene','Myrcene','Terpinolene'],
      flavors:['Blue slurpee','Candy','Berry','Ice'],
      desc:'Freeze dried flavor. Blue Sluurpie hits cold and sweet with an easy euphoria.',
      prices:{ eighth:25, quarter:40, half:70, oz:null, qp:null }
    },
    {
      slug:'grape-sorbet', name:'Grape Sorbet', tier:'mid', available:false,
      type:'hybrid', vibe:['wind-down','balance'],
      thc:'22–26%', cbd:'<1%',
      effects:['Relaxed','Happy','Sleepy','Calm'],
      terpenes:['Linalool','Myrcene','Caryophyllene'],
      flavors:['Grape','Berry','Sweet','Sorbet'],
      desc:'Dessert indica-leaning hybrid. Grape sweetness with a calming, settling effect.',
      prices:{ eighth:25, quarter:40, half:70, oz:125, qp:350 }
    },
    {
      slug:'designer-z-x-lcg', name:'Designer Z × LCG', tier:'mid', available:false,
      type:'hybrid', vibe:['balance','feel-better'],
      thc:'25–30%', cbd:'<1%',
      effects:['Euphoric','Relaxed','Happy','Creative'],
      terpenes:['Terpinolene','Limonene','Myrcene'],
      flavors:['Citrus','Cream','Sweet','Z-funk'],
      desc:'The collab strain. Designer Z crosses with LCG for a potent, creamy hybrid.',
      prices:{ eighth:25, quarter:40, half:70, oz:125, qp:350 }
    },
    {
      slug:'rainbow-runtz', name:'Rainbow Runtz', tier:'mid', available:false,
      type:'hybrid', vibe:['turn-up','balance'],
      thc:'23–27%', cbd:'<1%',
      effects:['Euphoric','Happy','Giggly','Relaxed'],
      terpenes:['Limonene','Ocimene','Myrcene'],
      flavors:['Candy','Fruity','Sweet','Tropical'],
      desc:'A rainbow of flavors in every hit. Runtz genetics that keep you smiling.',
      prices:{ eighth:20, quarter:35, half:55, oz:100, qp:325 }
    },
    {
      slug:'pink-rozay', name:'Pink Rozay', tier:'mid', available:false,
      type:'indica', vibe:['wind-down','turn-up'],
      thc:'21–25%', cbd:'<1%',
      effects:['Relaxed','Happy','Euphoric','Sleepy'],
      terpenes:['Myrcene','Linalool','Caryophyllene'],
      flavors:['Rose','Floral','Berry','Sweet'],
      desc:'Pour up. Pink Rozay is floral and relaxing — like rosé in smoke form.',
      prices:{ eighth:20, quarter:35, half:55, oz:100, qp:325 }
    },
    {
      slug:'black-cherry-gelato', name:'Black Cherry Gelato', tier:'mid', available:false,
      type:'hybrid', vibe:['wind-down','balance'],
      thc:'22–26%', cbd:'<1%',
      effects:['Relaxed','Happy','Euphoric','Sleepy'],
      terpenes:['Myrcene','Limonene','Linalool'],
      flavors:['Black cherry','Gelato','Sweet','Creamy'],
      desc:'Dark fruit meets Italian dessert. Smooth, flavorful, and deeply relaxing.',
      prices:{ eighth:20, quarter:35, half:55, oz:100, qp:325 }
    },
    {
      slug:'white-gummy', name:'White Gummy', tier:'mid', available:false,
      type:'hybrid', vibe:['balance','turn-up'],
      thc:'22–26%', cbd:'<1%',
      effects:['Happy','Euphoric','Relaxed','Creative'],
      terpenes:['Terpinolene','Limonene','Ocimene'],
      flavors:['White gummy bear','Sweet','Vanilla','Tropical'],
      desc:'Chewy sweetness and a clean, happy buzz. White Gummy is always a good call.',
      prices:{ eighth:25, quarter:40, half:70, oz:125, qp:null }
    },
    {
      slug:'candy-king', name:'Candy King', tier:'mid', available:false,
      type:'hybrid', vibe:['turn-up','level-up'],
      thc:'23–27%', cbd:'<1%',
      effects:['Euphoric','Happy','Energetic','Creative'],
      terpenes:['Limonene','Terpinolene','Caryophyllene'],
      flavors:['Candy','Sweet','Fruity','Bubblegum'],
      desc:'Royalty in the candy world. Sweet flavors with an upbeat, social high.',
      prices:{ eighth:25, quarter:40, half:70, oz:125, qp:325 }
    },
    {
      slug:'red-nerds', name:'Red Nerds', tier:'mid', available:false,
      type:'hybrid', vibe:['turn-up','level-up'],
      thc:'24–28%', cbd:'<1%',
      effects:['Euphoric','Happy','Giggly','Talkative'],
      terpenes:['Limonene','Myrcene','Ocimene'],
      flavors:['Strawberry','Candy','Sweet','Berry'],
      desc:'Red candy flavor with an uplifting, talkative high. Group session approved.',
      prices:{ eighth:20, quarter:35, half:60, oz:100, qp:null }
    },
    {
      slug:'jungle-pie', name:'Jungle Pie', tier:'mid', available:false,
      type:'hybrid', vibe:['balance','feel-better'],
      thc:'22–27%', cbd:'<1%',
      effects:['Relaxed','Happy','Euphoric','Calm'],
      terpenes:['Caryophyllene','Myrcene','Pinene'],
      flavors:['Earthy','Pine','Sweet','Herbal'],
      desc:'Deep tropical earthiness from Jungle Boys genetics. Grounding and smooth.',
      prices:{ eighth:20, quarter:35, half:60, oz:100, qp:null }
    },
    {
      slug:'italian-icy', name:'Italian Icy', tier:'mid', available:false,
      type:'hybrid', vibe:['turn-up','level-up'],
      thc:'23–27%', cbd:'<1%',
      effects:['Euphoric','Creative','Happy','Uplifted'],
      terpenes:['Limonene','Terpinolene','Ocimene'],
      flavors:['Citrus','Lemon ice','Sweet','Herbal'],
      desc:'Fresh like Italian ice on a hot day. Citrus-forward and creatively uplifting.',
      prices:{ eighth:25, quarter:40, half:75, oz:125, qp:null }
    },
    {
      slug:'pink-truffles', name:'Pink Truffles', tier:'mid', available:false,
      type:'indica', vibe:['wind-down','feel-better'],
      thc:'24–29%', cbd:'<1%',
      effects:['Relaxed','Sleepy','Euphoric','Body-high'],
      terpenes:['Myrcene','Linalool','Caryophyllene'],
      flavors:['Floral','Sweet','Earthy','Chocolate'],
      desc:'Premium indica energy wrapped in floral sweetness. A truffle experience.',
      prices:{ eighth:25, quarter:40, half:75, oz:125, qp:null }
    },
    {
      slug:'hawaiian-runtz', name:'Hawaiian Runtz', tier:'mid', available:false,
      type:'sativa', vibe:['level-up','turn-up'],
      thc:'21–25%', cbd:'<1%',
      effects:['Uplifted','Happy','Energetic','Creative'],
      terpenes:['Limonene','Terpinolene','Myrcene'],
      flavors:['Tropical','Pineapple','Sweet','Candy'],
      desc:'Aloha vibes in every hit. Tropical sativa with the Runtz sweetness.',
      prices:{ eighth:20, quarter:30, half:60, oz:100, qp:null }
    },
    {
      slug:'safari-punch', name:'Safari Punch', tier:'mid', available:false,
      type:'hybrid', vibe:['turn-up','level-up'],
      thc:'22–26%', cbd:'<1%',
      effects:['Happy','Euphoric','Energetic','Giggly'],
      terpenes:['Limonene','Myrcene','Ocimene'],
      flavors:['Tropical','Citrus','Sweet','Fruity'],
      desc:'Wild tropical flavors with a punchy, upbeat high that keeps you moving.',
      prices:{ eighth:20, quarter:30, half:60, oz:100, qp:null }
    },
    {
      slug:'combo-runtz', name:'Combo Runtz', tier:'mid', available:false,
      type:'hybrid', vibe:['balance','turn-up'],
      thc:'22–26%', cbd:'<1%',
      effects:['Euphoric','Happy','Relaxed','Creative'],
      terpenes:['Limonene','Caryophyllene','Myrcene'],
      flavors:['Mixed candy','Sweet','Fruity'],
      desc:'Best of multiple Runtz genetics in one. A combo pack of flavors and effects.',
      prices:{ eighth:25, quarter:40, half:70, oz:125, qp:null }
    },
    {
      slug:'blue-widow', name:'Blue Widow', tier:'mid', available:false,
      type:'hybrid', vibe:['balance','feel-better'],
      thc:'20–24%', cbd:'<1%',
      effects:['Relaxed','Happy','Euphoric','Focused'],
      terpenes:['Myrcene','Pinene','Caryophyllene'],
      flavors:['Blueberry','Earthy','Sweet','Pine'],
      desc:'White Widow × Blueberry. A classic hybrid with a smooth, balanced effect.',
      prices:{ eighth:25, quarter:40, half:70, oz:125, qp:null }
    },
    {
      slug:'sweet-escape', name:'Sweet Escape', tier:'mid', available:false,
      type:'hybrid', vibe:['wind-down','balance'],
      thc:'22–26%', cbd:'<1%',
      effects:['Relaxed','Happy','Calm','Sleepy'],
      terpenes:['Linalool','Myrcene','Limonene'],
      flavors:['Sweet','Candy','Floral','Light'],
      desc:'A gentle getaway. Sweet and smooth with a slow, calming effect.',
      prices:{ eighth:25, quarter:40, half:70, oz:125, qp:350 }
    },

    /* --- TOP TIER ($30–$35 / 8th) --------------------- */
    {
      slug:'suga-babies', name:'Suga Babies', tier:'top', available:true,
      type:'hybrid', vibe:['balance','wind-down'],
      thc:'26–31%', cbd:'<1%',
      effects:['Relaxed','Euphoric','Happy','Hungry'],
      terpenes:['Caryophyllene','Myrcene','Limonene'],
      flavors:['Sugar','Vanilla','Cream','Sweet'],
      desc:'High-potency hybrid. Sweet and creamy with a heavy, relaxing full-body effect.',
      prices:{ eighth:30, quarter:50, half:70, oz:125, qp:400 }
    },
    {
      slug:'purple-cadillac', name:'Purple Cadillac', tier:'top', available:true,
      type:'indica', vibe:['wind-down','feel-better'],
      thc:'27–32%', cbd:'<1%',
      effects:['Relaxed','Sleepy','Euphoric','Body-high'],
      terpenes:['Myrcene','Linalool','Caryophyllene'],
      flavors:['Grape','Purple','Sweet','Earthy'],
      desc:'Ride smooth in the Purple Cadillac. Deep indica with a luxurious, heavy high.',
      prices:{ eighth:30, quarter:50, half:70, oz:125, qp:400 }
    },
    {
      slug:'a1-wagyu', name:'A1 Wagyu', tier:'top', available:false,
      type:'hybrid', vibe:['feel-better','balance'],
      thc:'28–33%', cbd:'<1%',
      effects:['Relaxed','Happy','Euphoric','Body-high'],
      terpenes:['Caryophyllene','Myrcene','Limonene'],
      flavors:['Rich','Earthy','Gassy','Creamy'],
      desc:'Premium cut. A1 Wagyu is top-grade flower with a rich, full-body stone.',
      prices:{ eighth:30, quarter:50, half:80, oz:150, qp:275 }
    },
    {
      slug:'max-payne', name:'Max Payne', tier:'top', available:false,
      type:'indica', vibe:['wind-down','feel-better'],
      thc:'29–34%', cbd:'<1%',
      effects:['Relaxed','Sleepy','Euphoric','Numb'],
      terpenes:['Myrcene','Caryophyllene','Linalool'],
      flavors:['Gassy','Earthy','Pine','Dark'],
      desc:'Heavy-hitting indica. Max Payne lives up to its name — deep, numbing, powerful.',
      prices:{ eighth:35, quarter:70, half:null, oz:null, qp:null }
    },
    {
      slug:'pink-passion', name:'Pink Passion', tier:'top', available:false,
      type:'hybrid', vibe:['turn-up','wind-down'],
      thc:'26–30%', cbd:'<1%',
      effects:['Euphoric','Happy','Relaxed','Passionate'],
      terpenes:['Limonene','Linalool','Myrcene'],
      flavors:['Passionfruit','Pink candy','Floral','Tropical'],
      desc:'Sensual and sweet. Pink Passion brings euphoria with a floral tropical finish.',
      prices:{ eighth:35, quarter:60, half:100, oz:null, qp:350 }
    },
    {
      slug:'warheadz', name:'Warheadz', tier:'top', available:false,
      type:'sativa', vibe:['level-up','turn-up'],
      thc:'27–31%', cbd:'<1%',
      effects:['Energetic','Euphoric','Creative','Focused'],
      terpenes:['Limonene','Terpinolene','Caryophyllene'],
      flavors:['Sour candy','Citrus','Lime','Warhead'],
      desc:'Sour, powerful, and wired. Warheadz hits you with energy and laser focus.',
      prices:{ eighth:35, quarter:55, half:90, oz:160, qp:null }
    },
    {
      slug:'bx1', name:'Bx1', tier:'top', available:false,
      type:'hybrid', vibe:['balance','feel-better'],
      thc:'27–32%', cbd:'<1%',
      effects:['Relaxed','Euphoric','Happy','Creative'],
      terpenes:['Caryophyllene','Limonene','Myrcene'],
      flavors:['Gassy','Sweet','Earthy'],
      desc:'Bred genetics with a powerful, long-lasting balanced high.',
      prices:{ eighth:35, quarter:55, half:90, oz:160, qp:null }
    },
    {
      slug:'bx2', name:'BX2', tier:'top', available:false,
      type:'hybrid', vibe:['balance','feel-better'],
      thc:'28–33%', cbd:'<1%',
      effects:['Relaxed','Euphoric','Happy','Creative'],
      terpenes:['Caryophyllene','Myrcene','Ocimene'],
      flavors:['Gassy','Dank','Earthy','Sweet'],
      desc:'Second generation bred genetics. Elevated potency, deeper body effect.',
      prices:{ eighth:null, quarter:null, half:null, oz:null, qp:300 }
    },
    {
      slug:'melted-marshmallow', name:'Melted Marshmallow', tier:'top', available:false,
      type:'indica', vibe:['wind-down','feel-better'],
      thc:'25–29%', cbd:'<1%',
      effects:['Relaxed','Sleepy','Happy','Mellow'],
      terpenes:['Myrcene','Linalool','Ocimene'],
      flavors:['Marshmallow','Vanilla','Sweet','Creamy'],
      desc:'Soft and melty. Marshmallow sweetness with a slow, sinking body stone.',
      prices:{ eighth:null, quarter:null, half:null, oz:null, qp:275 }
    },
    {
      slug:'cherry-squeeze', name:'Cherry Squeeze', tier:'top', available:false,
      type:'hybrid', vibe:['turn-up','balance'],
      thc:'25–29%', cbd:'<1%',
      effects:['Euphoric','Happy','Relaxed','Giggly'],
      terpenes:['Limonene','Myrcene','Caryophyllene'],
      flavors:['Cherry','Sweet','Citrus','Juicy'],
      desc:'Squeeze out the best vibes. Cherry Squeeze is juicy, sweet, and euphoric.',
      prices:{ eighth:null, quarter:null, half:null, oz:null, qp:350 }
    },

    /* --- AAA TIER ($40 / 8th) ------------------------- */
    {
      slug:'z-candy', name:'Z Candy', tier:'aaa', available:false,
      type:'hybrid', vibe:['top-shelf','turn-up'],
      thc:'29–34%', cbd:'<1%',
      effects:['Euphoric','Happy','Creative','Relaxed'],
      terpenes:['Limonene','Caryophyllene','Ocimene'],
      flavors:['Z-funk','Sweet','Candy','Earthy'],
      desc:'Triple-A genetics. Z Candy packs potency and flavor into elite-tier flower.',
      prices:{ eighth:40, quarter:65, half:125, oz:null, qp:null }
    },
    {
      slug:'king-louie', name:'King Louie', tier:'aaa', available:false,
      type:'indica', vibe:['top-shelf','wind-down'],
      thc:'28–33%', cbd:'<1%',
      effects:['Relaxed','Sleepy','Euphoric','Body-high'],
      terpenes:['Myrcene','Caryophyllene','Humulene'],
      flavors:['OG Kush','Pine','Earthy','Skunk'],
      desc:'Royal indica. King Louie OG demands respect — heavy, gassy, deeply sedating.',
      prices:{ eighth:40, quarter:65, half:125, oz:null, qp:null }
    },
    {
      slug:'x-factor', name:'X Factor', tier:'aaa', available:false,
      type:'hybrid', vibe:['top-shelf','balance'],
      thc:'30–35%', cbd:'<1%',
      effects:['Euphoric','Relaxed','Creative','Happy'],
      terpenes:['Terpinolene','Limonene','Caryophyllene'],
      flavors:['Mystery','Complex','Gassy','Sweet'],
      desc:'The wild card. X Factor brings the unknown — potent, complex, and unforgettable.',
      prices:{ eighth:40, quarter:65, half:125, oz:null, qp:null }
    },

    /* --- TRAPABLES BRAND ($65 / 8th) ------------------ */
    {
      slug:'gas-man', name:'Gas Man', tier:'trapables', available:false,
      type:'hybrid', vibe:['top-shelf','feel-better'],
      thc:'30–36%', cbd:'<1%',
      effects:['Euphoric','Relaxed','Potent','Body-high'],
      terpenes:['Caryophyllene','Myrcene','Limonene'],
      flavors:['Gassy','Diesel','Earthy','Pungent'],
      desc:'TRAPABLES EXCLUSIVE. Gas Man is the hardest hitter in the catalog. Pure gas.',
      prices:{ eighth:65, quarter:120, half:200, oz:375, qp:null }
    },
    {
      slug:'codeine-crazy', name:'Codeine Crazy', tier:'trapables', available:false,
      type:'indica', vibe:['top-shelf','wind-down'],
      thc:'30–35%', cbd:'<1%',
      effects:['Relaxed','Sleepy','Euphoric','Numb'],
      terpenes:['Myrcene','Linalool','Caryophyllene'],
      flavors:['Purple','Grape','Candy','Sweet'],
      desc:'TRAPABLES EXCLUSIVE. Codeine Crazy hits heavy, slow, and deep. Handle with care.',
      prices:{ eighth:65, quarter:120, half:200, oz:375, qp:null }
    },
    {
      slug:'cherry-bubblegum', name:'Cherry Bubblegum', tier:'trapables', available:false,
      type:'hybrid', vibe:['top-shelf','turn-up'],
      thc:'28–33%', cbd:'<1%',
      effects:['Euphoric','Happy','Giggly','Relaxed'],
      terpenes:['Limonene','Myrcene','Linalool'],
      flavors:['Cherry','Bubblegum','Sweet','Candy'],
      desc:'TRAPABLES EXCLUSIVE. House-grown cherry bubblegum that pops in every hit.',
      prices:{ eighth:65, quarter:120, half:null, oz:null, qp:null }
    },
    {
      slug:'strawberry-milkshake', name:'Strawberry Milkshake', tier:'trapables', available:false,
      type:'hybrid', vibe:['top-shelf','balance'],
      thc:'28–32%', cbd:'<1%',
      effects:['Happy','Relaxed','Euphoric','Creamy'],
      terpenes:['Myrcene','Linalool','Ocimene'],
      flavors:['Strawberry','Cream','Milkshake','Sweet'],
      desc:'TRAPABLES EXCLUSIVE. Thick, creamy, sweet. Strawberry Milkshake is dessert done right.',
      prices:{ eighth:65, quarter:120, half:null, oz:null, qp:null }
    },
    {
      slug:'soy-sauce', name:'Soy Sauce', tier:'trapables', available:false,
      type:'indica', vibe:['top-shelf','feel-better'],
      thc:'30–36%', cbd:'<1%',
      effects:['Relaxed','Euphoric','Body-high','Sedated'],
      terpenes:['Caryophyllene','Myrcene','Humulene'],
      flavors:['Savory','Umami','Dark','Earthy'],
      desc:'TRAPABLES EXCLUSIVE. Unusual and unforgettable. Soy Sauce is deeply potent.',
      prices:{ eighth:65, quarter:120, half:null, oz:null, qp:null }
    },
    {
      slug:'lemon-cherry-poppers', name:'Lemon Cherry Poppers', tier:'trapables', available:false,
      type:'hybrid', vibe:['top-shelf','level-up'],
      thc:'28–32%', cbd:'<1%',
      effects:['Euphoric','Creative','Happy','Uplifted'],
      terpenes:['Limonene','Terpinolene','Linalool'],
      flavors:['Lemon','Cherry','Candy','Pop'],
      desc:'TRAPABLES EXCLUSIVE. Pop the top on this one — citrus cherry explosion.',
      prices:{ eighth:65, quarter:null, half:null, oz:375, qp:null }
    },
    {
      slug:'diamond-runtz', name:'Diamond Runtz', tier:'trapables', available:false,
      type:'hybrid', vibe:['top-shelf','turn-up'],
      thc:'30–36%', cbd:'<1%',
      effects:['Euphoric','Happy','Relaxed','Creative'],
      terpenes:['Limonene','Caryophyllene','Myrcene'],
      flavors:['Diamond','Candy','Sweet','Fruity'],
      desc:'TRAPABLES EXCLUSIVE. Shining bright. Diamond Runtz is the crown jewel.',
      prices:{ eighth:null, quarter:null, half:null, oz:null, qp:450 }
    }
  ],

  /* ---- Non-Flower Products ----------------------------- */
  prerolls: [
    { name:'Pre-Roll Pack (4)', price:'$25', qty:'4 rolls', available:true },
    { name:'Pre-Roll Pack (8)', price:'$50', qty:'8 rolls', available:true },
    { name:'Pre-Roll Pack (20)', price:'$100', qty:'20 rolls', available:true }
  ],

  carts: [
    { name:'Oil Cartridge', size:'1G', price:'$30', available:true,
      desc:'Clean oil, smooth pull. Available in assorted strains — ask for current flavors.' }
  ],

  resin: [
    { name:'Live Resin', size:'1G',   price:'$15', available:true, desc:'Premium live resin concentrate.' },
    { name:'Live Resin', size:'3.5G', price:'$35', available:true, desc:'Half-8th of live resin — best value.' }
  ],

  edibles: [
    {
      slug:'thc-butter', name:'THC Butter', icon:'🧈',
      price:'Ask for pricing', available:true,
      desc:'House-made infused butter stick. 9 portioned segments — each segment contains 30mg THC. Full stick = 270mg THC. Use in any recipe that calls for butter.',
      dosing:'Beginners: start with 1 segment (30mg). Wait 2 hours before re-dosing.',
      effects:['Body-high','Relaxed','Euphoric','Long-lasting'],
      note:'No groggy feeling. No crash. Clean, euphoric, full-body effect.'
    },
    {
      slug:'thc-cooking-oil', name:'THC Cooking Oil', icon:'🫙',
      price:'Ask for pricing', available:true,
      desc:'Infused cooking oil — use anywhere you would use regular oil. Perfect for stir fry, sauces, and dressings.',
      dosing:'Start small. Oil distributes throughout the dish so dosing is per-serving.',
      effects:['Body-high','Relaxed','Euphoric'],
      note:'No groggy feeling. Clean, relaxing effect.'
    },
    {
      slug:'brownies', name:'THC Brownies', icon:'🍫',
      price:'Ask for pricing', available:true,
      desc:'House-made chocolate brownies, baked with our infused butter. Classic edible experience.',
      effects:['Euphoric','Happy','Relaxed','Hungry'],
      note:'No groggy feeling. Euphoric and clean.'
    },
    {
      slug:'cookies', name:'THC Cookies', icon:'🍪',
      price:'Ask for pricing', available:true,
      desc:'House-baked infused cookies in rotating flavors. Soft, sweet, and properly dosed.',
      effects:['Happy','Relaxed','Euphoric'],
      note:'No groggy feeling. Just right.'
    }
  ],

  infusions: [
    {
      slug:'protein-shake', name:'Protein Shake (THC)', icon:'💪',
      price:'Ask for pricing', available:true,
      desc:'THC-infused protein shake. Post-workout or anytime you want gains with good vibes. Blended smooth, tastes great.',
      note:'No groggy feeling. Just euphoric, relaxing, and clean.'
    },
    {
      slug:'pollo-guisao', name:'Pollo Guisao (Infused)', icon:'🍗',
      price:'Ask for pricing', available:'rotating',
      desc:'Puerto Rican slow-cooked chicken, infused with THC. Traditional recipe, elevated. Rotating special — ask about availability.',
      note:'No groggy feeling. Full-body relaxation with an appetite boost.'
    },
    {
      slug:'thc-breakfast', name:'THC Breakfast', icon:'🍳',
      price:'Ask for pricing', available:'rotating',
      desc:'Full breakfast infused with THC — eggs, sides, and more. Rotating menu. Ask what\'s cooking today.',
      note:'The cleanest way to start your morning.'
    }
  ],

  drinks: [
    {
      slug:'thc-drinks', name:'THC Infused Drinks', icon:'🥤',
      price:'Ask for pricing', available:'coming-soon',
      desc:'THC-infused beverages. Coming soon — DM @Trapables_ or text 347-351-6973 to ask about current availability.',
      note:'Ask about it. We got you.'
    }
  ],

  /* ---- Merch ------------------------------------------- */
  merch: [
    { slug:'hoodie',      name:'Trapables Hoodie',           price:60,  setPrice:null, setName:null,            icon:'🧥', sizes:['S','M','L','XL','XXL'] },
    { slug:'hoodie-set',  name:'Hoodie + Sweatpants Set',    price:100, setPrice:null, setName:null,            icon:'👕', sizes:['S','M','L','XL','XXL'] },
    { slug:'tshirt',      name:'Trapables T-Shirt',          price:35,  setPrice:55,   setName:'Tee + Shorts',  icon:'👕', sizes:['S','M','L','XL','XXL'] },
    { slug:'shorts-set',  name:'T-Shirt + Shorts Set',       price:55,  setPrice:null, setName:null,            icon:'🩳', sizes:['S','M','L','XL','XXL'] }
  ],

  /* ---- Vibe → Strain Mapping --------------------------- */
  vibeMap: {
    'wind-down':   { label:'Wind Down',    emoji:'😴', color:'#a78bfa', desc:'Relax, unwind, sleep. Indica-heavy.' },
    'level-up':    { label:'Level Up',     emoji:'⚡', color:'#39FF14', desc:'Energy, focus, creativity. Sativa vibes.' },
    'balance':     { label:'Find Balance', emoji:'🧘', color:'#38bdf8', desc:'Calm, centered, and clear.' },
    'feel-better': { label:'Feel Better',  emoji:'💊', color:'#fb923c', desc:'Pain, stress, anxiety relief.' },
    'turn-up':     { label:'Turn Up',      emoji:'🎉', color:'#BF5FFF', desc:'Social, euphoric, good times.' },
    'top-shelf':   { label:'Top Shelf',    emoji:'🔥', color:'#FFD700', desc:'TRAPABLES brand & AAA tier only.' }
  },

  /* ---- Size Labels ------------------------------------- */
  sizeLabels: { eighth:'3.5g', quarter:'7g', half:'14g', oz:'28g', qp:'112g' }

};
