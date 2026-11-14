/**
 * Sacred Steps Transformation Journals & Ebook Companion Data
 * Detailed alignment between the daily devotional, 365 Affirmations Ebook,
 * and the 12 Monthly Transformation Journals.
 */

export interface MonthlyJournalMeta {
  monthNumber: number;
  monthName: string;
  theme: string;
  slug: string;
  subtitle: string;
  coverImage?: string;
  pageCount: number;
  coreFocus: string;
  reflectionPrompt: string;
  amazonUrl: string;
  digitalDownloadUrl: string;
}

export const MONTHLY_JOURNALS: Record<number, MonthlyJournalMeta> = {
  1: {
    monthNumber: 1,
    monthName: 'January',
    theme: 'Identity: Who God Says I Am',
    slug: 'january-identity',
    subtitle: 'Reclaiming Your Divine Image Beneath Old Labels',
    pageCount: 124,
    coreFocus: 'Stripping away false labels of addiction and failure to build on the unshakeable foundation of Genesis 1:27.',
    reflectionPrompt: 'What old label did you carry into this week, and how does God name you instead?',
    amazonUrl: 'https://amazon.com/dp/B0SACRED01',
    digitalDownloadUrl: '/journals/january-identity.pdf'
  },
  2: {
    monthNumber: 2,
    monthName: 'February',
    theme: 'Grace: Releasing Shame & Guilt',
    slug: 'february-grace',
    subtitle: 'Walking in the Freedom of Pre-Approved Mercy',
    pageCount: 120,
    coreFocus: 'Distinguishing conviction from toxic shame. Learning to receive forgiveness without punishing yourself.',
    reflectionPrompt: 'Where are you still demanding self-atonement instead of accepting Christ’s finished cross?',
    amazonUrl: 'https://amazon.com/dp/B0SACRED02',
    digitalDownloadUrl: '/journals/february-grace.pdf'
  },
  3: {
    monthNumber: 3,
    monthName: 'March',
    theme: 'Faith: Learning to Trust God',
    slug: 'march-faith',
    subtitle: 'Surrendering Control One Quiet Step at a Time',
    pageCount: 128,
    coreFocus: 'Transitioning from the false security of self-reliance into holy dependency on God’s faithful character.',
    reflectionPrompt: 'What outcome are you desperately gripping today that needs to be laid upon the altar?',
    amazonUrl: 'https://amazon.com/dp/B0SACRED03',
    digitalDownloadUrl: '/journals/march-faith.pdf'
  },
  4: {
    monthNumber: 4,
    monthName: 'April',
    theme: 'Freedom: Breaking Strongholds',
    slug: 'april-freedom',
    subtitle: 'Dismantling Mindsets of Bondage & Relapse Fears',
    pageCount: 120,
    coreFocus: 'Identifying spiritual and mental triggers before they become actions. Standing fast in Galatians 5:1.',
    reflectionPrompt: 'What habitual thought pattern is the doorway to your old coping mechanism?',
    amazonUrl: 'https://amazon.com/dp/B0SACRED04',
    digitalDownloadUrl: '/journals/april-freedom.pdf'
  },
  5: {
    monthNumber: 5,
    monthName: 'May',
    theme: 'Healing: Restoring the Broken Places',
    slug: 'may-healing',
    subtitle: 'Mending Past Trauma and Relational Wounds',
    pageCount: 128,
    coreFocus: 'Allowing the Great Physician into the root injuries that drove the numbing behavior.',
    reflectionPrompt: 'What tender memory needs the gentle touch of Christ’s presence right now?',
    amazonUrl: 'https://amazon.com/dp/B0SACRED05',
    digitalDownloadUrl: '/journals/may-healing.pdf'
  },
  6: {
    monthNumber: 6,
    monthName: 'June',
    theme: 'Discipline: Choosing God’s Way',
    slug: 'june-discipline',
    subtitle: 'Sacred Habits that Protect Your Sobriety',
    pageCount: 124,
    coreFocus: 'Reframing discipline not as harsh legalism, but as loving guardrails that nurture ongoing peace.',
    reflectionPrompt: 'Which daily boundary has protected your spiritual serenity the most this week?',
    amazonUrl: 'https://amazon.com/dp/B0SACRED06',
    digitalDownloadUrl: '/journals/june-discipline.pdf'
  },
  7: {
    monthNumber: 7,
    monthName: 'July',
    theme: 'Courage: Facing What I’ve Avoided',
    slug: 'july-courage',
    subtitle: 'Honest Inventory, Tough Conversations & Amends',
    pageCount: 126,
    coreFocus: 'Stepping into uncomfortable truths without fleeing to old comforts. Holy bravery in action.',
    reflectionPrompt: 'Who do you need to speak with in truth and humility this week?',
    amazonUrl: 'https://amazon.com/dp/B0SACRED07',
    digitalDownloadUrl: '/journals/july-courage.pdf'
  },
  8: {
    monthNumber: 8,
    monthName: 'August',
    theme: 'Peace: Stillness in the Storm',
    slug: 'august-peace',
    subtitle: 'Anchoring Your Soul When Life Rages',
    pageCount: 120,
    coreFocus: 'Guarding emotional sobriety through stillness, breath prayer, and meditating on Philippians 4:7.',
    reflectionPrompt: 'In the middle of external chaos, what truth preserves your internal quietness?',
    amazonUrl: 'https://amazon.com/dp/B0SACRED08',
    digitalDownloadUrl: '/journals/august-peace.pdf'
  },
  9: {
    monthNumber: 9,
    monthName: 'September',
    theme: 'Gratitude: Seeing God in the Everyday',
    slug: 'september-gratitude',
    subtitle: 'The Antidote to Resentment and Self-Pity',
    pageCount: 122,
    coreFocus: 'Cultivating spiritual eyesight to recognize grace in ordinary moments and mundane mercies.',
    reflectionPrompt: 'Name three quiet mercies from today that you would have overlooked in active addiction.',
    amazonUrl: 'https://amazon.com/dp/B0SACRED09',
    digitalDownloadUrl: '/journals/september-gratitude.pdf'
  },
  10: {
    monthNumber: 10,
    monthName: 'October',
    theme: 'Purpose: Called to Help Someone Else',
    slug: 'october-purpose',
    subtitle: 'Transforming Your Deepest Pain into Ministry',
    pageCount: 128,
    coreFocus: 'Step 12 carried out with a servant’s heart. Carrying hope to another suffering soul without ego.',
    reflectionPrompt: 'How has your redemption story opened a door of comfort for someone struggling today?',
    amazonUrl: 'https://amazon.com/dp/B0SACRED10',
    digitalDownloadUrl: '/journals/october-purpose.pdf'
  },
  11: {
    monthNumber: 11,
    monthName: 'November',
    theme: 'Perseverance: Finishing What I Started',
    slug: 'november-perseverance',
    subtitle: 'Endurance Through the Long Valley of the Ordinary',
    pageCount: 120,
    coreFocus: 'Overcoming the quiet fatigue of long-term recovery. Trusting God when the emotional high has settled.',
    reflectionPrompt: 'What motivates you to keep walking when no one is clapping and progress feels slow?',
    amazonUrl: 'https://amazon.com/dp/B0SACRED11',
    digitalDownloadUrl: '/journals/november-perseverance.pdf'
  },
  12: {
    monthNumber: 12,
    monthName: 'December',
    theme: 'Hope: Looking Forward with Joy',
    slug: 'december-hope',
    subtitle: 'A Future Redeemed and Overflowing with Grace',
    pageCount: 132,
    coreFocus: 'Celebrating milestones without dreading relapse. Standing as a living testimony of resurrection power.',
    reflectionPrompt: 'Look back at where you were 365 days ago. What miraculous work has God completed in you?',
    amazonUrl: 'https://amazon.com/dp/B0SACRED12',
    digitalDownloadUrl: '/journals/december-hope.pdf'
  }
};

/**
 * Calculates companion journal and ebook page cross-reference for any day of the year (1-365).
 */
export function getJournalPageReference(dayNumber: number): {
  monthNumber: number;
  monthName: string;
  theme: string;
  journalSlug: string;
  journalPage: number;
  ebookPage: number;
  journalTitle: string;
  reflectionPrompt: string;
} {
  const boundedDay = Math.max(1, Math.min(365, dayNumber));
  // Rough month calculation (30.4 days per month average)
  const monthIdx = Math.min(12, Math.max(1, Math.ceil(boundedDay / 30.4)));
  const journal = MONTHLY_JOURNALS[monthIdx] || MONTHLY_JOURNALS[1];

  // Calculate day position within that month (1 to ~31)
  const dayInMonth = ((boundedDay - 1) % 30) + 1;
  // In a 120-page journal, each day gets roughly 3-4 pages of guided inquiry, prayer prompt & reflection
  const journalPage = Math.min(journal.pageCount - 4, 12 + (dayInMonth * 3) - 2);
  
  // Ebook: 365 days across ~420 pages (Introduction + 1 page per day + indexes)
  const ebookPage = 24 + boundedDay;

  return {
    monthNumber: journal.monthNumber,
    monthName: journal.monthName,
    theme: journal.theme,
    journalSlug: journal.slug,
    journalPage,
    ebookPage,
    journalTitle: `${journal.monthName} Transformation Journal`,
    reflectionPrompt: journal.reflectionPrompt
  };
}

/**
 * Lead Magnet: Content of the "30-Day Redemption Prayer Guide"
 */
export const LEAD_MAGNET_GUIDE = {
  title: '30-Day Redemption Prayer Guide',
  subtitle: 'A Daily Companion for Breaking Chains and Walking in Grace',
  author: 'C. Lamont Patrick',
  description: 'Thirty raw, Christ-centered guided prayers for the morning dawn, the afternoon trigger, and the evening rest.',
  sections: [
    {
      week: 1,
      theme: 'The Morning of Surrender (Days 1–7)',
      focus: 'Releasing the need to self-medicate and laying yesterday at the foot of the cross.'
    },
    {
      week: 2,
      theme: 'The Hour of Temptation (Days 8–14)',
      focus: 'Scripture-grounded battle prayers for when the old thirst speaks loudly.'
    },
    {
      week: 3,
      theme: 'Mending What Broke (Days 15–21)',
      focus: 'Prayers of amends, humility, and restoring relationships with loved ones.'
    },
    {
      week: 4,
      theme: 'Walking in New Creation (Days 22–30)',
      focus: 'Step 12 prayers for becoming a conduit of grace to another suffering person.'
    }
  ]
};
