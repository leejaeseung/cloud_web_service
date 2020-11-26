import asyncRoute from 'lib/asyncRoute'

export const Home = asyncRoute(() => import('./Home'))
export const OriginRecipes = asyncRoute(() => import('./OriginRecipes'))
export const MyRecipes = asyncRoute(() => import('./MyRecipes'))