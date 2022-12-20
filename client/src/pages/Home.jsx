import Reviews from "../components/Reviews.jsx"
import TypesOfTrip from "../components/TypesOfTrip.jsx"
import Typography from "../components/mui-components/Typography.jsx";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import HeroLayout from '../components/HeroLayout';
import Button from "../components/mui-components/Typography.jsx";
import { Modal } from "@mui/material";
import { useState } from "react";
import Login from "../components/Login.jsx";


const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
>
  <Box sx={{bgcolor: "primary.main", color: "white", top: 10, margin: "auto"}}>
    <Login />
  </Box>
</Modal>

    <Typography
    component="header"
    sx={{ display: 'flex', bgcolor: 'primary.main' }}
  >
    <Container container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ my: 4, mt: 8, ml: 4, display: 'flex'}}>

      <Grid container spacing={5} sx={{ display:"flex", justifyContent: 'flex-start' }}>

          <Grid>
            <Typography sx={{ display: 'flex', flexWrap: 'wrap'}}
              variant="h1" align="left" component="h2" color="primary.light" bgcolor="primary.main">
              Wander More, <br></br> Worry Less
            </Typography> 
          </Grid>

          <Grid item xs={6} sm={8} md={4} sx={{ display: 'flex', alignItems: 'flex-start', pt: 0 }}>
            <Box>
              <Typography variant="body2" sx={{ color: 'primary.light' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </Typography>     
              <Typography variant="body2" sx={{ mt: 2, color: 'primary.light' }}>
                <Button>Explore More</Button>
              </Typography>                  
            </Box>
          </Grid>

      </Grid>
    </Container>
  </Typography>

  <HeroLayout
  sxBackground={{
    backgroundImage: `url(https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2021/11/01_Mirbach_HiRes_sRGB-2048x1384.jpg)`,
    backgroundPosition: 'center',
  }}
/>

    <Reviews />
    <TypesOfTrip />
    </div>
  );
};

export default Home;
