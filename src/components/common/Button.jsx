import styles from './Button.module.css'

export default function Button({ variant = 'primary', grande = false, className = '', ...props }) {
  const classes = [styles.button, styles[variant], grande && styles.big, className].filter(Boolean).join(' ')
  return <button type="button" className={classes} {...props} />
}
