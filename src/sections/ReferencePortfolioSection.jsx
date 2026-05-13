import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaBackward,
  FaEnvelope,
  FaExpand,
  FaForward,
  FaMapMarkerAlt,
  FaMinus,
  FaPause,
  FaPlay,
  FaPlus,
  FaPhone,
  FaVolumeMute,
  FaVolumeUp,
} from 'react-icons/fa'
import { projects, software, timeline, experienceNotes } from '../utils/data'

// Shared heading style used by section title strips.
const stripClass =
  'mx-auto mt-6 w-full rounded-sm bg-[#a68ced] px-4 py-1 text-center text-[22px] uppercase tracking-wide text-white'

function ReferencePortfolioSection() {
  // Keeps references to each rendered <video> element by index.
  const videoRefs = useRef([])
  const [videoStates, setVideoStates] = useState(() =>
    projects.map(() => ({
      isPlaying: true,
      isMuted: true,
      volume: 1,
      currentTime: 0,
      duration: 0,
    })),
  )

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

  const setVideoState = (index, patch) => {
    setVideoStates((prev) =>
      prev.map((state, i) => (i === index ? { ...state, ...patch } : state)),
    )
  }

  const formatTime = (time) => {
    if (!Number.isFinite(time) || time < 0) return '0:00'
    const totalSeconds = Math.floor(time)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${String(seconds).padStart(2, '0')}`
  }

  const togglePlayPause = async (index) => {
    const video = videoRefs.current[index]
    if (!video) return

    if (video.paused) {
      try {
        await video.play()
      } catch {
        // Browser autoplay policies can block play() if not user-initiated.
      }
    } else {
      video.pause()
    }
  }

  const toggleMute = (index) => {
    const video = videoRefs.current[index]
    if (!video) return
    video.muted = !video.muted
    setVideoState(index, { isMuted: video.muted })
  }

  const changeVolume = (index, delta) => {
    const video = videoRefs.current[index]
    if (!video) return
    const nextVolume = clamp(video.volume + delta, 0, 1)
    video.volume = nextVolume
    video.muted = nextVolume === 0
    setVideoState(index, { volume: nextVolume, isMuted: video.muted })
  }

  const seekBy = (index, seconds) => {
    const video = videoRefs.current[index]
    if (!video) return
    const nextTime = clamp(video.currentTime + seconds, 0, video.duration || 0)
    video.currentTime = nextTime
    setVideoState(index, { currentTime: nextTime })
  }

  const seekTo = (index, nextTime) => {
    const video = videoRefs.current[index]
    if (!video) return
    const safeTime = clamp(nextTime, 0, video.duration || 0)
    video.currentTime = safeTime
    setVideoState(index, { currentTime: safeTime })
  }

  const enterFullscreen = (index) => {
    const video = videoRefs.current[index]
    if (!video) return

    if (video.requestFullscreen) {
      video.requestFullscreen()
      return
    }

    if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen()
    }
  }

  return (
    <div className="mx-auto w-[min(980px,95%)] pb-10 pt-20 md:pt-24">
      <section id="hero" className="text-white">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-title text-center text-[72px] leading-none tracking-[0.04em] md:text-[130px]"
        >
          PORTFOLIO
        </motion.h1>
        {/* <p className="-mt-2 text-center text-[24px] md:text-[38px]">Video editor</p> */}
        <p className="font-['Cinzel_Decorative'] -mt-1 text-center text-[36px] text-[#fff9d2] md:text-[62px]">
        Adventtra
        </p>
      </section>

      <h2 id="about" className={stripClass}>
        PORTFOLIO
      </h2>

      <section className="mt-8 grid gap-6 text-white md:grid-cols-[1fr_2fr]">
        <div className="mx-auto h-40 w-40 rounded-full border-2 border-white/90 p-4">
          <div className="grid h-full place-items-center rounded-full border border-white/20 text-center text-3xl leading-6 tracking-wider text-white/80">
            <span className="font-title text-[24px]"> <a href="#hero" className="flex items-center">
        <img
          src={'/logo.PNG'}
          alt="Adventtra Logo"
          className="max-h-full max-w-full object-contain scale-125 rounded-full"
        />
      </a></span>
            {/* <span className="font-title -mt-5 text-[34px]">KRAFT</span> */}
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <h3 className="font-title text-[42px] leading-none">ABOUT</h3>
            <p className="text-[14px] leading-tight text-white/95">
            What sets us apart is not just the ability to shoot or edit — it’s the way we combine strategy, creativity, and execution into one seamless process. From planning content to producing it, and finally running campaigns that deliver results, we handle everything under one roof.
            </p>
          </div>
          <div id="contact">
            <h3 className="font-title text-[42px] leading-none">CONTACT</h3>
            <ul className="mt-2 space-y-1 text-[16px]">
              <li className="flex items-center gap-2">
                <FaPhone className="text-[12px]" /> 8178195004
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-[12px]" /> adventtra@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[12px]" /> Gurugram Sector-5
              </li>
             
            </ul>
          </div>
          <div id="skill">
            {/* <h3 className="font-title text-[42px] leading-none">SKILL</h3>
            <p className="mt-2 text-[14px] leading-tight">Creative direction, cinematic videography, professional editing, and brand-focused storytelling across fashion, food, real estate, and product content.</p> */}
            {/* <p className="text-[14px] leading-tight">applies to video, image and audio editing</p> */}
            {/* <p className="mt-2 text-[14px] leading-tight">Have a visual storytelling mindset</p>
            <p className="text-[14px] leading-tight">sound design thinking (Music & SFX)</p> */}
          </div>
        </div>
      </section>

      <h2 id="software" className={stripClass}>
      What We Do
      </h2>
      <section className="mx-auto mt-8 flex max-w-[850px] flex-wrap items-center justify-center gap-4 md:gap-8">
        {/* Software badges are data-driven for easier future edits. */}
       {software.map((item) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.04 }}
    key={item.label}
    className="flex h-16 w-16 items-center justify-center rounded-2xl p-3 shadow-lg md:h-20 md:w-20"
    style={{ background: item.bg }}
  >
    <img
      src={item.logo}
      alt={item.label}
      className="h-full w-full object-contain"
    />
  </motion.div>
))}
      </section>

      <section id="experience" className="mt-8 text-white">
      <div className="flex items-center justify-center py-6 text-center">
        <h3 className="font-title text-2xl leading-tight md:text-[44px]">
         Creating scroll-stopping chaos.
        </h3>
      </div>
        <div className="mt-3 grid grid-cols-4 text-center text-[22px]">
          {timeline.map((year) => (
            <span key={year}>{year}</span>
          ))}
        </div>
        <div className="relative mx-5 mt-2 h-6">
          <div className="absolute left-0 right-0 top-3 h-[3px] bg-white/80" />
          <div className="absolute left-0 right-0 top-1 grid grid-cols-4">
            {timeline.map((year) => (
              <span key={year} className="mx-auto h-4 w-4 rounded-full bg-white" />
            ))}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-4 text-center text-[14px] leading-tight md:text-[26px]">
          {experienceNotes.map((note) => (
            <div key={note.text}>
              <p>{note.title}</p>
              <p>{note.text}</p>
            </div>
          ))}
        </div>
      </section>

      <h2 id="portfolio" className={stripClass}>
      Featured Work
      </h2>
      <section className="mt-2 overflow-hidden">
        {/* Each project row alternates media/text order for visual rhythm. */}
        {projects.map((project, index) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4 }}
            className="grid min-h-[220px] grid-cols-2 items-center border-b-8 border-[#2a2b31]"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`group relative h-full w-full overflow-hidden rounded-none bg-black ${
                index % 2 === 1 ? 'order-2' : ''
              }`}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el
                }}
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-full "
                onLoadedMetadata={(event) => {
                  const { duration, volume, muted } = event.currentTarget
                  setVideoState(index, {
                    duration: Number.isFinite(duration) ? duration : 0,
                    volume,
                    isMuted: muted,
                  })
                }}
                onTimeUpdate={(event) => {
                  setVideoState(index, { currentTime: event.currentTarget.currentTime })
                }}
                onPlay={() => setVideoState(index, { isPlaying: true })}
                onPause={() => setVideoState(index, { isPlaying: false })}
                onVolumeChange={(event) => {
                  const { volume, muted } = event.currentTarget
                  setVideoState(index, { volume, isMuted: muted })
                }}
              />
              {/* Mobile: compact row always visible. md+: fade in on hover / focus for a clean frame. */}
              <div
                className="absolute inset-x-0 bottom-0 space-y-1.5 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-2 text-white transition-opacity duration-200 md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100 md:space-y-2 md:p-3"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex flex-wrap items-center justify-center gap-1 md:justify-start md:gap-1.5">
                  <button
                    type="button"
                    onClick={() => togglePlayPause(index)}
                    aria-label={videoStates[index]?.isPlaying ? 'Pause' : 'Play'}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/35 active:scale-95 md:h-9 md:w-9"
                  >
                    {videoStates[index]?.isPlaying ? (
                      <FaPause className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    ) : (
                      <FaPlay className="h-3 w-3 translate-x-px md:h-3.5 md:w-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleMute(index)}
                    aria-label={videoStates[index]?.isMuted ? 'Unmute' : 'Mute'}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/35 active:scale-95 md:h-9 md:w-9"
                  >
                    {videoStates[index]?.isMuted ? (
                      <FaVolumeMute className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    ) : (
                      <FaVolumeUp className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    )}
                  </button>
                  {/* <button
                    type="button"
                    onClick={() => changeVolume(index, -0.1)}
                    aria-label="Decrease volume"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/35 active:scale-95 md:h-9 md:w-9"
                  >
                    <FaMinus className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => changeVolume(index, 0.1)}
                    aria-label="Increase volume"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/35 active:scale-95 md:h-9 md:w-9"
                  >
                    <FaPlus className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </button> */}
                  {/* <button
                    type="button"
                    onClick={() => seekBy(index, -10)}
                    aria-label="Rewind 10 seconds"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/35 active:scale-95 md:h-9 md:w-9"
                  >
                    <FaBackward className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => seekBy(index, 10)}
                    aria-label="Forward 10 seconds"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/35 active:scale-95 md:h-9 md:w-9"
                  >
                    <FaForward className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  </button> */}
                  <button
                    type="button"
                    onClick={() => enterFullscreen(index)}
                    aria-label="Fullscreen"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/35 active:scale-95 md:h-9 md:w-9"
                  >
                    <FaExpand className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  </button>
                </div>

                {/* Draggable seek bar with a gradient-filled progress track. */}
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2 md:gap-3">
                  <input
                    type="range"
                    min={0}
                    max={videoStates[index]?.duration || 0}
                    step={0.1}
                    value={videoStates[index]?.currentTime || 0}
                    onChange={(event) => seekTo(index, Number(event.target.value))}
                    aria-label="Seek"
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-violet-400 sm:h-2"
                    style={{
                      background: `linear-gradient(to right, #a78bfa ${
                        ((videoStates[index]?.currentTime || 0) /
                          (videoStates[index]?.duration || 1)) *
                        100
                      }%, rgba(255,255,255,0.25) 0%)`,
                    }}
                  />
                  <span className="shrink-0 text-center text-[10px] font-medium tabular-nums text-white/90 sm:min-w-[72px] sm:text-right sm:text-[11px]">
                    {formatTime(videoStates[index]?.currentTime || 0)} /{' '}
                    {formatTime(videoStates[index]?.duration || 0)}
                  </span>
                </div>
              </div>
            </motion.div>
            <div className={`relative px-4 py-8 text-center ${index % 2 === 1 ? 'order-1' : ''}`}>
              <motion.p
                initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                whileHover={{ scale: 1.04 }}
                className="font-stroke text-[26px] uppercase leading-none text-white md:text-[60px]"
              >
                - {project.name}
              </motion.p>
              <motion.span
                animate={{ y: [0, -8, 0], rotate: [0, -4, 4, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                className={`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> ${project.logo.startsWith('#') ? 'font-title text-white' : ''}`}
              >
                {project.logo}
              </motion.span>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  )
}

export default ReferencePortfolioSection
