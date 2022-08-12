import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import RefreshIcon from "@mui/icons-material/Refresh";
import { dashboardData, timelineData } from "../../data/dahboardDataList";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const styles = {
  link: {
    color: "#cdcdcd",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#808080",
    },
  },
  item: {
    padding: "15px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },
  icon: {
    minWidth: "40px",
    color: "#cdcdcd",
  },
};

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        color="inherit"
        elevation={0}
        position="fixed"
        open={open}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <div className="font-bold uppercase">Sale demo</div>
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          [`& .MuiDrawer-paper`]: {
            boxSizing: "border-box",
            backgroundColor: "#181818",
          },
        }}
        variant="permanent"
        open={open}
      >
        <DrawerHeader>
          <IconButton style={styles.icon} onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem
              style={styles.link}
              key={text}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  style={styles.link}
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem
              style={styles.link}
              key={text}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  style={styles.link}
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        className="bg-gray-200"
        component="main"
        sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}
      >
        <DrawerHeader />
        <div className="grid grid-cols-5 gap-5">
          <div className="grid grid-cols-4 gap-5 col-span-4">
            {dashboardData.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col w-full h-full justify-between py-2 px-2 shadow ${item.color} ${item.textColor}`}
              >
                <div className="text-sm">{item.name}</div>
                <div className="">
                  <div className="text-4xl font-black ">{item.totalDraft}</div>
                  <div className="text-sm">Documents</div>
                </div>
                <div className="flex flex-wrap justify-between items-center">
                  <div className="text-sm">{item.money}</div>
                  <div className="text-sm">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between item-center">
              <div className="text-gray-600 text-sm">Timeline</div>
              <div className="text-gray-500 text-xs">
                <RefreshIcon />
              </div>
            </div>
            {timelineData.map((item, index) => (
              <div key={index} className=" bg-white p-2 shadow">
                <div className="font-bold text-sm">{item.timelineName}</div>
                <div className="text-gray-400 text-sm pb-4">
                  {item.timelineBy}
                </div>
                <div className="flex items-center justify-start text-gray-500 text-xs">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      item.timelineStatus === "approved"
                        ? "bg-green-600"
                        : item.timelineStatus === "declined"
                        ? "bg-red-600"
                        : "bg-blue-600"
                    }`}
                  ></div>
                  {item.timelineStatus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Box>
  );
}
