import React, { useEffect, useState } from 'react';

import { Container, TabList } from './styles';
import { Tab } from '../Tab';
import useTabListStore, { TabData } from '../../stores/TabList';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const TabBar: React.FC = () => {
  const { Tabs, removeTab, openTab } = useTabListStore((state) => state);
  const [closedTab, setClosedTab] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    openTab({
      Icon: faHouseChimney,
      Link: 'home',
      Closable: false,
      TitleTab: 'dashboard',
      isActive: true,
    });
  }, []);

  useEffect(() => {
    if (closedTab) {
      navigate('home');
      setClosedTab(false);
    }
  }, [Tabs, closedTab]);

  const closeCurrentTab = (tab: TabData) => {
    removeTab(tab);
    setClosedTab(true);
  };
  return (
    <Container>
      <TabList>
        {Tabs.map((t, idx) => (
          <Tab
            key={idx}
            Icon={t.Icon}
            Link={t.Link}
            TitleTab={t.TitleTab}
            Closable={t.Closable}
            onClose={() => {
              closeCurrentTab(t);
            }}
          />
        ))}
      </TabList>
    </Container>
  );
};

