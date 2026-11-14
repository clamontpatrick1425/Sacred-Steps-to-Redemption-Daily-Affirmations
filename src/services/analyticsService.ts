/**
 * Sacred Steps Analytics & Event Tracking Service
 * Tracks core conversion events (GA4, Meta Pixel, and in-app telemetry)
 * strictly respecting user privacy and recovery dignity.
 */

export type AnalyticsEventName =
  | 'email_signup_submitted'
  | 'took_this_step_clicked'
  | 'journal_upsell_clicked'
  | 'share_graphic_generated'
  | 'audio_affirmation_played'
  | 'grace_mode_toggled'
  | 'weekly_recap_viewed'
  | 'reminder_scheduled'
  | 'lead_magnet_downloaded';

export interface AnalyticsPayload {
  dayNumber?: number;
  weekNumber?: number;
  monthName?: string;
  source?: string;
  emailDomain?: string;
  shareFormat?: string;
  completed?: boolean;
  [key: string]: any;
}

class AnalyticsService {
  private eventsLog: { event: AnalyticsEventName; payload: AnalyticsPayload; timestamp: number }[] = [];

  constructor() {
    // Try to load any logged events from session
    try {
      const stored = sessionStorage.getItem('sacred_steps_analytics_log');
      if (stored) {
        this.eventsLog = JSON.parse(stored);
      }
    } catch {
      this.eventsLog = [];
    }
  }

  public track(event: AnalyticsEventName, payload: AnalyticsPayload = {}) {
    const entry = {
      event,
      payload,
      timestamp: Date.now()
    };

    this.eventsLog.push(entry);

    // Persist recent session events
    try {
      sessionStorage.setItem('sacred_steps_analytics_log', JSON.stringify(this.eventsLog.slice(-50)));
    } catch {
      // ignore
    }

    // Broadcast standard DOM CustomEvent for external tags (GA4, Google Tag Manager, Meta Pixel)
    if (typeof window !== 'undefined') {
      const customEvt = new CustomEvent('sacred_steps_event', {
        detail: { event, payload, timestamp: entry.timestamp }
      });
      window.dispatchEvent(customEvt);

      // Support gtag if configured in environment
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', event, payload);
      }

      // Support fbq if configured
      if (typeof (window as any).fbq === 'function') {
        (window as any).fbq('trackCustom', event, payload);
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Sacred Steps Analytics] ${event}`, payload);
    }
  }

  public trackEmailSignupSubmitted(email: string, source: string = 'lead_magnet_day_8') {
    const domain = email.includes('@') ? email.split('@')[1] : 'unknown';
    this.track('email_signup_submitted', {
      source,
      emailDomain: domain
    });
  }

  public trackTookThisStepClicked(dayNumber: number, completed: boolean) {
    this.track('took_this_step_clicked', {
      dayNumber,
      completed
    });
  }

  public trackJournalUpsellClicked(monthName: string, source: string, pageReference?: number) {
    this.track('journal_upsell_clicked', {
      monthName,
      source,
      pageReference
    });
  }

  public trackShareGraphicGenerated(
    dayNumber: number,
    format: 'png' | 'copy_text' | 'web_share' | 'png_html2canvas' | 'copy_image_clipboard' = 'png'
  ) {
    this.track('share_graphic_generated', {
      dayNumber,
      shareFormat: format
    });
  }

  public trackLeadMagnetDownloaded(monthName: string, source: string = 'sample_chapter_5_page') {
    this.track('lead_magnet_downloaded', {
      monthName,
      source
    });
  }

  public trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
    this.track(eventName as AnalyticsEventName, payload);
  }
}

export const analyticsService = new AnalyticsService();
