import { useSelector } from "react-redux"
import { selectorFavorites } from "../selectors/selectors"

const FavoritesPage = () => {
	const favorites = useSelector(selectorFavorites)
	console.log(favorites);
	return (
		<div>
		<h2>Избранное</h2>
		<ul>
		  {favorites.map((item, index) => (
			<li key={index}>{item}</li>
		  ))} 
		 </ul>
	  </div>
	)
  }
  
  export default FavoritesPage
  