"use client";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import { firestore } from "./firebase";
import {
  collection,
  setDoc,
  doc,
  query,
  getDocs,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Home as HomeIcon,
  ContactMail as ContactMailIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
  Code as CodeIcon,
} from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxWidth: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [filteredPantry, setFilteredPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemName, setItemName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updatePantry = async () => {
    setLoading(true);
    setError("");
    try {
      const snapshot = query(collection(firestore, "pantry"));
      const docs = await getDocs(snapshot);
      const pantryList = [];
      docs.forEach((doc) => {
        pantryList.push({ name: doc.id, ...doc.data() });
      });
      setPantry(pantryList);
      setFilteredPantry(pantryList);
    } catch (err) {
      setError("Failed to load pantry items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    setLoading(true);
    setError("");
    try {
      const docRef = doc(collection(firestore, "pantry"), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { count } = docSnap.data();
        await setDoc(docRef, { count: count + 1 });
      } else {
        await setDoc(docRef, { count: 1 });
      }
      await updatePantry();
    } catch (err) {
      setError("Failed to add item.");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (item) => {
    setLoading(true);
    setError("");
    try {
      const docRef = doc(collection(firestore, "pantry"), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { count } = docSnap.data();
        if (count === 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { count: count - 1 });
        }
      }
      await updatePantry();
    } catch (err) {
      setError("Failed to remove item.");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (item) => {
    setLoading(true);
    setError("");
    try {
      const docRef = doc(collection(firestore, "pantry"), item);
      await deleteDoc(docRef);
      await updatePantry();
    } catch (err) {
      setError("Failed to delete item.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredPantry(pantry);
    } else {
      const filteredItems = pantry.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPantry(filteredItems);
    }
  };

  const handleAddClick = () => {
    if (itemName.trim() !== "") {
      addItem(itemName);
      setItemName("");
    }
  };

  const handleRemoveClick = () => {
    if (itemName.trim() !== "") {
      removeItem(itemName);
      setItemName("");
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pantry Tracker
          </Typography>
          <Button color="inherit" startIcon={<ContactMailIcon />} onClick={handleOpen}>
            Contact Us
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Contact Us</DialogTitle>
            <DialogContent sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton component="a" href="https://www.linkedin.com/in/im-abdulmoiz/" target="_blank" sx={{ color: '#0072b1' }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton component="a" href="https://github.com/Abdul-Moiz31" target="_blank" sx={{ color: '#333' }}>
                <GitHubIcon />
              </IconButton>
              <IconButton component="a" href="mailto:abdulmoiz3140@gmail.com" sx={{ color: '#d44638' }}>
                <EmailIcon />
              </IconButton>
              <IconButton component="a" href="https://leetcode.com/u/Abdul_Moiz1/" target="_blank" sx={{ color: '#FFA116' }}>
                <CodeIcon />
              </IconButton>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ color: '#0072b1' }}>Close</Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
      <Box
        width="100vw"
        height="100vh"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
      >
        <Box
          width="100%"
          height="auto"
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ mb: 4 }}
        >
          <Typography
            variant={"h2"}
            color={"#333"}
            textAlign={"center"}
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.5rem",
                lg: "3rem",
                xl: "3.5rem",
              },
            }}
          >
            Pantry Items 🛒
          </Typography>
          <Typography
            variant={"h4"}
            color={"#666"}
            textAlign={"center"}
            sx={{ mt: 2 }}
          >
            Manage your pantry items efficiently
          </Typography>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          width={{ xs: "90%", sm: "70%", md: "50%" }}
          borderRadius={"25px"}
          mb={4}
        >
          <TextField
            label="Search Items"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              backgroundColor: "white",
              width: "100%",
            }}
          />
          <Button variant="contained" onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Item Name"
            variant="outlined"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            sx={{ backgroundColor: "white", width: "100%" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddClick}
            sx={{
              width: "50%",
              height: " 50px",
              alignItems: "center",
              justifyItems: "center",
              bgcolor: "#46c414",
            }}
          >
            Add Item
          </Button>
        </Stack>

        <Box
          border={"1px solid #333"}
          width={{ xs: "95%", sm: "80%", md: "70%", lg: "60%" }}
          mb={4}
        >
          <Stack width="100%" height="400px" spacing={2} overflow={"auto"}>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {filteredPantry.map(({ name, count }) => (
              <Box
                key={name}
                width="100%"
                minHeight="150px"
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                bgcolor={"#f0f0f0"}
                paddingX={3}
                paddingY={2}
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1, sm: 2 },
                }}
              >
                <Typography
                  variant={"h3"}
                  color={"#333"}
                  textAlign={"center"}
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
                  }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography
                  variant={"h3"}
                  color={"#333"}
                  textAlign={"center"}
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
                  }}
                >
                  {count}
                </Typography>
                <Stack direction={"row"} spacing={1} sx={{ flexShrink: 0 }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#46c414",
                      width: { xs: "40px", sm: "50px" },
                      height: { xs: "40px", sm: "50px" },
                      minWidth: "auto",
                      fontSize: { xs: "0.75rem", sm: "1rem" },
                    }}
                    onClick={() => addItem(name)}
                  >
                    +1
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#46c414",
                      width: { xs: "40px", sm: "50px" },
                      height: { xs: "40px", sm: "50px" },
                      minWidth: "auto",
                      fontSize: { xs: "0.75rem", sm: "1rem" },
                    }}
                    onClick={() => removeItem(name)}
                  >
                    -1
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "red",
                      width: { xs: "40px", sm: "50px" },
                      height: { xs: "40px", sm: "50px" },
                      minWidth: "auto",
                      fontSize: { xs: "0.75rem", sm: "1rem" },
                    }}
                    onClick={() => deleteItem(name)}
                  >
                    <DeleteIcon
                      sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
                    />
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
        <Stack spacing={2} width={{ xs: "90%", sm: "70%", md: "50%" }}></Stack>
      </Box>
    </>
  );
}