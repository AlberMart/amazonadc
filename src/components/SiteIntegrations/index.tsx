import Script from 'next/script'
import React from 'react'

import type { SiteSetting } from '@/payload-types'
import {
  sanitizeChatId,
  sanitizeGaId,
  sanitizeGtmId,
  sanitizeHexColor,
  sanitizeWidgetAccount,
} from '@/utilities/scriptIds'

type SiteIntegrationsProps = {
  settings: SiteSetting
}

export function SiteIntegrations({ settings }: SiteIntegrationsProps) {
  const analytics = settings.analytics
  const chat = settings.chat
  const a11y = settings.accessibility

  const gaId = analytics?.enabled ? sanitizeGaId(analytics.gaMeasurementId) : null
  const gtmId = analytics?.enabled ? sanitizeGtmId(analytics.gtmId) : null
  const adsId = analytics?.enabled ? sanitizeGaId(analytics.googleAdsId) : null
  const chatId = sanitizeChatId(chat?.provider, chat?.widgetId)
  const userwayId =
    a11y?.widget === 'userway' ? sanitizeWidgetAccount(a11y.widgetId) : null
  const accessibeId =
    a11y?.widget === 'accessibe' ? sanitizeWidgetAccount(a11y.widgetId) : null

  const chatButtonBg = sanitizeHexColor(chat?.buttonBg, '#0071e3')
  const chatButtonText = sanitizeHexColor(chat?.buttonText, '#f0f0f0')

  return (
    <>
      {gtmId ? (
        <>
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':Date.now(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              className="hidden"
              title="Google Tag Manager"
            />
          </noscript>
        </>
      ) : null}

      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-gtag" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');${adsId && adsId !== gaId ? `gtag('config','${adsId}');` : ''}`}
          </Script>
        </>
      ) : null}

      {chat?.provider === 'chatra' && chatId ? (
        <Script id="chatra" strategy="afterInteractive">
          {`window.ChatraID='${chatId}';window.ChatraSetup={colors:{buttonText:'${chatButtonText}',buttonBg:'${chatButtonBg}'}};(function(d,w,c){var s=d.createElement('script');w[c]=w[c]||function(){(w[c].q=w[c].q||[]).push(arguments)};s.async=true;s.src='https://call.chatra.io/chatra.js';if(d.head)d.head.appendChild(s)})(document,window,'Chatra');`}
        </Script>
      ) : null}

      {chat?.provider === 'tawk' && chatId ? (
        <Script id="tawk" strategy="afterInteractive">
          {`var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date();(function(){var s=document.createElement('script'),e=document.getElementsByTagName('script')[0];s.async=true;s.src='https://embed.tawk.to/${chatId}';s.charset='UTF-8';s.setAttribute('crossorigin','*');e.parentNode.insertBefore(s,e)})();`}
        </Script>
      ) : null}

      {chat?.provider === 'crisp' && chatId ? (
        <Script id="crisp" strategy="afterInteractive">
          {`window.$crisp=[];window.CRISP_WEBSITE_ID='${chatId}';(function(){var d=document,s=d.createElement('script');s.src='https://client.crisp.chat/l.js';s.async=true;d.getElementsByTagName('head')[0].appendChild(s)})();`}
        </Script>
      ) : null}

      {chat?.provider === 'tidio' && chatId ? (
        <Script src={`https://code.tidio.co/${chatId}.js`} strategy="afterInteractive" />
      ) : null}

      {userwayId ? (
        <Script
          src="https://cdn.userway.org/widget.js"
          data-account={userwayId}
          strategy="lazyOnload"
        />
      ) : null}

      {accessibeId ? (
        <Script id="accessibe" strategy="lazyOnload">
          {`(function(){var s=document.createElement('script');s.src='https://acsbapp.com/apps/app/dist/js/app.js';s.async=true;s.onload=function(){if(window.acsbJS)window.acsbJS.init({statementLink:'',footerHtml:'',hideMobile:false,hideTrigger:false,disableBgProcess:false,language:'en',position:'left',leadColor:'#146FF8',triggerColor:'#146FF8',triggerRadius:'50%',triggerPositionX:'left',triggerPositionY:'bottom',triggerIcon:'people',triggerSize:'medium',triggerOffsetX:20,triggerOffsetY:20,mobile:{triggerSize:'small',triggerPositionX:'left',triggerPositionY:'bottom',triggerOffsetX:10,triggerOffsetY:10,triggerRadius:'50%'}})};document.head.appendChild(s)})();`}
        </Script>
      ) : null}
    </>
  )
}
