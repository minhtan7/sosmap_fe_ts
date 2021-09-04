export interface CurrentUser {
  team: {
    province: {
      name: string;
      slug: string;
      districts: [{ name: string; slug: string }];
    };
  };
}

export interface TeritoryTree {
  province?: { _id: string; name: string; slug: string; totalTicket: number };
  districts: [{ _id: string; name: string; slug: string; totalTicket: number }];
}

export interface SelectionData {
  selectionType: "district" | "province";
  selections: Post;
}
export interface Items {
  _id: string;
  kind: string;
  ref: string;
}
export interface Post {
  _id: string;
  address: string;
  type: string;
  phoneNumber: string;
  items: Items[];
  isApproved: boolean;
  isFinished: boolean;
  note: string;
}

export interface PieType {
  _id: string; //name of the item
  items: [
    {
      type: string;
      total: number;
    }
  ];
}

export interface allDataType {
  allData: {
    todayPosts: {
      todaySend: number;
      todayReceive: number;
      yesterdaySend: number;
      yesterdayReceive: number;
    };
    pies: [
      {
        _id: string;
        items: [
          {
            type: string;
            total: number;
          }
        ];
      }
    ];
    mostWanted: {
      _id: string;
      biggest: number;
      name: string;
      percent: number;
    };
    barChart: {
      receive: [number];
      send: [number];
      finish: [number];
    };
  };
}

// 1 - lấy danh sách quận mà team của current user hoạt động
// 1b- Hiển thị "danh sách quận hoạt động"
// 2 - lấy tổng tickets của team
// 2b - mỗi ticket của team có quận
// 2c - Hiển thị từng ticket vào Redux "danh sách quận hoạt động"
// 3 - render
