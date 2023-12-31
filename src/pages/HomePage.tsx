import { Dashboard, Logout } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  createTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Copyright from "../components/common/Copyright";
import { AppBar, Drawer } from "../components/common/DashboardLayout";
import NotificationsPopover from "../components/common/NotificationsPopover";
import SideBar from "../components/common/SideBar";
import sideBarButtons from "../constants/sideBarButtons";
import useAuth from "../hooks/useAuth";
import useThemeStore from "../state-management/themeStore";

export default function HomePage() {
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
        },
      }),
    [mode]
  );

  const navigate = useNavigate();

  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const openMenu = Boolean(anchorElUser);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (link?: string) => {
    setAnchorElUser(null);
    if (link) navigate(link);
  };

  const defaultDrawerOpen = window.innerWidth >= 600 ? true : false;
  const [openDrawer, setOpenDrawer] = React.useState(defaultDrawerOpen);
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="primary"
          open={openDrawer}
          enableColorOnDark
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(openDrawer && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Let's Graduate
            </Typography>
            <IconButton
              sx={{ ml: 1 }}
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              color="inherit"
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <NotificationsPopover />
            <Box sx={{ flexGrow: 0, mx: "1rem" }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  aria-controls={openMenu ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                >
                  <Avatar
                    alt="Jamal SaadEddin"
                    src="/src/assets/avatars/ashraf.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                id="account-menu"
                open={openMenu}
                onClose={() => handleCloseUserMenu()}
                onClick={() => handleCloseUserMenu()}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() =>
                    handleCloseUserMenu(user.firstName + user.lastName)
                  }
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  My Profile
                </MenuItem>
                <MenuItem onClick={() => handleCloseUserMenu("/")}>
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  Dashboard
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => handleCloseUserMenu("account-settings")}
                >
                  <ListItemIcon>
                    <ManageAccountsIcon />
                  </ListItemIcon>
                  Edit Account
                </MenuItem>
                <MenuItem onClick={() => handleCloseUserMenu("/login")}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={openDrawer}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <SideBar children={sideBarButtons} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Outlet />
          <Copyright sx={{ py: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
