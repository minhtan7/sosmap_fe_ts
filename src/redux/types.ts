export interface Chart {
  itemChart: {
    send: [{ _id: string; count: number }];
    receive: [{ _id: string; count: number }];
  };
  todayPosts: {};
}

export interface Store {
  barchart: Chart;
}
