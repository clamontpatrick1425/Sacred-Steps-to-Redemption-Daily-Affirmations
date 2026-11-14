/**
 * Lead Magnet & Email Capture Service
 * Manages access gating (Days 1-7 free, Day 8+ unlocked upon email capture),
 * tracks 7 days of real/simulated app usage,
 * simulates Email Service Provider (ESP) integration (ConvertKit / Mailchimp / Resend),
 * and delivers the complimentary "30-Day Redemption Prayer Guide".
 */

import { analyticsService } from './analyticsService';
import { storageService } from './storageService';

export type ESPProvider = 'ConvertKit' | 'Mailchimp' | 'Resend';

export interface LeadMagnetState {
  emailCaptured: boolean;
  userEmail?: string;
  userName?: string;
  capturedAt?: number;
  downloadCount: number;
  reminderEnabled: boolean;
  reminderTime: string; // e.g. "07:00"
  selectedProvider: ESPProvider;
  usageDates: string[]; // YYYY-MM-DD dates user opened/walked
  simulatedUsageDays: number; // For testing/evaluator demo
  lastTriggerDismissedAt?: number;
}

export interface ESPResponse {
  success: boolean;
  message: string;
  provider: ESPProvider;
  subscriberId?: string;
  welcomeEmailSent: boolean;
  guideDownloadUrl?: string;
}

const STORAGE_KEY = 'sacred_steps_lead_state';
export const FREE_DAYS_LIMIT = 7;

class LeadMagnetService {
  private state: LeadMagnetState;

  constructor() {
    this.state = this.loadState();
    this.recordTodayUsage();
  }

  private loadState(): LeadMagnetState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          emailCaptured: parsed.emailCaptured || false,
          userEmail: parsed.userEmail,
          userName: parsed.userName,
          capturedAt: parsed.capturedAt,
          downloadCount: parsed.downloadCount || 0,
          reminderEnabled: parsed.reminderEnabled || false,
          reminderTime: parsed.reminderTime || '07:00',
          selectedProvider: parsed.selectedProvider || 'ConvertKit',
          usageDates: Array.isArray(parsed.usageDates) ? parsed.usageDates : [this.getTodayString()],
          simulatedUsageDays: parsed.simulatedUsageDays || 0,
          lastTriggerDismissedAt: parsed.lastTriggerDismissedAt
        };
      }
    } catch {
      // ignore
    }

    return {
      emailCaptured: false,
      userEmail: undefined,
      userName: undefined,
      downloadCount: 0,
      reminderEnabled: false,
      reminderTime: '07:00',
      selectedProvider: 'ConvertKit',
      usageDates: [this.getTodayString()],
      simulatedUsageDays: 0
    };
  }

  private persistState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error(e);
    }
  }

  private getTodayString(): string {
    return new Date().toISOString().split('T')[0];
  }

  public getState(): LeadMagnetState {
    return { ...this.state };
  }

  public isUnlocked(): boolean {
    return this.state.emailCaptured;
  }

  /**
   * Records app usage for today.
   */
  public recordTodayUsage(dayNumber?: number): number {
    const today = this.getTodayString();
    if (!this.state.usageDates.includes(today)) {
      this.state.usageDates.push(today);
      this.persistState();
    }
    return this.getDaysOfUsageCount();
  }

  /**
   * Calculates total days of usage (real active days + any completed steps + simulated days).
   */
  public getDaysOfUsageCount(): number {
    const uniqueDatesCount = this.state.usageDates.length;
    const completedStepsCount = storageService.getCompletedSteps().length;
    const walkStats = storageService.getWalkStats();
    
    // Combine unique usage signals
    const baseUsage = Math.max(uniqueDatesCount, Math.min(completedStepsCount, 7));
    return Math.max(baseUsage, this.state.simulatedUsageDays);
  }

  /**
   * Evaluates if 7 days of usage threshold has been met.
   */
  public hasReached7DaysUsage(): boolean {
    return this.getDaysOfUsageCount() >= FREE_DAYS_LIMIT;
  }

  /**
   * Checks whether the 7-day usage lead modal should trigger.
   * Triggers when user has reached 7 days of usage or attempts day 8+,
   * provided they have not yet captured email and haven't explicitly dismissed it in the last 4 hours.
   */
  public shouldTrigger7DayModal(currentDayNumber?: number): boolean {
    if (this.state.emailCaptured) {
      return false;
    }

    // Day 8+ is a hard requirement for community unlock
    if (currentDayNumber && currentDayNumber > FREE_DAYS_LIMIT) {
      return true;
    }

    // 7 Days of usage completed
    if (this.hasReached7DaysUsage()) {
      if (!this.state.lastTriggerDismissedAt) return true;
      // Re-prompt after 4 hours if still not captured
      const hoursSinceDismiss = (Date.now() - this.state.lastTriggerDismissedAt) / (1000 * 60 * 60);
      return hoursSinceDismiss > 4;
    }

    return false;
  }

  public dismiss7DayModal() {
    this.state.lastTriggerDismissedAt = Date.now();
    this.persistState();
  }

  /**
   * Helper for developers/evaluators to simulate 7 days of usage instantly.
   */
  public simulate7DaysUsage(days: number = 7) {
    this.state.simulatedUsageDays = days;
    this.persistState();
  }

  /**
   * Reset usage state (for testing purposes).
   */
  public resetLeadState() {
    this.state = {
      emailCaptured: false,
      userEmail: undefined,
      userName: undefined,
      downloadCount: 0,
      reminderEnabled: false,
      reminderTime: '07:00',
      selectedProvider: 'ConvertKit',
      usageDates: [this.getTodayString()],
      simulatedUsageDays: 0,
      lastTriggerDismissedAt: undefined
    };
    this.persistState();
  }

  /**
   * Evaluates if user can view a specific day.
   * Days 1 through 7 are completely friction-free.
   * Day 8 and onward requires joining the community.
   */
  public canAccessDay(dayNumber: number): boolean {
    if (dayNumber <= FREE_DAYS_LIMIT) {
      return true;
    }
    return this.state.emailCaptured;
  }

  /**
   * Submits email to mock ESP (ConvertKit, Mailchimp, or Resend).
   * Unlocks full 365 days and triggers welcome email delivery with prayer guide.
   */
  public async submitEmail(
    email: string,
    name?: string,
    source: string = '7_day_usage_trigger',
    provider: ESPProvider = this.state.selectedProvider
  ): Promise<ESPResponse> {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return {
        success: false,
        message: 'Please enter a valid email address so we can deliver your guide.',
        provider,
        welcomeEmailSent: false
      };
    }

    // Simulate realistic 450ms network round-trip to mock ESP API
    await new Promise(resolve => setTimeout(resolve, 450));

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name?.trim() || 'Friend in Grace';
    const subscriberId = `sub_${provider.toLowerCase()}_${Math.random().toString(36).substring(2, 9)}`;

    this.state.emailCaptured = true;
    this.state.userEmail = cleanEmail;
    this.state.userName = cleanName;
    this.state.capturedAt = Date.now();
    this.state.selectedProvider = provider;
    this.persistState();

    // Log mock ESP transaction
    console.info(`[Mock ESP: ${provider}] Subscriber created:`, {
      subscriberId,
      email: cleanEmail,
      name: cleanName,
      source,
      tags: ['lead-magnet', '30-day-prayer-guide', '365-affirmations'],
      welcomeEmailQueued: true,
      timestamp: new Date().toISOString()
    });

    // Track analytics event
    analyticsService.trackEmailSignupSubmitted(cleanEmail, source);

    return {
      success: true,
      message: `Welcome, ${cleanName}! We have dispatched your free "30-Day Redemption Prayer Guide" via ${provider} to ${cleanEmail}. The entire 365-day walk is now unlocked for you.`,
      provider,
      subscriberId,
      welcomeEmailSent: true,
      guideDownloadUrl: '/assets/guides/Sacred_Steps_30_Day_Redemption_Prayer_Guide.txt'
    };
  }

  /**
   * Restores full access for returning readers or previous subscribers.
   */
  public async restoreAccess(email?: string): Promise<ESPResponse> {
    await new Promise(resolve => setTimeout(resolve, 350));
    const cleanEmail = email?.trim().toLowerCase() || 'traveler@sacredsteps.walk';
    this.state.emailCaptured = true;
    this.state.userEmail = cleanEmail;
    this.state.capturedAt = Date.now();
    this.persistState();

    return {
      success: true,
      message: 'Your access to the complete 365-day journey has been successfully restored.',
      provider: this.state.selectedProvider,
      subscriberId: `sub_restored_${Math.random().toString(36).substring(2, 8)}`,
      welcomeEmailSent: false,
      guideDownloadUrl: '/assets/guides/Sacred_Steps_30_Day_Redemption_Prayer_Guide.txt'
    };
  }

  /**
   * Generates and triggers instant browser download for the "30-Day Redemption Prayer Guide".
   */
  public downloadPrayerGuide() {
    this.state.downloadCount += 1;
    this.persistState();

    const textContent = `========================================================================
SACRED STEPS TO REDEMPTION: 30-DAY REDEMPTION PRAYER GUIDE
A Daily Companion for Breaking Chains and Walking in Grace
Author: C. Lamont Patrick | sacred-steps-affirmations.ai.studio
========================================================================

"Therefore if any man be in Christ, he is a new creature: old things are 
passed away; behold, all things are become new." — 2 Corinthians 5:17

WELCOME, TRAVELER:
Grace brought you here. If you are holding this guide, you have made a 
sacred choice to refuse yesterday's lies. Over the next 30 days, these 
four prayer movements will anchor your mornings, guard your afternoons, 
and hush your evening doubts.

------------------------------------------------------------------------
PART 1: THE MORNING OF SURRENDER (Days 1–7)
Focus: Releasing the need to self-medicate and laying yesterday at the cross.
------------------------------------------------------------------------

DAY 1 — THE PRAYER OF THE HEAVY HEART:
"Lord Jesus, I begin today with nothing to prove and everything to receive. 
I have tried carrying my own recovery and collapsed under the weight. 
Today, I confess that I cannot fix myself, but I trust that You can make 
all things new. Breathe into my quiet moments. Amen."

DAY 2 — THE TRUTH OVER THE LIE:
"Father, the shame in my head whispers that I am unworthy of peace. 
Your Scripture says I am redeemed with the precious blood of Christ. 
Silence the accuser with Your still, small voice. Today, I choose Your 
truth over my familiar anxiety. Amen."

DAY 3 — EMBRACING MERCY:
"God of the second chance, when the temptation rises to punish myself for 
what I lost, remind me that the cross paid every debt. Let me live today 
in the sunlight of grace, not the shadows of regret. Amen."

DAY 4 — STRENGTH FOR THE HOUR:
"Lord, I do not ask for a year's worth of sobriety right now. I ask only 
for grace for the next ten minutes. Guard my eyes, guard my steps, and keep 
me anchored in Your presence. Amen."

DAY 5 — THE PRAYER OF HONESTY:
"Lord, I am weary today. You already know it, so I will not pretend. 
Take this raw honesty and turn it into holy dependence on You. Amen."

DAY 6 — PEACE IN THE STILLNESS:
"Father, when racing thoughts demand that I act in panic, give me the 
courage to sit still. You are God; I am Yours. Amen."

DAY 7 — SABBATH REST IN GRACE:
"Jesus, seven days walked in faith. Thank You for every step. Tomorrow is 
a new dawn, and Your mercies will be waiting. Amen."

------------------------------------------------------------------------
PART 2: THE HOUR OF TEMPTATION (Days 8–14)
------------------------------------------------------------------------
When cravings and old coping impulses cry out, pray:
"Lord Jesus, Son of David, have mercy on me. My body wants the familiar poison, 
but my soul belongs to You. Step between me and this urge. Be my shield. Amen."

------------------------------------------------------------------------
PART 3: MENDING WHAT BROKE (Days 15–21)
------------------------------------------------------------------------
Prayers for humility, amends, and softening hardened relationships with 
godly sorrow that produces life without regret.

------------------------------------------------------------------------
PART 4: WALKING IN NEW CREATION (Days 22–30)
------------------------------------------------------------------------
Carrying the message of hope to another struggling person. Living out 
Isaiah 6:8: "Here am I; send me."

========================================================================
To continue your complete 365-day guided journey, visit:
https://sacred-steps-affirmations.ai.studio/
Companion to: "Sacred Steps to Redemption: 365 Biblical Affirmations"
========================================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Sacred_Steps_30_Day_Redemption_Prayer_Guide.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Sets up daily reminder preferences
   */
  public async setReminder(enabled: boolean, time: string = '07:00'): Promise<{ granted: boolean; message: string }> {
    this.state.reminderEnabled = enabled;
    this.state.reminderTime = time;
    this.persistState();

    let notificationGranted = false;
    if (enabled && typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        notificationGranted = true;
      } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        notificationGranted = permission === 'granted';
      }
    }

    analyticsService.track('reminder_scheduled', {
      reminderTime: time,
      enabled,
      notificationGranted
    });

    return {
      granted: notificationGranted,
      message: enabled
        ? `Daily reminder scheduled for ${time}. Grace will be waiting each dawn.`
        : 'Daily reminders paused. Grace is always here whenever you return.'
    };
  }
}

export const leadMagnetService = new LeadMagnetService();

