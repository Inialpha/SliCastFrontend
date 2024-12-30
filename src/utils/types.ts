export type FormType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type NewData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

export type FeedbackType = {
  variant?: string;
  message: string;
  title?: string;
};

interface Segment {                    type: string;                        position: number;                    alt?: string | null;
  text?: string;                       image?: string;                      imageFile?: File;                                                         backgroundColor?: string;
}

type Podcast = {
  authors: string[];
  status: string;
  title: string;
  text: string;
  coverPhoto?: string;
  coverPhotoFile?: File;
  duration: number;
  description: string;
  genres: string[];
  segments: Segment;
};
