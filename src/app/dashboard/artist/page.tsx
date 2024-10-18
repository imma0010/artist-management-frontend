"use client";
import AddArtistModal from "@/components/AddArtistModal";
import ArtistTable from "@/components/ArtistTable";
import { NextPage } from "next";
import { ReactElement, useEffect, useState } from "react";
import { toast } from "sonner";

const ArtistPage: NextPage = (): ReactElement => {
    const [isAddModelOpen, setIsAddModelOpen] = useState<boolean>(false);
    const [artists, setArtists] = useState<Artist[]>([]); // State to hold artist data
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    // Fetch artist data from the backend
    useEffect(() => {
        fetchArtists(currentPage);
    }, [currentPage]); // Empty dependency array means this effect runs once on mount
    
    const fetchArtists = async (page: number = 1) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/artist?page=${page}`, {
                method: "GET",
                headers: {
                    "Authorization": localStorage.getItem("token") || " ",
                    "Content-Type": "application/json",
                }
            }); // Adjust the URL as per your backend API
            if (!response.ok) {
                throw new Error('Failed to fetch artists');
            }
            const data = await response.json();
            setArtists(data.data); // Assuming your backend returns an array of artist objects
            setCurrentPage(data.metadata.currentPage);
            setTotalPages(data.metadata.totalPages);
        } catch (err: any) {
            console.log(err);
            toast.error(err.message); // Set error message if fetch fails
        }
    };

    // Updated parameter for handleAddSubmit to include all fields
    const handleAddSubmit = async ({
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
        if (!name ||  !dob || !address || !first_release_year) {
            toast.error("Please fill in all fields");
            return;
        }

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/artist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token") || " ",
            },
            body: JSON.stringify({name, gender, dob, address, first_release_year, no_of_albums_released}),
        });

        const result = await response.json();

        if(!response.ok) {
            toast.error(result.message);
            throw new Error("Failed to add artist");
        }

        toast.success(result.message);

        setIsAddModelOpen(false);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold">Artist Page</h1>
            <AddArtistModal 
                onSubmit={handleAddSubmit} 
                isAddModelOpen={isAddModelOpen} 
                setIsModalOpen={setIsAddModelOpen}  
            />
            <ArtistTable artists={artists} currentPage={currentPage} totalPages={totalPages} onPreviousPage={() => setCurrentPage(currentPage - 1)} onNextPage={() => setCurrentPage(currentPage + 1)} />
        </div>
    );
};

export default ArtistPage;
