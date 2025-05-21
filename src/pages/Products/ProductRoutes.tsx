import type { RouteObject } from 'react-router';
import ProductPage from './Product.tsx';


const productRoutes: RouteObject[] = [
    {path: 'products', element: <ProductPage/>}
]

export default productRoutes;
