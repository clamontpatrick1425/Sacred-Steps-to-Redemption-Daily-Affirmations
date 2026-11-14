/**
 * Lead Magnet PDF Generation Service
 * Produces fully formatted, publication-grade 5-page PDFs matching
 * the Sacred Steps to Redemption Brandbook v1.0 design tokens:
 * - Warm Sand (#F9F6F0) background
 * - Deep Sacred Blue (#1C2A39) primary typography & banners
 * - Dawn Gold (#D4AF37) accents, borders & dividers
 * - Muted Sage (#7A8B7B) secondary accents & footnotes
 * - Off-Black (#2B2B2B) legible body text
 */

import { jsPDF } from 'jspdf';
import { MONTHLY_LEAD_MAGNET_DATA, MonthlyLeadMagnetData } from '../data/monthlyLeadMagnetData';
import { analyticsService } from './analyticsService';

const WARM_SAND = [249, 246, 240];
const SACRED_BLUE = [28, 42, 57];
const DAWN_GOLD = [212, 175, 55];
const MUTED_SAGE = [122, 139, 123];
const OFF_BLACK = [43, 43, 43];
const WHITE = [255, 255, 255];
const LIGHT_GOLD_FILL = [252, 248, 235];
const SAGE_TINT = [240, 243, 240];

export class LeadMagnetPdfService {
  /**
   * Generates a fully formatted 5-page PDF Document for any month
   */
  public createMonthlyPdf(monthNumber: number = 10): jsPDF {
    const data: MonthlyLeadMagnetData = MONTHLY_LEAD_MAGNET_DATA[monthNumber] || MONTHLY_LEAD_MAGNET_DATA[10];

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter' // 612 x 792 pt
    });

    const pageWidth = 612;
    const pageHeight = 792;
    const margin = 48;
    const contentWidth = pageWidth - margin * 2; // 516 pt

    const drawBackground = () => {
      doc.setFillColor(WARM_SAND[0], WARM_SAND[1], WARM_SAND[2]);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Outer gold border
      doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
      doc.setLineWidth(0.75);
      doc.rect(24, 24, pageWidth - 48, pageHeight - 48, 'S');

      // Inner thin sage border
      doc.setDrawColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
      doc.setLineWidth(0.25);
      doc.rect(28, 28, pageWidth - 56, pageHeight - 56, 'S');
    };

    const drawFooter = (pageNum: number) => {
      const y = pageHeight - 38;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
      doc.text('© 2026 C. Lamont Patrick | Kya Daisy Publishing', margin, y);
      doc.text('sacred-steps-affirmations.ai.studio', pageWidth / 2, y, { align: 'center' });
      doc.text(`Page ${pageNum} of 5`, pageWidth - margin, y, { align: 'right' });
    };

    const drawHeaderBanner = (themeTitle: string) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
      doc.text(
        `${data.monthName.toUpperCase()} • ${data.monthThemeUppercase} • FREE SAMPLE CHAPTER`,
        pageWidth / 2,
        44,
        { align: 'center' }
      );

      doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
      doc.setLineWidth(0.5);
      doc.line(margin, 52, pageWidth - margin, 52);
    };

    // ==========================================
    // PAGE 1: COVER / LANDING PAGE
    // ==========================================
    drawBackground();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
    doc.text('A PATH TO RECOVERY, A LIFE IN GRACE', pageWidth / 2, 70, { align: 'center' });

    doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.setLineWidth(1.5);
    doc.line(pageWidth / 2 - 36, 82, pageWidth / 2 + 36, 82);

    doc.setFont('times', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
    doc.text('SACRED STEPS TO REDEMPTION', pageWidth / 2, 120, { align: 'center' });

    doc.setFillColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
    doc.roundedRect(margin + 20, 142, contentWidth - 40, 42, 6, 6, 'F');

    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.text(`${data.monthName.toUpperCase()}: ${data.monthThemeUppercase}`, pageWidth / 2, 162, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(WARM_SAND[0], WARM_SAND[1], WARM_SAND[2]);
    doc.text(`Free Sample Chapter & Guided Exercises · ${data.dailyTheme}`, pageWidth / 2, 175, { align: 'center' });

    doc.setFont('times', 'italic');
    doc.setFontSize(14);
    doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.text(`Experience the S.T.E.P. Method™ and Begin Your Journey of ${data.monthTheme}`, pageWidth / 2, 212, { align: 'center' });

    // Quote Box
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
      `Inside this official free guide, you will experience the exact rhythm used in the Sacred Steps to Redemption 365-Day Devotional and the ${data.monthName} Transformation Journal: ${data.monthTheme}. You will discover how God takes the broken pieces of yesterday and turns them into a compass for someone who is still trapped in the dark.`,
      contentWidth - 36
    );
    doc.text(introBody, margin + 18, 290);

    // Section Checklist
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
    doc.text('WHAT IS WAITING FOR YOU INSIDE THIS COMPANION GUIDE:', margin + 6, 360);

    const bullets = [
      {
        title: `A Full Daily Devotional Entry (Day ${data.dayNumber})`,
        desc: `Walk through "${data.dailyTheme}" and experience God's restorative truth.`
      },
      {
        title: 'The Sacred S.T.E.P. Method™ Rhythm',
        desc: 'Scripture (Anchor) · Truth (Reframe the lie) · Embrace (Affirmation) · Practice (One small action).'
      },
      {
        title: 'Guided Trauma-Informed Worksheet',
        desc: `"${data.exerciseName}" — a gentle, step-by-step framework to process your recovery.`
      },
      {
        title: 'Direct Product Alignment & Continuation',
        desc: `Seamless companion roadmap to the ${data.journalPageCount}-page ${data.monthName} Transformation Journal and 365 Ebook.`
      }
    ];

    let bY = 382;
    bullets.forEach((b) => {
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

    // Cover CTA button
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

    // Quote Box
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
    drawHeaderBanner('A Note From the Author');

    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
    doc.text('A Note From the Author', margin, 85);

    doc.setFont('times', 'italic');
    doc.setFontSize(12);
    doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.text(`From the Battlefield to the Quiet Horizon of ${data.monthTheme}`, margin, 102);

    doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.setLineWidth(1);
    doc.line(margin, 110, margin + 160, 110);

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

    // Callout Box
    doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.setLineWidth(1);
    doc.roundedRect(margin, letterY, contentWidth, 105, 6, 6, 'FD');

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

    // Disclaimer
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
    // PAGE 3: SAMPLE CHAPTER
    // ==========================================
    doc.addPage();
    drawBackground();
    drawHeaderBanner(`Day ${data.dayNumber} of 30`);

    doc.setFont('times', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
    doc.text(data.dailyTheme, margin, 80);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
    doc.text(`DAY ${data.dayNumber} DEVOTIONAL · ${data.monthName.toUpperCase()} TRANSFORMATION JOURNAL`, margin, 96);

    // Scripture
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

    // What this means
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

    // The S.T.E.P. Method Card
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

    // Prayer
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

    // Journal lines
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
    drawHeaderBanner('Trauma-Informed Guided Worksheet');

    doc.setFont('times', 'bold');
    doc.setFontSize(19);
    doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
    doc.text(data.exerciseName, margin, 80);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
    doc.text(data.exerciseSubtitle.toUpperCase(), margin, 95);

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

    let exY = 166;
    data.exerciseSteps.forEach((st) => {
      doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
      doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, exY, contentWidth, 120, 6, 6, 'FD');

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

      doc.setDrawColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
      doc.setLineWidth(0.4);
      doc.line(margin + 14, exY + 84, margin + contentWidth - 14, exY + 84);
      doc.line(margin + 14, exY + 104, margin + contentWidth - 14, exY + 104);

      exY += 134;
    });

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
    drawHeaderBanner('Continue Your Transformation');

    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
    doc.text('Continue Your Transformation', pageWidth / 2, 82, { align: 'center' });

    doc.setFont('times', 'italic');
    doc.setFontSize(12);
    doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.text(`Deepen Your Walk with the Complete ${data.monthName} Transformation Journal`, pageWidth / 2, 100, { align: 'center' });

    doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.setDrawColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.setLineWidth(1.2);
    doc.roundedRect(margin, 116, contentWidth, 235, 8, 8, 'FD');

    // Journal Book Graphic Card
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
    doc.text(data.monthName.toUpperCase(), margin + 70, 215, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(WARM_SAND[0], WARM_SAND[1], WARM_SAND[2]);
    doc.text(data.monthThemeUppercase, margin + 70, 227, { align: 'center' });
    doc.text(`${data.journalPageCount} PAGES`, margin + 70, 252, { align: 'center' });

    const colX = margin + 135;
    doc.setFont('times', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
    doc.text(`The ${data.monthName} Transformation Journal`, colX, 148);

    doc.setFont('times', 'italic');
    doc.setFontSize(10.5);
    doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.text(data.journalSubtitle, colX, 163);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(OFF_BLACK[0], OFF_BLACK[1], OFF_BLACK[2]);
    const journalDesc = doc.splitTextToSize(
      `You have just walked through a single day. The complete ${data.monthName} Journal takes you through 30 structured days of spiritual unburdening, weekly guided trauma-informed exercises, and personal prayer matrices designed to take you from survivor to servant-leader.`,
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

    doc.setFillColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
    doc.roundedRect(colX, 304, contentWidth - 155, 30, 15, 15, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.text(`GET THE ${data.monthName.toUpperCase()} JOURNAL · $14.99`, colX + (contentWidth - 155) / 2, 323, { align: 'center' });

    // Ebook Anchor Card
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
      'The complete 365 Biblical Affirmations Ebook is the overarching spine that connects all twelve monthly journals. Experience a full year of daily renewal designed specifically for recovery, breaking generational chains, and walking in freedom.',
      contentWidth - 36
    );
    doc.text(ebookDesc, margin + 18, 410);

    doc.setFillColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.roundedRect(margin + 18, 466, 210, 28, 14, 14, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
    doc.text('GET THE COMPLETE 365 EBOOK', margin + 123, 484, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(SACRED_BLUE[0], SACRED_BLUE[1], SACRED_BLUE[2]);
    doc.text('FREE DAILY COMPANION WEB APP:', margin + 250, 474);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(MUTED_SAGE[0], MUTED_SAGE[1], MUTED_SAGE[2]);
    doc.text('sacred-steps-affirmations.ai.studio', margin + 250, 488);

    // Cross-reference footer
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
    doc.text(`• Devotional Text: Day ${data.dayNumber} from “Sacred Steps to Redemption: 365 Biblical Affirmations” (p. ${data.dayNumber})`, margin + 16, 560);
    doc.text(`• Guided Exercise: “${data.exerciseName}”, ${data.monthName} Transformation Journal (p. 42–45)`, margin + 16, 574);
    doc.text('• Publisher: Kya Daisy Publishing | All rights reserved under International Copyright Conventions.', margin + 16, 588);

    doc.setFont('times', 'italic');
    doc.setFontSize(11);
    doc.setTextColor(DAWN_GOLD[0], DAWN_GOLD[1], DAWN_GOLD[2]);
    doc.text('“A path to recovery, a life in grace.”', pageWidth / 2, 642, { align: 'center' });

    drawFooter(5);

    return doc;
  }

  /**
   * Triggers direct browser download of the formatted PDF
   */
  public downloadFormattedPdf(monthNumber: number = 10, fileName?: string) {
    const data = MONTHLY_LEAD_MAGNET_DATA[monthNumber] || MONTHLY_LEAD_MAGNET_DATA[10];
    const targetName = fileName || `Sacred_Steps_${data.monthName}_Sample_Guide.pdf`;
    analyticsService.trackLeadMagnetDownloaded(data.monthName);

    // If pre-generated static PDF exists in public (e.g. for October), try direct link first
    if (monthNumber === 10) {
      const link = document.createElement('a');
      link.href = '/assets/guides/Sacred_Steps_October_Sample_Guide.pdf';
      link.download = 'Sacred_Steps_October_Sample_Guide.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    const doc = this.createMonthlyPdf(monthNumber);
    doc.save(targetName);
  }
}

export const leadMagnetPdfService = new LeadMagnetPdfService();
