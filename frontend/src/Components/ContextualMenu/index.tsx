import Popup from '../Popup';
import './index.css';
import { JSX, useRef, useState } from 'react';

interface Action {
  name: string;
  function: () => Promise<void>;
  confirmMessage?: string;
}

interface ContextualMenuProps {
  actions: Action[];
}

export default function ContextualMenu(
  props: ContextualMenuProps,
): JSX.Element {
  if (props.actions.length === 0) return <></>;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  document.addEventListener('mouseup', handleClickOutside);

  return (
    <div className="contextual-menu">
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        ⋮
      </button>
      {isOpen ? (
        <div className="menu" ref={menuRef}>
          {props.actions.map((action: Action, i: number) =>
            action.confirmMessage ? (
              <Popup
                actionText={action.name}
                action={action.function}
              >
                {action.confirmMessage}
              </Popup>
            ) : (
              <button
                key={i}
                type="button"
                onClick={() => {
                  action.function();
                  setIsOpen(false);
                }}
              >
                {action.name}
              </button>
            ),
          )}
        </div>
      ) : null}
    </div>
  );
}
