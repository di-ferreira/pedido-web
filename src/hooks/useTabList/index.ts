import { create } from 'zustand';
import { iTabData } from '../../@types';

type StateTab = {
  Tabs: iTabData[];
  openTab: (tab: iTabData) => void;
  removeTab: (tab: iTabData) => void;
};

const editTabList = (tab: iTabData, oldList: iTabData[]): iTabData[] => {
  let NewList: iTabData[];

  NewList = oldList.map((t) => {
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
  let NewList: iTabData[];

  NewList = oldList.filter((t) => (t !== tab ? t : ''));
  return NewList;
};

const verifyList = (oldList: iTabData[]): iTabData[] => {
  let NewList: iTabData[];
  const setList = new Set();

  NewList = oldList.filter((t) => {
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
