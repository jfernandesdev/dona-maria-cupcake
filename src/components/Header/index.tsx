import { EnvelopeSimple } from 'phosphor-react' 

import AvatarDonaMaria from '../../assets/avatar-dona-maria.png'

import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.container}>

      <button 
        className={styles.notificationButton} 
        aria-label="notification"
        title="Me contrate Obuc! :)"
      >
        <EnvelopeSimple size={32} weight="light"/>
      </button>

      <div className={styles.profileInformation}>
        <img 
          src={AvatarDonaMaria} 
          className={styles.avatar}
          alt="Dona Maria"
        />
        <div>
          <span className={styles.name}>
            Dona Maria
          </span>
          <span className={styles.email}>
            donamaria@email.com
          </span>
        </div>
      </div>
    </header>
  )
}