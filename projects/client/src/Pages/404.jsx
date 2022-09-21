import { Container, Grid, Typography } from "@mui/material";
import Button from "../Components/atoms/Button";

const NotFoundPage = () => {
    return <div style={{ paddingBottom: "2.5rem" }}>
        <Container>
            <Grid container spacing={5} sx={{ alignItems: 'center' }}>
                <Grid item sx={12} sm={6}>
                    <img src="https://img.freepik.com/free-vector/404-error-lost-space-concept-illustration_114360-7891.jpg?w=2000" alt="404-not-found" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography variant="h2" fontWeight="bold" color="primary.dark">OH NO!</Typography>
                    <Typography variant="subtitle2" color="grey.600">Seems like the page you're looking for doesn't exist anymore</Typography>
                    <Typography variant="subtitle2" color="grey.600">Let's get you back home now</Typography>
                    <Button variant="outlined" sx={{ mt: 2 }}>HOME</Button>
                </Grid>
            </Grid>
        </Container>
    </div>
}

export default NotFoundPage;