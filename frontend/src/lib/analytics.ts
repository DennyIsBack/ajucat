// Google Analytics configuration
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

// Track page view
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag.config({
      page_path: url,
    })
  }
}

// Track event
export const event = (
  action: string,
  params: {
    event_category?: string
    event_label?: string
    value?: number
    [key: string]: any
  }
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag.event(action, params)
  }
}

// Track conversion
export const trackConversion = (value: number, currency: string = 'USD') => {
  event('purchase', {
    value,
    currency,
    event_category: 'ecommerce',
  })
}

// Track form submission
export const trackFormSubmission = (formName: string) => {
  event('form_submit', {
    form_name: formName,
    event_category: 'engagement',
  })
}

// Track button click
export const trackButtonClick = (buttonName: string) => {
  event('button_click', {
    button_name: buttonName,
    event_category: 'engagement',
  })
}

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  event('scroll_depth', {
    scroll_depth: depth,
    event_category: 'engagement',
  })
}
