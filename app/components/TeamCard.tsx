"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import { joinTeam } from '../actions/teams/joinTeam';

export default function TeamCard({ team_id,team_name, team_description }: any) {

    const { data } = useSession()

    const email = data?.user?.email as string

    const handleJoin = async () => {
        await joinTeam(email, team_id)

        alert("Joined the team " + team_id)
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {team_name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {team_description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={(handleJoin)} size="small">Join</Button>
                <Button size="small">Share</Button>
            </CardActions>
        </Card>
    );
}
