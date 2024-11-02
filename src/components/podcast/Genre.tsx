import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { getRequest } from "../../utils/apis";

interface Genre {
  id: string;
  name: string;
}

/*const genres: Genre[] = [
  { id: '1', name: 'Action' },
  { id: '2', name: 'Adventure' },
  { id: '3', name: 'Comedy' },
  { id: '4', name: 'Drama' },
  { id: '5', name: 'Fantasy' },
  { id: '6', name: 'Horror' },
  { id: '7', name: 'Mystery' },
  { id: '8', name: 'Romance' },
  { id: '9', name: 'Sci-Fi' },
  { id: '10', name: 'Thriller' },
  { id: '11', name: 'Western' },
  { id: '12', name: 'Animation' },
  { id: '13', name: 'Documentary' },
  { id: '14', name: 'Musical' },
  { id: '15', name: 'War' },
]*/

interface GenreSelectorProps {
  selectedGenres: string[],
  setSelectedGenres: (genres: string[]) => void
}

export default function GenreSelector({ selectedGenres, setSelectedGenres }: GenreSelectorProps ) {
  const [genres, setGenres] = useState<Genre[]>([])
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const fetchGenres = async () => {
        const url = `${import.meta.env.VITE_API_URL}/genres/`;
        try {
            const res = await getRequest(url);
            const genreData = await res.json();
            setGenres(genreData);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };
    fetchGenres();
  }, []); 

  const toggleGenre = (genre: Genre) => {
    setSelectedGenres(prevSelected => 
      prevSelected.some(g => g.id === genre.id)
        ? prevSelected.filter(g => g.id !== genre.id)
        : [...prevSelected, genre]
    )
  }

  const isSelected = (genre: Genre) => selectedGenres.some(g => g.id === genre.id)

  return (
    <div className="p-4 w-full">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Genres</Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Select Genres</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px] w-full pr-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {genres.map((genre) => (
                <Button
                  key={genre.id}
                  variant={isSelected(genre) ? "secondary" : "outline"}
                  className="w-full justify-start"
                  onClick={() => toggleGenre(genre)}
                >
                  {genre.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Selected Genres:</h3>
        {selectedGenres.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedGenres.map((genre) => (
              <Badge key={genre.id} variant="secondary">
                {genre.name}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No genres selected</p>
        )}
      </div>
    </div>
  )
}
