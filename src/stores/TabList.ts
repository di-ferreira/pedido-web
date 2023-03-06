import { create } from 'zustand';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type TabData = {
  Icon: IconProp;
  TitleTab: string;
  Link: string;
  Closable?: boolean;
  isActive: boolean;
};

type StateTab = {
  Tabs: TabData[];
  openTab: (tab: TabData) => void;
  removeTab: (tab: TabData) => void;
};

const editTabList = (tab: TabData, oldList: TabData[]): TabData[] => {
  let NewList: TabData[];

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

const removeTabOfList = (tab: TabData, oldList: TabData[]): TabData[] => {
  let NewList: TabData[];

  NewList = oldList.filter((t) => (t !== tab ? t : ''));
  return NewList;
};

const verifyList = (oldList: TabData[]): TabData[] => {
  let NewList: TabData[];
  const setList = new Set();

  NewList = oldList.filter((t) => {
    const duplicatedTab = setList.has(t.Link);
    setList.add(t.Link);
    return !duplicatedTab;
  });

  return NewList;
};

const useTabListStore = create<StateTab>((set) => ({
  Tabs: [],
  openTab: (tab: TabData) => {
    set((state) => ({
      Tabs: editTabList(tab, [...state.Tabs, tab]),
    }));
  },
  removeTab: (tab: TabData) => {
    set((state) => ({ Tabs: removeTabOfList(tab, state.Tabs) }));
  },
}));

export default useTabListStore;
