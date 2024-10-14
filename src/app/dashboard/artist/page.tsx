"use client";
import AddArtistModal from "@/components/AddArtistModal";
import ArtistTable from "@/components/ArtistTable";
import { NextPage } from "next";
import { ReactElement, useEffect, useState } from "react";
import { toast } from "sonner";

const ArtistPage: NextPage = (): ReactElement => {
    const [isAddModelOpen, setIsAddModelOpen] = useState<boolean>(false);
    const [artists, setArtists] = useState<Artist[]>([]); // State to hold artist data

    // Fetch artist data from the backend
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch('/api/artists'); // Adjust the URL as per your backend API
                if (!response.ok) {
                    throw new Error('Failed to fetch artists');
                }
                const data = await response.json();
                setArtists(data); // Assuming your backend returns an array of artist objects
            } catch (err: any) {
                console.log(err);
                toast.error(err.message); // Set error message if fetch fails
            }
        };

        fetchArtists();
    }, []); // Empty dependency array means this effect runs once on mount


    // Updated parameter for handleAddSubmit to include all fields
    const handleAddSubmit = ({
        name,
        dob,
        gender,
        address,
        first_release_year,
        no_of_albums_released,
    }: {
        name: string;
        gender: string;
        dob: string; // Date of Birth
        address: string;
        first_release_year: string; // Assuming this is a string
        no_of_albums_released: number;
    }) => {
        // Handle the submitted artist data (e.g., send it to an API or update state)
        console.log("New Artist Data:", {
            name,
            gender,
            dob,
            address,
            first_release_year,
            no_of_albums_released,
        });
        
        // You can add further logic here, like updating your artist list state or making an API call.
    };

    return (
        <div>
            <h1 className="text-3xl font-bold">Artist Page</h1>
            <AddArtistModal 
                onSubmit={handleAddSubmit} 
                isAddModelOpen={isAddModelOpen} 
                setIsModalOpen={setIsAddModelOpen}  
            />
            <ArtistTable />
        </div>
    );
};

export default ArtistPage;
