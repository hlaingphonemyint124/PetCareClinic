import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Download } from 'lucide-react'
import { DashLayout } from './DashLayout'
import { Modal, StatusBadge, ProgressBar, SectionHeader } from '../../components/shared/UI'
import { DEMO_PETS } from '../../lib/demoData'
import toast from 'react-hot-toast'
import clsx from 'clsx'

export function OwnerPets() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const myPets = DEMO_PETS.slice(0, 2)

  return (
    <DashLayout title="Pet Profiles">
      <SectionHeader title="My Pets" subtitle="Manage your registered pets"
        action={<button className="btn-primary text-sm py-2.5" onClick={()=>{setSelected(null);setModalOpen(true)}}><Plus size={14}/> Add Pet</button>} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {myPets.map((p, i) => (
          <motion.div key={p.id}
            className="rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300"
            style={{ background:'rgba(15,18,28,0.8)', border:'1px solid rgba(255,255,255,0.06)' }}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
            whileHover={{ y:-6, boxShadow:'0 20px 60px rgba(0,0,0,0.4)', borderColor:'rgba(255,255,255,0.12)' }}>
            <div className="h-40 flex items-center justify-center text-7xl relative overflow-hidden"
              style={{ background:`linear-gradient(135deg, rgba(${p.color==='green'?'0,229,160':p.color==='amber'?'255,184,77':'77,166,255'},0.08), rgba(0,0,0,0))` }}>
              <span className="group-hover:scale-110 transition-transform duration-500">{p.emoji}</span>
              <div className="absolute top-3 right-3"><StatusBadge status={p.health>85?'active':'upcoming'} /></div>
            </div>
            <div className="p-5">
              <div className="font-display text-lg text-white mb-0.5">{p.pet_name}</div>
              <div className="text-white/30 text-xs mb-4">{p.breed} · {p.gender} · {p.weight} kg</div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="rounded-lg p-2.5 text-center" style={{background:'rgba(255,255,255,0.03)'}}>
                  <div className="text-white/20 mb-0.5">Weight</div>
                  <div className="text-white font-semibold">{p.weight} kg</div>
                </div>
                <div className="rounded-lg p-2.5 text-center" style={{background:'rgba(255,255,255,0.03)'}}>
                  <div className="text-white/20 mb-0.5">Next Vaccine</div>
                  <div className="text-white font-semibold text-[11px]">{p.next_vaccine}</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5"><span className="text-white/30">Health Score</span><span className={clsx('font-semibold',p.health>85?'text-[#C9A84C]':'text-[#e8c870]')}>{p.health}%</span></div>
                <ProgressBar value={p.health} color={p.health>85?'gold':'amber'} />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 rounded-xl py-2.5 text-xs font-medium text-white/40 hover:text-white transition-all"
                  style={{border:'1px solid rgba(255,255,255,0.07)'}}
                  onClick={()=>{setSelected(p);setModalOpen(true)}}>
                  <Edit2 size={11} className="inline mr-1.5"/>Edit
                </button>
                <button className="rounded-xl px-3 py-2.5 text-xs transition-all" style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.15)',color:'#C9A84C'}}
                  onClick={()=>toast.success(`${p.pet_name}'s vaccine certificate downloaded!`)}>
                  <Download size={11}/>
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.button
          className="rounded-2xl flex flex-col items-center justify-center min-h-[320px] transition-all duration-300 group"
          style={{ border:'1.5px dashed rgba(255,255,255,0.08)' }}
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          whileHover={{ borderColor:'rgba(201,168,76,0.3)', background:'rgba(201,168,76,0.03)' }}
          onClick={()=>{setSelected(null);setModalOpen(true)}}>
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">➕</div>
          <div className="text-white/25 text-sm group-hover:text-[#C9A84C] transition-colors">Add New Pet</div>
        </motion.button>
      </div>

      <Modal open={modalOpen} onClose={()=>setModalOpen(false)} title={selected?`Edit ${selected.pet_name}`:'🐾 Add New Pet'} size="lg">
        <div className="grid grid-cols-2 gap-4">
          {[['Pet Name *','pet_name','text','e.g. Buddy'],['Species *','species','text','Dog, Cat, Rabbit...'],['Breed','breed','text','e.g. Golden Retriever'],['Gender','gender','text','Male / Female'],['Date of Birth','birth_date','date',''],['Weight (kg)','weight','number','e.g. 5.2']].map(([l,k,t,p])=>(
            <div key={k}>
              <label className="text-xs text-white/40 mb-1.5 block font-medium">{l}</label>
              <input className="form-input" type={t} placeholder={p} defaultValue={selected?.[k]||''} />
            </div>
          ))}
        </div>
        <div className="mt-4"><label className="text-xs text-white/40 mb-1.5 block font-medium">Known Allergies</label>
          <input className="form-input" placeholder="e.g. Chicken protein, Penicillin — or 'None known'" defaultValue={selected?.allergies||''} /></div>
        <div className="mt-4"><label className="text-xs text-white/40 mb-1.5 block font-medium">Medical Notes</label>
          <textarea className="form-textarea" placeholder="Pre-existing conditions, ongoing medications..." defaultValue={selected?.notes||''} /></div>
        <div className="flex gap-3 justify-end mt-6">
          <button className="btn-ghost" onClick={()=>setModalOpen(false)}>Cancel</button>
          <button className="btn-primary" onClick={()=>{toast.success(selected?'Pet updated!':'Pet added successfully!');setModalOpen(false)}}>
            {selected?'Save Changes':'Add Pet 🐾'}
          </button>
        </div>
      </Modal>
    </DashLayout>
  )
}
