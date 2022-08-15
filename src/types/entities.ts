export interface Thread {
  _id: string;
  title: string;
}

export interface ThreadsData {
  threads: Thread[];
}

export interface ThreadInput {
  title: string;
  content: string;
}
