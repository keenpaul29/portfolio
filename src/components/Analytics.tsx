'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from 'nextjs-google-analytics';
// import { Hotjar } from 'nextjs-hotjar';
import Script from 'next/script';

export default function Analytics() {
  return (
    <>
      {/* Vercel Analytics */}
      <VercelAnalytics />
      <SpeedInsights />

      {/* Google Analytics */}
      <GoogleAnalytics 
        gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} 
        trackPageViews
      />

      {/* Microsoft Clarity */}
      <Script strategy="afterInteractive" id="microsoft-clarity">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
        `}
      </Script>

      
      
    </>
  );
}