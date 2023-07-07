import React from 'react';
import { styled } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';

interface NavbarProps {
  open: boolean;
  onClose: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ open, onClose }) => {
    const StyledDrawer = styled(Drawer)`
    width: 240px;
    flex-shrink: 0;
  `;
  
  const StyledListItem = styled(ListItem)`
    && {
      /* Stili personalizzati per il ListItem */
    }
  `;

  return (
    <StyledDrawer variant="persistent" anchor="left" open={open}>
      <div className="toolbar" />
      <List>
        <StyledListItem>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </StyledListItem>
        <StyledListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </StyledListItem>
        <StyledListItem>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Mail" />
        </StyledListItem>
      </List>
    </StyledDrawer>
  );
};

export default Navbar;
