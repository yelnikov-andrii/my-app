import './Aside.scss';
import image from '../../img/aside_img.png';
import { List } from '../List/List';

export const Aside = () => {
  return (
    <aside
      className="aside"
    >
      <img
        src={image}
        alt="aside logo"
        className="aside__img"
      >
      </img>
      < List content={['Cообщения']}/>
      < List content={['Профиль', 'Настройки']}/>
      < List content={['Вопросы', 'Написать модератору']}/>
      <button
        type="button"
        className="aside__button"
      >
        Купить подписку
      </button>

    </aside>
  )
}