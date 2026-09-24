import { useMemo, useState } from 'react'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Menu,
  Sparkles,
  X,
  PhoneOutgoing,
} from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

// ─── Assets ──────────────────────────────────────────────────────────────────
import hero from './assets/brand-13.webp'
import about from './assets/brand-17.png'
import bridal from './assets/brand-13.webp'
import eventImg from './assets/brand-11.webp'
import production from './assets/brand-08.webp'
import portfolio1 from './assets/brand-10.webp'
import portfolio2 from './assets/brand-12.webp'
import portfolio3 from './assets/brand-19.webp'
import portfolio4 from './assets/brand-15.webp'
import portfolio5 from './assets/brand-16.webp'
import portfolio6 from './assets/brand-18.webp'

// ─── Configuration ───────────────────────────────────────────────────────────
// Set a full international number here for direct-to-artist WhatsApp, e.g. 9665XXXXXXXX.
const WHATSAPP_NUMBER = '+966537959098'

const TIMES = ['10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM', '8:00 PM']
const MAX_MONTH_OFFSET = 5
const UNAVAILABLE_WEEKDAY = 5 // Friday

const services = [bridal, eventImg, production]
const portfolio = [
  portfolio1, portfolio2, portfolio3,
  portfolio4, portfolio5, portfolio6,
]

// ─── Types ───────────────────────────────────────────────────────────────────
type Lang = 'en' | 'ar'

type Copy = {
  nav: string[]
  book: string
  eyebrow: string
  title: string
  heroBody: string
  servicesTitle: string
  servicesBody: string
  serviceNames: string[]
  serviceBodies: string[]
  aboutKicker: string
  aboutTitle: string
  aboutBody: string
  portfolio: string
  portfolioBody: string
  bookingKicker: string
  bookingTitle: string
  bookingBody: string
  pickDate: string
  pickTime: string
  name: string
  phone: string
  notes: string
  confirm: string
  scan: string
  scanBody: string
  social: string
  socialsBody: string
  footer: string
  available: string
  selected: string
}

// ─── Content ─────────────────────────────────────────────────────────────────
const copy: Record<Lang, Copy> = {
  en: {
    nav: ['Services', 'Portfolio', 'About', 'Booking'],
    book: 'Book your glam',
    eyebrow: 'Makeup artistry • Jeddah',
    title: 'Soft glam, made unforgettable.',
    heroBody:
      'Bridal, event and production makeup created around your features, your light and your moment.',
    servicesTitle: 'Makeup for every occasion',
    servicesBody:
      'A polished, skin-first approach with long-wear finishes made for real life and camera.',
    serviceNames: ['Bridal Glam', 'Event Makeup', 'Production Glam'],
    serviceBodies: [
      'Timeless bridal makeup with a calm, detail-led experience.',
      'Refined glam for celebrations, graduations, dinners and special occasions.',
      'Camera-ready makeup for shoots, campaigns, content and production days.',
    ],
    aboutKicker: 'Meet the artist',
    aboutTitle: 'Elaf Shah',
    aboutBody:
      '10 years of makeup and yet somehow, I still get excited about a new eye technique, a lip combo, or finding a better way to make makeup last.',
    portfolio: 'Selected work',
    portfolioBody:
      'A glimpse into the textures, finishes and moods behind the chair.',
    bookingKicker: 'Reserve your appointment',
    bookingTitle: 'Choose your date',
    bookingBody:
      'Select an available day and preferred time. Your request will open in WhatsApp for quick confirmation.',
    pickDate: 'Pick a date',
    pickTime: 'Preferred time',
    name: 'Your name',
    phone: 'Phone number',
    notes: 'Event / location / notes',
    confirm: 'Send booking on WhatsApp',
    scan: 'Social QR',
    scanBody:
      'Scan to open this site on your phone and jump straight to our social links.',
    social: 'Follow the glam',
    socialsBody: 'Behind the scenes, new looks and booking updates.',
    footer: 'Glam by Elaf Shah. All rights reserved.',
    available: 'Available',
    selected: 'Selected',
  },
  ar: {
    nav: ['الخدمات', 'الأعمال', 'عن الفنانة', 'الحجز'],
    book: 'احجزي موعدك',
    eyebrow: 'فن المكياج • الرياض',
    title: 'إطلالة ناعمة، بحضور لا ينسى.',
    heroBody:
      'مكياج عرائس ومناسبات وإنتاج فني مصمم حول ملامحك وإضاءتك ولحظتك الخاصة.',
    servicesTitle: 'مكياج لكل مناسبة',
    servicesBody:
      'أسلوب راق يركز على البشرة وثبات الإطلالة لتظهر جميلة على الطبيعة وأمام الكاميرا.',
    serviceNames: ['مكياج العروس', 'مكياج المناسبات', 'مكياج الإنتاج'],
    serviceBodies: [
      'إطلالة عروس خالدة بتجربة هادئة واهتمام دقيق بالتفاصيل.',
      'مكياج أنيق للاحتفالات والتخرج والعشاء والمناسبات الخاصة.',
      'مكياج جاهز للكاميرا للتصوير والحملات والمحتوى وأيام الإنتاج.',
    ],
    aboutKicker: 'تعرفي على الفنانة',
    aboutTitle: 'Glam by Elaf Shah',
    aboutBody:
      'الجمال شخصي. تبدأ كل إطلالة بحوار ثم تتحول إلى توازن مدروس بين البشرة والتحديد والنعومة، من دون أن تخفي ملامحك.',
    portfolio: 'مختارات من الأعمال',
    portfolioBody:
      'لمحة عن الملامس واللمسات والمزاج الذي نصنعه خلف كرسي المكياج.',
    bookingKicker: 'احجزي موعدك',
    bookingTitle: 'اختاري التاريخ',
    bookingBody:
      'اختاري اليوم والوقت المناسبين، وسيفتح طلبك في واتساب لتأكيد الموعد بسرعة.',
    pickDate: 'اختاري التاريخ',
    pickTime: 'الوقت المفضل',
    name: 'الاسم',
    phone: 'رقم الجوال',
    notes: 'المناسبة / الموقع / ملاحظات',
    confirm: 'إرسال طلب الحجز عبر واتساب',
    scan: 'رمز التواصل',
    scanBody:
      'امسحي الرمز لفتح الموقع على الجوال والوصول مباشرة إلى روابط التواصل.',
    social: 'تابعي الإطلالات',
    socialsBody: 'خلف الكواليس، إطلالات جديدة وتحديثات الحجز.',
    footer: 'Glam by Elaf Shah. جميع الحقوق محفوظة.',
    available: 'متاح',
    selected: 'محدد',
  },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getDays(year: number, month: number) {
  const first = new Date(year, month, 1)
  const count = new Date(year, month + 1, 0).getDate()
  const offset = first.getDay()
  return { count, offset }
}

function formatDate(date: Date, locale: string, style: 'full' | 'monthYear') {
  return new Intl.DateTimeFormat(locale, {
    ...(style === 'full' ? { dateStyle: 'full' } : { month: 'long', year: 'numeric' }),
  }).format(date)
}

function buildWhatsAppMessage(params: {
  isAr: boolean
  name: string
  dateText: string
  time: string
  phone: string
  notes: string
}) {
  const { isAr, name, dateText, time, phone, notes } = params
  return isAr
    ? `مرحباً، أرغب في طلب حجز مع Glam by Elaf Shah.%0Aالاسم: ${name || '-'}%0Aالتاريخ: ${dateText}%0Aالوقت: ${time}%0Aالجوال: ${phone || '-'}%0Aالتفاصيل: ${notes || '-'}`
    : `Hello, I would like to request a booking with Glam by Elaf Shah.%0AName: ${name || '-'}%0ADate: ${dateText}%0ATime: ${time}%0APhone: ${phone || '-'}%0ADetails: ${notes || '-'}`
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function App() {
  // Language & UI state
  const [lang, setLang] = useState<Lang>('en')
  const [menu, setMenu] = useState(false)

  // Booking state
  const [monthOffset, setMonthOffset] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState(TIMES[2])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  const t = copy[lang]
  const isAr = lang === 'ar'
  const locale = isAr ? 'ar-SA' : 'en-US'

  // Calendar derived state
  const now = new Date()
  const shown = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
  const { count, offset } = getDays(shown.getFullYear(), shown.getMonth())
  const monthName = formatDate(shown, locale, 'monthYear')

  const weekdays = isAr
    ? ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const socialUrl = useMemo(
    () =>
      typeof window === 'undefined'
        ? 'https://example.com/#socials'
        : `${window.location.origin}${window.location.pathname}#socials`,
    []
  )

  // ─── Actions ───────────────────────────────────────────────────────────────
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenu(false)
  }

  const openBooking = () => {
    const dateText = selectedDate
      ? formatDate(selectedDate, isAr ? 'ar-SA' : 'en-GB', 'full')
      : 'Not selected'

    const msg = buildWhatsAppMessage({
      isAr,
      name,
      dateText,
      time: selectedTime,
      phone,
      notes,
    })

    const url = WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
      : `https://wa.me/?text=${msg}`

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="site-shell">
      {/* Header */}
      <header className="topbar">
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Home">
          <span className="brand-script">Glam</span>
          <span className="brand-by">by Elaf Shah</span>
        </button>

        <nav className="desktop-nav">
          {t.nav.map((label, i) => (
            <button key={label} onClick={() => scrollTo(['services', 'portfolio', 'about', 'booking'][i])}>
              {label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button className="lang" onClick={() => setLang(isAr ? 'en' : 'ar')}>
            {isAr ? 'EN' : 'العربية'}
          </button>
          <button className="pill small" onClick={() => scrollTo('booking')}>
            {t.book}
          </button>
          <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">
            {menu ? <X /> : <Menu />}
          </button>
        </div>

        {menu && (
          <div className="mobile-menu">
            {t.nav.map((label, i) => (
              <button key={label} onClick={() => scrollTo(['services', 'portfolio', 'about', 'booking'][i])}>
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="hero section-pad">
          <div className="hero-copy reveal">
            <div className="eyebrow">
              <Sparkles size={15} />
              {t.eyebrow}
            </div>
            <h1>{t.title}</h1>
            <p>{t.heroBody}</p>
            <div className="hero-actions">
              <button className="pill" onClick={() => scrollTo('booking')}>
                {t.book}
                <CalendarDays size={18} />
              </button>
              <button className="text-link" onClick={() => scrollTo('portfolio')}>
                {t.nav[1]} <span>↗</span>
              </button>
            </div>
            <div className="micro-proof">
              <span>10+</span>
              <p>{isAr ? 'سنوات من الخبرة في فن المكياج' : 'years of makeup artistry experience'}</p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="arch">
              <img src={hero} alt="Glam by Elaf Shah bridal makeup" />
            </div>
            <div className="floating-note">
              <span>{isAr ? 'لإطلالة تشبهك' : 'Made for you'}</span>
              <strong>{isAr ? 'ناعمة · راقية · ثابتة' : 'Soft · refined · lasting'}</strong>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section-pad services">
          <div className="section-heading">
            <div>
              <span className="kicker">01 — {t.nav[0]}</span>
              <h2>{t.servicesTitle}</h2>
               <p>{t.servicesBody}</p>
            </div>
           
          </div>

          <div className="service-grid">
            {services.map((img, i) => (
              <article className="service-card" key={i}>
                <div className="service-image">
                  <img src={img} alt={t.serviceNames[i]} />
                </div>
                <div className="service-copy">
                  <span>0{i + 1}</span>
                  {/* <h3>{t.serviceNames[i]}</h3>
                  <p>{t.serviceBodies[i]}</p> */}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="about section-pad">
          <div className="about-image">
            <img src={about} alt="Glam by Elaf Shah artist introduction" />
          </div>
          <div className="about-copy">
            <span className="kicker">02 — {t.aboutKicker}</span>
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutBody}</p>
            {/* <div className="signature">Elaf Shah</div> */}
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="portfolio section-pad">
          <div className="section-heading">
            <div>
              <span className="kicker">03 — {t.nav[1]}</span>
              <h2>{t.portfolio}</h2>
              <p>{t.portfolioBody}</p>
            </div>
            
          </div>

          <div className="masonry">
            {portfolio.map((img, i) => (
              <figure key={i} className={`tile tile-${i + 1}`}>
                <img src={img} alt={`Glam portfolio ${i + 1}`} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        {/* Booking */}
        <section id="booking" className="booking section-pad">
          <div className="booking-intro">
            <span className="kicker">04 — {t.bookingKicker}</span>
            <h2>{t.bookingTitle}</h2>
            <p>{t.bookingBody}</p>
            <div className="booking-mark">
              <CalendarDays />
              <span>
                {isAr
                  ? 'طلبات الحجز تؤكد عبر واتساب'
                  : 'Booking requests are confirmed on WhatsApp'}
              </span>
            </div>
          </div>

          <div className="booking-card">
            {/* Calendar header */}
            <div className="calendar-head">
              <button
                onClick={() => setMonthOffset(Math.max(0, monthOffset - 1))}
                aria-label="Previous month"
              >
                <ChevronLeft />
              </button>
              <strong>{monthName}</strong>
              <button
                onClick={() => setMonthOffset(Math.min(MAX_MONTH_OFFSET, monthOffset + 1))}
                aria-label="Next month"
              >
                <ChevronRight />
              </button>
            </div>

            {/* Weekday labels */}
            <div className="weekdays">
              {weekdays.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="calendar-grid">
              {Array.from({ length: offset }).map((_, i) => (
                <span key={`e${i}`} />
              ))}

              {Array.from({ length: count }).map((_, i) => {
                const d = new Date(shown.getFullYear(), shown.getMonth(), i + 1)
                const past = d < new Date(now.getFullYear(), now.getMonth(), now.getDate())
                const unavailable = d.getDay() === UNAVAILABLE_WEEKDAY
                const selected = selectedDate?.toDateString() === d.toDateString()

                return (
                  <button
                    key={i}
                    disabled={past || unavailable}
                    className={selected ? 'day selected' : 'day'}
                    onClick={() => setSelectedDate(d)}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div className="legend">
              <span>
                <i className="dot" />
                {t.available}
              </span>
              <span>
                <i className="dot selected-dot" />
                {t.selected}
              </span>
            </div>

            {/* Time picker */}
            <div className="times">
              <label>{t.pickTime}</label>
              <div>
                {TIMES.map((tm) => (
                  <button
                    className={selectedTime === tm ? 'time active' : 'time'}
                    onClick={() => setSelectedTime(tm)}
                    key={tm}
                  >
                    {tm}
                  </button>
                ))}
              </div>
            </div>

            {/* Form fields */}
            <div className="form-grid">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.name} />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phone} />
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.notes} />
            </div>

            <button className="pill booking-submit" disabled={!selectedDate} onClick={openBooking}>
              <MessageCircle size={19} />
              {t.confirm}
            </button>
          </div>
        </section>

        {/* Socials */}
        <section id="socials" className="social-section section-pad">
          <div className="social-copy">
            <span className="kicker">05 — Social</span>
            <h2>{t.social}</h2>
            <p>{t.socialsBody}</p>
            <div className="social-buttons">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <PhoneOutgoing /> Instagram
              </a>
              <a
                href={WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : 'https://wa.me/'}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle /> WhatsApp
              </a>
            </div>
          </div>

          <div className="qr-card">
            <div className="qr-wrap">
              <QRCodeSVG
                value={socialUrl}
                size={180}
                bgColor="#F2E8DB"
                fgColor="#5B1032"
                level="H"
                includeMargin
              />
            </div>
            <h3>{t.scan}</h3>
            <p>{t.scanBody}</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="brand footer-brand">
          <span className="brand-script">Glam</span>
          <span className="brand-by">by Elaf Shah</span>
        </div>
        <p>© {new Date().getFullYear()} {t.footer}</p>
        <button onClick={() => scrollTo('home')}>↑</button>
      </footer>
    </div>
  )
}