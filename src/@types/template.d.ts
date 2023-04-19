interface Category {
  id: number;
  title: string;
  description: string;
  seoMetadata: SeoMetadata;
  shortDescription: string;
}

interface CategoryResponse {
  total: number;
  categories: Category[];
}

interface Replacement {
  title: string;
  placeHolder: string;
  type: 'IMAGE' | 'TEXT';
  value: string;
  layerName: string;
  order: number;
}

interface Layer {
  title: string;
  fileType: string;
  key: string;
  layerType: string;
  order: number;
  optionIds: number[];
  replacements: Replacement[];
  size: string;
}

interface Template {
  id: number;
  path: string;
  layers: {
    layer: Layer[];
  };
  previewImageKey: string;
  status: string;
  tags: Tag[];
  title: string;
  shortDescription: string;
  description: string;
  params: { sizes: string[] };
  seoMetadata: SeoMetadata;
  category: Category;
}

interface TemplateResponse {
  total: number;
  page: string | number;
  templates: Template[];
}

interface TemplateReqBody {
  id: number;
  layers: Layer[];
  size: string;
}
