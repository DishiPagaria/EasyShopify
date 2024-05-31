import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Drawer, NavLogo, StyledTableCell, StyledTableRow} from '../utils/styles';
import { Margin } from '@mui/icons-material';

const AdminBar = () => {
    const location = useLocation();
    const { currentRole } = useSelector(state => state.user);

    return (
        <>
            <React.Fragment>
                <ListItemButton
                    component={Link} to="/admin/products"
                    sx={{ ...(location.pathname.startsWith('/admin/products') ? styles.currentStyle : styles.normalStyle), marginBottom: 0 }}
                >
                    <ListItemIcon>
                        <ShoppingCartIcon sx={{ color: location.pathname.startsWith('/admin/products') ? '#4d1c9c' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                </ListItemButton>
                <ListItemButton
                    component={Link} to="/admin/orders"
                    sx={{ ...(location.pathname.startsWith('/admin/orders') ? styles.currentStyle : styles.normalStyle), marginBottom: 0 }}
                >
                    <ListItemIcon>
                        <PendingActionsIcon sx={{ color: location.pathname.startsWith("/admin/orders") ? '#4d1c9c' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItemButton>
                <ListItemButton
                    component={Link} to="/admin/customers"
                    sx={{ ...(location.pathname.startsWith('/admin/customers') ? styles.currentStyle : styles.normalStyle), marginBottom: 0 }}
                >
                    <ListItemIcon>
                        <GroupIcon sx={{ color: location.pathname.startsWith("/admin/customers") ? '#4d1c9c' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Customers" />
                </ListItemButton>
                <ListItemButton
                    component={Link} to="/admin/seller"
                    sx={{ ...(location.pathname.startsWith('/admin/seller') ? styles.currentStyle : styles.normalStyle), marginBottom: 0 }}
                >
                    <ListItemIcon>
                        <GroupIcon sx={{ color: location.pathname.startsWith("/admin/seller") ? '#4d1c9c' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Seller" />
                </ListItemButton>
            </React.Fragment>
        </>
    );
}

export default AdminBar;

const styles = {
    normalStyle: {
        color: "inherit",
        backgroundColor: "inherit"
    },
    currentStyle: {
        color: "#4d1c9c",
        backgroundColor: "#ebebeb" // 1% lighter than #ebebeb
    },
}
