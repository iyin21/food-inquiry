
export interface RecipeResponse{
  q: string,
from: number,
  to: number,
  more: boolean
  count: number,
  hits: Hits[]
   
  
}

export interface Hits {
  recipe: {
    uri: string,
    label: string,
    image: string,
    source: string,
    url: string,
    shareAs: string
    yield: number
    dietLabels: 
      string[]
    ,
    healthLabels: 
      string[],
    cautions: 
      string[],
    ingredientLines: 
      string[],
    ingredients: 
      {
        text: string,
        quantity: number,
        measure: string,
        food: string,
        weight: 0,
        foodId: string
      }[]
    ,
    calories: number,
    totalWeight: number,
    cuisineType: 
      string[],
    mealType: 
      string[],
    dishType: 
      string[],
    digest: 
      {
        label: string,
        tag: string,
        schemaOrgTag: string,
        total: number,
        hasRDI: true,
        daily: number,
        unit: string,
        sub: string
      }[]
    
  },
      
}