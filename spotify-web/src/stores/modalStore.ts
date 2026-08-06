import { create } from "zustand";

export interface ModalStateType {
    modalOpen: boolean,
    setModalOpen: (setState: boolean) => void
}

const useModalStore = create<ModalStateType>()((set) => ({
    modalOpen: false,
    setModalOpen: (setState: boolean) => set({modalOpen: setState})
}))

export default useModalStore;
