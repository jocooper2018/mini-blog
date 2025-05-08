import './index.css';
import { JSX, useState } from 'react';

interface Tab {
  tabName: string;
  tab: JSX.Element;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs(props: TabsProps): JSX.Element {
  const [currentTab, setCurrentTab] = useState<JSX.Element>();

  return (
    <div className="tabs">
      <nav>
        {props.tabs.map((tab: Tab, i: number) => (
          <button
            type="button"
            onClick={() => setCurrentTab(tab.tab)}
            key={`tab-${i}-button`}
            className={
              currentTab === tab.tab || (!currentTab && i === 0)
                ? 'selected'
                : ''
            }
          >
            {tab.tabName}
          </button>
        ))}
      </nav>
      {currentTab ?? props.tabs[0]?.tab}
    </div>
  );
}
