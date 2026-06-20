import logo from '../../assets/logo.svg'
import logoWordmark from '../../assets/logo-wordmark.svg'

function Logo() {
  return (
    <>
      <img src={logoWordmark} alt="ID Wallet" className="block md:hidden h-10 w-auto" />
      <img src={logo} alt="" aria-hidden="true" className="hidden md:block lg:h-8 h-10 w-auto" />
    </>
  )
}

export default Logo
