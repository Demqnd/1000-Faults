import { useRef, useState } from 'react'
import { gameInstructions, rules } from './data/rules'
import { searchRules } from './search'
import AdSidebar from './AdSidebar'
import './App.css'

function Icon({ name, ...props }) {
  const paths = {
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
    list: <><path d="M9 6h12M9 12h12M9 18h12" /><path d="M3 6h.01M3 12h.01M3 18h.01" /></>,
    bulb: <><path d="M9 18h6M10 21h4M8.5 14.5a6 6 0 1 1 7 0c-1 .7-1.5 1.5-1.5 3.5h-4c0-2-.5-2.8-1.5-3.5Z" /></>,
    arrow: <><path d="M4 12h16m-6-6 6 6-6 6" /></>,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    book: <><path d="M12 6v15M12 6C8 3 4 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-2-1-6-1-10 2Z" /></>,
  }
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>
}

function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState('rules')
  const searchInput = useRef(null)
  const results = searchRules(rules, query)
  const isSearching = query.trim().length > 0
  function browseRules() { setQuery(''); setPage('rules') }
  function trySearch(value) {
    setQuery(value); setPage('rules')
    requestAnimationFrame(() => searchInput.current?.focus())
  }
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <button className="brand" onClick={browseRules} aria-label="1000 Rules home">
          <span className="brand-title"><span className="brand-rays left" /><span className="coral">1000</span> <span className="mint">RULES</span><span className="brand-rays right" /></span>
          <span className="brand-tagline">The rulebook for game night.</span>
        </button>
        <nav className="header-nav" aria-label="Main navigation">
          <button onClick={browseRules} className={page === 'rules' ? 'current' : ''}>Browse all rules</button>
          <button onClick={() => setPage('about')} className={page === 'about' ? 'current' : ''}>About <span className="nav-dot" /></button>
        </nav>
      </header>
      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-label">THE RULEBOOK</div>
          <nav className="side-nav" aria-label="Rulebook navigation">
            <button className={page === 'rules' ? 'active' : ''} onClick={browseRules}><Icon name="list" />All rules<span className="count-badge">{rules.length}</span></button>
            <button className={page === 'tips' ? 'active' : ''} onClick={() => setPage('tips')}><Icon name="bulb" />Search tips</button>
          </nav>
          <div className="sidebar-note"><span className="little-star">✳</span><p>A simple game.<br />A lot to remember.</p><span>That’s what the rulebook is for.</span></div>
          <div className="edition">THE ORIGINAL HOUSE RULES <span>↗</span></div>
        </aside>
        <main id="main" tabIndex="-1">
          {page === 'rules' && <>
            <div className="page-heading"><div className="eyebrow"><span /> GOOD COMPANY. QUESTIONABLE MEMORY.</div><h1>Every rule. <span>One place.</span></h1><p>Settle the debate. Find the rule. Keep the night going.</p></div>
            <div className="search-box"><Icon name="search" width="23" height="23" /><label className="sr-only" htmlFor="rule-search">Search rules by keyword or number</label><input ref={searchInput} id="rule-search" type="search" autoComplete="off" placeholder="Search a rule, a word, a questionable move…" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') setQuery('') }} />{query && <button className="clear-search" onClick={() => { setQuery(''); searchInput.current?.focus() }} aria-label="Clear search"><Icon name="close" width="16" height="16" /></button>}</div>
            <div className="suggestions"><span>Try searching</span>{['knock on wood', 'country', 'nose'].map((term) => <button key={term} onClick={() => trySearch(term)}>{term}<span>↗</span></button>)}</div>
            <div className="results-heading"><h2 aria-live="polite" aria-atomic="true">{isSearching ? `${results.length} matching ${results.length === 1 ? 'rule' : 'rules'}` : 'All rules'}{!isSearching && <span>{rules.length}</span>}</h2><span className="sample-label">HOUSE RULES</span></div>
            {results.length > 0 ? <ol className="rule-list">{results.map((rule) => <li className="rule-card" key={rule.id}><div className="rule-meta"><span className="rule-number">#{String(rule.id).padStart(3, '0')}</span></div><p>{rule.text}</p></li>)}</ol> : <div className="empty-state"><Icon name="search" width="30" height="30" /><h3>No rules found.</h3><p>Try a shorter keyword, like “wood”, or search by rule number.</p><button className="outline-button" onClick={browseRules}>Browse all rules <Icon name="arrow" /></button></div>}
            {isSearching && results.length > 0 && <button className="outline-button browse-button" onClick={browseRules}>Browse all rules <Icon name="arrow" width="16" height="16" /></button>}
            <div className="rulebook-note"><Icon name="book" width="17" height="17" /><span>Find a rule by its number, wording, or a related keyword.</span></div>
          </>}
          {page === 'tips' && <section className="info-page"><div className="eyebrow">FIND IT BEFORE YOU FORGET IT</div><h1>A little search help.</h1><p>Half-remember a rule? Start with what you know.</p><div className="info-card"><h2>Search the idea</h2><p>Try “nose”, “country”, or “knock on wood”. Search includes related keywords, so “geography” finds the country rule, too.</p><button className="text-button" onClick={() => trySearch('geography')}>Try “geography” <Icon name="arrow" /></button></div><div className="info-card"><h2>Know the number?</h2><p>Enter a rule number, with or without the #. For example, 022 takes you straight to rule #022.</p><button className="text-button" onClick={() => trySearch('#022')}>Find rule #022 <Icon name="arrow" /></button></div><div className="info-card"><h2>Keep it simple</h2><p>A keyword usually works best. Clear the search with the × button or press Escape to see the whole rulebook again.</p></div></section>}
          {page === 'about' && <section className="info-page"><div className="eyebrow">MADE FOR GAME NIGHT</div><h1>1000 rules.<br /><span>Countless “wait, what?”s.</span></h1><p>A game made by two friends, and a place to keep all the rules straight.</p><div className="info-card"><h2>The idea is simple.</h2><p>Break a rule, get a fault, take a drink. From naming a country to forgetting to knock on the table before a question, it’s the little things that catch you out.</p></div><div className="info-card"><h2>Rules of the game</h2><p>{gameInstructions}</p></div><button className="outline-button" onClick={browseRules}>Explore the rulebook <Icon name="arrow" /></button></section>}
        </main>
        <AdSidebar />
      </div>
      <footer className="site-footer"><span><span className="footer-dot" /> Made for nights worth remembering.</span><span>1000 RULES <span className="footer-divider">/</span> THE RULEBOOK</span></footer>
    </div>
  )
}
export default App
