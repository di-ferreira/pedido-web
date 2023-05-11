import React, { useEffect, useState } from 'react';

import { Container, TabList } from './styles';
import { Tab } from '../Tab';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import useTabList from '../../hooks/useTabList';
import { iTabData } from '../../@types/Table';

export const TabBar: React.FC = () => {
  const { Tabs, removeTab, openTab } = useTabList((state) => state);
  const [closedTab, setClosedTab] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Tabs.forEach((tab) => {
      removeTab(tab);
    });
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

  const closeCurrentTab = (tab: iTabData) => {
    removeTab(tab);
    setClosedTab(true);
  };
  return (
    <Container>
      <TabList>
        {Tabs.map(
          (t, idx) =>
            t.TitleTab !== 'sair' && (
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
            )
        )}
      </TabList>
    </Container>
  );
};

