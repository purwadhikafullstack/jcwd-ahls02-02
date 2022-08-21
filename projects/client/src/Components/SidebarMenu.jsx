import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Text from "./atoms/Text";
import { Toolbar } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

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
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
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

const SidebarMenu = (props) => {
  const { title, menu, openTab, setOpenTab } = props;
  const [open, setOpen] = useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    width < 850 ? setOpen(false) : setOpen(true);
  }, [width]);

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        position: { xs: open ? "absolute" : "static", sm: "static", zIndex: 5 },
      }}
    >
      <Toolbar sx={{ height: 75, opacity: 0 }} />
      <DrawerHeader>
        {open && (
          <Text fontSize="h5" textAlign="left">
            {title}
          </Text>
        )}
        {width < 850 && (
          <IconButton
            sx={{
              m: !open ? "auto" : 0,
            }}
            onClick={handleDrawer}
          >
            {open ? (
              <ChevronLeftIcon />
            ) : (
              <>
                <ChevronRight />
              </>
            )}
          </IconButton>
        )}
      </DrawerHeader>
      <Divider />
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => setOpenTab(index)}
          >
            <ListItemButton
              sx={{
                minHeight: 60,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && (
                <Text color={openTab === index ? "primary" : "inherit"}>
                  {item.text}
                </Text>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarMenu;
