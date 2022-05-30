type GTagEvent = {
  category: string;
  action: string;
  label?: string;
  value?: number;
};

export const trackPageView = (url: URL): void => {
  if (process.env.NEXT_PUBLIC_GA_TRACKING_ID) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
      page_path: url
    });
  }
};

export const trackEvent = ({action, category, label, value}: GTagEvent): void => {
  if (process.env.NEXT_PUBLIC_GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};
