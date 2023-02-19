import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  type MenuProps,
  type MenuButtonProps,
  type MenuListProps,
  type MenuItemProps,
} from '@chakra-ui/react';
import { MouseEventHandler, ReactNode } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import IAIButton from './IAIButton';
import IAIIconButton from './IAIIconButton';

interface IAIMenuItem {
  item: ReactNode | string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

interface IAIMenuProps {
  menuType?: 'icon' | 'regular';
  buttonText?: string;
  iconTooltip?: string;
  menuItems: IAIMenuItem[];
  menuProps?: MenuProps;
  menuButtonProps?: MenuButtonProps;
  menuListProps?: MenuListProps;
  menuItemProps?: MenuItemProps;
}

export default function IAISimpleMenu(props: IAIMenuProps) {
  const {
    menuType = 'icon',
    iconTooltip,
    buttonText,
    menuItems,
    menuProps,
    menuButtonProps,
    menuListProps,
    menuItemProps,
  } = props;

  const renderMenuItems = () => {
    const menuItemsToRender: ReactNode[] = [];
    menuItems.forEach((menuItem) => {
      menuItemsToRender.push(
        <MenuItem
          onClick={menuItem.onClick}
          fontSize="0.9rem"
          color="var(--text-color-secondary)"
          backgroundColor="var(--background-color-secondary)"
          _focus={{
            color: 'var(--text-color)',
            backgroundColor: 'var(--border-color)',
          }}
          {...menuItemProps}
        >
          {menuItem.item}
        </MenuItem>
      );
    });
    return menuItemsToRender;
  };

  return (
    <Menu {...menuProps}>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={menuType === 'icon' ? IAIIconButton : IAIButton}
            tooltip={iconTooltip}
            icon={isOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
            padding={menuType === 'regular' ? '0 0.5rem' : 0}
            backgroundColor="var(--destructive-color)"
            color="var(--text-color)"
            minWidth="1.5rem"
            minHeight="1.5rem"
            _hover={{
              backgroundColor: 'var(--destructive-color-hover)',
            }}
            {...menuButtonProps}
          >
            {menuType === 'regular' && buttonText}
          </MenuButton>
          <MenuList
            zIndex={15}
            padding={0}
            borderRadius="0.5rem"
            backgroundColor="var(--background-color-secondary)"
            color="var(--text-color-secondary)"
            borderColor="var(--border-color)"
            {...menuListProps}
          >
            {renderMenuItems()}
          </MenuList>
        </>
      )}
    </Menu>
  );
}
