import styles from './styles.module.scss'

import { House, Briefcase, Gear, SignOut } from 'phosphor-react'

import IconCupcake from '../../assets/icon-cupcake.svg'

export function Sidebar() {
  return (
    <nav className={styles.container}>
      <img 
        src={IconCupcake} 
        className={styles.brandLogo}
        alt="Cupcake Dona Maria" 
      />

      <ul>
        <li className={`${styles.optionMenu } ${styles.active}`}>
          <House/>
          <span className={styles.tooltip}>Home</span>
        </li>

        <li className={styles.optionMenu}>
          <Briefcase/>
          <span className={styles.tooltip}>Cadastrar nova vaga</span>
        </li>

        <li className={styles.optionMenu}>
          <Gear/>
          <span className={styles.tooltip}>Configurações</span>
        </li>
      </ul>

      <footer>
        <a href="#" className={styles.optionMenu}>
          <SignOut/>
          <span className={styles.tooltip}>Sair</span>
        </a>
      </footer>
    </nav>
  )
}