import { House, Briefcase, SignOut } from 'phosphor-react'
import { NavLink as NavLinkReact } from 'react-router-dom'
import { NavLink } from './NavLink'

import IconCupcake from '../../assets/icon-cupcake.svg'

import styles from './styles.module.scss'

export function Sidebar() {
  return (
    <nav className={styles.container}>
      <NavLinkReact to='/'>
        <img src={IconCupcake} className={styles.brandLogo} alt="Cupcake Dona Maria" />
      </NavLinkReact>
      
      <ul>
        <NavLink href='/' icon={<House/>}  tooltip="Home"/>
        <NavLink href='/nova-vaga' icon={<Briefcase />} tooltip="Cadastrar nova vaga" />
      </ul>

      <footer>
        <NavLink href='' icon={<SignOut />} tooltip="Sair" />
      </footer>
    </nav>
  )
}