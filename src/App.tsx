import { Header } from './components/Header';
import { UserForm } from './components/UserForm';
import { PokemonForm } from './components/PokemonForm';
import { CoachSelect } from './components/CoachSelect';
import { useAppSelector } from './hooks/useAppSelector';
import { Button } from './components/common/Button';
import { useAppDispatch } from './hooks/useAppDispatch';
import { onToggleModalState } from './store/slices/otherSlice';
import { Modal } from './components/Modal';
import { useTranslation } from 'react-i18next';

function App() {
  const { coaches } = useAppSelector((state) => state.coaches);
  const { currentUser, isOpenModal } = useAppSelector((state) => state.other);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isUserPokemonExist = coaches.find(
    (coach) => coach.lastName === currentUser?.lastName
  );

  const handleModalClick = () => {
    dispatch(onToggleModalState(true));
  };

  return (
    <>
      <Header />
      <div className='container'>
        <CoachSelect />

        <div className='grid grid-cols-4 gap-12 mb-5'>
          <UserForm />

          <PokemonForm />
        </div>
        {isUserPokemonExist && isUserPokemonExist.pokemons.length > 0 && (
          <div className='flex justify-center'>
            <Button
              label={t('modal.modal_btn')}
              className='bg bg-pink-400 rounded text-white'
              onClick={handleModalClick}
            />
          </div>
        )}
      </div>
      {isOpenModal && <Modal />}
    </>
  );
}

export default App;
