interface Blog {
  id: number;
  title: string;
  path: string;
  imageKey: string;
  shortContent: string;
  content: string;
  seoMetadata: {
    keywords: string[];
  };
  tags: Tag[];
  createdAt: string;
}

interface BlogResponse {
  posts: Blog[];
  total: number;
}
