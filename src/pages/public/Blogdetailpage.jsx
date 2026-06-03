import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, Tag, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import { Footer } from '../../components/public/page-sections'
import { DEMO_BLOG } from '../../lib/demoData'

const POST_IMAGES = {
  1: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1200&fit=crop',
  2: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=1200&fit=crop',
  3: 'https://images.unsplash.com/photo-1606818616326-93f9671c5eff?q=80&w=1200&fit=crop',
  4: 'https://images.unsplash.com/photo-1548767797-d8c844163c4a?q=80&w=1200&fit=crop',
  5: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1200&fit=crop',
  6: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&fit=crop',
}

// Placeholder article body per post
const POST_BODY = {
  1: [
    "As pet owners, we want to share everything with our beloved dogs — including our meals. However, many common human foods can be toxic or harmful to dogs, sometimes fatally so.",
    "Chocolate contains theobromine and caffeine, both of which dogs cannot metabolise effectively. Even small amounts can cause vomiting, diarrhoea, rapid heart rate, and in severe cases, seizures or death. Dark chocolate and baking chocolate are the most dangerous.",
    "Grapes and raisins are another serious threat. While the exact toxic substance is still unknown, even a small amount can cause sudden kidney failure in dogs. Symptoms include lethargy, vomiting, and decreased urination.",
    "Onions, garlic, leeks, and chives — whether raw, cooked, or powdered — damage a dog's red blood cells, leading to anaemia. Look out for weakness, reduced appetite, and pale gums.",
    "Xylitol, an artificial sweetener found in sugar-free gum, candies, and some peanut butters, can cause a rapid release of insulin in dogs, leading to hypoglycaemia (low blood sugar), seizures, and liver failure.",
    "Macadamia nuts can cause weakness, hyperthermia, vomiting, and tremors. Avocado contains persin, which causes vomiting and diarrhoea in dogs. Alcohol, even in small amounts, causes dangerous drops in blood sugar, blood pressure, and body temperature.",
    "When in doubt, keep human food out of reach and consult your veterinarian before introducing anything new to your dog's diet. A healthy, balanced commercial diet formulated for your dog's life stage is always the safest choice.",
  ],
  2: [
    "Vaccinations are one of the most powerful tools we have to protect our cats from serious, often fatal diseases. A proper vaccination schedule is the foundation of every cat's preventive healthcare plan.",
    "Core vaccines are recommended for all cats regardless of lifestyle. These include the FVRCP (feline viral rhinotracheitis, calicivirus, and panleukopenia) combination vaccine, and rabies. These diseases spread easily and carry high mortality rates.",
    "Kittens receive their first FVRCP vaccine as early as 6–8 weeks of age, with boosters every 3–4 weeks until 16 weeks old. This multi-dose protocol is essential because maternal antibodies can interfere with vaccine effectiveness in young kittens.",
    "After the initial kitten series, adult cats require a booster at one year, then every one to three years depending on the vaccine type and your veterinarian's recommendation. Rabies boosters follow local legal requirements.",
    "Non-core vaccines — such as those for feline leukaemia virus (FeLV), feline infectious peritonitis (FIP), and Bordetella — are recommended based on individual risk factors like outdoor access, multi-cat households, or boarding.",
    "Side effects are usually mild and short-lived: slight lethargy, reduced appetite, or a small lump at the injection site. Serious reactions are rare but possible — contact your vet immediately if your cat shows facial swelling, difficulty breathing, or collapse.",
    "Keep a vaccination record and schedule annual wellness exams. Your veterinarian will assess your cat's lifestyle and health status to tailor a vaccination plan that provides optimal protection throughout every life stage.",
  ],
  3: [
    "Dental disease is the most common health problem seen in pets, affecting over 70% of dogs and cats by age three. Yet it remains one of the most preventable — starting with regular tooth brushing at home.",
    "The goal is to disrupt the bacterial biofilm (plaque) before it mineralises into tartar. Brushing even a few times per week can significantly reduce the buildup that leads to gingivitis, periodontal disease, and eventual tooth loss.",
    "Start slow. Let your pet taste the pet-safe toothpaste (never use human toothpaste — xylitol and fluoride are toxic to pets) from your finger first. Gradually introduce a finger brush, then a soft-bristled pet toothbrush over several days or weeks.",
    "Use gentle circular motions along the gum line, focusing on the outer surfaces of the back teeth where tartar accumulates most rapidly. Aim for 30–60 seconds per side. Most pets learn to tolerate — and some even enjoy — brushing with positive reinforcement.",
    "Dental chews, water additives, and dental diets can supplement brushing but are not substitutes. Look for products carrying the Veterinary Oral Health Council (VOHC) seal of approval, which indicates proven efficacy.",
    "Annual professional dental cleanings under anaesthesia allow complete scaling, polishing, and radiographic evaluation of every tooth and root. Early detection of disease means less invasive — and less expensive — treatment.",
    "A healthy mouth means a healthier body. Periodontal bacteria can enter the bloodstream and affect the heart, kidneys, and liver. Investing five minutes in dental care today can add years to your pet's life.",
  ],
  4: [
    "Cats are notorious for sleeping — adults average 12–16 hours per day, and some sleep up to 20 hours. Far from laziness, this rest pattern is deeply rooted in feline biology and evolutionary history.",
    "Cats are crepuscular by nature, most active at dawn and dusk when their prey is easiest to catch. The long daytime sleep conserves energy for intense short bursts of hunting activity. Even domesticated cats retain this hardwired rhythm.",
    "Sleep cycles in cats include both REM (rapid eye movement) and non-REM phases. During REM sleep you may notice whisker twitching, paw movements, or soft chirping — your cat is likely dreaming, possibly replaying hunting sequences.",
    "Kittens and senior cats sleep even more than adults. Kittens need sleep for growth hormone release and neural development. Older cats tire more easily and often nap throughout the day due to the natural slowdown of ageing.",
    "Environmental factors influence sleep patterns significantly. A cat in a quiet, safe, warm home will sleep more deeply. Stress, pain, or illness can cause restlessness, excessive sleep, or disrupted patterns.",
    "If your cat's sleep habits change abruptly — sleeping far more than usual, difficulty waking, or sleeping in unusual positions — this can signal pain, illness, or depression. A veterinary check is warranted.",
    "Provide your cat with multiple comfortable sleeping spots at varying heights. A perch near a window, a cosy bed in a quiet room, and a warm spot near you all give your cat options to self-regulate their rest — and feel secure in their environment.",
  ],
  5: [
    "Exercise is not a one-size-fits-all prescription for dogs. The right amount, intensity, and type of activity varies enormously based on breed, age, size, and individual health status.",
    "Working and sporting breeds — Border Collies, Siberian Huskies, Vizslas, Belgian Malinois — were bred for endurance. They need 2+ hours of vigorous exercise daily, plus mental stimulation. Under-exercised, they develop destructive behaviours, anxiety, and weight problems.",
    "Terriers are smaller but tenacious. Jack Russells, Airedale Terriers, and Fox Terriers have high energy relative to their size and need at least an hour of active play and exploration daily.",
    "Brachycephalic breeds — Bulldogs, Pugs, French Bulldogs, Boston Terriers — have compromised airways and cannot tolerate sustained vigorous exercise, especially in heat. Short, frequent, low-intensity sessions are safer and healthier.",
    "Large and giant breeds like Great Danes, Saint Bernards, and Mastiffs need moderate exercise but are prone to joint problems. Avoid high-impact activities like jumping or running on hard surfaces until they are fully grown (18–24 months).",
    "Puppies of all breeds have growth plates that don't close until 12–18 months. Excessive forced exercise before closure can cause permanent joint damage. Stick to free play and short leash walks, letting the puppy self-limit activity.",
    "Senior dogs benefit enormously from regular gentle exercise for joint health, weight management, and mental wellbeing — but intensity should decrease with age. Swimming is ideal: full-body, low-impact, and often loved by dogs who struggle with walking.",
  ],
  6: [
    "Knowing basic pet first aid can mean the difference between life and death in an emergency. Every pet owner should have a plan and a stocked kit before they ever need it.",
    "Your first aid kit should include: sterile gauze and bandage rolls, adhesive medical tape, blunt-tip scissors, a digital rectal thermometer, saline solution, antiseptic wipes, a muzzle (even the gentlest dog may bite in pain), and your vet's emergency number.",
    "In case of a wound, apply direct pressure with clean gauze. Do not remove embedded objects — stabilise them and get to a vet immediately. Flush superficial wounds with saline. Avoid hydrogen peroxide, which damages tissue.",
    "If your pet is choking, look into their mouth only if they are unconscious. Blind finger sweeps can push objects deeper. For conscious pets, perform modified Heimlich manoeuvres — firm upward thrusts below the ribcage.",
    "For poisoning, call your vet or animal poison control immediately. Do not induce vomiting unless instructed — for some toxins, vomiting causes additional damage. Bring the packaging or a sample of the suspected substance.",
    "Heatstroke is a rapid killer. Move the pet to shade, apply cool (not cold) water to the body, particularly the neck, armpits, and groin. Fan them and offer small sips of water if conscious. Get to a vet immediately.",
    "CPR for pets follows the same principles as human CPR — ABC: Airway, Breathing, Circulation. Ask your veterinarian about a hands-on pet first aid course. Preparation and calm action in an emergency saves lives.",
  ],
}

export function BlogDetailPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const post     = DEMO_BLOG.find(b => String(b.id) === String(id))
  const allPosts = DEMO_BLOG.filter(b => b.published)
  const postIdx  = allPosts.findIndex(b => String(b.id) === String(id))
  const prevPost = postIdx > 0 ? allPosts[postIdx - 1] : null
  const nextPost = postIdx < allPosts.length - 1 ? allPosts[postIdx + 1] : null
  const related  = allPosts.filter(b => b.id !== post?.id).slice(0, 3)

  if (!post) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4">Article not found.</p>
          <Link to="/blog" className="btn-primary px-6 py-3">Back to Blog</Link>
        </div>
      </div>
    )
  }

  const body = POST_BODY[post.id] || [post.title]

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* ── Hero ── */}
      <div className="relative h-[60vh] min-h-[380px] overflow-hidden">
        <img
          src={POST_IMAGES[post.id]}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.45)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(5,10,20,1) 0%, rgba(5,10,20,0.55) 50%, rgba(5,10,20,0.15) 100%)',
          }}
        />
        {/* Gold corner */}
        <div
          className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 0% 0%, rgba(201,168,76,0.12), transparent 65%)',
          }}
        />

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-28 left-6 md:left-10"
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(232,228,217,0.6)',
              backdropFilter: 'blur(16px)',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(232,228,217,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </motion.div>

        {/* Hero content */}
        <div className="absolute bottom-0 inset-x-0 px-6 md:px-10 pb-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            {/* Category */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] mb-4"
              style={{
                background: 'rgba(201,168,76,0.14)',
                border: '1px solid rgba(201,168,76,0.3)',
                color: '#C9A84C',
              }}
            >
              <Tag size={9} />
              {post.category}
            </div>

            <h1
              className="font-display text-white text-3xl md:text-5xl font-semibold leading-tight mb-4"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
            >
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span className="flex items-center gap-1.5"><User size={11} />{post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar size={11} />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={11} />{post.readTime} read</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Article body ── */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-14">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-6"
        >
          {body.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: 'rgba(232,228,217,0.72)' }}
            >
              {para}
            </motion.p>
          ))}
        </motion.article>

        {/* Gold divider */}
        <div
          className="my-12 h-px w-full"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)',
          }}
        />

        {/* ── Prev / Next navigation ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {prevPost ? (
            <Link
              to={`/blog/${prevPost.id}`}
              className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300"
              style={{
                background: 'var(--bg-input)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
            >
              <ChevronLeft size={18} style={{ color: 'rgba(201,168,76,0.6)', flexShrink: 0 }} />
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.5)' }}>Previous</p>
                <p className="text-sm font-medium text-white truncate group-hover:text-[#C9A84C] transition-colors">{prevPost.title}</p>
              </div>
            </Link>
          ) : <div />}

          {nextPost && (
            <Link
              to={`/blog/${nextPost.id}`}
              className="group flex items-center gap-4 p-5 rounded-2xl text-right justify-end transition-all duration-300"
              style={{
                background: 'var(--bg-input)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
            >
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.5)' }}>Next</p>
                <p className="text-sm font-medium text-white truncate group-hover:text-[#C9A84C] transition-colors">{nextPost.title}</p>
              </div>
              <ChevronRight size={18} style={{ color: 'rgba(201,168,76,0.6)', flexShrink: 0 }} />
            </Link>
          )}
        </div>

        {/* ── Related articles ── */}
        <div>
          <h2
            className="font-display text-white text-2xl mb-6"
          >
            More <span className="gradient-text italic">Articles</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link
                  to={`/blog/${b.id}`}
                  className="group block rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: 'var(--bg-input)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {/* Thumb */}
                  <div className="h-32 overflow-hidden relative">
                    <img
                      src={POST_IMAGES[b.id]}
                      alt={b.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: 'brightness(0.6)' }}
                    />
                    <div className="absolute bottom-2 left-3">
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(201,168,76,0.2)',
                          border: '1px solid rgba(201,168,76,0.3)',
                          color: '#C9A84C',
                        }}
                      >
                        {b.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white text-xs font-semibold leading-snug mb-2 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                      {b.title}
                    </h4>
                    <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>
                      {b.readTime} read
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default BlogDetailPage