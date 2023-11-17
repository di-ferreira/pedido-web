import { create } from 'zustand';
import { iTabData } from '../../@types/Table';

type StateTab = {
  Tabs: iTabData[];
  openTab: (tab: iTabData) => void;
  removeTab: (tab: iTabData) => void;
};

const editTabList = (tab: iTabData, oldList: iTabData[]): iTabData[] => {
  const NewList: iTabData[] = oldList.map((t) => {
    if (t !== tab) {
      t.isActive = false;
    } else {
      t.isActive = true;
    }
    return t;
  });

  return verifyList(NewList);
};

const removeTabOfList = (tab: iTabData, oldList: iTabData[]): iTabData[] => {
  const NewList: iTabData[] = oldList.filter((t) => t.Link !== tab.Link && t);
  return NewList;
};

const verifyList = (oldList: iTabData[]): iTabData[] => {
  const setList = new Set();

  const NewList: iTabData[] = oldList.filter((t) => {
    const duplicatedTab = setList.has(t.Link);
    setList.add(t.Link);
    return !duplicatedTab;
  });

  return NewList;
};

const useTabList = create<StateTab>((set) => ({
  Tabs: [],
  openTab: (tab: iTabData) => {
    set((state) => ({
      Tabs: editTabList(tab, [...state.Tabs, tab]),
    }));
  },
  removeTab: (tab: iTabData) => {
    set((state) => ({ Tabs: removeTabOfList(tab, state.Tabs) }));
  },
}));

export default useTabList;
