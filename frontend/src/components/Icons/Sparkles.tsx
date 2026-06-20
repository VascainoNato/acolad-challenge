import sparkles from '../../assets/sparkles.svg'

function Sparkles({ className = 'h-6 w-6 cursor-pointer dark:invert' }: { className?: string }) {
  return <img src={sparkles} alt="" aria-hidden="true" className={className} />
}

export default Sparkles
