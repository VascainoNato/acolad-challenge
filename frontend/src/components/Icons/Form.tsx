import form from '../../assets/form.svg'

function Form({ className = 'h-6 w-6 dark:invert' }: { className?: string }) {
  return <img src={form} alt="" aria-hidden="true" className={className} />
}

export default Form
