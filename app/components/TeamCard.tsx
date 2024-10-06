"use client";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import { joinTeam } from '../actions/teams/joinTeam';
import Link from 'next/link';

// Define an interface for the component props
interface TeamCardProps {
    team_id: string;
    team_name: string;
    team_description: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ team_id, team_name, team_description }) => {
    const { data } = useSession();
    const email = data?.user?.email as string;

    const handleJoin = async () => {
        await joinTeam(email, team_id);
        alert("Joined the team " + team_id);
    };

    const [copied, setCopied] = React.useState(false);

    const copyToClipboard = async (team_link: string) => {
        try {
            await navigator.clipboard.writeText("http://localhost:3000/"+team_link);
            setCopied(true);

            // Optionally, reset the copied state after a few seconds
            setTimeout(() => {
                setCopied(false);
            }, 2000); // Reset after 2 seconds
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {team_name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {team_description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleJoin} size="small">Join</Button>
                <Button size="small">Share</Button>
                <Button size="small">
                    <Link href={`/teams/details/${team_id}`} passHref>
                        Details
                    </Link>
                </Button>
                <Button onClick={() => copyToClipboard(`teams/details/${team_id}`)}>
                    {copied ? "Copied!" : "Copy Link"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default TeamCard;
