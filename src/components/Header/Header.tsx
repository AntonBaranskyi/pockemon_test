import logo from '../../assets/icons/logo.png';
import { HEADER_LANG } from '../../constansts/langData';
import { FLAG_ICON_BASE_URL } from '../../constansts/flagUrl';

import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import { Lang } from '../../types/language';

export const Header = () => {
  const { currentLang, handleChangeLang } = useLanguage();

  const { t } = useTranslation();

  return (
    <header className='shadow py-5 mb-[40px]'>
      <div className='container flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <img src={logo} alt='logo' className='h-[60px] w-[60px]' />
          <h3 className='uppercase'>Pokemons Fights</h3>
        </div>

        <div className='flex gap-3 items-center'>
          <h2>{t('header.select')}</h2>

          {HEADER_LANG.map((data) => (
            <img
              style={{
                border: currentLang === data.value ? '1px solid red' : '',
              }}
              className='h-[48px] w-[48px] cursor-pointer'
              src={`${FLAG_ICON_BASE_URL}${data.img}.svg`}
              alt='flag'
              onClick={() => handleChangeLang(data.value as Lang)}
              key={data.value}
            />
          ))}
        </div>
      </div>
    </header>
  );
};
