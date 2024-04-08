import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function Home() {
    return (

        <Card sx={{ minWidth: 275, maxWidth: 500 }} > {/* Card component for nice welcome text on front page */}
            <CardContent>
                <Typography variant='h5' justifycontent='center' alignitems='center' >
                    The Customer App
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom justifycontent='center' alignitems='center' >
                    App for all personal trainers
                </Typography>
                <Typography justifycontent='center' alignitems='center' >
                    <br />
                    Manage your customer relationships and all the trainings
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom justifycontent='center' alignitems='center' >
                    Best training starts with great planning
                </Typography>
            </CardContent>
        </Card >

    );
}