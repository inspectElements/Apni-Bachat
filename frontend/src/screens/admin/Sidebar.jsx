import React from "react";
import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  List,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

export default function Sidebar() {
  const routes = [
    {
      headingText: "Approve account",
      path: "/admin/approve-account",
      mainIcon: <PersonIcon fontSize="large" />,
    },
    {
      headingText: "Approve loan",
      path: "/admin/approve-loan",
      mainIcon: <CreditScoreIcon fontSize="large" />,
    },
  ];
  const location = useLocation();
  const isCurrentNavActive = (path) => {
    const currentRoute = location.pathname;
    if (currentRoute === path) return true;
    else return false;
  };
  return (
    <div style={{ flex: 2 }}>
      <List>
        {routes.map((r) => (
          <Link to={r.path} key={r.headingText}>
            <ListItem
              key={r.headingText}
              disablePadding
              sx={{
                transition: "all 0.3s",
                bgcolor: isCurrentNavActive(r.path) ? "blue" : "initial",
                color: isCurrentNavActive(r.path) ? "white" : "black",
              }}
            >
              <ListItemButton sx={{ p: 2, px: 4 }}>
                <ListItemIcon
                  sx={{
                    transition: "all 0.3s",
                    fontSize: {
                      xl: "30px",
                      sm: "15px",
                    },
                    color: isCurrentNavActive(r.path) ? "white" : "black",
                  }}
                >
                  {r.mainIcon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                  primary={r.headingText}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            padding: 5,
          }}
        >
          <Typography textAlign={"center"} variant="h5">
            See the transactions of our contract
          </Typography>
        </Box>
      </List>
    </div>
  );
}
