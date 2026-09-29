import { useEffect, useRef } from 'react'

// AdSense display ad unit: Davison.
const SIDEBAR_AD_SLOT = '9323645576'

export default function AdSidebar() {
  const adElement = useRef(null)
  const requested = useRef(false)

  useEffect(() => {
    const element = adElement.current
    if (!SIDEBAR_AD_SLOT || !element || requested.current) return

    function requestAdWhenVisible() {
      // This sidebar is hidden on smaller screens. Wait for a measurable width
      // before asking AdSense to size it, and request only once per mount.
      if (requested.current || element.getBoundingClientRect().width === 0) return
      requested.current = true
      observer.disconnect()
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        if (import.meta.env.DEV) console.warn('AdSense sidebar could not load:', error)
      }
    }

    const observer = new ResizeObserver(requestAdWhenVisible)
    observer.observe(element)
    requestAdWhenVisible()
    return () => observer.disconnect()
  }, [])

  return (
    <aside className="ad-sidebar" aria-label="Advertisement">
      <div className="ad-sidebar-label">Advertisement</div>
      <div className="ad-sidebar-space">
        {SIDEBAR_AD_SLOT ? (
          <ins
            ref={adElement}
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client="ca-pub-8738741825905481"
            data-ad-slot={SIDEBAR_AD_SLOT}
            data-ad-format="auto"
            data-full-width-responsive="false"
          />
        ) : (
          <div className="ad-sidebar-placeholder" aria-hidden="true" />
        )}
      </div>
    </aside>
  )
}
