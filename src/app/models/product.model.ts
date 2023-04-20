// se renderiza con los componentes
export interface Product {
  id: string;
  title: string;
  price: number;
  images: string [];
  description: string;
  category: Category;
}

export interface Category{
  id: string;
  name: string;
}

// se utiliza para la API - Conceptp de DTO. Y hacemos herencia
// se omite el campo: id - category
// Omit es de typescript
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number; // especificacmos el campo categoryId
}

// se reutiliza CreateProductDTO, pero con los parametros opcionales
// con Partial, indica q los atributos son opcionales, significa q le pones el signo de ? a todos los atributos
export interface UpdateProductDTO extends Partial<CreateProductDTO> { }
