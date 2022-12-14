import { IconProps } from 'phosphor-react'
import { NavLink as NavLinkRouter} from "react-router-dom"

import { useVacancy } from '../../hooks/useVacancy'

import styles from './styles.module.scss'

interface NavLinkProps {
  icon: IconProps
  tooltip: string
  href: string
}

export function NavLink({ href, icon, tooltip }: NavLinkProps) {
  const { resetCopy } = useVacancy()
  
  return (
    <NavLinkRouter
      to={href}
      style={({ isActive }) => ({
        background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
      })}
      onClick={resetCopy}  
      >

      <li className={styles.optionMenu}>
        <>{icon}</>
        <span className={styles.tooltip}>{tooltip}</span>
      </li>
    </NavLinkRouter>
  )
}