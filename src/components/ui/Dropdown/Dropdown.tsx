import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { Icon } from '@/components/ui/Icon';
import { useClickOutsideContainer } from '@/hooks/use-click-outside-container';
import styles from './Dropdown.module.scss';

type TDropdownOption = {
  value: any;
  label: string;
  name?: string;
};

type DropdownOptionsCallbackType = {
  name: DropdownProps['name'];
  option: TDropdownOption;
};

interface DropdownProps {
  name: string;
  label: string;
  value?: string;
  defaultValue?: any;
  multiple?: boolean;
  options: TDropdownOption[];
  onSelect: (data: DropdownOptionsCallbackType) => void;
}

export const Dropdown = ({
  name,
  label,
  defaultValue,
  multiple = false,
  options,
  onSelect,
}: DropdownProps) => {
  const dropdownRef = useRef(null);

  const [dropdownMenuOpened, setDropdownMenuOpened] = useState(false);
  const [dropdownValues, setDropdownValues] = useState<TDropdownOption[]>([]);

  useClickOutsideContainer(dropdownRef, () => setDropdownMenuOpened(false));

  useEffect(() => {
    if (defaultValue) {
      const item = options.find((opt) => opt.value === defaultValue);
      if (item) {
        setDropdownValues([item]);
      }
    }
  }, [defaultValue, options]);

  const handleToggleDropdownMenu = () => {
    if (options.length) {
      setDropdownMenuOpened(!dropdownMenuOpened);
    }
  };

  const handleSelectOption = (option: TDropdownOption) => {
    setDropdownMenuOpened(false);
    setDropdownValues((prevState) => {
      if (multiple) {
        const isExist = prevState.find((item) => item.value === option.value);

        if (isExist) {
          return [...prevState].filter((item) => item.value !== option.value);
        }
        return [...prevState, option];
      } else {
        return [option];
      }
    });

    onSelect({
      name,
      option,
    });
  };

  const renderOptions = () => {
    return options.map((option) => (
      <div
        key={option.value}
        className={styles.dropdownMenuItem}
        onClick={() => handleSelectOption(option)}
      >
        {option.label}
      </div>
    ));
  };

  return (
    <div className={styles.component} ref={dropdownRef}>
      {/* <div className={styles.label}>{label}</div> */}
      <div className={styles.dropdown}>
        <div onClick={handleToggleDropdownMenu}>
          <div
            className={clsx(styles.input, {
              [String(styles.inputActive)]: dropdownMenuOpened,
            })}
          >
            {dropdownValues.map((val) => val.label).join(', ')}
          </div>
          <div
            className={clsx(styles.placeholder, {
              [String(styles.placeholderModified)]: dropdownValues.length,
            })}
          >
            {label}
          </div>
          <div className={styles.icon}>
            <Icon name={dropdownMenuOpened ? 'arrow_up' : 'arrow_down'} />
          </div>
        </div>
        {dropdownMenuOpened && (
          <div className={styles.dropdownMenuContainer}>
            <div className={styles.dropdownMenu}>{renderOptions()}</div>
          </div>
        )}
      </div>
    </div>
  );
};
