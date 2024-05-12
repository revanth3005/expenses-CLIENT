import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserDataThunk, saveExpensesThunk } from "./globalAPI";

const initialState = {
  expensesModal: false,
  modalOpen: false,
  modalConfirmLoading: false,
  error: null,
  errorState: false,
  expensesSaving: false,
  expensesSaved: false,
  //user items state
  userItemsData: null,
  itemsLoading: false,
  itemsFetched: false,
  itemsError: null,
  refetchItems: false,
};

export const modalAsync = createAsyncThunk(
  "globalData/add-expenses",
  async (data) => {
    const response = await saveExpensesThunk(data);
    return response;
  }
);
export const fetchUserData = createAsyncThunk(
  "globalData/user-data",
  async (data) => {
    const response = await fetchUserDataThunk(data);
    return response;
  }
);

export const globalSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    showModal: (state) => {
      state.modalOpen = true;
    },
    handleModalOk: (state) => {
      state.modalConfirmLoading = true;
    },
    handleModalCancel: (state) => {
      state.modalOpen = false;
    },
    setRefetchStatus: (state, action) => {
      state.refetchItems = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(modalAsync.pending, (state) => {
      state.error = null;
      state.expensesSaving = true;
      state.expensesSaved = false;
      state.errorState = false;
    });
    builder.addCase(modalAsync.fulfilled, (state, action) => {
      state.expensesSaving = false;
      state.expensesSaved = true;
      state.error = null;
      state.modalOpen = false;
      state.modalConfirmLoading = false;
      state.errorState = false;
      state.refetchItems = true;
    });
    builder.addCase(modalAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.expensesSaving = false;
      state.expensesSaved = false;
      state.modalConfirmLoading = false;
      state.errorState = true;
    });
    builder.addCase(fetchUserData.pending, (state) => {
      state.userItemsData = null;
      state.itemsError = false;
      state.itemsFetched = false;
      state.itemsLoading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userItemsData = action.payload;
      state.itemsError = false;
      state.itemsFetched = true;
      state.itemsLoading = false;
      state.refetchItems = false;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.userItemsData = null;
      state.itemsError = true;
      state.itemsFetched = false;
      state.itemsLoading = false;
    });
  },
});

export const selectExpensesModal = (state) => state.globalData.expensesModal;
export const selectModalOpen = (state) => state.globalData.modalOpen;
export const selectSavingStatus = (state) => state.globalData.expensesSaving;
export const selectExpensesSaved = (state) => state.globalData.expensesSaved;
export const selectModalConfirmLoading = (state) =>
  state.globalData.modalConfirmLoading;

//user
export const selectUserItemsData = (state) => state.globalData.userItemsData;
export const selectItemsLoading = (state) => state.globalData.itemsLoading;
export const selectItemsFetched = (state) => state.globalData.itemsFetched;
export const selectItemsError = (state) => state.globalData.itemsError;
export const selectRefetchItems = (state) => state.globalData.refetchItems;

export const { handleModalCancel, handleModalOk, showModal, setRefetchStatus } =
  globalSlice.actions;

export default globalSlice.reducer;
