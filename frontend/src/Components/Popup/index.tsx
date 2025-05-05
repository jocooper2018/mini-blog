import './index.css';
import { ReactNode, useState } from 'react';

interface PopupProps {
  children: ReactNode;
  actionText?: string;
  action?: () => Promise<void>;
  class?: string;
  noTrigger?: boolean;
  closeButton?: ReactNode;
}

export default function Popup(props: PopupProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return isOpen || props.noTrigger ? (
    <div className="popup">
      <div>
        <div>{props.children}</div>
        <div>
          {props.closeButton ?? (
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {props.action ? 'Annuler' : 'Fermer'}
            </button>
          )}
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
