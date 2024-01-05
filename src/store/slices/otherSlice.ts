import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICoach } from '../../types/coach';
import { Lang } from '../../types/language';

type State = {
  currentUser: ICoach | null;
  isOpenModal: boolean;
  activeTabCoach: ICoach | null;
  currentLang: Lang;
};

const initialState: State = {
  currentUser: null,
  isOpenModal: false,
  activeTabCoach: null,
  currentLang: localStorage.getItem('lang') as Lang,
};

const otherSlice = createSlice({
  name: 'other',
  initialState,
  reducers: {
    onAddCurrentUser: (state, action: PayloadAction<ICoach>) => {
      state.currentUser = action.payload;
    },

    onToggleModalState: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },

    onAddTabCoach: (state, action: PayloadAction<ICoach>) => {
      state.activeTabCoach = action.payload;
    },

    onChangeCurrentLang: (state, action: PayloadAction<Lang>) => {
      state.currentLang = action.payload;
    },
  },
});

export const {
  onAddCurrentUser,
  onToggleModalState,
  onAddTabCoach,
  onChangeCurrentLang,
} = otherSlice.actions;
export default otherSlice.reducer;
