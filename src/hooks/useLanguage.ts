import { useTranslation } from 'react-i18next';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useEffect } from 'react';
import { Lang } from '../types/language';
import { onChangeCurrentLang } from '../store/slices/otherSlice';

export const useLanguage = () => {
  const dispatch = useAppDispatch();
  const { currentLang } = useAppSelector((state) => state.other);
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('lang') as Lang;

    if (storedLanguage) {
      dispatch(onChangeCurrentLang(storedLanguage));
    }
  }, [dispatch]);

  useEffect(() => {
    i18n.changeLanguage(currentLang);
  }, [currentLang, i18n]);

  const handleChangeLang = (lang: Lang) => {
    dispatch(onChangeCurrentLang(lang));
    localStorage.setItem('lang', lang);
  };

  return { currentLang, handleChangeLang };
};
