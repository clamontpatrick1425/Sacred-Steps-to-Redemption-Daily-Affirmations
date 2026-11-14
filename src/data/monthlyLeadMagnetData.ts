/**
 * Sacred Steps to Redemption - Monthly Free Sample Lead Magnet Data
 * Complete 12-Month Dataset matching the Official Curriculum & Brandbook v1.0
 * Voice: C. Lamont Patrick (A redeemed friend sharing hope from the battlefield)
 */

export interface LeadMagnetStep {
  stepNumber: number;
  title: string;
  instruction: string;
  prompt: string;
  exampleHint?: string;
  defaultLinesCount?: number;
}

export interface MonthlyLeadMagnetData {
  monthNumber: number;
  monthName: string;
  monthTheme: string;
  monthThemeUppercase: string;
  dayNumber: number;
  dailyTheme: string;
  scriptureReference: string;
  scriptureText: string;
  authorLetter: string[];
  whatThisMeans: string[];
  theLie: string;
  theTruth: string;
  embraceAffirmation: string;
  practiceActionStep: string;
  reflectionQuestions: string[];
  conversationalPrayer: string;
  exerciseName: string;
  exerciseSubtitle: string;
  exerciseTraumaIntro: string;
  exerciseSteps: LeadMagnetStep[];
  authorEncouragementQuote: string;
  journalSubtitle: string;
  journalPageCount: number;
  journalSlug: string;
}

export const MONTHLY_LEAD_MAGNET_DATA: Record<number, MonthlyLeadMagnetData> = {
  1: {
    monthNumber: 1,
    monthName: 'January',
    monthTheme: 'Identity',
    monthThemeUppercase: 'IDENTITY',
    dayNumber: 1,
    dailyTheme: 'The Label Release',
    scriptureReference: 'Isaiah 43:18-19',
    scriptureText: 'Remember ye not the former things, neither consider the things of old. Behold, I will do a new thing; now it shall spring forth; shall ye not know it? I will even make a way in the wilderness, and rivers in the desert.',
    authorLetter: [
      'I remember sitting on the edge of a stained mattress years ago, convinced that my name was the sum total of my worst mistakes. Addict. Liar. Disappointment. The world had stamped those names across my chest, but the worst part was that I agreed with them. I thought God looked at me with folded arms and a furrowed brow.',
      'There was a morning when the sun cracked through a broken window blind, and this scripture caught my throat. God wasn\'t telling me to pretend my past never happened. He was telling me that my past was no longer allowed to sit in the driver’s seat. He was doing something brand new in the dry places.',
      'If you picked up this guide feeling tired, weary of pretending, or afraid you’re too damaged to mend—take a breath. Sit down with me. You don’t have to prove anything here. Just let God hand you back your true name today.'
    ],
    whatThisMeans: [
      'In active struggle or the aftermath of trauma, our memories become prison wardens. We replay the conversations where we failed, the promises we broke, and the moments we wish we could tear out of our story. We begin to think that God is constrained by our history.',
      'Isaiah spoke these words to a people in exile who had lost their home and their dignity. God did not begin by enumerating their failures. He said, "Stop staring backward." When God makes a river in your desert, the sand does not get a vote. Grace overrides the ruin.'
    ],
    theLie: 'I will always be defined by the worst thing I ever did.',
    theTruth: 'In Christ, I am a new creation; the old records are cancelled at the cross.',
    embraceAffirmation: 'I am not my wreckage. I am God\'s beloved child, held in sovereign mercy.',
    practiceActionStep: 'Take one index card or paper scrap. Write down one ugly label you carry. Tear it into four pieces and throw it in the trash.',
    reflectionQuestions: [
      'What is the oldest false label you still hear whispering when you are alone?',
      'If you truly believed God delighted in you right now, what weight would you put down?',
      'What would taking one honest step into "newness" look like before sunset?'
    ],
    conversationalPrayer: 'Lord, today I confess how tightly I hold on to old names. I have let my shame introduce me before Your grace could speak. Unclench my fists. Give me the holy courage to believe that You make rivers right here in my dry places. In Jesus\' name, Amen.',
    exerciseName: 'The Label Release',
    exerciseSubtitle: 'A Trauma-Informed Exercise for Identity',
    exerciseTraumaIntro: 'Before you begin, place both feet flat on the floor. Take one slow breath in through your nose, and let it out gently. If examining past labels stirs up anxiety, pause. You are safe in this room. God is with you.',
    exerciseSteps: [
      {
        stepNumber: 1,
        title: 'Naming the Heavy Word',
        instruction: 'Identify one word or phrase that shame or someone from your past pinned on you. Speak the secret out loud onto paper.',
        prompt: 'The false label I have been dragging around is...',
        exampleHint: 'Examples: "Unworthy," "Failure," "Too broken," "Selfish"'
      },
      {
        stepNumber: 2,
        title: 'The Truth Exchange',
        instruction: 'Look at the cross. Search Scripture for the name Jesus gives you. Exchange the lie for what God actually says about you.',
        prompt: 'God\'s word over me replaces that lie with this truth...',
        exampleHint: 'Examples: "Chosen," "Redeemed," "Forgiven," "Sought after"'
      },
      {
        stepNumber: 3,
        title: 'The Anchor Practice',
        instruction: 'Write out one sentence you will repeat aloud every time the old label tries to enter your mind today.',
        prompt: 'My anchor affirmation for today is...',
        exampleHint: 'Example: "I am who God says I am, not who shame says I was."'
      }
    ],
    authorEncouragementQuote: 'You cannot step into where God is leading you while keeping both eyes fixed on what you left behind.',
    journalSubtitle: 'Reclaiming Your Divine Image Beneath Old Labels',
    journalPageCount: 124,
    journalSlug: 'january-identity'
  },

  2: {
    monthNumber: 2,
    monthName: 'February',
    monthTheme: 'Grace',
    monthThemeUppercase: 'GRACE',
    dayNumber: 29,
    dailyTheme: 'The Guilt vs. Shame Sort',
    scriptureReference: 'Romans 5:20-21',
    scriptureText: 'Moreover the law entered, that the offence might abound. But where sin abounded, grace did much more abound: That as sin hath reigned unto death, even so might grace reign through righteousness unto eternal life by Jesus Christ our Lord.',
    authorLetter: [
      'For years, I didn\'t understand the difference between guilt and shame. Guilt told me, "You did something wrong." Shame whispered into the dark, "You ARE something wrong." Guilt can be a gentle nudge from the Holy Spirit leading to repentance; shame is a toxic poison that makes you hide in the bushes like Adam.',
      'My journey taught me that grace doesn\'t just match our wreckage—it swallows it whole. The Greek word Paul uses in Romans 5:20 means grace "hyper-abounded." It overflowed like a tidal wave crashing over a thimble of mud.',
      'If you have been punishing yourself because you think God\'s mercy ran out of steam, stop. Lay the gavel down. You make a terrible judge, and the real Judge has already declared you pardoned.'
    ],
    whatThisMeans: [
      'Conviction points to a behavior that hurts you and others, and points toward an open door called restoration. Shame, on the other hand, claims the core of you is inherently toxic. Shame says you will never change.',
      'Grace does not ignore our sin; it pays the debt and then adopts the debtor. God\'s grace is not fragile. It did not flinch when you hit rock bottom, and it will not flinch on a Tuesday when you feel weak.'
    ],
    theLie: 'God has forgiven others, but my sins are too filthy for full pardon.',
    theTruth: 'Where my failures abounded, God\'s grace super-abounded. The ledger is clean.',
    embraceAffirmation: 'I accept God\'s forgiveness and I choose to stop punishing myself.',
    practiceActionStep: 'When a self-accusing thought strikes today, pause and say out loud: "Guilt is paid for; shame has no home here."',
    reflectionQuestions: [
      'In what area of your life are you still acting as your own harsh prosecutor?',
      'What is the difference between feeling healthy sorrow and wallowing in toxic self-loathing?',
      'How does picturing God\'s overflowing grace change the way you face this afternoon?'
    ],
    conversationalPrayer: 'Lord, today I hand You the gavel. I have judged myself more harshly than You ever asked me to. Wash away the lingering residue of toxic shame. Let Your grace flood into the corners where I still hide. In Jesus\' name, Amen.',
    exerciseName: 'The Guilt vs. Shame Sort',
    exerciseSubtitle: 'A Trauma-Informed Exercise for Grace',
    exerciseTraumaIntro: 'Take a soft breath. Remember: Conviction brings hope of change; shame brings despair and paralysis. You are not broken beyond repair.',
    exerciseSteps: [
      {
        stepNumber: 1,
        title: 'Identifying the Accusation',
        instruction: 'Write out the specific thought that made you want to hide or isolate recently.',
        prompt: 'The self-punishing accusation in my head is...',
        exampleHint: 'Example: "I messed up again, so I am completely unlovable."'
      },
      {
        stepNumber: 2,
        title: 'Sorting the Voice',
        instruction: 'Ask yourself: Is this conviction (pointing to healing) or shame (destroying your worth)? Cross out the shame.',
        prompt: 'What about this thought is toxic shame, and what is the real truth?',
        exampleHint: 'Example: "The action was a mistake, but my soul belongs to Christ."'
      },
      {
        stepNumber: 3,
        title: 'Receiving the Pardon',
        instruction: 'Write a declaration accepting that Christ\'s blood covered this exact circumstance 2,000 years ago.',
        prompt: 'Because grace abounds over this, I choose to...',
        exampleHint: 'Example: "Receive mercy today and treat myself with God\'s gentle patience."'
      }
    ],
    authorEncouragementQuote: 'Grace does not negotiate with your past. It simply outshines it.',
    journalSubtitle: 'Walking in the Freedom of Pre-Approved Mercy',
    journalPageCount: 120,
    journalSlug: 'february-grace'
  },

  3: {
    monthNumber: 3,
    monthName: 'March',
    monthTheme: 'Faith',
    monthThemeUppercase: 'FAITH',
    dayNumber: 61,
    dailyTheme: 'The "Open Hands" Release',
    scriptureReference: 'Proverbs 3:5-6',
    scriptureText: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    authorLetter: [
      'There was a time when I thought faith was a feeling of certainty. I thought if I worried enough, planned enough, and controlled everyone around me, I could prevent the sky from falling. In reality, my white-knuckled grip was just fear wearing a mask of productivity.',
      'My journey taught me that surrender is not giving up; it is giving over. When my fists were clenched around my outcomes, my hands were too full to receive what God had prepared for me.',
      'Today, we practice opening our hands. It sounds simple, but for someone in recovery, letting go of control feels like stepping off a cliff. Trust the Father\'s hands beneath you.'
    ],
    whatThisMeans: [
      'Our "own understanding" is shaped by past trauma, broken promises, and survival mechanisms. It tells us that if we don\'t control every detail, disaster will strike. Solomon reminds us that our perspective is too narrow to steer our lives.',
      'Trusting the Lord with all your heart does not mean you have zero questions; it means you trust the Shepherd more than the fog. When we acknowledge Him in the messy middle, He straightens the crooked path.'
    ],
    theLie: 'If I let go of control, everything will collapse into ruin.',
    theTruth: 'God is far better at running my life and my recovery than I ever was.',
    embraceAffirmation: 'I release what I cannot control and I rest in the Father\'s unfailing care.',
    practiceActionStep: 'Physically open your hands palms-up on your lap for 60 seconds. Name one person or fear you release to God.',
    reflectionQuestions: [
      'What situation are you white-knuckling right now out of fear?',
      'What has trying to control everything cost your peace of mind and relationships?',
      'What would it feel like to leave that outcome in God\'s hands for just the next 24 hours?'
    ],
    conversationalPrayer: 'Lord, today my knuckles are white. I want to control people, circumstances, and tomorrow\'s headlines. But You are God, and I am not. I open my hands right now. Take what I cannot carry, and direct my next quiet step. In Jesus\' name, Amen.',
    exerciseName: 'The "Open Hands" Release',
    exerciseSubtitle: 'A Trauma-Informed Exercise for Faith',
    exerciseTraumaIntro: 'Notice your posture. Are your shoulders hunched? Is your jaw clenched? Let your breath sink into your belly. Surrender is not surrender to danger; it is surrender to Love.',
    exerciseSteps: [
      {
        stepNumber: 1,
        title: 'Naming the Heavy Burden',
        instruction: 'Write down the single outcome or person you have been trying to manipulate or control.',
        prompt: 'The situation I am terrified of losing control over is...',
        exampleHint: 'Example: "My finances next month," "My spouse\'s reaction," "My job review"'
      },
      {
        stepNumber: 2,
        title: 'Acknowledging My Human Limit',
        instruction: 'Honestly admit what is outside your power and what belongs exclusively to God.',
        prompt: 'I cannot control..., but I can choose to trust God with...',
        exampleHint: 'Example: "I cannot control their feelings, but I can control my honesty."'
      },
      {
        stepNumber: 3,
        title: 'The Altar Transfer',
        instruction: 'Mentally place this burden on God\'s altar and write your commitment of surrender.',
        prompt: 'Right now, I place this in Your hands and choose to...',
        exampleHint: 'Example: "Stop obsessing and focus on doing the next right thing today."'
      }
    ],
    authorEncouragementQuote: 'Faith is not the absence of doubt. It is the willingness to walk forward with trembling hands.',
    journalSubtitle: 'Surrendering Control One Quiet Step at a Time',
    journalPageCount: 128,
    journalSlug: 'march-faith'
  },

  4: {
    monthNumber: 4,
    monthName: 'April',
    monthTheme: 'Freedom',
    monthThemeUppercase: 'FREEDOM',
    dayNumber: 92,
    dailyTheme: 'The Stronghold Inventory',
    scriptureReference: '2 Corinthians 10:4-5',
    scriptureText: '(For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds;) Casting down imaginations, and every high thing that exalteth itself against the knowledge of God, and bringing into captivity every thought to the obedience of Christ.',
    authorLetter: [
      'I spent years fighting spiritual battles with physical weapons. I made lists of rules, grit my teeth, and tried to out-discipline my cravings. It never lasted. A stronghold isn\'t just a bad habit; it is a fortress of lies built in the mind, brick by brick, over decades.',
      'I remember realizing that my strongest trigger wasn\'t the substance or the habit—it was the lie that told me I needed it to survive the pain. The moment we bring that thought into the daylight of Christ, the fortress loses its walls.',
      'Today, we don\'t fight for victory; we fight from the victory Christ already won. Let’s take an honest inventory of the thoughts running through your head.'
    ],
    whatThisMeans: [
      'In biblical times, a stronghold was a fortified stone tower where soldiers retreated when under siege. In our minds, strongholds are thought patterns, belief systems, and automatic reactions that protect our old coping mechanisms.',
      'God gives us weapons that actually dismantle these mental towers: truth, prayer, vulnerability, and community. We don\'t have to entertain every rogue thought that enters our mind. We have divine authority to arrest it and replace it with Christ.'
    ],
    theLie: 'This coping habit is the only thing that can soothe my inner ache.',
    theTruth: 'Christ is my refuge, and His Spirit gives me power over every mental stronghold.',
    embraceAffirmation: 'I am not captive to my impulses. I have the mind of Christ and power to choose life.',
    practiceActionStep: 'Notice the very first recurring negative thought you have today. Catch it, say "Arrested in Jesus\' name," and replace it with Scripture.',
    reflectionQuestions: [
      'What thought pattern serves as the doorway to your old habits or isolation?',
      'How does the lie you tell yourself look when exposed to the pure light of God’s Word?',
      'Who is one safe person you can share this battle with so you aren’t fighting alone?'
    ],
    conversationalPrayer: 'Lord, today I pull down every mental tower built on fear and deception. Forgive me for running to broken cisterns for comfort. Give me discernment to catch toxic thoughts before they become actions. Anchor my mind in Your peace. In Jesus\' name, Amen.',
    exerciseName: 'The Stronghold Inventory',
    exerciseSubtitle: 'A Trauma-Informed Exercise for Freedom',
    exerciseTraumaIntro: 'Examining triggers requires gentleness. If your body tenses or your heart races, pause. Place your hand over your heart. You are in recovery now; the old habits do not own you.',
    exerciseSteps: [
      {
        stepNumber: 1,
        title: 'Spotting the Brick',
        instruction: 'Identify the thought loop that always precedes a slide into numbing or resentment.',
        prompt: 'The habitual lie that builds a stronghold in my thinking is...',
        exampleHint: 'Example: "Nobody cares if I slip," "I can\'t handle this stress alone"'
      },
      {
        stepNumber: 2,
        title: 'Demolishing the Wall',
        instruction: 'Contrast that lie with a concrete promise of God.',
        prompt: 'God\'s hammer of truth breaks this lie because...',
        exampleHint: 'Example: "God promises He will never leave me or forsake me (Hebrews 13:5)."'
      },
      {
        stepNumber: 3,
        title: 'Building the Sanctuary',
        instruction: 'What healthy, God-honoring boundary will you establish to guard your freedom today?',
        prompt: 'My proactive step of freedom today is...',
        exampleHint: 'Example: "Calling my accountability partner as soon as cravings stir."'
      }
    ],
    authorEncouragementQuote: 'True freedom isn\'t doing whatever you feel like doing. It is having the power to do what God created you to do.',
    journalSubtitle: 'Dismantling Mindsets of Bondage & Relapse Fears',
    journalPageCount: 120,
    journalSlug: 'april-freedom'
  },

  5: {
    monthNumber: 5,
    monthName: 'May',
    monthTheme: 'Healing',
    monthThemeUppercase: 'HEALING',
    dayNumber: 122,
    dailyTheme: 'Tending the Wound',
    scriptureReference: 'Psalm 147:3',
    scriptureText: 'He healeth the broken in heart, and bindeth up their wounds.',
    authorLetter: [
      'For a long time, I treated my emotional wounds like broken glass hidden under a rug. I thought if I didn\'t talk about them, didn\'t look at them, and kept walking forward with a forced smile, they would magically disappear. But unhealed wounds don\'t disappear—they fester, and they leak out on the people we love.',
      'My journey taught me that Jesus isn\'t a harsh doctor who scolds you for having cuts. He is the Great Physician who kneels in the dirt with clean bandages and soothing oil. He doesn\'t rush our grief.',
      'Healing takes time. Give yourself permission to be in process today. A bandaged wound is not a sign of weakness; it is proof that healing has already begun.'
    ],
    whatThisMeans: [
      'The Hebrew word used in Psalm 147 for "bindeth up" implies tender, individualized care—the way a loving parent wraps gauze around a scraped knee. God is not distant from your heartbreak; He is closest to the pieces.',
      'We often turn to addictions or unhealthy relationships because we are desperately trying to medicate an unacknowledged wound. When we bring the real injury to Jesus, the counterfeit pain-relievers lose their appeal.'
    ],
    theLie: 'My emotional wounds are too deep and old to ever truly heal.',
    theTruth: 'The Lord is close to the brokenhearted; He binds my wounds with tender mercy.',
    embraceAffirmation: 'I am safe to grieve, safe to heal, and safe in the hands of my Savior.',
    practiceActionStep: 'Speak to yourself today with the same compassion Jesus shows you. When you feel tender or sad, don’t scold yourself.',
    reflectionQuestions: [
      'What past hurt have you been pretending doesn\'t hurt anymore?',
      'How has trying to numb this wound driven unhealthy habits in your past?',
      'What would it look like to allow Jesus to sit with you in that memory without fear?'
    ],
    conversationalPrayer: 'Lord, today I stop running from my sore spots. You know every tear I have ever shed in the dark. Come into the places where I feel fractured. Bind up my heart with Your gentle love. Give me patience with my own healing journey. In Jesus\' name, Amen.',
    exerciseName: 'Tending the Wound',
    exerciseSubtitle: 'A Trauma-Informed Exercise for Healing',
    exerciseTraumaIntro: 'Go at your own pace. You do not need to re-live traumatic events in detail. We are simply bringing the tenderness into God\'s presence. Take three slow breaths.',
    exerciseSteps: [
      {
        stepNumber: 1,
        title: 'Acknowledging the Hurt',
        instruction: 'Acknowledge without judgment where your soul feels tired, bruised, or grieved.',
        prompt: 'The quiet ache or grief I have been carrying recently is...',
        exampleHint: 'Example: "Grief over lost years," "The pain of betrayal from someone I trusted"'
      },
      {
        stepNumber: 2,
        title: 'The Balm of Gilead',
        instruction: 'Picture Jesus standing right beside you in that pain, offering His comfort.',
        prompt: 'When Jesus looks at this wound, He says to me...',
        exampleHint: 'Example: "I see your tears, child. You are not forsaken. I am holding you."'
      },
      {
        stepNumber: 3,
        title: 'Gentle Self-Care',
        instruction: 'Choose one small, restorative act of kindness for your body or spirit today.',
        prompt: 'To care for my healing soul today, I will...',
        exampleHint: 'Example: "Take a quiet walk in nature without my phone," "Go to sleep early"'
      }
    ],
    authorEncouragementQuote: 'Scars are not monuments to your shame. They are quiet testaments to the God who healed you.',
    journalSubtitle: 'Mending Past Trauma and Relational Wounds',
    journalPageCount: 128,
    journalSlug: 'may-healing'
  },

  6: {
    monthNumber: 6,
    monthName: 'June',
    monthTheme: 'Discipline',
    monthThemeUppercase: 'DISCIPLINE',
    dayNumber: 153,
    dailyTheme: 'The Feeling vs. Fact Check',
    scriptureReference: '2 Corinthians 7:10',
    scriptureText: 'For godly sorrow worketh repentance to salvation not to be repented of: but the sorrow of the world worketh death.',
    authorLetter: [
      'I used to hate the word "discipline." To me, discipline felt like punishment, rules, and being sent to my room. In my old life, my feelings were my gods. If I felt lonely, I used. If I felt angry, I lashed out. If I felt hopeless, I gave up.',
      'My journey taught me that holy discipline is not a prison cell; it is a guardrail on a mountain road. It keeps you from driving off the cliff when the fog rolls in. Our feelings are real, but they are terrible guides.',
      'Today, we learn to check our feelings against God\'s facts. You don\'t have to feel strong to make a righteous choice. Grace gives you the power to choose obedience even when your emotions are throwing a tantrum.'
    ],
    whatThisMeans: [
      'Worldly sorrow is self-absorbed regret that leads to despair: "Look what a failure I am." Godly sorrow, however, is clear-eyed and hopeful: "I broke trust, but God\'s grace leads me to make it right."',
      'Discipline in recovery is simply doing the next right thing whether we feel like it or not. When we train our minds to anchor on God\'s Word instead of our fluctuating mood, we build a life that stands against the storm.'
    ],
    theLie: 'If I don\'t feel motivated or holy, my recovery efforts are pointless.',
    theTruth: 'Faith is anchored in God\'s promises, not in my temporary emotional weather.',
    embraceAffirmation: 'I act in obedience to God\'s truth, and my feelings will follow in His time.',
    practiceActionStep: 'Complete one small constructive task you have been putting off for more than three days.',
    reflectionQuestions: [
      'What feeling has been trying to dictate your decisions over the last 48 hours?',
      'How have you confused emotional whims with God’s truth in the past?',
      'What simple daily habit protects your sobriety and peace more than any other?'
    ],
    conversationalPrayer: 'Lord, today I submit my wandering feelings to Your steadfast truth. When my emotions tell me to quit or indulge, remind me of Your promises. Grant me holy discipline to take the next right step, even when my heart feels weary. In Jesus\' name, Amen.',
    exerciseName: 'The Feeling vs. Fact Check',
    exerciseSubtitle: 'A Trauma-Informed Exercise for Discipline',
    exerciseTraumaIntro: 'Feelings are data, not directives. You can feel fear and still walk forward. Breathe deeply and notice that you are in control of your next choice.',
    exerciseSteps: [
      {
        stepNumber: 1,
        title: 'Capturing the Feeling',
        instruction: 'Name the turbulent emotion that is currently threatening your resolve or focus.',
        prompt: 'The overwhelming feeling tempting me to act out or isolate is...',
        exampleHint: 'Example: "I feel completely overwhelmed and invisible."'
      },
      {
        stepNumber: 2,
        title: 'The Eternal Fact',
        instruction: 'Write out the objective biblical fact that stands true regardless of your emotions.',
        prompt: 'The unchanging fact from God\'s Word is...',
        exampleHint: 'Example: "God\'s grace is sufficient for me; His power is made perfect in weakness."'
      },
      {
        stepNumber: 3,
        title: 'The Disciplined Action',
        instruction: 'What is one concrete, faithful action you will take right now despite that emotion?',
        prompt: 'Regardless of how I feel, right now I choose to...',
        exampleHint: 'Example: "Attend my recovery meeting and share honestly."'
      }
    ],
    authorEncouragementQuote: 'Discipline is simply choosing what you want most over what you want right now.',
    journalSubtitle: 'Sacred Habits that Protect Your Sobriety',
    journalPageCount: 124,
    journalSlug: 'june-discipline'
  },

  7: {
    monthNumber: 7,
    monthName: 'July',
    monthTheme: 'Courage',
    monthThemeUppercase: 'COURAGE',
    dayNumber: 184,
    dailyTheme: 'The Avoidance Audit',
    scriptureReference: 'John 8:31-32',
    scriptureText: 'Then said Jesus to those Jews which believed on him, If ye continue in my word, then are ye my disciples indeed; And ye shall know the truth, and the truth shall make you free.',
    authorLetter: [
      'I was a master of avoidance. I could avoid opening mail for six months. I could avoid an honest conversation with my family for years. I thought if I didn\'t confront the hard things, I was keeping the peace. But it wasn\'t peace; it was a ceasefire fueled by dread.',
      'My journey taught me that avoidance feeds fear. Every time we run from a truth, the monster grows in the dark. The moment we turn around, face it, and shine the light of Christ into its eyes, we realize it was mostly shadows.',
      'Courage is not fearlessness. Courage is your knees shaking while you still pick up the phone, make the confession, or open the door. Christ is with you in every brave step.'
    ],
    whatThisMeans: [
      'Jesus said the truth makes us free, but truth often makes us uncomfortable first. Freedom requires radical honesty about our finances, our relationships, our triggers, and our hearts.',
      'When we stop running, God\'s strength meets us on the battlefield. You do not have to fix everything today; you only have to stop hiding from what is real.'
    ],
    theLie: 'If I face the things I have been avoiding, it will destroy what little peace I have left.',
    theTruth: 'Walking in the light brings real freedom; hiding only prolongs the bondage.',
    embraceAffirmation: 'I am equipped with God\'s courage to face hard truths with humility and hope.',
    practiceActionStep: 'Identify one conversation, bill, or task you have avoided this week. Take one direct action on it today.',
    reflectionQuestions: [
      'What are you currently avoiding because it feels too uncomfortable or frightening?',
      'What toll is the act of avoiding taking on your mental energy and spiritual walk?',
      'What truth is God asking you to speak or face with His loving presence today?'
    ],
    conversationalPrayer: 'Lord, today I stop running. I confess the situations I have hidden from because I was afraid. Pour Your holy courage into my spine. Give me the grace to face the truth, knowing that Your hand will hold me through every second of it. In Jesus\' name, Amen.',
    exerciseName: 'The Avoidance Audit',
    exerciseSubtitle: 'A Trauma-Informed Exercise for Courage',
    exerciseTraumaIntro: 'Confronting avoidance can bring a knot in the stomach. That knot is just energy waiting to be redirected into courage. Unclench your jaw and take two deep breaths.',
    exerciseSteps: [
      {
        stepNumber: 1,
        title: 'Listing the Avoided Truth',
        instruction: 'Name the specific conversation, responsibility, or amend you have been dodging.',
        prompt: 'The situation I have been actively avoiding is...',
        exampleHint: 'Example: "Having an honest talk with my spouse about my debt."'
      },
      {
        stepNumber: 2,
        title: 'Examining the Fear',
        instruction: 'What is the catastrophe you imagine will happen if you face this head-on?',
        prompt: 'The worst-case scenario fear in my head is...',
        exampleHint: 'Example: "They will reject me completely and leave."'
      },
      {
        stepNumber: 3,
        title: 'The Brave First Step',
        instruction: 'What is the smallest micro-step you can take today to move toward truth?',
        prompt: 'Today, the small courageous step I will take is...',
        exampleHint: 'Example: "Drafting the email or scheduling the time to talk calmly."'
      }
    ],
    authorEncouragementQuote: 'Courage is fear that has said its prayers and decided to take the step anyway.',
    journalSubtitle: 'Honest Inventory, Tough Conversations & Amends',
    journalPageCount: 126,
    journalSlug: 'july-courage'
  },

  8: {
    monthNumber: 8,
    monthName: 'August',
    monthTheme: 'Forgiveness',
    monthThemeUppercase: 'FORGIVENESS',
    dayNumber: 214,
    dailyTheme: 'The Ledger Burn',
    scriptureReference: '1 John 1:9',
    scriptureText: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.',
    authorLetter: [
      'I kept a secret ledger in my head for over a decade. In it, I had detailed accounting of everyone who had wronged me: what they said, what they took, and how they hurt me. But the cruelest page in that ledger was the one with my own name at the top.',
      'Resentment is like drinking rat poison and waiting for the other person to die. It chained me to the very people and memories I claimed I wanted to be free from. It robbed my children of a present father and robbed God of my worship.',
      'When Jesus forgave us on the cross, He burned the ledger. Forgiveness doesn\'t mean what they did was okay. It means you refuse to let their sin hold your future hostage any longer.'
    ],
    whatThisMeans: [
      'God’s forgiveness is based on His faithfulness and justice, not our worthiness. Because Christ took the penalty, God is faithful to cleanse us completely when we confess.',
      'Forgiving others—and forgiving ourselves—is an act of releasing a debt. We transfer the case out of our courtroom and into God’s sovereign hands. That is where real peace begins.'
    ],
    theLie: 'Holding onto my bitterness protects me from being hurt again.',
    theTruth: 'Forgiveness sets the prisoner free, and that prisoner was me all along.',
    embraceAffirmation: 'I release the debt owed to me, and I receive God\'s total cleansing of my own soul.',
    practiceActionStep: 'Write the name of someone you resent on a scrap of paper. Pray a blessing over them, then tear up the paper.',
    reflectionQuestions: [
      'Whose name still triggers a spike of bitterness or resentment when it comes to mind?',
      'What are you afraid will happen if you completely release their debt to God?',
      'Have you received God’s forgiveness for yourself, or are you still holding a grudge against you?'
    ],
    conversationalPrayer: 'Lord, today I burn the ledger. I surrender the right to get even. I release the people who broke my trust, and I release the bitter grudge I have held against myself. Cleanse me from all unrighteousness and fill the empty space with Your love. In Jesus\' name, Amen.',
    exerciseName: 'The Ledger Burn',
    exerciseSubtitle: 'A Trauma-Informed Exercise for Forgiveness',
    exerciseTraumaIntro: 'Forgiveness does not mean reconciliation or tolerating abuse. You can forgive someone while maintaining healthy, firm boundaries that keep you safe. Breathe peace into your chest.',
    exerciseSteps: [
      {
        stepNumber: 1,
        title: 'Naming the Debt',
        instruction: 'Write down the debt or wound someone caused you, or the guilt you hold against yourself.',
        prompt: 'The debt that I have been holding onto is...',
        exampleHint: 'Example: "The betrayal from my former business partner," "My own failures as a parent"'
      },
      {
        stepNumber: 2,
        title: 'Releasing the Courtroom',
        instruction: 'State clearly that you are turning this person or circumstance over to God’s justice and mercy.',
        prompt: 'I relinquish my role as their judge because God promises to...',
        exampleHint: 'Example: "Handle justice far better than my bitterness ever could."'
      },
      {
        stepNumber: 3,
        title: 'The Declaration of Cleansing',
        instruction: 'Write out a declaration of release for your own soul based on 1 John 1:9.',
        prompt: 'By faith, I declare that my soul is cleansed and I choose to walk in...',
        exampleHint: 'Example: "Unburdened freedom, leaving yesterday\'s debts at the cross."'
      }
    ],
    authorEncouragementQuote: 'To forgive is to set a prisoner free and discover that the prisoner was you.',
    journalSubtitle: 'Releasing Resentment & Walking in Total Pardon',
    journalPageCount: 122,
    journalSlug: 'august-forgiveness'
  },

  9: {
    monthNumber: 9,
    monthName: 'September',
    monthTheme: 'Peace',
    monthThemeUppercase: 'PEACE',
    dayNumber: 245,
    dailyTheme: 'The Storm Anchor',
    scriptureReference: 'John 14:27',
    scriptureText: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.',
    authorLetter: [
      'I spent most of my adult life thinking peace meant the absence of conflict. If the bills were paid, everyone was happy, and nobody was shouting, I had peace. But the moment a crisis hit, my internal world shattered into a million pieces.',
      'My journey taught me that biblical peace is not calm water; it is an anchor that holds your ship steady in the middle of a hurricane. The peace Jesus gives is internal tranquility born of knowing who holds the storm.',
      'If your world feels loud, overwhelming, or uncertain today, stop trying to quiet the external waves with your own strength. Drop the anchor of Christ’s presence deep into your soul.'
    ],
    whatThisMeans: [
      'The world offers peace through circumstances: comfort, distraction, wealth, or substances. But worldly peace evaporates the second circumstances change.',
      'Jesus gives a different kind of peace: His own shalom. It is a wholeness and stability that exists even when the waves crash over the bow. When Christ is in your vessel, you can sleep in the storm.'
    ],
    theLie: 'I can only have peace when all my problems are completely resolved.',
    theTruth: 'Christ gives me supernatural peace in the middle of ongoing struggles.',
    embraceAffirmation: 'My heart is not troubled. I am anchored in the unshakeable peace of Jesus.',
    practiceActionStep: 'Take three 60-second silent pauses today. Inhale while whispering "My peace I give," exhale while whispering "I am not afraid."',
    reflectionQuestions: [
      'What external circumstance is currently trying to steal your inner peace?',
      'How have you previously tried to manufacture counterfeit peace?',
      'What does it look like to trust that Jesus is in the boat with you today?'
    ],
    conversationalPrayer: 'Lord, today the wind is howling and the waves feel high. But You spoke peace to the Sea of Galilee, and You speak peace to my soul right now. Still my racing thoughts. Anchor my heart in Your unfailing love. Let Your presence guard my mind. In Jesus\' name, Amen.',
    exerciseName: 'The Storm Anchor',
    exerciseSubtitle: 'A Trauma-Informed Exercise for Peace',
    exerciseTraumaIntro: 'When anxiety strikes, your nervous system is sounding an alarm. Ground yourself: Feel the weight of your feet on the floor. Look around and name three things you can see. God is here.',
    exerciseSteps: [
      {
        stepNumber: 1,
        title: 'Describing the Storm',
        instruction: 'Name the source of turbulence or anxiety that is shaking your inner quietness.',
        prompt: 'The storm threatening my peace right now is...',
        exampleHint: 'Example: "Fear of job insecurity," "An unresolved argument with my daughter"'
      },
      {
        stepNumber: 2,
        title: 'Dropping the Anchor',
        instruction: 'Write out the specific promise of God that anchors you in this specific storm.',
        prompt: 'My anchor in this storm is the promise that God...',
        exampleHint: 'Example: "Will supply all my needs according to His riches in glory."'
      },
      {
        stepNumber: 3,
        title: 'The Breath of Stillness',
        instruction: 'Commit to one quiet boundary or prayer practice that protects your peace today.',
        prompt: 'To guard my peace today, I will step away from... and turn to...',
        exampleHint: 'Example: "Step away from social media news and turn to 15 minutes of quiet worship."'
      }
    ],
    authorEncouragementQuote: 'Peace is not the absence of trouble. Peace is the presence of the Savior in the midst of it.',
    journalSubtitle: 'Anchoring Your Soul When Life Rages',
    journalPageCount: 120,
    journalSlug: 'september-peace'
  },

  10: {
    monthNumber: 10,
    monthName: 'October',
    monthTheme: 'Purpose',
    monthThemeUppercase: 'PURPOSE',
    dayNumber: 276,
    dailyTheme: 'The Wounded Healer',
    scriptureReference: 'Isaiah 6:8',
    scriptureText: 'Also I heard the voice of the Lord, saying, Whom shall I send, and who will go for us? Then said I, Here am I; send me.',
    authorLetter: [
      'I used to think my past disqualifies me from being used by God. I looked at the wreckage of my addiction, my failures, and my broken seasons, and assumed God only used polished, respectable church people. I was dead wrong.',
      'My journey taught me that God does not waste a single drop of your tears. The very valley where you almost died is the terrain you are now equipped to guide others through. A wounded person who has found healing is the most credible witness in the world.',
      'When God asked Isaiah who would go, Isaiah had just finished weeping over his own unclean lips. God doesn\'t call the qualified; He qualifies the called. Step up to the plate. Someone needs to hear that redemption is real.'
    ],
    whatThisMeans: [
      'Step 12 in recovery is carrying the message to someone who is still suffering. It is not about becoming a spiritual guru; it is about one beggar telling another beggar where to find fresh bread.',
      'Your scars are your credentials. When you share how Christ pulled you out of the ditch, you give hope to someone who believes their life is over. Your story is holy ammunition in God’s hands.'
    ],
    theLie: 'My past failures make me useless to God and to other people.',
    theTruth: 'God redeems my brokenness into a vessel of comfort and purpose for others.',
    embraceAffirmation: 'Here am I, Lord. Use my story and my redeemed life to bring hope to someone today.',
    practiceActionStep: 'Send one text or make one call of encouragement to someone who is currently struggling, expecting nothing in return.',
    reflectionQuestions: [
      'How has God used a painful part of your past to comfort someone else recently?',
      'What lie tells you that you aren’t "far enough along" in recovery to help another person?',
      'Who is one person in your sphere of influence who needs to know there is hope?'
    ],
    conversationalPrayer: 'Lord, today I lay my broken story at Your feet. Don\'t let my past pain be wasted. Use my scars to speak of Your resurrection power. Here am I; send me into someone\'s dark day with a message of grace. In Jesus\' name, Amen.',
    exerciseName: 'The Wounded Healer',
    exerciseSubtitle: 'A Trauma-Informed Exercise for Purpose',
    exerciseTraumaIntro: 'Serving others must come from an overflowing cup, not from exhaustion or people-pleasing. You are offering companionship, not saving people—Jesus is the Savior. Breathe with ease.',
    exerciseSteps: [
      {
        stepNumber: 1,
        title: 'Honoring the Scars',
        instruction: 'Identify one specific hardship or season of struggle that God has brought you through.',
        prompt: 'The battle I survived that taught me God\'s mercy is...',
        exampleHint: 'Example: "The first 30 days of detox," "Overcoming the shame of divorce"'
      },
      {
        stepNumber: 2,
        title: 'Identifying the Need',
        instruction: 'Who in your world is fighting a similar battle right now? What do they need to hear?',
        prompt: 'Someone walking through that valley right now needs to know that...',
        exampleHint: 'Example: "They are not alone, and tomorrow is worth fighting for."'
      },
      {
        stepNumber: 3,
        title: 'The Offering of Service',
        instruction: 'Write out one concrete, humble way you can be a conduit of grace this week.',
        prompt: 'To serve another soul without ego or pride, I will...',
        exampleHint: 'Example: "Listen quietly to someone at a meeting and pray for them by name."'
      }
    ],
    authorEncouragementQuote: 'God never wastes a hurt. Your deepest wound can become your greatest ministry.',
    journalSubtitle: 'Transforming Your Deepest Pain into Ministry',
    journalPageCount: 128,
    journalSlug: 'october-purpose'
  },

  11: {
    monthNumber: 11,
    monthName: 'November',
    monthTheme: 'Gratitude',
    monthThemeUppercase: 'GRATITUDE',
    dayNumber: 307,
    dailyTheme: 'The Ordinary Mercies List',
    scriptureReference: '1 Thessalonians 5:18',
    scriptureText: 'In every thing give thanks: for this is the will of God in Christ Jesus concerning you.',
    authorLetter: [
      'In active addiction and depression, my vision was warped. I could stand in the middle of a sunlit room and only see the dust on the floor. Resentment and entitlement were my default lenses: "Why don\'t I have what they have? Why is my life so hard?"',
      'My journey taught me that gratitude is not a warm, fuzzy feeling that hits you when everything goes right. Gratitude is a spiritual weapon. It kills cynicism. It reboots your brain. It forces your eyes to see that God has been feeding you all along.',
      'Paul didn\'t write "FOR everything give thanks." He wrote "IN everything give thanks." You don\'t have to thank God for the tragedy; you thank Him for His presence inside it. Let’s look for the ordinary mercies today.'
    ],
    whatThisMeans: [
      'Gratitude is the antidote to relapse. An ungrateful heart is a breeding ground for self-pity, and self-pity is the fast track to picking up a drink, a pill, or an old obsession.',
      'When we intentionally look for God’s hand in simple things—a hot cup of coffee, a clean bed, another 24 hours sober—our perspective shifts from scarcity to abundance.'
    ],
    theLie: 'I have so little to be thankful for compared to how much I have lost.',
    theTruth: 'Every breath is an unearned mercy; God\'s goodness surrounds me right now.',
    embraceAffirmation: 'I choose gratitude today. I see God\'s fingerprints in both big milestones and small mercies.',
    practiceActionStep: 'Write down five specific things you are grateful for right now that money cannot buy. Read them aloud.',
    reflectionQuestions: [
      'What ordinary mercy did you enjoy today that you would have taken for granted in the past?',
      'How does expressing gratitude change the physical sensation in your chest and shoulders?',
      'Who is one person you haven\'t thanked recently who helped you along your path?'
    ],
    conversationalPrayer: 'Lord, today I repent of my grumbling. Forgive me for counting my complaints while ignoring Your countless mercies. Open my spiritual eyes to see Your goodness in the ordinary. Fill my mouth with thanksgiving from morning until night. In Jesus\' name, Amen.',
    exerciseName: 'The Ordinary Mercies List',
    exerciseSubtitle: 'A Trauma-Informed Exercise for Gratitude',
    exerciseTraumaIntro: 'Gratitude in recovery is not toxic positivity or ignoring pain. It is simply choosing to let goodness share the room with your struggles. Breathe gently and look around.',
    exerciseSteps: [
      {
        stepNumber: 1,
        title: 'The Sensory Mercies',
        instruction: 'Name three simple, physical blessings you experienced in the last 24 hours.',
        prompt: 'Three ordinary physical mercies I received today are...',
        exampleHint: 'Example: "The warm shower this morning," "The laughter of a friend," "Clean drinking water"'
      },
      {
        stepNumber: 2,
        title: 'The Relational Mercies',
        instruction: 'Identify one person or pet whose presence brought comfort or a smile to your face.',
        prompt: 'A soul whose kindness reminded me of God\'s love is...',
        exampleHint: 'Example: "My sister texting me just to say she was praying for me."'
      },
      {
        stepNumber: 3,
        title: 'The Spiritual Mercy',
        instruction: 'Name one spiritual breakthrough or mercy that keeps you sober and sane today.',
        prompt: 'The greatest gift of grace I am treasuring right now is...',
        exampleHint: 'Example: "Waking up without a hangover or the terror of what I did last night."'
      }
    ],
    authorEncouragementQuote: 'Gratitude turns what we have into enough, and more. It turns denial into acceptance and chaos into order.',
    journalSubtitle: 'The Antidote to Resentment and Self-Pity',
    journalPageCount: 122,
    journalSlug: 'november-gratitude'
  },

  12: {
    monthNumber: 12,
    monthName: 'December',
    monthTheme: 'Redemption',
    monthThemeUppercase: 'REDEMPTION',
    dayNumber: 337,
    dailyTheme: 'The Chapter Close',
    scriptureReference: '2 Corinthians 5:17',
    scriptureText: 'Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.',
    authorLetter: [
      'When I look back over the calendar year, I am humbled by how patient God has been with me. There were days I took two steps forward and one step back. There were nights I didn\'t know if I would make it to sunrise.',
      'My journey taught me that redemption is not about erasing the previous chapters; it is about God picking up the pen and writing a breathtaking ending to a story that looked hopelessly lost.',
      'As we close this chapter, do not dread tomorrow. The same God who carried you through the storms of this past year is already standing in your next season. Stand tall in your new creation identity.'
    ],
    whatThisMeans: [
      'Redemption means being bought back from the pawn shop of sin and shame. You were paid for with the precious blood of Jesus. The old labels, the court dates, the broken promises—they are not your final headline.',
      'Being a new creature doesn’t mean you have amnesia; it means your history now glorifies the God who rescued you. You are a walking miracle of grace.'
    ],
    theLie: 'The new year will just bring the same old relapses and disappointment.',
    theTruth: 'I am a new creation in Christ; God is completing the good work He began in me.',
    embraceAffirmation: 'The old things have passed away. I step into my future with confidence, joy, and holy expectation.',
    practiceActionStep: 'Write a one-sentence testimony of what God has done in your life this year. Read it aloud before going to sleep.',
    reflectionQuestions: [
      'Compare where your heart is today to where you were 365 days ago. What has God healed?',
      'What old habit or fear are you officially leaving behind in this closing chapter?',
      'What is your prayer of holy anticipation for the season ahead?'
    ],
    conversationalPrayer: 'Lord, today I stand in awe of Your redeeming grace. You took what the enemy meant for evil and You turned it for my good and Your glory. Thank You for every step, every tear, and every victory. I commit my future into Your faithful hands. In Jesus\' name, Amen.',
    exerciseName: 'The Chapter Close',
    exerciseSubtitle: 'A Trauma-Informed Exercise for Redemption',
    exerciseTraumaIntro: 'Milestones can sometimes trigger anxiety about maintaining your progress. Rest your heart. Grace brought you safe thus far, and grace will lead you home. Breathe deeply.',
    exerciseSteps: [
      {
        stepNumber: 1,
        title: 'Reviewing the Battlefield',
        instruction: 'Name the biggest battle God gave you the strength to survive this year.',
        prompt: 'The battle I thought would break me, but that God brought me through, was...',
        exampleHint: 'Example: "Walking through relapse fears and staying clean through the holidays."'
      },
      {
        stepNumber: 2,
        title: 'Sealing the New Chapter',
        instruction: 'What is the new title or theme God is writing over your life as you move forward?',
        prompt: 'The new name of this redeemed chapter of my life is...',
        exampleHint: 'Example: "Walking in Dignity," "A Life Rooted in Grace"'
      },
      {
        stepNumber: 3,
        title: 'The Covenant of One Day at a Time',
        instruction: 'Commit your next 24 hours to God, trusting Him to handle the distant future.',
        prompt: 'For today and the next step ahead, I commit to...',
        exampleHint: 'Example: "Stay close to Jesus, my sponsor, and my community, one day at a time."'
      }
    ],
    authorEncouragementQuote: 'Redemption doesn\'t mean the bad things never happened. It means God took the broken pieces and made a stained glass window that lets the light through.',
    journalSubtitle: 'A Future Redeemed and Overflowing with Grace',
    journalPageCount: 132,
    journalSlug: 'december-hope'
  }
};
