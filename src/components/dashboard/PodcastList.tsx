import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, AlertTriangle } from 'lucide-react'
import { getRequest, postRequest, putRequest, deleteRequest } from '@/utils/apis';
import CircularLoader from '@/components/ui/circularLoader';
import TreatmentDetails from '@/components/admin/treatment/TreatmentDetails';

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Feedback, { FeedbackState }from '@/components/Alert';
import toCamelCaseKeys from '@/utils/toCamelCase';
import { Podcast } from '@/utils/types';



export default function PodcastList() {
  const [podcasts, setPodcasts] = useState<Treatment[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPodcast, setCurrentPodcast] = useState(null)
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPodcasts = async () => {
      const url = `${import.meta.env.VITE_API_URL}/podcasts/`;
      try {
        const res = await getRequest(url);
        console.log(res)
        if (res.ok) {
          const jsonRes = await res.json();
          console.log(jsonRes)
          const camelCasePodcasts = jsonRes.map((treatment) => toCamelCaseKeys(treatment));
          console.log(camelCasePodcasts)
          setPodcasts(camelCasePodcasts);
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    fetchPodcasts()
  }, []);

  const handleCreate = async (treatment: Omit<Treatment, 'id'>) => {
    const url = `${import.meta.env.VITE_API_URL}/treatments/`;
    try {
      const res = await postRequest(url, treatment)
      console.log(res)
      if (res.ok) {
        const jsonRes = await res.json();
        console.log(jsonRes);
        setFeedback({message: `${treatment.name} has been added successfully.`,})
      } else {
        setFeedback({message: `${treatment.name} was not added.`,})
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setFeedback(null)
      }, 5000);
    }
  }

  const handleUpdate = (updatedTreatment: Treatment) => {
    setTreatments(treatments.map(t => t.id === updatedTreatment.id ? updatedTreatment : t))
  }

  const handleDelete = async (id: string) => {
    console.log("deleting...........", currentPodcast)
    const url = `${import.meta.env.VITE_API_URL}/podcasts/${currentPodcast.id}`;
    try {
      const res = await deleteRequest(url);
      if (res.ok) {
        setFeedback({message: "Podcast deleted"})
      } else {
        setFeedback({message: "Failed to delete podcast", variant: "error"})
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setFeedback(null);
      }, 5000)
    }
  }

  const openDialog = (podcast?: Podcast) => {
    setCurrentPodcast(podcast || null)
    setIsDialogOpen(true)
    console.log("current pod....", currentPodcast)
  }

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'suspended') => {
    setIsLoading(true)
    const url = `${import.meta.env.VITE_API_URL}/treatments/${id}`;
    try {
      const data = {status: newStatus}
      console.log(data)
      const res = await putRequest(url, data)
      console.log(res)
      if (res.ok) {
        setFeedback({message: "Treatment was updated successfuly"})
        const updated = await res.json()
        const camelCaseUpdated = toCamelCaseKeys(updated);
        setTreatments(treatments.map(treatment =>
          treatment.id === id ? { ...camelCaseUpdated } : treatment
        ));
        setIsLoading(false)
      } else {
          setFeedback({message: "Treatment was not updated", variant: "error"})
      }
    } catch (error) {
      setFeedback({message: "Treatment was not updated", variant: "error"})
      console.log(error)
    } finally {
       setIsLoading(false);
    }
  }

  const viewTreatment = (treatment: Treatment) => {
    navigate('/admin/treatment', {state: { treatment }    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularLoader size="large" />
      </div>
    )
  }
  
  return (
    <div>
      {feedback && <Feedback message={feedback.message}
        {...(feedback.variant && { variant: feedback.variant })}
      />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-800">Manage Podcasts</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Authors</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {podcasts.map((podcast) => (
           
            <TableRow key={podcast.id}>
              <TableCell
                onClick={() => openDialog(podcast) }
              >{podcast.title}</TableCell>
              <TableCell
                onClick={() => openDialog(podcast) }
              >
                {podcast?.authorsDetails?.map((author, idx) => (
                   <p key={idx}>{author.firstName} {author.lastName}</p>
                ))}
              </TableCell>
              <TableCell
                onClick={() => openDialog(podcast) }>
                <Badge variant={'approved' === 'approved' ? 'success' : treatment.status === 'suspended' ? 'destructive' : 'default'}>
                  {'approved'}
                </Badge>
              </TableCell>
              <TableCell>
                {'approved' !== 'approved' && (
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleStatusChange(podcast.id, 'approved')}>
                    <Check className="mr-2 h-4 w-4" /> Approve
                  </Button>
                )}
                {'approved' !== 'suspended' && (
                  <Button variant="outline" size="sm" onClick={() => handleStatusChange(podcast.id, 'suspended')}>
                    <AlertTriangle className="mr-2 h-4 w-4" /> Suspend
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentPodcast ? currentPodcast.title : '' }</DialogTitle>
          </DialogHeader>
          <div className="flex w-full space-x-6">
          <Button onClick="">View</Button>
          <Button onClick="">Edit</Button>
       
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
            podcast.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
         </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


type TreatmentFormProps = {
  treatment?: Treatment | null
  onSubmit: (treatment: Omit<Treatment, 'id'> & { id?: string }) => void
}

export function TreatmentForm({ treatment, onSubmit }: TreatmentFormProps) {
  const [name, setName] = useState(treatment?.name || '')
  const [description, setDescription] = useState(treatment?.description || '')
  const [condition, setCondition] = useState(treatment?.condition || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ id: treatment?.id, name, description, condition })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Treatment Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="condition">Condition</Label>
        <Textarea
          id="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          required
        />
      </div>
      <Button type="submit">{treatment ? 'Update' : 'Create'} Treatment</Button>
    </form>
  )
}
