/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { iTabData } from '../../@types/Table';
import useTabList from '../../hooks/useTabList';
import { Tab } from '../Tab';
import { Container, TabList } from './styles';

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
      navigate(-1);
      setClosedTab(false);
    }
  }, [Tabs, closedTab, navigate]);

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
            ),
        )}
      </TabList>
    </Container>
  );
};
