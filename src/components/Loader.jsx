import { motion } from 'framer-motion'

function Loader() {
  return (
    // Small spinner shown while lazy-loaded chunks are being fetched.
    <div className="grid min-h-[70vh] place-items-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.1, ease: 'linear', repeat: Infinity }}
        className="h-12 w-12 rounded-full border-4 border-violet-400/20 border-t-violet-400"
      />
    </div>
  )
}

export default Loader
