import './index.css';
import { ReactNode, useState } from 'react';

interface PopupProps {
  actionText: string;
  class?: string;
  action?: () => Promise<void>;
  children: ReactNode;
}

export default function Popup(props: PopupProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return isOpen ? (
    <div className="popup">
      <div>
        <div>{props.children}</div>
        <div>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            {props.action ? 'Annuler' : 'Fermer'}
          </button>
          {props.action ? (
            <button
              type="button"
              className={props.class}
              onClick={async () => {
                await props.action!();
                setIsOpen(false);
              }}
            >
              {props.actionText}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    <button
      type="button"
      className={props.class}
      onClick={() => {
        setIsOpen(true);
      }}
    >
      {props.actionText}
    </button>
  );
}
