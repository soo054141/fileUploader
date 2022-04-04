import classnames from 'classnames/bind';
import styles from './terms.module.scss';

const cx = classnames.bind(styles);

export const terms = () => {
  const onClick = () => {
    alert('해당 부분을 구현해주시면 됩니다.')
  }
  return (
    <button className={cx('cta-button')} onClick={onClick}>
      <span className={cx('cta-content')}>
        모달 클릭
      </span>
    </button>
  )
}