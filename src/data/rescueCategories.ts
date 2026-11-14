export interface RescueCategory {
  id: string;
  emotion: string;
  subtitle: string;
  targetWeek: number;
  anchorScripture: string;
  truthNugget: string;
  prayer: string;
  suggestedAction: string;
}

export const RESCUE_CATEGORIES: RescueCategory[] = [
  {
    id: 'shame-guilt',
    emotion: 'Shame & Heavy Guilt',
    subtitle: 'When you feel like you ARE the mistake and want to hide',
    targetWeek: 5,
    anchorScripture: '“There is therefore now no condemnation to them which are in Christ Jesus.” — Romans 8:1',
    truthNugget: 'Guilt tells the truth about what you did; condemnation lies about who you are. God comes looking for you in the hiding place with open arms.',
    prayer: 'Father, the shame feels heavy right now. But I look to You. Remind me that Christ took my condemnation. I do not have to hide anymore.',
    suggestedAction: 'Take a slow, deep breath. Physically lift your eyes and say aloud: “I look to You. No condemnation.”'
  },
  {
    id: 'relapse-setback',
    emotion: 'Setback or Relapse',
    subtitle: 'When you slipped and the voice says you failed completely',
    targetWeek: 8,
    anchorScripture: '“A just man falleth seven times, and riseth up again.” — Proverbs 24:16',
    truthNugget: 'A fall bends the path; it does not end it. Righteousness is measured by rising, not by never falling. You are not on probation.',
    prayer: 'Lord Jesus, I stumbled. But Your mercy is new this very morning. Catch me mid-fall, pull me up, and walk with me in this next hour.',
    suggestedAction: 'Do not isolate. Turn on Grace Mode, call a sponsor or trusted friend, and take one simple physical step forward.'
  },
  {
    id: 'fear-panic',
    emotion: 'Fear & Overwhelming Dread',
    subtitle: 'When the future feels terrifying and sober life feels precarious',
    targetWeek: 10,
    anchorScripture: '“God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.” — 2 Timothy 1:7',
    truthNugget: 'Fear and trust can coexist on the same day. Trust just gets the final word.',
    prayer: 'God, fear is loud today. But Your presence is bigger than the thing I’m dreading. Give me a sound mind and steady my heart right now.',
    suggestedAction: 'Open the Sacred Stillness room, begin box breathing for 2 minutes, and anchor on 2 Timothy 1:7.'
  },
  {
    id: 'craving-temptation',
    emotion: 'Craving & Temptation',
    subtitle: 'When the urge to numb or escape feels unbearable',
    targetWeek: 25,
    anchorScripture: '“The weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds.” — 2 Corinthians 10:4',
    truthNugget: 'The old master has no legal authority over you anymore. The craving is just an echo — it does not own you.',
    prayer: 'Christ, my willpower is running thin. Live through me right now. Break this urge and guard my steps today.',
    suggestedAction: 'Delay and distract: Leave the room, drink a tall glass of cold water, speak “You don’t own me anymore” aloud.'
  },
  {
    id: 'anxiety-racing-mind',
    emotion: 'Anxious Mind & Spinning Thoughts',
    subtitle: 'When thoughts are spiraling into worst-case scenarios',
    targetWeek: 35,
    anchorScripture: '“Thou wilt keep him in perfect peace, whose mind is stayed on thee.” — Isaiah 26:3',
    truthNugget: 'Worry has never solved a single problem. Peace follows where your mind is fixed.',
    prayer: 'Father, my mind is noisy. I cast every single one of these spinning worries into Your hands. Wrap me in Your supernatural calm.',
    suggestedAction: 'Write down the single worry cycling most loudly, then literally throw the paper away as an act of surrender.'
  },
  {
    id: 'anger-grudge',
    emotion: 'Anger & Resentment',
    subtitle: 'When someone wounded you and bitterness is burning inside',
    targetWeek: 33,
    anchorScripture: '“Let all bitterness… be put away from you… forgiving one another.” — Ephesians 4:31-32',
    truthNugget: 'Bitterness poisons the vessel that carries it. Releasing the grudge is for your own freedom, not the other person’s innocence.',
    prayer: 'Lord, it hurts and it feels unfair. But I refuse to stay poisoned. I release vengeance into Your hands and choose freedom.',
    suggestedAction: 'Pray a quiet one-sentence blessing over the person holding your grudge, releasing them into God’s justice.'
  },
  {
    id: 'grief-loneliness',
    emotion: 'Deep Grief & Loneliness',
    subtitle: 'When you feel isolated, abandoned, or grieving lost years',
    targetWeek: 19,
    anchorScripture: '“The Lord is nigh unto them that are of a broken heart.” — Psalm 34:18',
    truthNugget: 'You are never suffering while God watches from a distance. Brokenness draws Him nearer, not farther.',
    prayer: 'Jesus, You wept. You know what it feels like to hurt. Sit with me in this grief and remind me I am never abandoned.',
    suggestedAction: 'Permit yourself to grieve without judgment. Then text or message one brother or sister on the journey.'
  }
];
