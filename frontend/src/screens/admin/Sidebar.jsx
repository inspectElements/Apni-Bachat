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
import QRCode from "qrcode.react";
import { apniBachatConractAddress } from "../../constants/index";

export default function Sidebar() {
  const routes = [
    {
      headingText: "Approve Account",
      path: "/admin/approve-account",
      mainIcon: <PersonIcon fontSize="large" />,
    },
    {
      headingText: "Approve Loan",
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
    <div style={{ flex: 3 }} className="container !shadow-xl">
      <Typography
        variant="h4"
        color="primary.contrastText"
        sx={{
          fontSize: "2.7rem",
          fontWeight: "bold",
          textAlign: "center",
          mt: "10vh",
          mb: 2.5,
          textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
          fontFamily: "Poppins, sans-serif",
          letterSpacing: "0.1rem",
        }}
      >
        अपनी Bachat
      </Typography>
      <Typography
        variant="h6"
        color="primary.contrastText"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "0.9rem",
          fontStyle: "italic",
          letterSpacing: "0.1rem",
          textAlign: "center",
          textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
          mb: 15,
        }}
      >
        "Reliable and Trustworthy"
      </Typography>

      <List>
        {routes.map((r) => (
          <Link to={r.path} key={r.headingText}>
            <ListItem
              key={r.headingText}
              disablePadding
              sx={{
                transition: "all 0.3s",
                bgcolor: isCurrentNavActive(r.path) ? "#54004C50" : "initial",
                color: "white",
                fontSize: "40px !important",
              }}
            >
              <ListItemButton sx={{ p: 2, px: 4 }}>
                <ListItemIcon
                  sx={{
                    transition: "all 0.3s",
                    fontSize: {
                      xl: "30px",
                      sm: "20px",
                    },
                    color: "white",
                  }}
                >
                  {r.mainIcon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    fontSize: "30px",
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
            paddingTop: 14,
          }}
        >
          <QRCode
            value={`https://mumbai.polygonscan.com/address/${apniBachatConractAddress}`}
          />
          <Typography textAlign={"center"} variant="h6" color="white">
            Check Contract Transaction History
          </Typography>
        </Box>
      </List>
    </div>
  );
}
