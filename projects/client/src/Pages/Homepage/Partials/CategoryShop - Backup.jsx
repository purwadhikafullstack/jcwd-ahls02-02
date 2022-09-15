import { Button, Card, Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

const CategoryShop = () => {
    return <div>
        <Container sx={{ mt: 5 }}>
            <Typography variant='h6' sx={{ textAlign: 'left' }}>
                Shop By Category
            </Typography>
            <Box sx={{ display: 'flex', minHeight: 75, mt: 2, justifyContent: 'space-between' }}>
                <Button variant='outlined' sx={{ minWidth: '19%' }}>
                    <Paper elevation={0}>
                        <img src='https://img.freepik.com/free-vector/coughing-person-with-coronavirus_23-2148485525.jpg?w=2000' style={{ maxHeight: 50 }} />
                        <Typography color='primary' sx={{ ml: 1 }}>
                            FLU & COUGH
                        </Typography>
                    </Paper>
                </Button>
                <Button variant='outlined' sx={{ minWidth: '19%' }}>
                    <Paper elevation={0}>
                        <img src='https://media.istockphoto.com/vectors/sick-child-in-bed-vector-id1169998028?k=20&m=1169998028&s=612x612&w=0&h=3K7Dcqd7tUEgM6uV0qsmxZSwfIqdBCyCl_VtVVFZkvE=' style={{ maxHeight: 50 }} />
                        <Typography color='primary' sx={{ ml: 1 }}>
                            FEVER
                        </Typography>
                    </Paper>
                </Button>
                <Button variant='outlined' sx={{ minWidth: '19%' }}>
                    <Paper elevation={0}>
                        <img src='https://img.freepik.com/premium-vector/girl-with-healthy-food-flat-illustration_82574-7751.jpg?w=2000' style={{ maxHeight: 50 }} />
                        <Typography color='primary' sx={{ ml: 1 }}>
                            VITAMIN
                        </Typography>
                    </Paper>
                </Button>
                <Button variant='outlined' sx={{ minWidth: '19%' }}>
                    <Paper elevation={0}>
                        <img src='https://media.istockphoto.com/vectors/gynecology-and-women-health-consultation-with-a-gynecologist-or-vector-id1195893421?k=20&m=1195893421&s=612x612&w=0&h=8mvE_ev36Rw7P6b7oBoWY7rZQDy_CW23IrbtCp3F22w=' style={{ maxHeight: 50 }} />
                        <Typography color='primary' sx={{ ml: 1 }}>
                            HORMONE
                        </Typography>
                    </Paper>
                </Button>
                <Button variant='outlined' sx={{ minWidth: '19%' }}>
                    <Paper elevation={0}>
                        <img src='https://img.freepik.com/free-vector/skincare-flat-cartoon-composition-with-young-woman-examining-her-face-with-magnifier_1284-54555.jpg?w=2000' style={{ maxHeight: 50 }} />
                        <Typography color='primary' sx={{ ml: 1 }}>
                            BEAUTY
                        </Typography>
                    </Paper>
                </Button>
            </Box>
        </Container>
    </div>
}

export default CategoryShop;