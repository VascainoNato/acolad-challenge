import bot from '../../assets/bot.svg'

function Bot({ className = 'h-6 w-6' }: { className?: string }) {
  return <img src={bot} alt="" aria-hidden="true" className={className} />
}

export default Bot
