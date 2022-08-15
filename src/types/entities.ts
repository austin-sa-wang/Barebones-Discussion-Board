export interface Thread {
  _id: string;
  title: string;
  content: string;
}

export interface ThreadData {
  thread: Thread;
}

export interface ThreadsData {
  threads: Thread[];
}

export interface ThreadInput {
  title: string;
  content: string;
}
