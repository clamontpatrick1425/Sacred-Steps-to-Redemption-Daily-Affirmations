import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';

// October Lead Magnet Data according to Brandbook v1.0 & Official Prompt
const data = {
  monthNumber: 10,
  monthName: 'October',
  monthTheme: 'Purpose',
  monthThemeUppercase: 'PURPOSE',
  dayNumber: 276,
  dailyTheme: 'The Wounded Healer',
  scriptureReference: 'Isaiah 6:8',
  scriptureText: 'Also I heard the voice of the Lord, saying, Whom shall I send, and who will go for us? Then said I, Here am I; send me.',
  authorLetter: [
    'I remember sitting in church basements years ago, convinced that my history disqualified me from ever doing anything good again. The wreckage of addiction, ruined relationships, and shame was too deep. I thought God only worked through the clean, polished people who had never fallen.',
    'There was a morning during my fourth step inventory when I realized something that shattered my despair: God doesn\'t call the qualified; He qualifies the called. In Isaiah 6, the prophet was terrified because of his unclean lips before God touched him with an altar coal. God didn\'t discard him. He sent him.',
    'My journey taught me that your deepest wound is often where your greatest ministry begins. When you survive the furnace, you become someone who can guide others through the flames. You don\'t have to be a spiritual giant or have everything figured out. You just have to be willing to say, "Here am I; send me."'
  ],
  whatThisMeans: [
    'In active addiction and trauma, we spend years hiding our scars. We live in fear that someone will discover who we used to be. But in God\'s economy, nothing is wasted. Grace takes the very chapter of your life that you wanted to burn and turns it into a lifeline for someone still drowning.',
    'Step 12 in recovery is carrying the message to another struggling soul. It is not preaching; it is one beggar showing another beggar where to find bread. When you share how God met you in your brokenness, you strip shame of its power and give someone else permission to live.'
  ],
  theLie: 'My past failures make me useless to God and other people.',
  theTruth: 'God redeems my brokenness into a vessel of comfort, courage, and holy purpose.',
  embraceAffirmation: 'Here am I, Lord. Use my story and my redeemed life to bring hope to someone today.',
  practiceActionStep: 'Send one text or make one phone call to encourage someone who is fighting a hard battle today, without expecting anything in return.',
  reflectionQuestions: [
    'How has God used a painful chapter of your story to bring comfort to someone else recently?',
    'What lie still whispers that you aren\'t far enough along in recovery to help another person?',
    'Who is one struggling soul in your sphere of influence who needs to hear that redemption is real?'
  ],
  conversationalPrayer: 'Lord, today I surrender my broken story into Your hands. Do not let my tears or my years in the wilderness be wasted. Use my scars to declare Your resurrection mercy. Silence my doubts. Here am I; send me into someone\'s heavy hour with a message of grace and genuine hope. In Jesus\' name, Amen.',
  exerciseName: 'The Crucible to Calling Inventory',
  exerciseSubtitle: 'A Trauma-Informed Guided Worksheet for Purpose',
  exerciseTraumaIntro: 'Take a gentle, unhurried breath. Place both feet flat on the floor and loosen your shoulders. You are not responsible for fixing anyone else; you are only offering humble companionship from what grace has already done in you.',
  exerciseSteps: [
    {
      stepNumber: 1,
      title: 'Honoring the Crucible',
      instruction: 'Identify one specific hardship, valley, or season of failure that God has brought you through by His mercy.',
      prompt: 'The battle I survived that taught me the depth of God\'s grace is...',
      exampleHint: 'Example: "The first 30 days of detox," "Facing the shame of financial ruin"'
    },
    {
      stepNumber: 2,
      title: 'Identifying the Burdened Soul',
      instruction: 'Who in your community or daily path is walking through that exact valley right now? What truth do they need to hear?',
      prompt: 'Someone walking through that fire right now needs to know that...',
      exampleHint: 'Example: "They are not doomed, and God is closer than their panic."'
    },
    {
      stepNumber: 3,
      title: 'The Offering of Service',
      instruction: 'Write out one small, concrete, humble action you can take this week to extend a hand of compassion.',
      prompt: 'To serve another person without pride or expectation, I will...',
      exampleHint: 'Example: "Sit with someone after a meeting and simply listen without giving unsolicited advice."'
    }
  ],
  authorEncouragementQuote: 'God never wastes a hurt. Your deepest wound can become your greatest ministry.',
  journalSubtitle: 'Transforming Your Deepest Pain into Ministry',
  journalPageCount: 128,
  journalSlug: 'october-purpose'
};

// Brand Colors (RGB)
const WARM_SAND = [249, 246, 240];
const SACRED_BLUE = [28, 42, 57];
const DAWN_GOLD = [212, 175, 55];
const MUTED_SAGE = [122, 139, 123];
const OFF_BLACK = [43, 43, 43];
const WHITE = [255, 255, 255];
const LIGHT_GOLD_FILL = [252, 248, 235];
const SAGE_TINT = [240, 243, 240];

function generatePdf() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter' // 612 x 792 pt
  });

  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 48;
  const contentWidth = pageWidth - margin * 2; // 516 pt

  function drawBackground() {
    doc.setFillColor(WARM_SAND[0], WARM_SAND[1], WARM_SAND[2]);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Subtle decorative border
    doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.setLineWidth(0.75);
    doc.rect(24, 24, pageWidth - 48, pageHeight - 48, 'S');

    // Inner thin border
    doc.setDrawColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
    doc.setLineWidth(0.25);
    doc.rect(28, 28, pageWidth - 56, pageHeight - 56, 'S');
  }

  function drawFooter(pageNum: number, totalPages: number = 5) {
    const y = pageHeight - 38;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
    
    // Left
    doc.text('© 2026 C. Lamont Patrick | Kya Daisy Publishing', margin, y);
    // Center
    doc.text('sacred-steps-affirmations.ai.studio', pageWidth / 2, y, { align: 'center' });
    // Right
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, y, { align: 'right' });
  }

  function drawHeaderBanner(monthText: string, themeText: string) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.text(`${monthText.toUpperCase()} • ${themeText.toUpperCase()} • FREE SAMPLE CHAPTER`, pageWidth / 2, 44, { align: 'center' });

    doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, 52, pageWidth - margin, 52);
  }

  // ==========================================
  // PAGE 1: COVER / LANDING PAGE
  // ==========================================
  drawBackground();

  // Top sub-banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
  doc.text('A PATH TO RECOVERY, A LIFE IN GRACE', pageWidth / 2, 70, { align: 'center' });

  // Dawn Gold Accent Ornament
  doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.setLineWidth(1.5);
  doc.line(pageWidth / 2 - 36, 82, pageWidth / 2 + 36, 82);

  // Main Book Title
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('SACRED STEPS TO REDEMPTION', pageWidth / 2, 120, { align: 'center' });

  // Subtitle banner card
  doc.setFillColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.roundedRect(margin + 20, 142, contentWidth - 40, 42, 6, 6, 'F');
  
  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('OCTOBER: PURPOSE', pageWidth / 2, 162, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(WARM_SAND[0], WARM_SAND[1], WARM_SAND[2]);
  doc.text('Free Sample Chapter & Guided Exercises · Called to Help Someone Else', pageWidth / 2, 175, { align: 'center' });

  // Script Callout
  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('Experience the S.T.E.P. Method™ and Begin Your Journey of Purpose', pageWidth / 2, 212, { align: 'center' });

  // Editorial intro box
  doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.setLineWidth(0.75);
  doc.roundedRect(margin, 230, contentWidth, 100, 6, 6, 'FD');

  doc.setFont('times', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('“You don’t have to clean yourself up before you begin.\nYou just have to be willing to take the next step.”', pageWidth / 2, 258, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  const introBody = doc.splitTextToSize(
    'Inside this official free guide, you will experience the exact rhythm used in the Sacred Steps to Redemption 365-Day Devotional and the October Transformation Journal: Purpose. You will discover how God takes the broken pieces of yesterday and turns them into a compass for someone who is still trapped in the dark.',
    contentWidth - 36
  );
  doc.text(introBody, margin + 18, 290);

  // What's Inside section
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('WHAT IS WAITING FOR YOU INSIDE THIS COMPANION GUIDE:', margin + 6, 360);

  const bullets = [
    {
      title: 'A Full Daily Devotional Entry (Day 276)',
      desc: 'Experience "The Wounded Healer" and discover why your scars are your greatest credentials.'
    },
    {
      title: 'The Sacred S.T.E.P. Method™ Rhythm',
      desc: 'Scripture (Anchor) · Truth (Reframe the lie) · Embrace (Affirmation) · Practice (One small action).'
    },
    {
      title: 'Guided Trauma-Informed Worksheet',
      desc: '"The Crucible to Calling Inventory" — a gentle, step-by-step framework to process your purpose.'
    },
    {
      title: 'Direct Product Alignment & Continuation',
      desc: 'Seamless companion roadmap to the 128-page October Transformation Journal and 365 Ebook.'
    }
  ];

  let bY = 382;
  bullets.forEach((b) => {
    // Checkmark badge in Dawn Gold
    doc.setFillColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.circle(margin + 16, bY + 4, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text('✓', margin + 13, bY + 7.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
    doc.text(b.title, margin + 32, bY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
    const bDesc = doc.splitTextToSize(b.desc, contentWidth - 44);
    doc.text(bDesc, margin + 32, bY + 17);

    bY += 40;
  });

  // Call to action button box
  doc.setFillColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.roundedRect(margin + 30, 565, contentWidth - 60, 48, 24, 24, 'F');
  doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.setLineWidth(1.5);
  doc.roundedRect(margin + 30, 565, contentWidth - 60, 48, 24, 24, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('WALK IN GRACE · SACRED STEPS DEVOTIONAL COMPANION', pageWidth / 2, 590, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(WARM_SAND[0], WARM_SAND[1], WARM_SAND[2]);
  doc.text('Available at sacred-steps-affirmations.ai.studio', pageWidth / 2, 603, { align: 'center' });

  // Bottom quote box
  doc.setFillColor(LIGHT_GOLD_FILL[0], LIGHT_GOLD_FILL[1], LIGHT_GOLD_FILL[2]);
  doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, 635, contentWidth, 75, 6, 6, 'FD');

  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  const authorQuote = doc.splitTextToSize(
    '“I have spent years in both the gutter and the classroom of grace. If you are tired of living in the shadow of your past mistakes, turn this page. We are going to walk through this together, one step at a time.”',
    contentWidth - 30
  );
  doc.text(authorQuote, margin + 15, 660);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('— C. Lamont Patrick, Author & Redeemed Traveler', pageWidth - margin - 20, 698, { align: 'right' });

  drawFooter(1);

  // ==========================================
  // PAGE 2: WELCOME LETTER
  // ==========================================
  doc.addPage();
  drawBackground();
  drawHeaderBanner('October', 'A Note From the Author');

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('A Note From the Author', margin, 85);

  doc.setFont('times', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('From the Battlefield of Addiction to the Quiet Horizon of Purpose', margin, 102);

  doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.setLineWidth(1);
  doc.line(margin, 110, margin + 160, 110);

  // Letter body
  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  doc.setLineHeightFactor(1.45);

  let letterY = 135;
  data.authorLetter.forEach((paragraph) => {
    const lines = doc.splitTextToSize(paragraph, contentWidth);
    doc.text(lines, margin, letterY);
    letterY += lines.length * 15.5 + 14;
  });

  // Callout Box with Dawn Gold Border
  doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.setLineWidth(1);
  doc.roundedRect(margin, letterY, contentWidth, 105, 6, 6, 'FD');

  // Left vertical accent stripe
  doc.setFillColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.rect(margin, letterY, 5, 105, 'F');

  doc.setFont('times', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('THE HEART OF THIS MONTH\'S JOURNEY:', margin + 20, letterY + 24);

  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  const coreThemeMsg = doc.splitTextToSize(
    '“We do not carry the message because we are cured or perfect. We carry it because we remember the terror of drowning, and our hands are still wet with the water Jesus pulled us from. You are ready to be used right now.”',
    contentWidth - 40
  );
  doc.text(coreThemeMsg, margin + 20, letterY + 44);

  letterY += 125;

  // Closing Sign-off
  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  doc.text('With deep reverence and unwavering hope,', margin, letterY);

  letterY += 24;
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(15);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('C. Lamont Patrick', margin, letterY);

  letterY += 14;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
  doc.text('Author, Sacred Steps to Redemption & The 12 Transformation Journals', margin, letterY);

  // Trauma-informed disclaimer note at bottom of letter
  doc.setFillColor(SAGE_TINT[0], SAGE_TINT[1], SAGE_TINT[2]);
  doc.roundedRect(margin, pageHeight - 110, contentWidth, 54, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
  doc.text('TRAUMA-INFORMED CARE NOTE:', margin + 12, pageHeight - 94);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  const disclaimer = doc.splitTextToSize(
    'This guide is a devotional and spiritual companion, not a replacement for clinical therapy, medical detox, or psychiatric treatment. If at any point the exercises trigger overwhelming emotions, please pause, ground yourself, and reach out to a trusted counselor, sponsor, or crisis line.',
    contentWidth - 24
  );
  doc.text(disclaimer, margin + 12, pageHeight - 82);

  drawFooter(2);

  // ==========================================
  // PAGE 3: SAMPLE CHAPTER - DAY 276
  // ==========================================
  doc.addPage();
  drawBackground();
  drawHeaderBanner('October • Purpose', `Day ${data.dayNumber} of 30`);

  // Chapter Header
  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text(data.dailyTheme, margin, 80);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
  doc.text(`DAY ${data.dayNumber} DEVOTIONAL · OCTOBER TRANSFORMATION JOURNAL`, margin, 96);

  // Scripture Card (Left border in Dawn Gold)
  doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.roundedRect(margin, 108, contentWidth, 68, 4, 4, 'F');
  doc.setFillColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.rect(margin, 108, 4.5, 68, 'F');

  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  const scripLines = doc.splitTextToSize(`“${data.scriptureText}”`, contentWidth - 30);
  doc.text(scripLines, margin + 16, 128);

  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text(`— ${data.scriptureReference}, KJV`, margin + 16, 164);

  // What This Means
  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('What This Means', margin, 196);

  doc.setFont('times', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  let wtmY = 210;
  data.whatThisMeans.forEach((p) => {
    const lines = doc.splitTextToSize(p, contentWidth);
    doc.text(lines, margin, wtmY);
    wtmY += lines.length * 13.5 + 8;
  });

  // The Sacred S.T.E.P. Method™ Framework Card
  doc.setFillColor(LIGHT_GOLD_FILL[0], LIGHT_GOLD_FILL[1], LIGHT_GOLD_FILL[2]);
  doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.setLineWidth(0.75);
  doc.roundedRect(margin, wtmY + 2, contentWidth, 148, 6, 6, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('The Sacred S.T.E.P. Method™', margin + 14, wtmY + 20);

  let stepY = wtmY + 38;
  
  // S
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('S — SCRIPTURE:', margin + 14, stepY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  doc.text(data.scriptureReference, margin + 105, stepY);
  stepY += 22;

  // T
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('T — TRUTH:', margin + 14, stepY);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
  doc.text(`Lie: “${data.theLie}”`, margin + 105, stepY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  doc.text(`Truth: ${data.theTruth}`, margin + 105, stepY + 12);
  stepY += 30;

  // E
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('E — EMBRACE:', margin + 14, stepY);
  doc.setFont('times', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  const embLines = doc.splitTextToSize(`“${data.embraceAffirmation}”`, contentWidth - 120);
  doc.text(embLines, margin + 105, stepY);
  stepY += 24;

  // P
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('P — PRACTICE:', margin + 14, stepY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  const pracLines = doc.splitTextToSize(data.practiceActionStep, contentWidth - 120);
  doc.text(pracLines, margin + 105, stepY);

  // Reflection & Prayer
  let refY = wtmY + 164;
  doc.setFont('times', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('Reflection & Prayer', margin, refY);
  refY += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  data.reflectionQuestions.forEach((q, idx) => {
    doc.text(`${idx + 1}. ${q}`, margin + 8, refY);
    refY += 13;
  });

  // Conversational prayer block
  refY += 4;
  doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.roundedRect(margin, refY, contentWidth, 48, 4, 4, 'F');
  doc.setDrawColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, refY, contentWidth, 48, 4, 4, 'S');

  doc.setFont('times', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  const prayLines = doc.splitTextToSize(`“${data.conversationalPrayer}”`, contentWidth - 20);
  doc.text(prayLines, margin + 10, refY + 14);

  // Guided Journal Lines
  refY += 58;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
  doc.text('PERSONAL REFLECTION JOURNAL (Write what God is showing you today):', margin, refY);

  doc.setDrawColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
  doc.setLineWidth(0.5);
  for (let l = 0; l < 4; l++) {
    doc.line(margin, refY + 14 + l * 15, pageWidth - margin, refY + 14 + l * 15);
  }

  drawFooter(3);

  // ==========================================
  // PAGE 4: GUIDED TRAUMA-INFORMED EXERCISE
  // ==========================================
  doc.addPage();
  drawBackground();
  drawHeaderBanner('October • Purpose', 'Trauma-Informed Guided Worksheet');

  doc.setFont('times', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text(data.exerciseName, margin, 80);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
  doc.text(data.exerciseSubtitle.toUpperCase(), margin, 95);

  // Trauma-informed grounding box
  doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.setDrawColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
  doc.setLineWidth(0.75);
  doc.roundedRect(margin, 108, contentWidth, 42, 6, 6, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('GROUNDING CHECK-IN:', margin + 12, 122);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  const groundTxt = doc.splitTextToSize(data.exerciseTraumaIntro, contentWidth - 24);
  doc.text(groundTxt, margin + 12, 134);

  // 3-Step Guided Worksheet
  let exY = 166;
  data.exerciseSteps.forEach((st) => {
    doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, exY, contentWidth, 120, 6, 6, 'FD');

    // Step Header Pill
    doc.setFillColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
    doc.roundedRect(margin + 12, exY + 10, 68, 16, 8, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.text(`STEP ${st.stepNumber}`, margin + 26, exY + 21);

    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
    doc.text(st.title, margin + 90, exY + 22);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
    doc.text(st.instruction, margin + 14, exY + 40);

    doc.setFont('times', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
    doc.text(`“${st.prompt}”`, margin + 14, exY + 54);

    if (st.exampleHint) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
      doc.text(st.exampleHint, margin + 14, exY + 66);
    }

    // Two ruled writing lines
    doc.setDrawColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
    doc.setLineWidth(0.4);
    doc.line(margin + 14, exY + 84, margin + contentWidth - 14, exY + 84);
    doc.line(margin + 14, exY + 104, margin + contentWidth - 14, exY + 104);

    exY += 134;
  });

  // Author Encouragement Callout
  doc.setFillColor(LIGHT_GOLD_FILL[0], LIGHT_GOLD_FILL[1], LIGHT_GOLD_FILL[2]);
  doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.setLineWidth(1);
  doc.roundedRect(margin, exY + 4, contentWidth, 54, 6, 6, 'FD');

  doc.setFont('times', 'bolditalic');
  doc.setFontSize(11);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text(`“${data.authorEncouragementQuote}”`, pageWidth / 2, exY + 27, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('— C. Lamont Patrick, Sacred Steps to Redemption', pageWidth / 2, exY + 42, { align: 'center' });

  drawFooter(4);

  // ==========================================
  // PAGE 5: PRODUCT ALIGNMENT & UPSELL
  // ==========================================
  doc.addPage();
  drawBackground();
  drawHeaderBanner('October • Purpose', 'Continue Your Transformation');

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('Continue Your Transformation', pageWidth / 2, 82, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('Deepen Your Walk with the Complete October Transformation Journal', pageWidth / 2, 100, { align: 'center' });

  // Main Product Showcase Box
  doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.setLineWidth(1.2);
  doc.roundedRect(margin, 116, contentWidth, 235, 8, 8, 'FD');

  // Book mock visual badge
  doc.setFillColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.roundedRect(margin + 20, 134, 100, 140, 6, 6, 'F');
  doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.setLineWidth(1);
  doc.rect(margin + 24, 138, 92, 132, 'S');

  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('SACRED STEPS', margin + 70, 162, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(WARM_SAND[0], WARM_SAND[1], WARM_SAND[2]);
  doc.text('TRANSFORMATION', margin + 70, 174, { align: 'center' });
  doc.text('JOURNAL', margin + 70, 184, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('OCTOBER', margin + 70, 215, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(WARM_SAND[0], WARM_SAND[1], WARM_SAND[2]);
  doc.text('PURPOSE', margin + 70, 227, { align: 'center' });
  doc.text('128 PAGES', margin + 70, 252, { align: 'center' });

  // Details column
  const colX = margin + 135;
  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('The October Transformation Journal', colX, 148);

  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('Transforming Your Deepest Pain into Ministry', colX, 163);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  const journalDesc = doc.splitTextToSize(
    'You have just walked through a single day. The complete October Journal takes you through 30 structured days of spiritual unburdening, weekly guided trauma-informed exercises, and personal prayer matrices designed to take you from survivor to servant-leader.',
    contentWidth - 150
  );
  doc.text(journalDesc, colX, 178);

  const perks = [
    '30 Daily S.T.E.P. Method™ Devotionals & Scripture Anchors',
    '4 Comprehensive Weekly Trauma-Informed Deep Dives',
    'Full Guided Worksheet Templates & Emotional Release Tools',
    'Seamless companion to the 365-Day Devotional Ebook'
  ];

  let pY = 236;
  perks.forEach((pk) => {
    doc.setFillColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.circle(colX + 5, pY - 2, 3, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
    doc.text(pk, colX + 15, pY);
    pY += 16;
  });

  // Call to action button for Journal
  doc.setFillColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.roundedRect(colX, 304, contentWidth - 155, 30, 15, 15, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('GET THE OCTOBER JOURNAL · $14.99', colX + (contentWidth - 155) / 2, 323, { align: 'center' });

  // Companion 365 Ebook section
  doc.setFillColor(LIGHT_GOLD_FILL[0], LIGHT_GOLD_FILL[1], LIGHT_GOLD_FILL[2]);
  doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.setLineWidth(0.75);
  doc.roundedRect(margin, 368, contentWidth, 140, 8, 8, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('The 365-Day Master Anchor: Sacred Steps to Redemption', margin + 18, 392);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  const ebookDesc = doc.splitTextToSize(
    'The complete 365 Biblical Affirmations Ebook is the overarching spine that connects all twelve monthly journals. From January\'s restoration of identity to December\'s holy perseverance, experience a full year of daily renewal designed specifically for recovery, breaking generational chains, and walking in freedom.',
    contentWidth - 36
  );
  doc.text(ebookDesc, margin + 18, 410);

  // Ebook CTA
  doc.setFillColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.roundedRect(margin + 18, 466, 210, 28, 14, 14, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('GET THE COMPLETE 365 EBOOK', margin + 123, 484, { align: 'center' });

  // Digital App Link
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('FREE DAILY COMPANION WEB APP:', margin + 250, 474);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
  doc.text('sacred-steps-affirmations.ai.studio', margin + 250, 488);

  // Cross Reference & Citation Footer Box
  doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.setDrawColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, 526, contentWidth, 80, 6, 6, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
  doc.text('CURRICULUM CROSS-REFERENCE:', margin + 16, 544);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
  doc.text('• Devotional Text: Day 276 from “Sacred Steps to Redemption: 365 Biblical Affirmations” (p. 297)', margin + 16, 560);
  doc.text('• Guided Exercise: “The Crucible to Calling Inventory”, October Transformation Journal (p. 42–45)', margin + 16, 574);
  doc.text('• Publisher: Kya Daisy Publishing | All rights reserved under International Copyright Conventions.', margin + 16, 588);

  // Final Benediction
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
  doc.text('“A path to recovery, a life in grace.”', pageWidth / 2, 642, { align: 'center' });

  drawFooter(5);

  // Ensure directories exist
  const outDir = path.resolve(process.cwd(), 'public', 'assets', 'guides');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Save to public assets and root
  const outPath1 = path.join(outDir, 'Sacred_Steps_October_Sample_Guide.pdf');
  const outPath2 = path.resolve(process.cwd(), 'public', 'Sacred_Steps_October_Sample_Guide.pdf');
  const outPath3 = path.resolve(process.cwd(), 'Sacred_Steps_October_Sample_Guide.pdf');

  const pdfOutput = doc.output('arraybuffer');
  const buffer = Buffer.from(pdfOutput);

  fs.writeFileSync(outPath1, buffer);
  fs.writeFileSync(outPath2, buffer);
  fs.writeFileSync(outPath3, buffer);

  console.log(`Successfully generated PDF at:
  - ${outPath1}
  - ${outPath2}
  - ${outPath3}
  Size: ${buffer.length} bytes`);
}

generatePdf();
